'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';

const players = [
  { id: '1', name: 'David Grusch', role: 'Intelligence Officer & Whistleblower', org: 'Former NGA/NRO', category: 'Whistleblower', bio: 'Testified under oath about multi-decade UAP retrieval programs.', actions: ['Testified before House Oversight (Jul 2023)', 'Filed whistleblower complaint with ICIG'], url: 'https://thedebrief.org/intelligence-officials-say-u-s-has-retrieved-non-human-craft/' },
  { id: '2', name: 'Luis Elizondo', role: 'Former AATIP Director', org: 'Former DOD', category: 'Whistleblower', bio: 'Former director of Pentagon AATIP program. Author and congressional witness.', actions: ['Ran Pentagon AATIP (2007-2017)', 'Multiple congressional testimonies'], url: 'https://en.wikipedia.org/wiki/Luis_Elizondo' },
  { id: '3', name: 'Sen. Chuck Schumer', role: 'Senate Minority Leader', org: 'U.S. Senate (D-NY)', category: 'Legislator', bio: 'Lead sponsor of UAP Disclosure Act. Pushing for JFK-style review board.', actions: ['Introduced UAP Disclosure Act', 'Urged Trump on UFO transparency'], url: 'https://www.foxnews.com/politics/trump-schumer-find-rare-common-ground-releasing-ufo-files' },
  { id: '4', name: 'Rep. Anna Paulina Luna', role: 'Representative', org: 'U.S. House (R-FL)', category: 'Legislator', bio: 'Leading House Republican on UAP issues. Released whistleblower video.', actions: ['Released UAP whistleblower video', 'Organized House UAP hearings'], url: 'https://luna.house.gov/' },
  { id: '5', name: 'Jon Kosloski', role: 'AARO Director', org: 'Department of Defense', category: 'Government', bio: 'Current AARO director overseeing UAP investigations and GREMLIN sensor.', actions: ['Testified to Congress on AARO findings', 'Deployed GREMLIN sensor prototype'], url: 'https://defensescoop.com/2024/11/14/uap-aaro-chief-unveils-pentagon-annual-caseload-analysis-new-efforts/' },
  { id: '6', name: 'Ryan Graves', role: 'Former Navy Pilot', org: 'Americans for Safe Aerospace', category: 'Whistleblower', bio: 'Former Navy F/A-18F pilot who reported regular UAP encounters.', actions: ['Testified before House Oversight', 'Founded Americans for Safe Aerospace'], url: 'https://www.safeaerospace.org/' },
  { id: '7', name: 'Christopher Mellon', role: 'Former Deputy ASDP(I)', org: 'Disclosure Foundation', category: 'Government', bio: 'Former deputy assistant secretary of defense. Chairs Disclosure Foundation.', actions: ['Provided Navy UAP videos to media', 'Criticized AARO statutory failures'], url: 'https://defensescoop.com/2026/02/20/trump-ufo-uap-government-files-disclosure/' },
];

const catColors = { Whistleblower: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30', Legislator: 'bg-blue-500/15 text-blue-400 border-blue-500/30', Government: 'bg-purple-500/15 text-purple-400 border-purple-500/30' };
const categories = ['ALL', 'Whistleblower', 'Legislator', 'Government'];

export default function KeyPlayersPage() {
  const [filter, setFilter] = useState('ALL');
  const filtered = filter === 'ALL' ? players : players.filter(p => p.category === filter);

  return (
    <><Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Key Players</h1>
        <p className="text-sm text-gray-400">Legislators, whistleblowers, and officials driving UAP disclosure.</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(c => <button key={c} onClick={() => setFilter(c)} className={"px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer " + (filter === c ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:border-gray-500')}>{c}</button>)}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="block card p-5 hover:border-cyan-500/40 transition-all cursor-pointer group">
            <div className="flex items-center gap-2 mb-3">
              <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + (catColors[p.category] || '')}>{p.category}</span>
            </div>
            <h2 className="font-display text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{p.name}</h2>
            <p className="text-xs text-gray-500">{p.role} — {p.org}</p>
            <p className="text-sm text-gray-400 mt-2 mb-3">{p.bio}</p>
            <div className="space-y-1">{p.actions.map((a, i) => <div key={i} className="flex items-start gap-2"><span className="text-cyan-500 mt-0.5 text-xs">&#9654;</span><span className="text-xs text-gray-500">{a}</span></div>)}</div>
          </a>
        ))}
      </div>
    </main></>
  );
}