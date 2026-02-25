'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';

const docs = [
  { id: '1', title: "Trump's UAP/UFO File Release Directive", source: 'EXECUTIVE', agency: 'White House', date: 'Feb 20, 2026', classification: 'PUBLIC', summary: 'President Trump directed the Secretary of Defense and other agencies to begin identifying and releasing government files related to aliens, UAP, and UFOs.', url: 'https://www.nbcnews.com/politics/trump-administration/trump-says-directing-pentagon-release-files-related-ufos-aliens-rcna259833' },
  { id: '2', title: 'AARO FY2024 Consolidated Annual Report', source: 'AARO', agency: 'Department of Defense', date: 'Nov 14, 2024', classification: 'UNCLASSIFIED', summary: '757 new UAP cases reported. 118 resolved. 21 cases merit further analysis. GREMLIN sensor deployed.', url: 'https://media.defense.gov/2024/Nov/14/2003583603/-1/-1/0/FY24-CONSOLIDATED-ANNUAL-REPORT-ON-UAP-508.PDF' },
  { id: '3', title: 'NARA UAP Records Collection (RG 615)', source: 'NARA', agency: 'National Archives', date: '2024-2025', classification: 'UNCLASSIFIED', summary: 'UAP records transferred from FAA, ODNI, State Dept, and NRC under the 2024 NDAA mandate.', url: 'https://www.archives.gov/research/topics/uaps/rg-615' },
  { id: '4', title: 'NSA Declassified UAP Records', source: 'NSA', agency: 'National Security Agency', date: '2024-2025', classification: 'FORMERLY CLASSIFIED', summary: '38 records previously released through FOIA, including articles and reports of UAP sightings.', url: 'https://www.nsa.gov/Helpful-Links/NSA-FOIA/Declassification-Transparency-Initiatives/UFO/' },
  { id: '5', title: 'AARO Historical Review Volume 1', source: 'AARO', agency: 'Department of Defense', date: 'Mar 2024', classification: 'UNCLASSIFIED', summary: 'Review of US government involvement with UAP from 1945 to present.', url: 'https://www.aaro.mil/UAP-Records/' },
  { id: '6', title: 'Pentagon Declassified UAP Videos (FLIR1, Gimbal, GoFast)', source: 'DOD', agency: 'Department of Defense', date: 'Apr 2020', classification: 'DECLASSIFIED', summary: 'Three Navy pilot UAP videos officially released. Originally filmed 2004 and 2015.', url: 'https://www.war.gov/News/Releases/Release/Article/2165713/statement-by-the-department-of-defense-on-the-release-of-historical-navy-videos/' },
];

const sourceColors: Record<string, string> = {
  EXECUTIVE: 'bg-red-500/15 text-red-400 border-red-500/30',
  AARO: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  NARA: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  NSA: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  DOD: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
};

const sources = ['ALL', 'NARA', 'AARO', 'DOD', 'NSA', 'EXECUTIVE'];

export default function DocumentsPage() {
  const [filter, setFilter] = useState('ALL');
  const filtered = filter === 'ALL' ? docs : docs.filter(d => d.source === filter);

  return (
    <><Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Document Library</h1>
        <p className="text-sm text-gray-400">Declassified documents, FOIA releases, AARO reports, and NARA transfers.</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {sources.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={"px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer " + (filter === s ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:border-gray-500')}>
            {s}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(d => (
          <a key={d.id} href={d.url} target="_blank" rel="noopener noreferrer" className="block card p-5 hover:border-cyan-500/40 transition-all cursor-pointer group">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + (sourceColors[d.source] || '')}>{d.source}</span>
              <span className="text-xs font-mono text-gray-500">{d.agency}</span>
              <span className="text-xs font-mono text-gray-500">{d.date}</span>
              <span className="text-xs font-mono text-gray-500">{d.classification}</span>
            </div>
            <h2 className="font-display text-base font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">{d.title}</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{d.summary}</p>
          </a>
        ))}
      </div>
    </main></>
  );
}
// fix
