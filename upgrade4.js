const fs = require('fs');

const homePage = `'use client';
import Navbar from '@/components/layout/Navbar';
import HeroBackground from '@/components/HeroBackground';

const recentEvents = [
  { title: "Trump announces UAP/UFO file declassification directive", date: "Feb 20, 2026", source: "NBC News", url: "https://www.nbcnews.com/politics/trump-administration/trump-says-directing-pentagon-release-files-related-ufos-aliens-rcna259833", img: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2025-02/250220-trump-ufo-ch-1052-cf0444.jpg" },
  { title: "Hegseth confirms Pentagon working on UFO file release", date: "Feb 24, 2026", source: "TIME", url: "https://time.com/7380751/us-government-ufo-alien-files-release-hegseth-update/", img: "https://api.time.com/wp-content/uploads/2025/02/hegseth-ufo.jpg" },
  { title: "Obama states aliens are real on podcast, later clarifies", date: "Feb 14, 2026", source: "Scientific American", url: "https://www.scientificamerican.com/article/trumps-order-to-release-evidence-for-aliens-obscures-the-scientific-search/", img: "https://static.scientificamerican.com/dam/m/5e3e3bd08a1f8bff/original/GettyImages-515765702_WEB.jpg" },
  { title: "AARO FY2024 Report: 757 new cases, 21 truly anomalous", date: "Nov 14, 2024", source: "Defense.gov", url: "https://media.defense.gov/2024/Nov/14/2003583603/-1/-1/0/FY24-CONSOLIDATED-ANNUAL-REPORT-ON-UAP-508.PDF", img: "" },
  { title: "NARA begins accepting UAP records from federal agencies", date: "2024-2025", source: "National Archives", url: "https://www.archives.gov/research/topics/uaps/rg-615", img: "" },
];

const alerts = [
  { level: 'CRITICAL', date: 'Feb 20, 2026', title: "Trump directs Pentagon to release UAP/UFO files", description: "President directed SecDef to begin identifying and releasing government files on aliens, UAP, and UFOs.", url: "https://thehill.com/homenews/administration/5746879/trump-to-release-ufo-files/", img: "https://thehill.com/wp-content/uploads/sites/2/2025/02/AP25051681498498-e1740099071498.jpg" },
  { level: 'HIGH', date: 'Feb 24, 2026', title: "Hegseth: We have got our people working on it", description: "Defense Secretary confirms Pentagon actively working on Trump directive.", url: "https://time.com/7380751/us-government-ufo-alien-files-release-hegseth-update/", img: "https://api.time.com/wp-content/uploads/2025/02/hegseth-ufo.jpg" },
  { level: 'MEDIUM', date: '2024-2025', title: "NARA UAP record transfers - deadline Sept 2025", description: "Agencies must transfer publicly releasable UAP records to National Archives by September 30, 2025.", url: "https://www.archives.gov/records-mgmt/uap-guidance", img: "" },
];

function FallbackIcon({ category }: { category: string }) {
  const icons: Record<string, string> = {
    EXECUTIVE: '\\u{1F3DB}',
    DOD: '\\u{1F6E1}',
    AARO: '\\u{1F6F8}',
    NARA: '\\u{1F4DC}',
    NOTABLE: '\\u{2B50}',
    DEFAULT: '\\u{1F4E1}',
  };
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-800/80 text-3xl">
      {icons[category] || icons.DEFAULT}
    </div>
  );
}

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
          <div className="space-y-3">
            {recentEvents.map((e, i) => (
              <a key={i} href={e.url} target="_blank" rel="noopener noreferrer" className="flex card overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer group">
                <div className="w-28 h-24 flex-shrink-0 relative overflow-hidden bg-gray-800">
                  {e.img ? (
                    <img src={e.img} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" onError={(ev) => { (ev.target as HTMLImageElement).style.display = 'none'; (ev.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }} />
                  ) : null}
                  <div className={e.img ? 'hidden' : '' + ' absolute inset-0'}><FallbackIcon category={e.source === 'NBC News' ? 'EXECUTIVE' : e.source === 'Defense.gov' ? 'AARO' : e.source === 'National Archives' ? 'NARA' : 'DEFAULT'} /></div>
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <h3 className="text-sm text-white font-medium group-hover:text-cyan-400 transition-colors line-clamp-2">{e.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs font-mono text-gray-500">{e.date}</span>
                    <span className="text-xs font-mono text-cyan-600">{e.source}</span>
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
                <div className="w-28 h-28 flex-shrink-0 relative overflow-hidden bg-gray-800">
                  {a.img ? (
                    <img src={a.img} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" onError={(ev) => { (ev.target as HTMLImageElement).style.display = 'none'; (ev.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }} />
                  ) : null}
                  <div className={a.img ? 'hidden' : '' + ' absolute inset-0'}><FallbackIcon category={a.level === 'CRITICAL' ? 'EXECUTIVE' : a.level === 'HIGH' ? 'DOD' : 'NARA'} /></div>
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + (a.level === 'CRITICAL' ? 'bg-red-500/15 text-red-400 border-red-500/30' : a.level === 'HIGH' ? 'bg-orange-500/15 text-orange-400 border-orange-500/30' : 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30')}>{a.level}</span>
                    <span className="text-xs font-mono text-gray-500">{a.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-2">{a.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{a.description}</p>
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
}`;

fs.writeFileSync('src/app/page.tsx', homePage, 'utf8');
console.log('Dashboard upgraded with image cards!');
console.log('Images will show article thumbnails with emoji fallbacks');