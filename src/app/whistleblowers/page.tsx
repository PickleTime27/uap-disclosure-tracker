// src/app/whistleblowers/page.tsx
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
    bio: 'Chairs the House Task Force on Declassification of Federal Secrets. Has been vocal about UAP transparency and praised Trump\'s declassification directive. Led the September 2025 hearing on UAP transparency and whistleblower protection.',
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
    bio: 'Current director of the All-domain Anomaly Resolution Office. Testified before the Senate Armed Services Subcommittee in November 2024. Revealed the "Gremlin" sensor technology program and maintained AARO\'s position that no evidence of extraterrestrial technology has been found.',
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
                      <span className="text-signal-500 mt-0.5 text-xs">{'▸'}</span>
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
