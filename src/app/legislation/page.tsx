import Navbar from '@/components/layout/Navbar';
import VideoBackground from '@/components/VideoBackground';
import { prisma } from '@/lib/db';

const statusColorMap: Record<string, string> = {
  INTRODUCED: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  IN_COMMITTEE: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  PASSED_HOUSE: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  PASSED_SENATE: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  PASSED_BOTH: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  SIGNED_INTO_LAW: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  VETOED: 'bg-red-500/15 text-red-400 border-red-500/30',
  DEAD: 'bg-red-500/15 text-red-400 border-red-500/30',
};

export default async function LegislationPage() {
  const [bills, signedCount, activeCount, deadCount] = await Promise.all([
    prisma.legislation.findMany({ orderBy: { dateIntroduced: 'desc' } }),
    prisma.legislation.count({ where: { status: 'SIGNED_INTO_LAW' } }),
    prisma.legislation.count({ where: { status: { in: ['INTRODUCED', 'IN_COMMITTEE', 'PASSED_HOUSE', 'PASSED_SENATE'] } } }),
    prisma.legislation.count({ where: { status: { in: ['DEAD', 'VETOED'] } } }),
  ]);

  return (
    <><VideoBackground videoId="SpeSpA3e56A" />
    <div className="relative" style={{ zIndex: 10 }}>
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Legislation Tracker</h1>
        <p className="text-sm text-gray-400">Bills and laws shaping UAP disclosure. Click for full text on Congress.gov.</p>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="card p-4 text-center"><div className="text-2xl font-bold text-emerald-400">{signedCount}</div><div className="text-xs text-gray-500 mt-1">Signed Into Law</div></div>
        <div className="card p-4 text-center"><div className="text-2xl font-bold text-yellow-400">{activeCount}</div><div className="text-xs text-gray-500 mt-1">Active</div></div>
        <div className="card p-4 text-center"><div className="text-2xl font-bold text-red-400">{deadCount}</div><div className="text-xs text-gray-500 mt-1">Dead / Vetoed</div></div>
      </div>
      <div className="space-y-4">
        {bills.map(b => {
          const provisions = b.uapProvisions ? b.uapProvisions.split('\n').filter(Boolean) : [];
          return (
            <a key={b.id} href={b.congressGovUrl || '#'} target="_blank" rel="noopener noreferrer" className="block card p-6 hover:border-cyan-500/40 transition-all cursor-pointer group">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + (statusColorMap[b.status] || '')}>{b.status.replace(/_/g, ' ')}</span>
              </div>
              <h2 className="font-display text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">{b.title}</h2>
              {b.sponsor && <p className="text-xs text-gray-500 mb-3">Sponsor: {b.sponsor}</p>}
              {provisions.length > 0 && (
                <div className="space-y-1">{provisions.map((p, i) => <div key={i} className="flex items-start gap-2"><span className="text-cyan-500 mt-0.5 text-xs">&#9654;</span><span className="text-sm text-gray-400">{p}</span></div>)}</div>
              )}
              {!provisions.length && b.description && (
                <p className="text-sm text-gray-400">{b.description}</p>
              )}
            </a>
          );
        })}
      </div>
    </main>
    </div></>
  );
}
