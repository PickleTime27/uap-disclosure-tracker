'use client';
import { useState } from 'react';

type Doc = {
  id: string;
  title: string;
  source: string;
  sourceAgency: string | null;
  datePublished: string | null;
  classification: string | null;
  summary: string | null;
  sourceUrl: string;
};

const sourceColors: Record<string, string> = {
  EXECUTIVE: 'bg-red-500/15 text-red-400 border-red-500/30',
  AARO: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  NARA: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  NSA: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  DOD: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  CIA: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  FOIA: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  FAA: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
  NASA: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  BLACK_VAULT: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
  CONGRESS: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  OTHER: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

export default function DocumentsList({ docs, sources }: { docs: Doc[]; sources: string[] }) {
  const [filter, setFilter] = useState('ALL');
  const filtered = filter === 'ALL' ? docs : docs.filter(d => d.source === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {['ALL', ...sources].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={"px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer " + (filter === s ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:border-gray-500')}>
            {s}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(d => (
          <a key={d.id} href={d.sourceUrl} target="_blank" rel="noopener noreferrer" className="block card p-5 hover:border-cyan-500/40 transition-all cursor-pointer group">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + (sourceColors[d.source] || '')}>{d.source}</span>
              <span className="text-xs font-mono text-gray-500">{d.sourceAgency}</span>
              <span className="text-xs font-mono text-gray-500">{d.datePublished}</span>
              <span className="text-xs font-mono text-gray-500">{d.classification}</span>
            </div>
            <h2 className="font-display text-base font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">{d.title}</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{d.summary}</p>
          </a>
        ))}
      </div>
    </>
  );
}
