import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// ── GET  /api/sightings ─────────────────────────────────────────────────
// Returns all sightings ordered by date desc (limit 500).
export async function GET() {
  try {
    const sightings = await prisma.sighting.findMany({
      orderBy: { date: 'desc' },
      take: 500,
      select: {
        id: true,
        date: true,
        city: true,
        state: true,
        country: true,
        lat: true,
        lng: true,
        shape: true,
        duration: true,
        summary: true,
        verified: true,
        createdAt: true,
      },
    });

    return NextResponse.json(sightings);
  } catch (err) {
    console.error('GET /api/sightings error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch sightings' },
      { status: 500 },
    );
  }
}

// ── POST  /api/sightings ────────────────────────────────────────────────
// Accepts a new user-submitted sighting.
const VALID_SHAPES = [
  'Orb', 'Triangle', 'Disk', 'Cylinder', 'Fireball',
  'Light', 'Sphere', 'Rectangle', 'Cigar', 'Other',
];

interface SightingBody {
  date: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  shape: string;
  duration?: string;
  summary: string;
  reporterName?: string;
  reporterEmail?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SightingBody;

    // ── Validation ────────────────────────────────────────────────────
    const errors: string[] = [];

    if (!body.date) errors.push('date is required');
    if (!body.city || !body.city.trim()) errors.push('city is required');
    if (!body.state || !body.state.trim()) errors.push('state is required');
    if (body.lat == null || body.lng == null) errors.push('lat and lng are required');
    if (!body.shape || !VALID_SHAPES.includes(body.shape)) errors.push(`shape must be one of: ${VALID_SHAPES.join(', ')}`);
    if (!body.summary || body.summary.trim().length < 10) errors.push('summary must be at least 10 characters');

    const parsedDate = new Date(body.date);
    if (isNaN(parsedDate.getTime())) errors.push('date must be a valid date');

    if (typeof body.lat === 'number' && (body.lat < -90 || body.lat > 90)) errors.push('lat must be between -90 and 90');
    if (typeof body.lng === 'number' && (body.lng < -180 || body.lng > 180)) errors.push('lng must be between -180 and 180');

    if (body.reporterEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.reporterEmail)) {
      errors.push('reporterEmail must be a valid email address');
    }

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // ── Create ────────────────────────────────────────────────────────
    const sighting = await prisma.sighting.create({
      data: {
        date: parsedDate,
        city: body.city.trim(),
        state: body.state.trim().toUpperCase(),
        lat: body.lat,
        lng: body.lng,
        shape: body.shape,
        duration: body.duration?.trim() || null,
        summary: body.summary.trim(),
        reporterName: body.reporterName?.trim() || null,
        reporterEmail: body.reporterEmail?.trim() || null,
        verified: false,
      },
    });

    return NextResponse.json(sighting, { status: 201 });
  } catch (err) {
    console.error('POST /api/sightings error:', err);
    return NextResponse.json(
      { error: 'Failed to save sighting' },
      { status: 500 },
    );
  }
}
