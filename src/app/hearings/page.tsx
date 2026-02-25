'use client';
import Navbar from '@/components/layout/Navbar';

const hearings = [
  { id: '1', title: 'Restoring Public Trust: Investigating Pentagon UFO Programs', date: 'Sep 19, 2025', chamber: 'HOUSE', status: 'COMPLETED', witnesses: ['Luis Elizondo', 'Michael Shellenberger', 'Tim Gallaudet'], takeaways: ['UAP witnesses criticized AARO for predetermined conclusions', 'Calls for independent investigation outside DOD'], url: 'https://oversight.house.gov/' },
  { id: '2', title: 'AARO Director Jon Kosloski Testimony', date: 'Nov 14, 2024', chamber: 'SENATE', status: 'COMPLETED', witnesses: ['Jon Kosloski (AARO Director)'], takeaways: ['1,600+ total UAP reports received', 'GREMLIN sensor prototype deployed', '21 cases merit further analysis'], url: 'https://defensescoop.com/2024/11/14/uap-aaro-chief-unveils-pentagon-annual-caseload-analysis-new-efforts/' },
  { id: '3', title: 'Immaculate Constellation & UAP Transparency', date: 'Nov 13, 2024', chamber: 'HOUSE', status: 'COMPLETED', witnesses: ['Luis Elizondo', 'Michael Shellenberger', 'Tim Gallaudet'], takeaways: ['Discussion of alleged Immaculate Constellation UAP program', 'Whistleblower protections debated'], url: 'https://oversight.house.gov/' },
  { id: '4', title: 'UAP Hearing: David Grusch Testimony', date: 'Jul 26, 2023', chamber: 'HOUSE', status: 'COMPLETED', witnesses: ['David Grusch', 'Ryan Graves', 'David Fravor'], takeaways: ['Grusch testified about multi-decade UAP retrieval programs', 'Claimed US has non-human biologics', 'Fravor detailed 2004 Nimitz Tic-Tac encounter'], url: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/' },
];

export default function HearingsPage() {
  return (
    <><Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Congressional Hearings</h1>
        <p className="text-sm text-gray-400">Track UAP-related congressional hearings and testimony. Click for source coverage.</p>
      </div>
      <div className="space-y-4">
        {hearings.map(h => (
          <a key={h.id} href={h.url} target="_blank" rel="noopener noreferrer" className="block card p-6 hover:border-cyan-500/40 transition-all cursor-pointer group">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">{h.status}</span>
              <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + (h.chamber === 'HOUSE' ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-purple-500/15 text-purple-400 border-purple-500/30')}>{h.chamber}</span>
              <span className="text-xs font-mono text-gray-500">{h.date}</span>
            </div>
            <h2 className="font-display text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">{h.title}</h2>
            <div className="mb-3"><span className="text-xs font-mono text-gray-500">WITNESSES: </span>{h.witnesses.map((w, i) => <span key={i} className="text-xs text-cyan-400">{w}{i < h.witnesses.length - 1 ? ', ' : ''}</span>)}</div>
            <div className="space-y-1">{h.takeaways.map((t, i) => <div key={i} className="flex items-start gap-2"><span className="text-cyan-500 mt-0.5 text-xs">&#9654;</span><span className="text-sm text-gray-400">{t}</span></div>)}</div>
          </a>
        ))}
      </div>
    </main></>
  );
}