// src/lib/scraper.ts
// Web scraping utilities for government UAP data sources

import * as cheerio from 'cheerio';

const USER_AGENT = 'UAP-Disclosure-Tracker/1.0 (Research; contact@uapdisclosure.app)';

interface ScrapedDocument {
  title: string;
  description?: string;
  url: string;
  date?: string;
  agency?: string;
}

interface ScrapedHearing {
  title: string;
  date?: string;
  committee: string;
  url: string;
  witnesses?: string[];
}

/**
 * Fetch a page with proper headers
 */
async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

/**
 * Scrape NARA catalog for UAP-related records
 * Target: https://catalog.archives.gov
 */
export async function scrapeNARA(): Promise<ScrapedDocument[]> {
  const documents: ScrapedDocument[] = [];

  try {
    // NARA API endpoint for UAP records
    const apiUrl = 'https://catalog.archives.gov/api/v1/?q=UAP+unidentified+aerial+phenomena&resultTypes=item&rows=50';
    const response = await fetch(apiUrl, {
      headers: { 'User-Agent': USER_AGENT },
    });
    const data = await response.json();

    if (data?.opaResponse?.results?.result) {
      for (const item of data.opaResponse.results.result) {
        documents.push({
          title: item.description?.item?.title || 'Untitled',
          description: item.description?.item?.scopeAndContentNote || '',
          url: `https://catalog.archives.gov/id/${item.naId}`,
          date: item.description?.item?.productionDateArray?.proposableQualifiableDate?.logicalDate,
          agency: item.description?.item?.creatingOrganizationArray?.creatingOrganization?.creator?.termName,
        });
      }
    }
  } catch (error) {
    console.error('NARA scrape error:', error);
  }

  return documents;
}

/**
 * Scrape Congress.gov for UAP-related legislation
 * Target: https://www.congress.gov
 */
export async function scrapeCongress(): Promise<ScrapedDocument[]> {
  const documents: ScrapedDocument[] = [];

  try {
    const searchUrl = 'https://www.congress.gov/search?q=%7B%22source%22%3A%22legislation%22%2C%22search%22%3A%22unidentified+anomalous+phenomena%22%7D';
    const html = await fetchPage(searchUrl);
    const $ = cheerio.load(html);

    $('li.expanded').each((_, el) => {
      const titleEl = $(el).find('span.result-heading a');
      const title = titleEl.text().trim();
      const url = titleEl.attr('href');
      const dateText = $(el).find('span.result-item').first().text().trim();

      if (title && url) {
        documents.push({
          title,
          url: url.startsWith('http') ? url : `https://www.congress.gov${url}`,
          date: dateText,
          agency: 'Congress',
        });
      }
    });
  } catch (error) {
    console.error('Congress scrape error:', error);
  }

  return documents;
}

/**
 * Scrape House Oversight Committee for UAP hearing info
 * Target: https://oversight.house.gov
 */
export async function scrapeHouseOversight(): Promise<ScrapedHearing[]> {
  const hearings: ScrapedHearing[] = [];

  try {
    const url = 'https://oversight.house.gov/hearings';
    const html = await fetchPage(url);
    const $ = cheerio.load(html);

    // Look for UAP/UFO related hearings
    $('article, .hearing-item, .views-row').each((_, el) => {
      const title = $(el).find('h3 a, .field-content a').first().text().trim();
      const link = $(el).find('h3 a, .field-content a').first().attr('href');
      const date = $(el).find('.date-display-single, time').first().text().trim();

      if (title && (
        title.toLowerCase().includes('uap') ||
        title.toLowerCase().includes('ufo') ||
        title.toLowerCase().includes('anomalous') ||
        title.toLowerCase().includes('declassification')
      )) {
        hearings.push({
          title,
          date,
          committee: 'House Oversight',
          url: link?.startsWith('http') ? link : `https://oversight.house.gov${link}`,
        });
      }
    });
  } catch (error) {
    console.error('House Oversight scrape error:', error);
  }

  return hearings;
}

/**
 * Scrape AARO website for reports and updates
 * Target: https://www.aaro.mil
 */
export async function scrapeAARO(): Promise<ScrapedDocument[]> {
  const documents: ScrapedDocument[] = [];

  try {
    const url = 'https://www.aaro.mil/';
    const html = await fetchPage(url);
    const $ = cheerio.load(html);

    // Look for report links and news items
    $('a').each((_, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();

      if (
        (href.includes('.pdf') || href.includes('report')) &&
        (text.toLowerCase().includes('uap') ||
         text.toLowerCase().includes('report') ||
         text.toLowerCase().includes('annual'))
      ) {
        documents.push({
          title: text,
          url: href.startsWith('http') ? href : `https://www.aaro.mil${href}`,
          agency: 'AARO / DoD',
        });
      }
    });
  } catch (error) {
    console.error('AARO scrape error:', error);
  }

  return documents;
}

/**
 * Run all scrapers and return combined results
 */
export async function scrapeAll() {
  const [nara, congress, oversight, aaro] = await Promise.allSettled([
    scrapeNARA(),
    scrapeCongress(),
    scrapeHouseOversight(),
    scrapeAARO(),
  ]);

  return {
    nara: nara.status === 'fulfilled' ? nara.value : [],
    congress: congress.status === 'fulfilled' ? congress.value : [],
    oversight: oversight.status === 'fulfilled' ? oversight.value : [],
    aaro: aaro.status === 'fulfilled' ? aaro.value : [],
    scrapedAt: new Date().toISOString(),
  };
}
