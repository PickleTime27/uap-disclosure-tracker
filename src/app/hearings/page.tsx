import Navbar from '@/components/layout/Navbar';
import VideoBackground from '@/components/VideoBackground';
import { prisma } from '@/lib/db';

export default async function HearingsPage() {
  const hearings = await prisma.hearing.findMany({
    include: { witnesses: true },
    orderBy: { date: 'desc' },
  });

  return (
    <><VideoBackground videoId="SKsLK_Na7iw" />
    <div className="relative" style={{ zIndex: 10 }}>
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Congressional Hearings</h1>
        <p className="text-sm text-gray-400">Track UAP-related congressional hearings and testimony. Click for source coverage.</p>
      </div>
      <div className="space-y-4">
        {hearings.map(h => (
          <a key={h.id} href={h.sourceUrl || h.videoUrl || '#'} target="_blank" rel="noopener noreferrer" className="block card p-6 hover:border-cyan-500/40 transition-all cursor-pointer group">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">{h.status}</span>
              <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + (h.chamber === 'HOUSE' ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-purple-500/15 text-purple-400 border-purple-500/30')}>{h.chamber}</span>
              <span className="text-xs font-mono text-gray-500">{h.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <h2 className="font-display text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">{h.title}</h2>
            <div className="mb-3"><span className="text-xs font-mono text-gray-500">WITNESSES: </span>{h.witnesses.map((w, i) => <span key={w.id} className="text-xs text-cyan-400">{w.name}{i < h.witnesses.length - 1 ? ', ' : ''}</span>)}</div>
            {h.keyTakeaways.length > 0 && (
              <div className="space-y-1">{h.keyTakeaways.map((t, i) => <div key={i} className="flex items-start gap-2"><span className="text-cyan-500 mt-0.5 text-xs">&#9654;</span><span className="text-sm text-gray-400">{t}</span></div>)}</div>
            )}
          </a>
        ))}
      </div>
    </main>
    </div></>
  );
}
