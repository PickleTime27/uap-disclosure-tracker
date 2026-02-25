const fs = require('fs');

const homePage = `'use client';
import Navbar from '@/components/layout/Navbar';
import HeroBackground from '@/components/HeroBackground';

const recentEvents = [
  { title: "Trump announces UAP/UFO file declassification directive", date: "Feb 20, 2026", source: "EXECUTIVE", url: "https://www.nbcnews.com/politics/trump-administration/trump-says-directing-pentagon-release-files-related-ufos-aliens-rcna259833" },
  { title: "Hegseth confirms Pentagon working on UFO file release", date: "Feb 24, 2026", source: "DOD", url: "https://time.com/7380751/us-government-ufo-alien-files-release-hegseth-update/" },
  { title: "Obama states aliens are real on podcast, later clarifies", date: "Feb 14, 2026", source: "NOTABLE", url: "https://www.scientificamerican.com/article/trumps-order-to-release-evidence-for-aliens-obscures-the-scientific-search/" },
  { title: "AARO FY2024 Report: 757 new cases, 21 truly anomalous", date: "Nov 14, 2024", source: "AARO", url: "https://media.defense.gov/2024/Nov/14/2003583603/-1/-1/0/FY24-CONSOLIDATED-ANNUAL-REPORT-ON-UAP-508.PDF" },
  { title: "NARA begins accepting UAP records from federal agencies", date: "2024-2025", source: "NARA", url: "https://www.archives.gov/research/topics/uaps/rg-615" },
];

const alerts = [
  { level: 'CRITICAL', date: 'Feb 20, 2026', title: "Trump directs Pentagon to release UAP/UFO files", description: "President directed SecDef to begin identifying and releasing government files on aliens, UAP, and UFOs.", url: "https://thehill.com/homenews/administration/5746879/trump-to-release-ufo-files/" },
  { level: 'HIGH', date: 'Feb 24, 2026', title: "Hegseth: We have got our people working on it", description: "Defense Secretary confirms Pentagon actively working on Trump directive.", url: "https://time.com/7380751/us-government-ufo-alien-files-release-hegseth-update/" },
  { level: 'MEDIUM', date: '2024-2025', title: "NARA UAP record transfers - deadline Sept 2025", description: "Agencies must transfer publicly releasable UAP records to National Archives by September 30, 2025.", url: "https://www.archives.gov/records-mgmt/uap-guidance" },
];

export default function Home() {
  return (
    <><Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="relative rounded-xl overflow-hidden mb-8 border border-gray-800/50" style={{ minHeight: '260px' }}>
        <HeroBackground />
        <div className="relative z-10 p-6 md:p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            BREAKING: Trump directs Pentagon to release UAP/UFO files
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">UAP Disclosure Tracker</h1>
          <p className="text-gray-400 text-sm max-w-2xl">Real-time monitoring of the UAP disclosure pipeline: congressional hearings, declassified documents, legislation, and key players.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="card p-4"><div className="text-xs text-gray-500 mb-1">Congressional Hearings</div><div className="text-2xl font-bold text-white">12</div></div>
        <div className="card p-4"><div className="text-xs text-gray-500 mb-1">Declassified Documents</div><div className="text-2xl font-bold text-white">621+</div></div>
        <div className="card p-4"><div className="text-xs text-gray-500 mb-1">Active Legislation</div><div className="text-2xl font-bold text-white">4</div></div>
        <div className="card p-4"><div className="text-xs text-gray-500 mb-1">AARO Unresolved</div><div className="text-2xl font-bold text-red-400">0 / 3</div></div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full" />Recent Disclosure Events</h2>
          <div className="space-y-2">
            {recentEvents.map((e, i) => (
              <a key={i} href={e.url} target="_blank" rel="noopener noreferrer" className="block card p-4 hover:border-cyan-500/40 transition-all cursor-pointer group">
                <h3 className="text-sm text-white font-medium group-hover:text-cyan-400 transition-colors">{e.title}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs font-mono text-gray-500">{e.date}</span>
                  <span className="text-xs font-mono text-cyan-600">{e.source}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2"><span className="w-1 h-5 bg-red-500 rounded-full" />Active Alerts</h2>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="block card p-4 hover:border-red-500/40 transition-all cursor-pointer group">
                <div className="flex items-center gap-2 mb-2">
                  <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + (a.level === 'CRITICAL' ? 'bg-red-500/15 text-red-400 border-red-500/30' : a.level === 'HIGH' ? 'bg-orange-500/15 text-orange-400 border-orange-500/30' : 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30')}>{a.level}</span>
                  <span className="text-xs font-mono text-gray-500">{a.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">{a.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{a.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 card p-5">
        <h2 className="font-display text-sm font-semibold text-white mb-3">Data Sources</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[{name:'AARO',url:'https://www.aaro.mil/',desc:'Pentagon UAP Office'},{name:'NARA',url:'https://www.archives.gov/research/topics/uaps',desc:'National Archives'},{name:'Congress.gov',url:'https://www.congress.gov/search?q=UAP',desc:'Legislation'},{name:'ODNI',url:'https://www.dni.gov/index.php/newsroom/reports-publications/reports-publications-2024/4020-uap-2024',desc:'Intel Reports'}].map((s,i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-gray-800/30 p-3 border border-gray-700/30 hover:border-emerald-500/30 transition-all">
              <div className="text-sm font-mono text-emerald-400">{s.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </main></>
  );
}`;

const legPage = `'use client';
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
}`;

fs.writeFileSync('src/app/page.tsx', homePage, 'utf8');
console.log('Dashboard upgraded');
fs.writeFileSync('src/app/legislation/page.tsx', legPage, 'utf8');
console.log('Legislation page upgraded');
console.log('ALL 6 PAGES DONE! Now run:');
console.log('git add . && git commit -m "Add real links" && git push');