// src/app/legislation/page.tsx
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
    title: 'FY2024 NDAA — UAP Provisions (as enacted)',
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
    title: 'FY2025 NDAA — UAP Provisions',
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
