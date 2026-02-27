// src/app/api/scrape/route.ts
// Vercel Cron-triggered endpoint that runs all scrapers and persists new items

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  scrapeNARA,
  scrapeCongress,
  scrapeHouseOversight,
  scrapeAARO,
} from '@/lib/scraper';
import {
  DocumentSource,
  DocumentType,
  Chamber,
  HearingStatus,
  LegislationStatus,
} from '@prisma/client';

// ── Auth ────────────────────────────────────────────────────────────────
function isAuthorised(request: NextRequest): boolean {
  // Allow Vercel Cron (sends Bearer <CRON_SECRET>)
  const auth = request.headers.get('authorization');
  if (auth === `Bearer ${process.env.CRON_SECRET}`) return true;
  return false;
}

// ── Helpers ─────────────────────────────────────────────────────────────
function tryParseDate(raw?: string): Date | null {
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

interface ScraperResult {
  source: string;
  status: 'success' | 'error' | 'partial';
  itemsFound: number;
  itemsNew: number;
  duration: number;
  error?: string;
}

// ── Individual save helpers ─────────────────────────────────────────────

async function saveNARADocuments(): Promise<ScraperResult> {
  const start = Date.now();
  try {
    const docs = await scrapeNARA();
    let newCount = 0;

    for (const doc of docs) {
      // De-duplicate by sourceUrl
      const exists = await prisma.document.findFirst({
        where: { sourceUrl: doc.url },
      });
      if (exists) continue;

      await prisma.document.create({
        data: {
          title: doc.title,
          description: doc.description || null,
          source: DocumentSource.NARA,
          sourceAgency: doc.agency || 'National Archives',
          documentType: DocumentType.REPORT,
          datePublished: tryParseDate(doc.date),
          sourceUrl: doc.url,
          classification: 'UNCLASSIFIED',
          tags: ['nara', 'uap', 'scraped'],
        },
      });
      newCount++;
    }

    return {
      source: 'nara',
      status: 'success',
      itemsFound: docs.length,
      itemsNew: newCount,
      duration: Date.now() - start,
    };
  } catch (err) {
    return {
      source: 'nara',
      status: 'error',
      itemsFound: 0,
      itemsNew: 0,
      duration: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function saveCongressLegislation(): Promise<ScraperResult> {
  const start = Date.now();
  try {
    const items = await scrapeCongress();
    let newCount = 0;

    for (const item of items) {
      // De-duplicate by congressGovUrl OR title
      const exists = await prisma.legislation.findFirst({
        where: {
          OR: [{ congressGovUrl: item.url }, { title: item.title }],
        },
      });
      if (exists) continue;

      await prisma.legislation.create({
        data: {
          title: item.title,
          description: item.description || null,
          chamber: Chamber.HOUSE, // default; Congress.gov search returns mixed
          status: LegislationStatus.INTRODUCED,
          congressGovUrl: item.url,
          dateIntroduced: tryParseDate(item.date),
          tags: ['congress', 'uap', 'scraped'],
        },
      });
      newCount++;
    }

    return {
      source: 'congress',
      status: 'success',
      itemsFound: items.length,
      itemsNew: newCount,
      duration: Date.now() - start,
    };
  } catch (err) {
    return {
      source: 'congress',
      status: 'error',
      itemsFound: 0,
      itemsNew: 0,
      duration: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function saveHouseOversightHearings(): Promise<ScraperResult> {
  const start = Date.now();
  try {
    const hearings = await scrapeHouseOversight();
    let newCount = 0;

    for (const h of hearings) {
      // De-duplicate by sourceUrl OR title
      const exists = await prisma.hearing.findFirst({
        where: {
          OR: [{ sourceUrl: h.url }, { title: h.title }],
        },
      });
      if (exists) continue;

      const hearing = await prisma.hearing.create({
        data: {
          title: h.title,
          committee: h.committee,
          chamber: Chamber.HOUSE,
          date: tryParseDate(h.date) || new Date(),
          status: HearingStatus.COMPLETED,
          sourceUrl: h.url,
          tags: ['house-oversight', 'uap', 'scraped'],
        },
      });

      // Create witness records if provided
      if (h.witnesses && h.witnesses.length > 0) {
        await prisma.witness.createMany({
          data: h.witnesses.map((name) => ({
            name,
            hearingId: hearing.id,
          })),
        });
      }

      newCount++;
    }

    return {
      source: 'house-oversight',
      status: 'success',
      itemsFound: hearings.length,
      itemsNew: newCount,
      duration: Date.now() - start,
    };
  } catch (err) {
    return {
      source: 'house-oversight',
      status: 'error',
      itemsFound: 0,
      itemsNew: 0,
      duration: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function saveAARODocuments(): Promise<ScraperResult> {
  const start = Date.now();
  try {
    const docs = await scrapeAARO();
    let newCount = 0;

    for (const doc of docs) {
      const exists = await prisma.document.findFirst({
        where: { sourceUrl: doc.url },
      });
      if (exists) continue;

      await prisma.document.create({
        data: {
          title: doc.title,
          description: doc.description || null,
          source: DocumentSource.AARO,
          sourceAgency: 'Department of Defense',
          documentType: DocumentType.REPORT,
          datePublished: tryParseDate(doc.date),
          sourceUrl: doc.url,
          classification: 'UNCLASSIFIED',
          tags: ['aaro', 'uap', 'scraped'],
        },
      });
      newCount++;
    }

    return {
      source: 'aaro',
      status: 'success',
      itemsFound: docs.length,
      itemsNew: newCount,
      duration: Date.now() - start,
    };
  } catch (err) {
    return {
      source: 'aaro',
      status: 'error',
      itemsFound: 0,
      itemsNew: 0,
      duration: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// ── Main handler ────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const overallStart = Date.now();

  // Run all scrapers concurrently
  const [nara, congress, oversight, aaro] = await Promise.all([
    saveNARADocuments(),
    saveCongressLegislation(),
    saveHouseOversightHearings(),
    saveAARODocuments(),
  ]);

  const results = [nara, congress, oversight, aaro];

  // Persist scraper logs
  await prisma.scraperLog.createMany({
    data: results.map((r) => ({
      source: r.source,
      status: r.status,
      itemsFound: r.itemsFound,
      itemsNew: r.itemsNew,
      error: r.error || null,
      duration: r.duration,
    })),
  });

  const totalNew = results.reduce((s, r) => s + r.itemsNew, 0);
  const totalFound = results.reduce((s, r) => s + r.itemsFound, 0);

  return NextResponse.json({
    success: true,
    duration: Date.now() - overallStart,
    totalFound,
    totalNew,
    scrapers: results,
  });
}
