// scripts/seed-sightings.js
// One-time script to migrate existing sightings from public/sightings-data.json
// into the Sighting model in the database.
//
// Usage:  node scripts/seed-sightings.js
//
// Prerequisites:
//   1. npx prisma db push          (create the Sighting table)
//   2. npx prisma generate         (regenerate the client)
//   3. DATABASE_URL set in .env

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.join(__dirname, '..', 'public', 'sightings-data.json');

  if (!fs.existsSync(jsonPath)) {
    console.error('ERROR: public/sightings-data.json not found');
    process.exit(1);
  }

  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const sightings = JSON.parse(raw);

  console.log(`Found ${sightings.length} sightings in JSON file`);

  let created = 0;
  let skipped = 0;

  for (const s of sightings) {
    // Check for duplicate by matching city + state + date
    const existing = await prisma.sighting.findFirst({
      where: {
        city: s.city,
        state: s.state,
        date: new Date(s.date),
      },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.sighting.create({
      data: {
        date: new Date(s.date),
        city: s.city,
        state: s.state,
        country: 'US',
        lat: s.lat,
        lng: s.lng,
        shape: s.shape,
        duration: s.duration || null,
        summary: s.summary,
        verified: true, // historical / seed data is pre-verified
      },
    });

    created++;
  }

  console.log(`Done! Created: ${created}, Skipped (duplicates): ${skipped}`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
