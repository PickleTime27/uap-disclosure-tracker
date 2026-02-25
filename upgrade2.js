const fs = require('fs');

const timelinePage = `'use client';
import Navbar from '@/components/layout/Navbar';

const events = [
  { date: 'Feb 20, 2026', title: "Trump Directs Pentagon to Release UAP/UFO Files", description: 'President Trump announced directive to release government files on aliens, UAP, and UFOs.', category: 'Executive Action', importance: 'critical', url: 'https://www.nbcnews.com/politics/trump-administration/trump-says-directing-pentagon-release-files-related-ufos-aliens-rcna259833' },
  { date: 'Feb 14, 2026', title: "Obama Says Aliens Are Real on Podcast", description: 'Former President Obama stated aliens are real, later clarified he meant statistically likely.', category: 'Notable', importance: 'high', url: 'https://www.scientificamerican.com/article/trumps-order-to-release-evidence-for-aliens-obscures-the-scientific-search/' },
  { date: 'Sep 19, 2025', title: "House Hearing: Restoring Public Trust", description: 'Elizondo, Shellenberger, and Gallaudet testified. Criticized AARO conclusions.', category: 'Hearing', importance: 'high', url: 'https://oversight.house.gov/' },
  { date: 'Nov 14, 2024', title: 'AARO FY2024 Annual Report Released', description: '757 new cases. 21 merit further analysis. GREMLIN sensor deployed.', category: 'Document', importance: 'high', url: 'https://media.defense.gov/2024/Nov/14/2003583603/-1/-1/0/FY24-CONSOLIDATED-ANNUAL-REPORT-ON-UAP-508.PDF' },
  { date: '2024-2025', title: 'NARA Begins Receiving UAP Records (RG 615)', description: 'National Archives established Record Group 615 for UAP records from federal agencies.', category: 'Document', importance: 'high', url: 'https://www.archives.gov/research/topics/uaps/rg-615' },
  { date: 'Jul 26, 2023', title: 'Grusch Testimony Before House Oversight', description: 'David Grusch testified under oath about multi-decade UAP retrieval programs.', category: 'Whistleblower', importance: 'critical', url: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/' },
  { date: 'Jul 2023', title: 'Schumer-Rounds UAP Disclosure Act Introduced', description: 'Bipartisan bill to create JFK-style review board. Key provisions later stripped.', category: 'Legislation', importance: 'critical', url: 'https://www.congress.gov/bill/118th-congress/senate-bill/2226' },
  { date: 'Jun 2023', title: 'David Grusch Goes Public as Whistleblower', description: 'Former NGA/NRO officer alleged US government possesses non-human craft.', category: 'Whistleblower', importance: 'critical', url: 'https://thedebrief.org/intelligence-officials-say-u-s-has-retrieved-non-human-craft/' },
  { date: 'Apr 2020', title: 'Pentagon Officially Releases UAP Videos', description: 'FLIR1, Gimbal, GoFast videos officially declassified and released.', category: 'Document', importance: 'critical', url: 'https://www.war.gov/News/Releases/Release/Article/2165713/statement-by-the-department-of-defense-on-the-release-of-historical-navy-videos/' },
  { date: 'Dec 2017', title: 'New York Times UAP Bombshell', description: 'NYT revealed AATIP program and published Navy UAP videos. Launched modern disclosure era.', category: 'Media', importance: 'critical', url: 'https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html' },
];

const catColors = { 'Executive Action': 'bg-red-500', 'Hearing': 'bg-blue-500', 'Document': 'bg-emerald-500', 'Legislation': 'bg-purple-500', 'Whistleblower': 'bg-yellow-500', 'Notable': 'bg-orange-500', 'Media': 'bg-pink-500' };

export default function TimelinePage() {
  return (
    <><Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Disclosure Timeline</h1>
        <p className="text-sm text-gray-400">Key moments in UAP transparency. Click any event for source coverage.</p>
      </div>
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.entries(catColors).map(([cat, color]) => <div key={cat} className="flex items-center gap-1.5"><span className={"w-2.5 h-2.5 rounded-full " + color} /><span className="text-xs text-gray-500">{cat}</span></div>)}
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800" />
        <div className="space-y-4">
          {events.map((e, i) => (
            <a key={i} href={e.url} target="_blank" rel="noopener noreferrer" className="block relative pl-12 group">
              <div className={"absolute left-2.5 top-5 w-3.5 h-3.5 rounded-full border-2 border-gray-900 " + (catColors[e.category] || 'bg-gray-500')} />
              <div className={"card p-4 hover:border-cyan-500/40 transition-all cursor-pointer border-l-2 " + (e.importance === 'critical' ? 'border-l-red-500' : e.importance === 'high' ? 'border-l-orange-500' : 'border-l-yellow-500')}>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-500">{e.date}</span>
                  <span className="text-xs font-mono text-gray-600">&middot;</span>
                  <span className={"text-xs font-mono " + (e.importance === 'critical' ? 'text-red-400' : 'text-orange-400')}>{e.importance.toUpperCase()}</span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{e.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{e.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main></>
  );
}`;

const keyPlayersPage = `'use client';
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
}`;

fs.writeFileSync('src/app/timeline/page.tsx', timelinePage, 'utf8');
console.log('Timeline page upgraded');
fs.writeFileSync('src/app/whistleblowers/page.tsx', keyPlayersPage, 'utf8');
console.log('Key Players page upgraded');