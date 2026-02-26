const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // HEARINGS
  const hearings = [
    {
      title: "Restoring Public Trust: Investigating the Pentagon's UFO Programs",
      committee: 'House Oversight Committee',
      chamber: 'HOUSE',
      date: new Date('2025-09-19'),
      status: 'COMPLETED',
      keyTakeaways: ['UAP witnesses criticized AARO for predetermined conclusions', 'Elizondo discussed his book and Pentagon insider knowledge', 'Calls for independent investigation outside DOD'],
      sourceUrl: 'https://oversight.house.gov/',
      tags: ['oversight', 'elizondo']
    },
    {
      title: 'AARO Director Jon Kosloski Testimony',
      committee: 'Senate Armed Services Committee',
      chamber: 'SENATE',
      date: new Date('2024-11-14'),
      status: 'COMPLETED',
      keyTakeaways: ['1,600+ total UAP reports received by AARO', 'GREMLIN sensor prototype deployed', '21 cases merit further analysis', 'Starlink satellites account for growing resolved cases'],
      sourceUrl: 'https://defensescoop.com/2024/11/14/uap-aaro-chief-unveils-pentagon-annual-caseload-analysis-new-efforts/',
      tags: ['aaro', 'kosloski', 'gremlin']
    },
    {
      title: 'Immaculate Constellation & UAP Transparency',
      committee: 'House Oversight Subcommittee on National Security',
      chamber: 'HOUSE',
      date: new Date('2024-11-13'),
      status: 'COMPLETED',
      keyTakeaways: ['Discussion of alleged Immaculate Constellation UAP program', 'Whistleblower protections debated', 'Calls for SCIF-level classified briefings'],
      sourceUrl: 'https://oversight.house.gov/',
      tags: ['immaculate-constellation', 'whistleblower']
    },
    {
      title: 'UAP Hearing: David Grusch Testimony',
      committee: 'House Oversight Committee',
      chamber: 'HOUSE',
      date: new Date('2023-07-26'),
      status: 'COMPLETED',
      keyTakeaways: ['Grusch testified under oath about multi-decade UAP retrieval programs', 'Claimed US has non-human biologics', 'Graves described regular UAP encounters during Navy training', 'Fravor detailed 2004 Nimitz Tic-Tac encounter'],
      sourceUrl: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/',
      tags: ['grusch', 'graves', 'fravor']
    }
  ];
  for (const h of hearings) { await prisma.hearing.create({ data: h }); }
  console.log('  Hearings: ' + hearings.length);

  // WITNESSES
  const allHearings = await prisma.hearing.findMany();
  const gruschHearing = allHearings.find(h => h.title.includes('Grusch'));
  const kosloskiHearing = allHearings.find(h => h.title.includes('Kosloski'));
  const immaculateHearing = allHearings.find(h => h.title.includes('Immaculate'));
  const restoringHearing = allHearings.find(h => h.title.includes('Restoring'));

  const witnesses = [
    { name: 'David Grusch', title: 'Former Intelligence Officer', organization: 'Former NGA/NRO', hearingId: gruschHearing.id },
    { name: 'Ryan Graves', title: 'Former Navy Pilot', organization: 'Americans for Safe Aerospace', hearingId: gruschHearing.id },
    { name: 'David Fravor', title: 'Former Navy Commander', organization: 'US Navy (Ret.)', hearingId: gruschHearing.id },
    { name: 'Jon Kosloski', title: 'AARO Director', organization: 'Department of Defense', hearingId: kosloskiHearing.id },
    { name: 'Luis Elizondo', title: 'Former AATIP Director', organization: 'Former DOD', hearingId: restoringHearing.id },
    { name: 'Michael Shellenberger', title: 'Journalist', organization: 'Public', hearingId: restoringHearing.id },
    { name: 'Tim Gallaudet', title: 'Rear Admiral (Ret.)', organization: 'US Navy (Ret.)', hearingId: restoringHearing.id },
  ];
  for (const w of witnesses) { await prisma.witness.create({ data: w }); }
  console.log('  Witnesses: ' + witnesses.length);

  // DOCUMENTS
  const documents = [
    { title: "Trump's UAP/UFO File Release Directive", source: 'EXECUTIVE', sourceAgency: 'White House', documentType: 'EXECUTIVE_ORDER', datePublished: new Date('2026-02-20'), classification: 'PUBLIC', summary: 'President Trump directed agencies to begin identifying and releasing government files related to aliens, UAP, and UFOs.', sourceUrl: 'https://www.nbcnews.com/politics/trump-administration/trump-says-directing-pentagon-release-files-related-ufos-aliens-rcna259833', tags: ['trump', 'directive'] },
    { title: 'AARO FY2024 Consolidated Annual Report', source: 'AARO', sourceAgency: 'Department of Defense', documentType: 'REPORT', datePublished: new Date('2024-11-14'), classification: 'UNCLASSIFIED', summary: '757 new UAP cases. 118 resolved. 21 merit further analysis. GREMLIN sensor deployed.', sourceUrl: 'https://media.defense.gov/2024/Nov/14/2003583603/-1/-1/0/FY24-CONSOLIDATED-ANNUAL-REPORT-ON-UAP-508.PDF', tags: ['aaro', 'annual-report'] },
    { title: 'NARA UAP Records Collection (RG 615)', source: 'NARA', sourceAgency: 'National Archives', documentType: 'REPORT', datePublished: new Date('2024-06-01'), classification: 'UNCLASSIFIED', summary: 'UAP records transferred from FAA, ODNI, State Dept, and NRC under the 2024 NDAA mandate.', sourceUrl: 'https://www.archives.gov/research/topics/uaps/rg-615', tags: ['nara', 'rg615'] },
    { title: 'NARA UAP Bulk Downloads', source: 'NARA', sourceAgency: 'National Archives', documentType: 'REPORT', datePublished: new Date('2024-06-01'), classification: 'UNCLASSIFIED', summary: 'Digitized and born-digital UAP records available for bulk download from the National Archives.', sourceUrl: 'https://www.archives.gov/research/catalog/catalog-bulk-downloads/uap-bulk-download', tags: ['nara', 'bulk'] },
    { title: 'NSA Declassified UAP Records', source: 'NSA', sourceAgency: 'National Security Agency', documentType: 'FOIA_RESPONSE', datePublished: new Date('2024-01-01'), classification: 'FORMERLY CLASSIFIED', summary: '38 records previously released through FOIA, including UAP sighting reports from intelligence channels.', sourceUrl: 'https://www.nsa.gov/Helpful-Links/NSA-FOIA/Declassification-Transparency-Initiatives/UFO/', tags: ['nsa', 'foia'] },
    { title: 'AARO Historical Review Volume 1', source: 'AARO', sourceAgency: 'Department of Defense', documentType: 'REPORT', datePublished: new Date('2024-03-01'), classification: 'UNCLASSIFIED', summary: 'Review of US government UAP involvement since 1945. No evidence of hidden programs but noted gaps.', sourceUrl: 'https://www.aaro.mil/UAP-Records/', tags: ['aaro', 'historical'] },
    { title: 'Pentagon Declassified UAP Videos (FLIR1, Gimbal, GoFast)', source: 'DOD', sourceAgency: 'Department of Defense', documentType: 'VIDEO', datePublished: new Date('2020-04-27'), classification: 'DECLASSIFIED', summary: 'Three Navy pilot UAP videos officially released. Originally filmed 2004 and 2015.', sourceUrl: 'https://www.defense.gov/News/Releases/Release/Article/2165713/', tags: ['navy', 'video', 'nimitz'] },
    { title: 'AARO Official Website & Case Data', source: 'AARO', sourceAgency: 'Department of Defense', documentType: 'REPORT', datePublished: new Date('2024-01-01'), classification: 'UNCLASSIFIED', summary: 'AARO public website with declassified UAP data, footage, and reporting mechanism.', sourceUrl: 'https://www.aaro.mil/', tags: ['aaro', 'website'] },
  ];
  for (const d of documents) { await prisma.document.create({ data: d }); }
  console.log('  Documents: ' + documents.length);

  // LEGISLATION
  const legislation = [
    { title: 'UAP Disclosure Act of 2023 (Schumer-Rounds)', billNumber: 'S.2226', congress: 118, chamber: 'SENATE', status: 'DEAD', sponsor: 'Sen. Chuck Schumer (D-NY)', cosponsors: ['Sen. Mike Rounds (R-SD)', 'Sen. Marco Rubio (R-FL)', 'Sen. Kirsten Gillibrand (D-NY)'], description: 'Would have created JFK-style review board for UAP records. Key provisions stripped.', lastAction: 'Original provisions stripped from FY2024 NDAA.', congressGovUrl: 'https://www.congress.gov/bill/118th-congress/senate-bill/2226', tags: ['disclosure-act', 'schumer'] },
    { title: 'FY2024 NDAA (Public Law 118-31)', congress: 118, chamber: 'JOINT', status: 'SIGNED_INTO_LAW', sponsor: 'Multiple', description: 'Established NARA UAP Records Collection. Required agencies to transfer UAP records. Mandated AARO reporting.', lastAction: 'Signed into law. NARA actively receiving records.', congressGovUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/2670', tags: ['ndaa', 'fy2024'] },
    { title: 'FY2025 NDAA', congress: 118, chamber: 'JOINT', status: 'SIGNED_INTO_LAW', sponsor: 'Multiple', description: 'Continued AARO authorization, additional UAP reporting requirements.', lastAction: 'Signed into law December 2024.', congressGovUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/8070', tags: ['ndaa', 'fy2025'] },
    { title: 'UAP Declassification Task Force (Proposed)', chamber: 'HOUSE', status: 'INTRODUCED', sponsor: 'Rep. Anna Paulina Luna (R-FL)', cosponsors: ['Rep. Tim Burchett (R-TN)', 'Rep. Jared Moskowitz (D-FL)'], description: 'Would create dedicated task force for UAP declassification.', lastAction: 'Luna thanked Trump for directive, signaled upcoming hearings.', congressGovUrl: 'https://oversight.house.gov/', tags: ['luna', 'task-force'] },
  ];
  for (const l of legislation) { await prisma.legislation.create({ data: l }); }
  console.log('  Legislation: ' + legislation.length);

  // TIMELINE EVENTS
  const events = [
    { title: 'Trump Directs Pentagon to Release UAP/UFO Files', description: 'President Trump announced directive to release government files on aliens, UAP, and UFOs.', date: new Date('2026-02-20'), category: 'EXECUTIVE_ACTION', importance: 'CRITICAL', sourceUrl: 'https://www.nbcnews.com/politics/trump-administration/trump-says-directing-pentagon-release-files-related-ufos-aliens-rcna259833', tags: ['trump'] },
    { title: "Obama Says Aliens Are Real on Podcast", description: 'Former President Obama stated aliens are real, later clarified statistically likely.', date: new Date('2026-02-14'), category: 'MEDIA', importance: 'HIGH', sourceUrl: 'https://www.scientificamerican.com/article/trumps-order-to-release-evidence-for-aliens-obscures-the-scientific-search/', tags: ['obama'] },
    { title: 'House Hearing: Restoring Public Trust', description: 'Elizondo, Shellenberger, Gallaudet testified. Criticized AARO conclusions.', date: new Date('2025-09-19'), category: 'HEARING', importance: 'HIGH', sourceUrl: 'https://oversight.house.gov/', tags: ['hearing'] },
    { title: 'AARO FY2024 Annual Report Released', description: '757 new cases. 21 merit further analysis. GREMLIN sensor deployed.', date: new Date('2024-11-14'), category: 'DOCUMENT_RELEASE', importance: 'HIGH', sourceUrl: 'https://media.defense.gov/2024/Nov/14/2003583603/-1/-1/0/FY24-CONSOLIDATED-ANNUAL-REPORT-ON-UAP-508.PDF', tags: ['aaro'] },
    { title: 'NARA Begins Receiving UAP Records (RG 615)', description: 'National Archives established Record Group 615 for UAP records.', date: new Date('2024-06-01'), category: 'DOCUMENT_RELEASE', importance: 'HIGH', sourceUrl: 'https://www.archives.gov/research/topics/uaps/rg-615', tags: ['nara'] },
    { title: 'Grusch Testimony Before House Oversight', description: 'David Grusch testified under oath about multi-decade UAP retrieval programs.', date: new Date('2023-07-26'), category: 'WHISTLEBLOWER', importance: 'CRITICAL', sourceUrl: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/', tags: ['grusch'] },
    { title: 'Schumer-Rounds UAP Disclosure Act Introduced', description: 'Bipartisan bill to create JFK-style review board. Key provisions later stripped.', date: new Date('2023-07-01'), category: 'LEGISLATION', importance: 'CRITICAL', sourceUrl: 'https://www.congress.gov/bill/118th-congress/senate-bill/2226', tags: ['schumer'] },
    { title: 'David Grusch Goes Public as Whistleblower', description: 'Former NGA/NRO officer alleged US government possesses non-human craft.', date: new Date('2023-06-05'), category: 'WHISTLEBLOWER', importance: 'CRITICAL', sourceUrl: 'https://thedebrief.org/intelligence-officials-say-u-s-has-retrieved-non-human-craft/', tags: ['grusch'] },
    { title: 'Pentagon Officially Releases UAP Videos', description: 'FLIR1, Gimbal, GoFast videos officially declassified.', date: new Date('2020-04-27'), category: 'DOCUMENT_RELEASE', importance: 'CRITICAL', sourceUrl: 'https://www.defense.gov/News/Releases/Release/Article/2165713/', tags: ['navy', 'video'] },
    { title: 'New York Times UAP Bombshell', description: 'NYT revealed AATIP program and published Navy UAP videos.', date: new Date('2017-12-16'), category: 'MEDIA', importance: 'CRITICAL', sourceUrl: 'https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html', tags: ['nyt', 'aatip'] },
  ];
  for (const e of events) { await prisma.timelineEvent.create({ data: e }); }
  console.log('  Timeline Events: ' + events.length);

  // KEY PLAYERS
  const players = [
    { name: 'David Grusch', role: 'Intelligence Officer & Whistleblower', organization: 'Former NGA/NRO', category: 'WHISTLEBLOWER', stance: 'Pro-Disclosure', bio: 'Testified under oath about multi-decade UAP retrieval programs.', keyActions: ['Testified before House Oversight (Jul 2023)', 'Filed whistleblower complaint with ICIG', 'Alleged multi-decade reverse engineering programs'], tags: ['grusch'] },
    { name: 'Luis Elizondo', role: 'Former AATIP Director', organization: 'Former DOD', category: 'WHISTLEBLOWER', stance: 'Pro-Disclosure', bio: 'Former director of Pentagon AATIP program. Author and congressional witness.', keyActions: ['Ran Pentagon AATIP (2007-2017)', 'Multiple congressional testimonies', 'Published book on Pentagon UAP programs'], tags: ['elizondo'] },
    { name: 'Sen. Chuck Schumer', role: 'Senate Minority Leader', organization: 'U.S. Senate (D-NY)', category: 'LEGISLATOR', stance: 'Pro-Disclosure', bio: 'Lead sponsor of UAP Disclosure Act.', keyActions: ['Introduced UAP Disclosure Act', 'Called stripped provisions an outrage', 'Urged Trump on UFO transparency'], tags: ['schumer'] },
    { name: 'Sen. Kirsten Gillibrand', role: 'Senator', organization: 'U.S. Senate (D-NY)', category: 'LEGISLATOR', stance: 'Pro-Disclosure', bio: 'Key Senate champion for UAP transparency.', keyActions: ['Co-authored AARO enabling legislation', 'Pushed for AARO in NDAA', 'Advocated for whistleblower protections'], tags: ['gillibrand'] },
    { name: 'Rep. Anna Paulina Luna', role: 'Representative', organization: 'U.S. House (R-FL)', category: 'LEGISLATOR', stance: 'Pro-Disclosure', bio: 'Leading House Republican on UAP issues.', keyActions: ['Released UAP whistleblower video', 'Organized House UAP hearings', 'Thanked Trump for disclosure directive'], tags: ['luna'] },
    { name: 'Jon Kosloski', role: 'AARO Director', organization: 'Department of Defense', category: 'GOVERNMENT', stance: 'Official Position', bio: 'Current AARO director overseeing UAP investigations.', keyActions: ['Testified to Congress on AARO findings', 'Deployed GREMLIN sensor prototype', 'Briefed congressional staff on FY2024 report'], tags: ['kosloski', 'aaro'] },
    { name: 'Ryan Graves', role: 'Former Navy Pilot & Advocate', organization: 'Americans for Safe Aerospace', category: 'WHISTLEBLOWER', stance: 'Pro-Disclosure', bio: 'Former Navy F/A-18F pilot who reported regular UAP encounters.', keyActions: ['Testified before House Oversight', 'Founded Americans for Safe Aerospace', 'Advocated for destigmatizing UAP reporting'], tags: ['graves'] },
    { name: 'Christopher Mellon', role: 'Former Deputy ASDP(I)', organization: 'Disclosure Foundation', category: 'GOVERNMENT', stance: 'Pro-Disclosure', bio: 'Former deputy assistant secretary of defense for intelligence.', keyActions: ['Provided Navy UAP videos to media', 'Chairs Disclosure Foundation', 'Criticized AARO statutory failures'], tags: ['mellon'] },
  ];
  for (const p of players) { await prisma.keyPlayer.create({ data: p }); }
  console.log('  Key Players: ' + players.length);

  // ALERTS
  const alerts = [
    { title: 'Trump directs Pentagon to release UAP/UFO files', body: 'President directed SecDef and other agencies to begin identifying and releasing government files related to aliens, UAP, and UFOs.', category: 'EXECUTIVE_ACTION', importance: 'CRITICAL', sourceUrl: 'https://thehill.com/homenews/administration/5746879/trump-to-release-ufo-files/' },
    { title: "Hegseth: We have got our people working on it", body: 'Defense Secretary confirms Pentagon actively working on Trump UFO file directive.', category: 'EXECUTIVE_ACTION', importance: 'HIGH', sourceUrl: 'https://time.com/7380751/us-government-ufo-alien-files-release-hegseth-update/' },
    { title: 'NARA UAP record transfers - deadline Sept 2025', body: 'Agencies must transfer publicly releasable UAP records to National Archives by September 30, 2025.', category: 'DOCUMENT_RELEASE', importance: 'MEDIUM', sourceUrl: 'https://www.archives.gov/records-mgmt/uap-guidance' },
  ];
  for (const a of alerts) { await prisma.alert.create({ data: a }); }
  console.log('  Alerts: ' + alerts.length);

  console.log('\nDone! Database seeded.');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());