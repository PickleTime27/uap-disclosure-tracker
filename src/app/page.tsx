import Navbar from '@/components/layout/Navbar';
import HeroBackground from '@/components/HeroBackground';
import VideoBackground from '@/components/VideoBackground';
import { prisma } from '@/lib/db';

const colorCycle = [
  'from-blue-600 to-blue-800',
  'from-red-600 to-red-800',
  'from-gray-700 to-gray-900',
  'from-cyan-700 to-cyan-900',
  'from-emerald-700 to-emerald-900',
];

const alertColorMap: Record<string, string> = {
  CRITICAL: 'from-red-700 to-red-900',
  HIGH: 'from-red-600 to-red-800',
  MEDIUM: 'from-emerald-700 to-emerald-900',
  LOW: 'from-gray-700 to-gray-900',
};

const alertBadgeColor: Record<string, string> = {
  CRITICAL: 'bg-red-500/15 text-red-400 border-red-500/30',
  HIGH: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  MEDIUM: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  LOW: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

export default async function Home() {
  const [recentEvents, alerts, hearingCount, docCount, legislationCount] = await Promise.all([
    prisma.timelineEvent.findMany({
      orderBy: { date: 'desc' },
      take: 5,
    }),
    prisma.alert.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.hearing.count(),
    prisma.document.count(),
    prisma.legislation.count({ where: { status: { in: ['INTRODUCED', 'IN_COMMITTEE', 'PASSED_HOUSE', 'PASSED_SENATE'] } } }),
  ]);

  const latestAlert = alerts[0];

  return (
    <><VideoBackground videoId="bTGRK9a-oHQ" />
    <div className="relative" style={{ zIndex: 10 }}>
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="relative rounded-xl overflow-hidden mb-8 border border-gray-800/50" style={{ minHeight: '400px' }}>
        <HeroBackground />
        <div className="relative z-10 p-6 md:p-8">
          {latestAlert && latestAlert.importance === 'CRITICAL' && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 text-xs font-mono mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              BREAKING: {latestAlert.title}
            </div>
          )}
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">UAP Disclosure Tracker</h1>
          <p className="text-gray-400 text-sm max-w-2xl">Real-time monitoring of the UAP disclosure pipeline: congressional hearings, declassified documents, legislation, and key players.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="card p-4"><div className="text-xs text-gray-500 mb-1">Congressional Hearings</div><div className="text-2xl font-bold text-white">{hearingCount}</div></div>
        <div className="card p-4"><div className="text-xs text-gray-500 mb-1">Declassified Documents</div><div className="text-2xl font-bold text-white">{docCount}+</div></div>
        <div className="card p-4"><div className="text-xs text-gray-500 mb-1">Active Legislation</div><div className="text-2xl font-bold text-white">{legislationCount}</div></div>
        <div className="card p-4"><div className="text-xs text-gray-500 mb-1">Recent Alerts</div><div className="text-2xl font-bold text-red-400">{alerts.length}</div></div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full" />Recent Disclosure Events</h2>
          <div className="space-y-3">
            {recentEvents.map((e, i) => (
              <a key={e.id} href={e.sourceUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex card overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer group">
                <div className={"w-24 flex-shrink-0 flex items-center justify-center bg-gradient-to-br " + colorCycle[i % colorCycle.length]}>
                  <span className="text-white font-bold text-xs font-mono text-center px-2 leading-tight">{e.category.replace(/_/g, ' ')}</span>
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <h3 className="text-sm text-white font-medium group-hover:text-cyan-400 transition-colors">{e.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs font-mono text-gray-500">{e.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2"><span className="w-1 h-5 bg-red-500 rounded-full" />Active Alerts</h2>
          <div className="space-y-3">
            {alerts.map((a) => (
              <a key={a.id} href={a.sourceUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex card overflow-hidden hover:border-red-500/40 transition-all cursor-pointer group">
                <div className={"w-24 flex-shrink-0 flex items-center justify-center bg-gradient-to-br " + (alertColorMap[a.importance] || 'from-gray-700 to-gray-900')}>
                  <span className="text-white font-bold text-xs font-mono text-center px-2 leading-tight">{a.category.replace(/_/g, ' ')}</span>
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + (alertBadgeColor[a.importance] || '')}>{a.importance}</span>
                    <span className="text-xs font-mono text-gray-500">{a.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">{a.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{a.body}</p>
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
    </main>
    </div></>
  );
}
