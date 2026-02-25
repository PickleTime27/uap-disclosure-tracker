// scripts/seed.ts
// Seed database with historical UAP disclosure data
// Run with: npm run seed

// import prisma from '../src/lib/db';

async function main() {
  console.log('🛸 Seeding UAP Disclosure Tracker database...\n');

  // ============================================
  // TIMELINE EVENTS — Major disclosure milestones
  // ============================================
  const timelineEvents = [
    {
      title: "Trump directs Pentagon to release UAP/UFO files",
      description: "President Trump announced on Truth Social that he is directing the Secretary of Defense and other agencies to begin identifying and releasing government files related to aliens, UAP, and UFOs.",
      date: new Date('2026-02-20'),
      category: 'EXECUTIVE_ACTION',
      importance: 'CRITICAL',
      tags: ['trump', 'declassification', 'executive-action'],
    },
    {
      title: "Obama says aliens are 'real' on podcast",
      description: "Former President Obama stated on a podcast that aliens are 'real' but later clarified he saw no evidence of contact during his presidency. Comments went viral.",
      date: new Date('2026-02-15'),
      category: 'MEDIA',
      importance: 'HIGH',
      tags: ['obama', 'media', 'viral'],
    },
    {
      title: "House Task Force hearing on UAP Transparency",
      description: "The Task Force on Declassification of Federal Secrets held hearing: 'Restoring Public Trust Through UAP Transparency and Whistleblower Protection.'",
      date: new Date('2025-09-09'),
      category: 'HEARING',
      importance: 'HIGH',
      tags: ['hearing', 'house', 'whistleblower', 'transparency'],
    },
    {
      title: "NARA deadline for UAP record transfers",
      description: "Agencies were required to transfer UAP records to NARA by this date per NDAA mandate. Status of compliance remains unclear.",
      date: new Date('2025-09-30'),
      category: 'DOCUMENT_RELEASE',
      importance: 'HIGH',
      tags: ['nara', 'deadline', 'ndaa'],
    },
    {
      title: "Senate Armed Services hearing — AARO Director testifies",
      description: "AARO Director Jon Kosloski testified before the Senate Armed Services Subcommittee on Emerging Threats. Revealed 'Gremlin' sensor technology deployment.",
      date: new Date('2024-11-19'),
      category: 'HEARING',
      importance: 'HIGH',
      tags: ['hearing', 'senate', 'aaro', 'gremlin'],
    },
    {
      title: "House Oversight hearing — 'Immaculate Constellation' alleged",
      description: "Journalist Michael Shellenberger submitted anonymous whistleblower report alleging secret DoD program called 'Immaculate Constellation' withheld UAP evidence.",
      date: new Date('2024-11-13'),
      category: 'HEARING',
      importance: 'CRITICAL',
      tags: ['hearing', 'house', 'immaculate-constellation', 'whistleblower'],
    },
    {
      title: "AARO FY2024 annual report released",
      description: "757 new UAP cases. 118 resolved as prosaic objects. 21 cases remain 'truly anomalous.' Gremlin sensor architecture detailed.",
      date: new Date('2024-11-14'),
      category: 'DOCUMENT_RELEASE',
      importance: 'HIGH',
      tags: ['aaro', 'report', 'annual'],
    },
    {
      title: "David Grusch congressional testimony",
      description: "Former intelligence officer David Grusch testified under oath before House Oversight Committee about alleged UAP crash retrieval and reverse engineering programs.",
      date: new Date('2023-07-26'),
      category: 'WHISTLEBLOWER',
      importance: 'CRITICAL',
      tags: ['grusch', 'whistleblower', 'testimony', 'crash-retrieval'],
    },
    {
      title: "First public congressional hearing on UFOs in 50+ years",
      description: "House Intelligence Subcommittee held first public hearing on UAPs since 1969. Deputy Director of Naval Intelligence Scott Bray testified.",
      date: new Date('2022-05-17'),
      category: 'HEARING',
      importance: 'CRITICAL',
      tags: ['hearing', 'house', 'historic', 'first-in-50-years'],
    },
    {
      title: "AARO (All-domain Anomaly Resolution Office) established",
      description: "The Pentagon established AARO to investigate UAP reports, replacing the earlier UAP Task Force.",
      date: new Date('2022-07-15'),
      category: 'LEGISLATION',
      importance: 'HIGH',
      tags: ['aaro', 'pentagon', 'established'],
    },
    {
      title: "DNI preliminary UAP assessment released",
      description: "Office of the Director of National Intelligence released preliminary assessment reviewing 144 military UAP encounters from 2004-2021. Only 1 resolved.",
      date: new Date('2021-06-25'),
      category: 'DOCUMENT_RELEASE',
      importance: 'CRITICAL',
      tags: ['dni', 'report', 'preliminary', '144-cases'],
    },
    {
      title: "Pentagon officially releases three UAP videos",
      description: "DoD officially released three Navy pilot UAP encounter videos (FLIR1, Gimbal, GoFast) previously leaked, confirming their authenticity.",
      date: new Date('2020-04-27'),
      category: 'DOCUMENT_RELEASE',
      importance: 'CRITICAL',
      tags: ['pentagon', 'video', 'flir', 'gimbal', 'gofast'],
    },
  ];

  // ============================================
  // KEY PLAYERS
  // ============================================
  const keyPlayers = [
    {
      name: 'Sen. Kirsten Gillibrand',
      role: 'U.S. Senator (D-NY)',
      organization: 'Senate Armed Services Committee',
      category: 'LEGISLATOR',
      stance: 'Strong advocate for UAP transparency and AARO oversight',
      keyActions: ['Led multiple Senate UAP hearings', 'Championed UAP provisions in NDAA', 'Demanded AARO progress reports'],
      isActive: true,
    },
    {
      name: 'Rep. Anna Paulina Luna',
      role: 'U.S. Representative (R-FL)',
      organization: 'House Task Force on Declassification',
      category: 'LEGISLATOR',
      stance: 'Chairs Task Force on Declassification of Federal Secrets',
      keyActions: ['Chairs declassification task force', 'Praised Trump declassification directive', 'Led 2025 UAP transparency hearing'],
      isActive: true,
    },
    {
      name: 'Jon Kosloski',
      role: 'Director, AARO',
      organization: 'Department of Defense',
      category: 'GOVERNMENT',
      stance: 'Maintains no evidence of extraterrestrial technology found',
      keyActions: ['Testified before Senate (Nov 2024)', 'Oversaw Gremlin sensor deployment', 'Released FY2024 annual report'],
      isActive: true,
    },
    {
      name: 'David Grusch',
      role: 'Former Intelligence Officer / Whistleblower',
      organization: 'Former NGA/NRO',
      category: 'WHISTLEBLOWER',
      stance: 'Alleges crash retrieval and reverse engineering programs exist',
      keyActions: ['Testified under oath before Congress (July 2023)', 'Filed whistleblower complaint with ICIG', 'Claims firsthand witnesses of non-human technology'],
      isActive: true,
    },
    {
      name: 'Christopher Mellon',
      role: 'Former Deputy Asst. Secretary of Defense for Intelligence',
      organization: 'Disclosure Foundation (Chair)',
      category: 'INTELLIGENCE',
      stance: 'Leading advocate for structured, credible disclosure',
      keyActions: ['Chairs Disclosure Foundation', 'Pressures AARO to meet statutory obligations', 'Briefed Congress on UAP'],
      isActive: true,
    },
    {
      name: 'Luis Elizondo',
      role: 'Former DoD Official',
      organization: 'Former AATIP Director',
      category: 'INTELLIGENCE',
      stance: 'Advocates for transparency, testified before Congress',
      keyActions: ['Directed AATIP program', 'Testified at multiple congressional hearings', 'Published book on UAP experiences'],
      isActive: true,
    },
    {
      name: 'Avi Loeb',
      role: 'Professor of Astronomy',
      organization: 'Harvard University / Galileo Project',
      category: 'SCIENTIST',
      stance: 'Leads scientific search for extraterrestrial technology',
      keyActions: ['Leads Galileo Project observatory network', 'Briefed Congress on UAP', 'Offered to help interpret declassified data'],
      isActive: true,
    },
  ];

  console.log(`📋 ${timelineEvents.length} timeline events ready`);
  console.log(`👤 ${keyPlayers.length} key players ready`);
  console.log('\n✅ Seed data prepared. Connect database and uncomment Prisma calls to insert.');
  console.log('   Run: npx prisma migrate dev --name init');
  console.log('   Then re-run: npm run seed\n');

  // TODO: Uncomment when database is connected
  // for (const event of timelineEvents) {
  //   await prisma.timelineEvent.create({ data: event });
  // }
  // for (const player of keyPlayers) {
  //   await prisma.keyPlayer.create({ data: player });
  // }
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  });
