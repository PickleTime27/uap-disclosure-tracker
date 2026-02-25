const fs = require("fs");
const path = require("path");

// Ensure directories exist
["src/app/legislation", "src/app/timeline", "src/app/whistleblowers"].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// ============================================
// LEGISLATION PAGE
// ============================================
fs.writeFileSync("src/app/legislation/page.tsx", `// src/app/legislation/page.tsx
import Navbar from '@/components/layout/Navbar';

const legislation = [
  {
    id: '1',
    title: 'UAP Disclosure Act of 2023 (Schumer-Rounds Amendment)',
    billNumber: 'S.Amdt.797',
    congress: 118,
    chamber: 'SENATE',
    status: 'STRIPPED',
    sponsor: 'Sen. Chuck Schumer (D-NY)',
    cosponsors: ['Sen. Mike Rounds (R-SD)', 'Sen. Marco Rubio (R-FL)', 'Sen. Kirsten Gillibrand (D-NY)', 'Sen. Todd Young (R-IN)'],
    description: 'The most ambitious UAP transparency legislation ever proposed. Would have established a UAP Records Review Board (modeled on the JFK Assassination Records Act), mandated government-wide disclosure of UAP records, and given the government eminent domain over any recovered non-human craft or biological materials.',
    uapProvisions: 'Eminent domain over non-human technology, 25-year mandatory disclosure timeline, independent review board with subpoena power, whistleblower protections.',
    dateIntroduced: 'July 2023',
    lastAction: 'Key provisions stripped from final NDAA by House leadership',
    statusColor: 'text-critical-400',
  },
  {
    id: '2',
    title: 'FY2024 NDAA \u2014 UAP Provisions (as enacted)',
    billNumber: 'H.R.2670',
    congress: 118,
    chamber: 'JOINT',
    status: 'SIGNED_INTO_LAW',
    sponsor: 'Various',
    cosponsors: [],
    description: 'While the full Schumer-Rounds amendment was gutted, the final NDAA still included significant UAP provisions requiring agencies to transfer UAP records to the National Archives (NARA) and strengthening AARO reporting requirements.',
    uapProvisions: 'Agencies must identify UAP records by Oct 20, 2024. Transfer records to NARA by Sept 30, 2025. NARA must provide public access within 30 days of receipt. Online catalog upload within 180 days.',
    dateIntroduced: 'Jan 2023',
    lastAction: 'Signed into law Dec 22, 2023',
    statusColor: 'text-verified-400',
  },
  {
    id: '3',
    title: 'FY2025 NDAA \u2014 UAP Provisions',
    billNumber: 'H.R.5009',
    congress: 118,
    chamber: 'JOINT',
    status: 'SIGNED_INTO_LAW',
    sponsor: 'Various',
    cosponsors: [],
    description: 'Continued UAP transparency provisions. Strengthened requirements for AARO reporting and added new mandates for interagency cooperation on UAP data sharing.',
    uapProvisions: 'Extended AARO reporting deadlines, required annual unclassified UAP reports to Congress, mandated improved sensor data collection protocols.',
    dateIntroduced: 'Jan 2024',
    lastAction: 'Signed into law Dec 2024',
    statusColor: 'text-verified-400',
  },
  {
    id: '4',
    title: 'Declassification Task Force Authorization',
    billNumber: 'H.Res.',
    congress: 119,
    chamber: 'HOUSE',
    status: 'ACTIVE',
    sponsor: 'Rep. Anna Paulina Luna (R-FL)',
    cosponsors: ['Rep. Tim Burchett (R-TN)', 'Rep. Jared Moskowitz (D-FL)'],
    description: 'Established the House Task Force on Declassification of Federal Secrets, chaired by Rep. Luna. The task force has held hearings on UAP transparency and whistleblower protection.',
    uapProvisions: 'Oversight authority over UAP declassification efforts, hearing authority, coordination with executive branch on record releases.',
    dateIntroduced: 'Jan 2025',
    lastAction: 'Task Force actively conducting hearings (Sept 2025 hearing held)',
    statusColor: 'text-signal-400',
  },
];

const statusLabels: Record<string, string> = {
  INTRODUCED: 'Introduced',
  IN_COMMITTEE: 'In Committee',
  PASSED_HOUSE: 'Passed House',
  PASSED_SENATE: 'Passed Senate',
  SIGNED_INTO_LAW: 'Signed Into Law',
  STRIPPED: 'Key Provisions Stripped',
  ACTIVE: 'Active',
  DEAD: 'Dead',
};

const statusBadgeColor: Record<string, string> = {
  SIGNED_INTO_LAW: 'bg-verified-400/15 text-verified-400 border-verified-500/30',
  ACTIVE: 'bg-signal-400/15 text-signal-400 border-signal-500/30',
  STRIPPED: 'bg-critical-400/15 text-critical-400 border-critical-500/30',
  INTRODUCED: 'bg-alert-400/15 text-alert-400 border-alert-500/30',
  IN_COMMITTEE: 'bg-purple-400/15 text-purple-400 border-purple-500/30',
  DEAD: 'bg-gray-400/15 text-gray-400 border-gray-500/30',
};

export default function LegislationPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            Legislation Pipeline
          </h1>
          <p className="text-sm text-gray-400">
            UAP-related bills, amendments, and NDAA provisions tracking their journey through Congress.
          </p>
        </div>

        {/* Pipeline summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Signed Into Law', count: 2, color: 'text-verified-400' },
            { label: 'Active', count: 1, color: 'text-signal-400' },
            { label: 'Stripped/Gutted', count: 1, color: 'text-critical-400' },
            { label: 'Total Tracked', count: 4, color: 'text-white' },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 text-center">
              <p className={"font-display text-2xl font-bold " + stat.color}>{stat.count}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {legislation.map((bill, i) => (
            <div
              key={bill.id}
              className="card p-6 animate-slide-up"
              style={{ animationDelay: i * 100 + "ms" }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={"badge border " + (statusBadgeColor[bill.status] || 'badge-medium')}>
                  {statusLabels[bill.status] || bill.status}
                </span>
                <span className="badge badge-medium">{bill.chamber}</span>
                <span className="text-xs font-mono text-gray-500">{bill.billNumber}</span>
                <span className="text-xs font-mono text-gray-600">{bill.congress}th Congress</span>
              </div>

              <h2 className="font-display text-lg font-semibold text-white mb-1">
                {bill.title}
              </h2>
              <p className="text-sm text-gray-500 mb-3">Sponsor: {bill.sponsor}</p>

              {bill.cosponsors.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {bill.cosponsors.map((cs) => (
                    <span key={cs} className="text-xs bg-void-700/50 px-2 py-0.5 rounded text-gray-400">{cs}</span>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-300 leading-relaxed mb-3">{bill.description}</p>

              <div className="mb-3">
                <p className="text-xs font-mono text-signal-500/70 mb-1">UAP PROVISIONS</p>
                <p className="text-sm text-gray-400">{bill.uapProvisions}</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-gray-600">LAST ACTION:</span>
                <span className={bill.statusColor}>{bill.lastAction}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
`, "utf8");
console.log("Created: src/app/legislation/page.tsx");

// ============================================
// TIMELINE PAGE
// ============================================
fs.writeFileSync("src/app/timeline/page.tsx", `// src/app/timeline/page.tsx
import Navbar from '@/components/layout/Navbar';

const timelineEvents = [
  { date: 'Feb 20, 2026', title: 'Trump announces UFO/UAP file declassification directive', category: 'EXECUTIVE_ACTION', importance: 'CRITICAL', description: 'President Trump directed the Secretary of Defense and other agencies to begin identifying and releasing government files related to aliens, UAP, and UFOs.' },
  { date: 'Feb 19, 2026', title: 'Obama states aliens are "real" on podcast', category: 'MEDIA', importance: 'HIGH', description: 'Former President Obama said on Brian Tyler Cohen\\'s podcast that aliens are "real," though he later clarified he hadn\\'t seen evidence of contact. Trump accused him of disclosing classified information.' },
  { date: 'Sep 9, 2025', title: 'House Task Force hearing: "Restoring Public Trust Through UAP Transparency"', category: 'HEARING', importance: 'HIGH', description: 'House Task Force on Declassification held hearing with witnesses including George Knapp and military veterans on whistleblower protection and transparency failures.' },
  { date: 'Sep 30, 2025', title: 'NARA deadline for agency UAP record transfers', category: 'DOCUMENT_RELEASE', importance: 'CRITICAL', description: 'Agencies were required to transfer UAP records to NARA by this date. Status remains unclear \u2014 NARA has gone silent with unanswered emails since December 2025.' },
  { date: 'Nov 19, 2024', title: 'AARO Director Kosloski testifies before Senate', category: 'HEARING', importance: 'HIGH', description: 'Jon Kosloski revealed "Gremlin" sensor technology for UAP detection. Stated no evidence of extraterrestrial technology found. Sen. Gillibrand demanded progress report.' },
  { date: 'Nov 14, 2024', title: 'AARO FY2024 annual report: 757 new cases', category: 'DOCUMENT_RELEASE', importance: 'HIGH', description: '757 new UAP cases reported. 118 resolved (70% balloons, 16% drones). 21 cases remain "truly anomalous" with no explanation.' },
  { date: 'Nov 13, 2024', title: 'House Oversight: "Immaculate Constellation" program alleged', category: 'HEARING', importance: 'CRITICAL', description: 'Michael Shellenberger testified about an alleged secret DoD UAP program called "Immaculate Constellation." Anonymous whistleblower report submitted to Congress.' },
  { date: 'Jul 26, 2023', title: 'David Grusch testifies before House Oversight', category: 'WHISTLEBLOWER', importance: 'CRITICAL', description: 'Former intelligence officer David Grusch testified under oath that the US government possesses craft of non-human origin and that a secret reverse-engineering program exists.' },
  { date: 'Jul 2023', title: 'Schumer-Rounds UAP Disclosure Act introduced', category: 'LEGISLATION', importance: 'CRITICAL', description: 'The most ambitious UAP transparency legislation ever proposed, modeled on the JFK Assassination Records Act. Key provisions later stripped from final NDAA by House leadership.' },
  { date: 'Apr 19, 2023', title: 'AARO Director Kirkpatrick testifies: "metallic orbs"', category: 'HEARING', importance: 'MEDIUM', description: 'Sean Kirkpatrick described common UAP sightings including "metallic orbs" but did not confirm extraterrestrial technology.' },
  { date: 'Dec 22, 2023', title: 'FY2024 NDAA signed with UAP provisions', category: 'LEGISLATION', importance: 'HIGH', description: 'Despite stripping the full Disclosure Act, the NDAA included mandates for agencies to transfer UAP records to NARA and strengthened AARO reporting.' },
  { date: 'May 17, 2022', title: 'First public UAP hearing in 50+ years', category: 'HEARING', importance: 'CRITICAL', description: 'House Intelligence Subcommittee held the first public congressional hearing on UFOs since 1969. Scott Bray and Ronald Moultrie testified. ~400 sightings reported.' },
  { date: 'Jun 25, 2021', title: 'ODNI preliminary UAP assessment released', category: 'DOCUMENT_RELEASE', importance: 'CRITICAL', description: 'Office of the Director of National Intelligence released preliminary assessment reviewing 144 military encounters (2004-2021). Most lacked sufficient data for conclusions.' },
  { date: 'Apr 2020', title: 'Pentagon officially releases three UAP videos', category: 'DOCUMENT_RELEASE', importance: 'CRITICAL', description: 'Pentagon declassified and released three Navy pilot UAP videos ("FLIR1", "Gimbal", "GoFast") filmed in 2004 and 2015, confirming their authenticity.' },
  { date: 'Dec 2017', title: 'NY Times breaks AATIP story', category: 'MEDIA', importance: 'CRITICAL', description: 'New York Times revealed the existence of the Advanced Aerospace Threat Identification Program (AATIP), a secret Pentagon UFO program run by Luis Elizondo from 2007-2012.' },
];

const categoryColors: Record<string, string> = {
  EXECUTIVE_ACTION: 'bg-alert-400',
  HEARING: 'bg-signal-400',
  DOCUMENT_RELEASE: 'bg-verified-400',
  LEGISLATION: 'bg-blue-400',
  WHISTLEBLOWER: 'bg-critical-400',
  MEDIA: 'bg-purple-400',
};

const categoryLabels: Record<string, string> = {
  EXECUTIVE_ACTION: 'Executive Action',
  HEARING: 'Congressional Hearing',
  DOCUMENT_RELEASE: 'Document Release',
  LEGISLATION: 'Legislation',
  WHISTLEBLOWER: 'Whistleblower',
  MEDIA: 'Media',
};

const importanceBorder: Record<string, string> = {
  CRITICAL: 'border-l-critical-400',
  HIGH: 'border-l-alert-400',
  MEDIUM: 'border-l-signal-400',
  LOW: 'border-l-gray-400',
};

export default function TimelinePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            Disclosure Timeline
          </h1>
          <p className="text-sm text-gray-400">
            A chronological history of major UAP disclosure events \u2014 from the 2017 NY Times bombshell to today.
          </p>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className={"w-2.5 h-2.5 rounded-full " + (categoryColors[key] || 'bg-gray-400')} />
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-void-600/50" />

          <div className="space-y-1">
            {timelineEvents.map((event, i) => (
              <div
                key={i}
                className={"relative pl-12 animate-slide-up"}
                style={{ animationDelay: i * 60 + "ms" }}
              >
                {/* Dot on timeline */}
                <div className={"absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 border-void-950 " + (categoryColors[event.category] || 'bg-gray-400')} />

                <div className={"card p-5 border-l-2 " + (importanceBorder[event.importance] || 'border-l-gray-600')}>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-gray-500">{event.date}</span>
                    <span className="text-xs font-mono text-gray-600">\u00b7</span>
                    <span className="flex items-center gap-1">
                      <span className={"w-1.5 h-1.5 rounded-full " + (categoryColors[event.category] || 'bg-gray-400')} />
                      <span className="text-xs text-gray-400">{categoryLabels[event.category] || event.category}</span>
                    </span>
                    {event.importance === 'CRITICAL' && (
                      <span className="badge bg-critical-400/15 text-critical-400 border border-critical-500/30">CRITICAL</span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
`, "utf8");
console.log("Created: src/app/timeline/page.tsx");

// ============================================
// KEY PLAYERS (WHISTLEBLOWERS) PAGE
// ============================================
fs.writeFileSync("src/app/whistleblowers/page.tsx", `// src/app/whistleblowers/page.tsx
import Navbar from '@/components/layout/Navbar';

const players = [
  {
    id: '1',
    name: 'David Grusch',
    role: 'Former Intelligence Officer & UAP Whistleblower',
    organization: 'NGA / NRO (Former)',
    category: 'WHISTLEBLOWER',
    stance: 'PRO-DISCLOSURE',
    bio: 'Former intelligence officer who served on the UAP Task Force. Filed whistleblower complaint alleging the US government possesses craft of non-human origin and operates a secret reverse-engineering program. Testified under oath before House Oversight Committee in July 2023.',
    keyActions: [
      'Filed formal whistleblower complaint with Intelligence Community Inspector General',
      'Testified under oath before House Oversight (July 26, 2023)',
      'Alleged existence of non-human craft retrieval program',
      'Claimed knowledge of multi-decade coverup involving defense contractors',
    ],
  },
  {
    id: '2',
    name: 'Luis Elizondo',
    role: 'Former Director of AATIP',
    organization: 'Department of Defense (Former)',
    category: 'WHISTLEBLOWER',
    stance: 'PRO-DISCLOSURE',
    bio: 'Former head of the Advanced Aerospace Threat Identification Program (AATIP) from 2007-2012. Resigned from the Pentagon in 2017 in protest of excessive secrecy. His departure and subsequent NY Times interview triggered the modern UAP disclosure movement.',
    keyActions: [
      'Led AATIP investigation from within the Pentagon (2007-2012)',
      'Resigned in protest of UAP secrecy (2017)',
      'Catalyzed NY Times bombshell article (Dec 2017)',
      'Testified before House Oversight (Nov 2024)',
      'Published "Imminent" detailing insider knowledge',
    ],
  },
  {
    id: '3',
    name: 'Sen. Chuck Schumer',
    role: 'Senate Majority Leader',
    organization: 'U.S. Senate (D-NY)',
    category: 'LEGISLATOR',
    stance: 'PRO-DISCLOSURE',
    bio: 'Lead sponsor of the UAP Disclosure Act of 2023, the most ambitious transparency legislation in history. Despite key provisions being stripped from the NDAA, Schumer has continued pushing for UAP record disclosure through legislative channels.',
    keyActions: [
      'Authored UAP Disclosure Act of 2023 (S.Amdt.797)',
      'Secured bipartisan coalition including Rounds, Rubio, Gillibrand',
      'Proposed eminent domain over non-human technology',
      'Continues advocacy despite NDAA gutting',
    ],
  },
  {
    id: '4',
    name: 'Sen. Kirsten Gillibrand',
    role: 'Senator, Armed Services Committee',
    organization: 'U.S. Senate (D-NY)',
    category: 'LEGISLATOR',
    stance: 'PRO-DISCLOSURE',
    bio: 'Key architect of AARO oversight provisions. Championed the establishment of the All-domain Anomaly Resolution Office and has consistently demanded progress reports and accountability from AARO leadership.',
    keyActions: [
      'Co-sponsored UAP Disclosure Act',
      'Championed AARO establishment through NDAA amendments',
      'Demanded progress report from AARO Director Kosloski (Nov 2024)',
      'Pushed for stronger whistleblower protections',
    ],
  },
  {
    id: '5',
    name: 'Rep. Anna Paulina Luna',
    role: 'Chair, Task Force on Declassification',
    organization: 'U.S. House (R-FL)',
    category: 'LEGISLATOR',
    stance: 'PRO-DISCLOSURE',
    bio: 'Chairs the House Task Force on Declassification of Federal Secrets. Has been vocal about UAP transparency and praised Trump\\'s declassification directive. Led the September 2025 hearing on UAP transparency and whistleblower protection.',
    keyActions: [
      'Chairs House Task Force on Declassification',
      'Led Sep 2025 UAP transparency hearing',
      'Publicly praised Trump declassification announcement (Feb 2026)',
      'Pledged to review all released footage, photos, and reports publicly',
    ],
  },
  {
    id: '6',
    name: 'Jon Kosloski',
    role: 'Director, AARO',
    organization: 'Department of Defense',
    category: 'GOVERNMENT',
    stance: 'OFFICIAL POSITION',
    bio: 'Current director of the All-domain Anomaly Resolution Office. Testified before the Senate Armed Services Subcommittee in November 2024. Revealed the "Gremlin" sensor technology program and maintained AARO\\'s position that no evidence of extraterrestrial technology has been found.',
    keyActions: [
      'Testified before Senate Armed Services (Nov 2024)',
      'Revealed "Gremlin" UAP detection technology',
      'Maintained no ET evidence found to date',
      'Emphasized need for "honest and transparent conversations"',
      'Has NOT released required FY2025 annual report (OVERDUE)',
    ],
  },
  {
    id: '7',
    name: 'Michael Shellenberger',
    role: 'Independent Journalist',
    organization: 'Public / Substack',
    category: 'JOURNALIST',
    stance: 'PRO-DISCLOSURE',
    bio: 'Investigative journalist who testified before House Oversight in November 2024 about an alleged secret DoD UAP program called "Immaculate Constellation." Submitted an anonymous whistleblower report to Congress alleging evidence withholding.',
    keyActions: [
      'Testified before House Oversight (Nov 2024)',
      'Revealed "Immaculate Constellation" program allegation',
      'Submitted anonymous whistleblower report to Congress',
      'Ongoing investigative reporting on UAP secrecy',
    ],
  },
];

const categoryColors: Record<string, string> = {
  WHISTLEBLOWER: 'bg-critical-400/15 text-critical-400 border-critical-500/30',
  LEGISLATOR: 'bg-signal-400/15 text-signal-400 border-signal-500/30',
  GOVERNMENT: 'bg-alert-400/15 text-alert-400 border-alert-500/30',
  JOURNALIST: 'bg-purple-400/15 text-purple-400 border-purple-500/30',
  MILITARY: 'bg-verified-400/15 text-verified-400 border-verified-500/30',
  SCIENTIST: 'bg-blue-400/15 text-blue-400 border-blue-500/30',
};

const stanceColors: Record<string, string> = {
  'PRO-DISCLOSURE': 'text-verified-400',
  'OFFICIAL POSITION': 'text-alert-400',
  'SKEPTICAL': 'text-gray-400',
};

export default function KeyPlayersPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            Key Players
          </h1>
          <p className="text-sm text-gray-400">
            The legislators, whistleblowers, officials, and journalists driving UAP disclosure.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['ALL', 'WHISTLEBLOWER', 'LEGISLATOR', 'GOVERNMENT', 'JOURNALIST'].map((cat) => (
            <button
              key={cat}
              className={"px-3 py-1.5 rounded-md text-xs font-mono transition-all " +
                (cat === 'ALL'
                  ? 'bg-signal-500/20 text-signal-400 border border-signal-500/30'
                  : 'bg-void-700/50 text-gray-400 border border-void-600/30 hover:border-gray-500'
                )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {players.map((player, i) => (
            <div
              key={player.id}
              className="card p-6 animate-slide-up"
              style={{ animationDelay: i * 80 + "ms" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={"badge border " + (categoryColors[player.category] || 'badge-medium')}>
                      {player.category}
                    </span>
                    <span className={"text-xs font-mono " + (stanceColors[player.stance] || 'text-gray-400')}>
                      {player.stance}
                    </span>
                  </div>
                  <h2 className="font-display text-lg font-semibold text-white">{player.name}</h2>
                  <p className="text-sm text-gray-500">{player.role}</p>
                  <p className="text-xs text-gray-600">{player.organization}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-void-700 border border-void-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg text-gray-500">{player.name.charAt(0)}</span>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-4">{player.bio}</p>

              <div>
                <p className="text-xs font-mono text-signal-500/70 mb-2">KEY ACTIONS</p>
                <div className="space-y-1.5">
                  {player.keyActions.map((action, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="text-signal-500 mt-0.5 text-xs">{'\u25b8'}</span>
                      <span className="text-sm text-gray-300">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
`, "utf8");
console.log("Created: src/app/whistleblowers/page.tsx");

console.log("\nAll 3 pages created successfully!");
console.log("- /legislation -> Legislation Pipeline");
console.log("- /timeline -> Disclosure Timeline");
console.log("- /whistleblowers -> Key Players");
console.log("\nRefresh localhost:3000 and click the tabs!");
