import Navbar from '@/components/layout/Navbar';
import { prisma } from '@/lib/db';

const catColors: Record<string, string> = {
  HEARING: 'bg-blue-500',
  DOCUMENT_RELEASE: 'bg-emerald-500',
  LEGISLATION: 'bg-purple-500',
  EXECUTIVE_ACTION: 'bg-red-500',
  WHISTLEBLOWER: 'bg-yellow-500',
  MEDIA: 'bg-pink-500',
  SCIENTIFIC: 'bg-teal-500',
  INTERNATIONAL: 'bg-orange-500',
};

const catLabels: Record<string, string> = {
  HEARING: 'Hearing',
  DOCUMENT_RELEASE: 'Document',
  LEGISLATION: 'Legislation',
  EXECUTIVE_ACTION: 'Executive Action',
  WHISTLEBLOWER: 'Whistleblower',
  MEDIA: 'Media',
  SCIENTIFIC: 'Scientific',
  INTERNATIONAL: 'International',
};

export default async function TimelinePage() {
  const events = await prisma.timelineEvent.findMany({
    orderBy: { date: 'desc' },
  });

  return (
    <><Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Disclosure Timeline</h1>
        <p className="text-sm text-gray-400">Key moments in UAP transparency. Click any event for source coverage.</p>
      </div>
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.entries(catLabels).map(([key, label]) => <div key={key} className="flex items-center gap-1.5"><span className={"w-2.5 h-2.5 rounded-full " + (catColors[key] || 'bg-gray-500')} /><span className="text-xs text-gray-500">{label}</span></div>)}
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800" />
        <div className="space-y-4">
          {events.map((e) => (
            <a key={e.id} href={e.sourceUrl || '#'} target="_blank" rel="noopener noreferrer" className="block relative pl-12 group">
              <div className={"absolute left-2.5 top-5 w-3.5 h-3.5 rounded-full border-2 border-gray-900 " + (catColors[e.category] || 'bg-gray-500')} />
              <div className={"card p-4 hover:border-cyan-500/40 transition-all cursor-pointer border-l-2 " + (e.importance === 'CRITICAL' ? 'border-l-red-500' : e.importance === 'HIGH' ? 'border-l-orange-500' : 'border-l-yellow-500')}>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-500">{e.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span className="text-xs font-mono text-gray-600">&middot;</span>
                  <span className={"text-xs font-mono " + (e.importance === 'CRITICAL' ? 'text-red-400' : 'text-orange-400')}>{e.importance}</span>
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
}
