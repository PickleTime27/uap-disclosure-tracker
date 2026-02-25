'use client';
import Navbar from '@/components/layout/Navbar';

const bills = [
  { id: '1', title: 'UAP Disclosure Act of 2023 (Schumer-Rounds)', sponsor: 'Sen. Chuck Schumer (D-NY)', status: 'STRIPPED / GUTTED', statusColor: 'bg-red-500/15 text-red-400 border-red-500/30', provisions: ['Would have created JFK-style review board', 'Presumption of disclosure for UAP records', 'Key provisions stripped under lobbying'], url: 'https://www.congress.gov/bill/118th-congress/senate-bill/2226' },
  { id: '2', title: 'FY2024 NDAA (Public Law 118-31)', sponsor: 'Multiple', status: 'SIGNED INTO LAW', statusColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', provisions: ['Established NARA UAP Records Collection (RG 615)', 'Required agencies to transfer UAP records', 'Whistleblower protections'], url: 'https://www.congress.gov/bill/118th-congress/house-bill/2670' },
  { id: '3', title: 'FY2025 NDAA', sponsor: 'Multiple', status: 'SIGNED INTO LAW', statusColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', provisions: ['Continued AARO authorization', 'Additional reporting requirements', 'Senate oversight strengthened'], url: 'https://www.congress.gov/bill/118th-congress/house-bill/8070' },
  { id: '4', title: 'UAP Declassification Task Force (Proposed)', sponsor: 'Rep. Anna Paulina Luna (R-FL)', status: 'ACTIVE', statusColor: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30', provisions: ['Dedicated task force for UAP declassification', 'Bipartisan House support', 'Builds on Trump disclosure directive'], url: 'https://oversight.house.gov/' },
];

export default function LegislationPage() {
  return (
    <><Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Legislation Tracker</h1>
        <p className="text-sm text-gray-400">Bills and laws shaping UAP disclosure. Click for full text on Congress.gov.</p>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="card p-4 text-center"><div className="text-2xl font-bold text-emerald-400">2</div><div className="text-xs text-gray-500 mt-1">Signed Into Law</div></div>
        <div className="card p-4 text-center"><div className="text-2xl font-bold text-yellow-400">1</div><div className="text-xs text-gray-500 mt-1">Active</div></div>
        <div className="card p-4 text-center"><div className="text-2xl font-bold text-red-400">1</div><div className="text-xs text-gray-500 mt-1">Stripped</div></div>
      </div>
      <div className="space-y-4">
        {bills.map(b => (
          <a key={b.id} href={b.url} target="_blank" rel="noopener noreferrer" className="block card p-6 hover:border-cyan-500/40 transition-all cursor-pointer group">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + b.statusColor}>{b.status}</span>
            </div>
            <h2 className="font-display text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">{b.title}</h2>
            <p className="text-xs text-gray-500 mb-3">Sponsor: {b.sponsor}</p>
            <div className="space-y-1">{b.provisions.map((p, i) => <div key={i} className="flex items-start gap-2"><span className="text-cyan-500 mt-0.5 text-xs">&#9654;</span><span className="text-sm text-gray-400">{p}</span></div>)}</div>
          </a>
        ))}
      </div>
    </main></>
  );
}