'use client';
import Navbar from '@/components/layout/Navbar';
import HeroBackground from '@/components/HeroBackground';

const recentEvents = [
  { title: "Trump announces UAP/UFO file declassification directive", date: "Feb 20, 2026", source: "NBC News", url: "https://www.nbcnews.com/politics/trump-administration/trump-says-directing-pentagon-release-files-related-ufos-aliens-rcna259833", color: 'from-blue-600 to-blue-800' },
  { title: "Hegseth confirms Pentagon working on UFO file release", date: "Feb 24, 2026", source: "TIME", url: "https://time.com/7380751/us-government-ufo-alien-files-release-hegseth-update/", color: 'from-red-600 to-red-800' },
  { title: "Obama states aliens are real on podcast, later clarifies", date: "Feb 14, 2026", source: "Sci American", url: "https://www.scientificamerican.com/article/trumps-order-to-release-evidence-for-aliens-obscures-the-scientific-search/", color: 'from-gray-700 to-gray-900' },
  { title: "AARO FY2024 Report: 757 new cases, 21 truly anomalous", date: "Nov 14, 2024", source: "DOD / AARO", url: "https://media.defense.gov/2024/Nov/14/2003583603/-1/-1/0/FY24-CONSOLIDATED-ANNUAL-REPORT-ON-UAP-508.PDF", color: 'from-cyan-700 to-cyan-900' },
  { title: "NARA begins accepting UAP records from federal agencies", date: "2024-2025", source: "NARA", url: "https://www.archives.gov/research/topics/uaps/rg-615", color: 'from-emerald-700 to-emerald-900' },
];

const alerts = [
  { level: 'CRITICAL', date: 'Feb 20, 2026', title: "Trump directs Pentagon to release UAP/UFO files", description: "President directed SecDef to begin identifying and releasing government files on aliens, UAP, and UFOs.", url: "https://thehill.com/homenews/administration/5746879/trump-to-release-ufo-files/", source: "The Hill", color: 'from-red-700 to-red-900' },
  { level: 'HIGH', date: 'Feb 24, 2026', title: "Hegseth: We have got our people working on it", description: "Defense Secretary confirms Pentagon actively working on Trump directive.", url: "https://time.com/7380751/us-government-ufo-alien-files-release-hegseth-update/", source: "TIME", color: 'from-red-600 to-red-800' },
  { level: 'MEDIUM', date: '2024-2025', title: "NARA UAP record transfers - deadline Sept 2025", description: "Agencies must transfer publicly releasable UAP records to National Archives by September 30, 2025.", url: "https://www.archives.gov/records-mgmt/uap-guidance", source: "NARA", color: 'from-emerald-700 to-emerald-900' },
];

export default function Home() {
  return (
    <><Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="relative rounded-xl overflow-hidden mb-8 border border-gray-800/50" style={{ minHeight: '400px' }}>
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
          <div className="space-y-3">
            {recentEvents.map((e, i) => (
              <a key={i} href={e.url} target="_blank" rel="noopener noreferrer" className="flex card overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer group">
                <div className={"w-24 flex-shrink-0 flex items-center justify-center bg-gradient-to-br " + e.color}>
                  <span className="text-white font-bold text-xs font-mono text-center px-2 leading-tight">{e.source}</span>
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <h3 className="text-sm text-white font-medium group-hover:text-cyan-400 transition-colors">{e.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs font-mono text-gray-500">{e.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2"><span className="w-1 h-5 bg-red-500 rounded-full" />Active Alerts</h2>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="flex card overflow-hidden hover:border-red-500/40 transition-all cursor-pointer group">
                <div className={"w-24 flex-shrink-0 flex items-center justify-center bg-gradient-to-br " + a.color}>
                  <span className="text-white font-bold text-xs font-mono text-center px-2 leading-tight">{a.source}</span>
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + (a.level === 'CRITICAL' ? 'bg-red-500/15 text-red-400 border-red-500/30' : a.level === 'HIGH' ? 'bg-orange-500/15 text-orange-400 border-orange-500/30' : 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30')}>{a.level}</span>
                    <span className="text-xs font-mono text-gray-500">{a.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">{a.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{a.description}</p>
                </div>
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
}