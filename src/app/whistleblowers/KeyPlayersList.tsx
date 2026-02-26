'use client';
import { useState } from 'react';

type Player = {
  id: string;
  name: string;
  role: string;
  organization: string | null;
  category: string;
  bio: string | null;
  keyActions: string[];
  socialLinks: Record<string, string> | null;
};

const catColors: Record<string, string> = {
  WHISTLEBLOWER: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  LEGISLATOR: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  GOVERNMENT: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  MILITARY: 'bg-green-500/15 text-green-400 border-green-500/30',
  INTELLIGENCE: 'bg-red-500/15 text-red-400 border-red-500/30',
  SCIENTIST: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  JOURNALIST: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
  ADVOCATE: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
};

const catLabels: Record<string, string> = {
  WHISTLEBLOWER: 'Whistleblower',
  LEGISLATOR: 'Legislator',
  GOVERNMENT: 'Government',
  MILITARY: 'Military',
  INTELLIGENCE: 'Intelligence',
  SCIENTIST: 'Scientist',
  JOURNALIST: 'Journalist',
  ADVOCATE: 'Advocate',
};

export default function KeyPlayersList({ players, categories }: { players: Player[]; categories: string[] }) {
  const [filter, setFilter] = useState('ALL');
  const filtered = filter === 'ALL' ? players : players.filter(p => p.category === filter);

  // Build a URL from socialLinks if available
  const getUrl = (p: Player) => {
    if (p.socialLinks) {
      return (p.socialLinks as Record<string, string>).website || (p.socialLinks as Record<string, string>).twitter || '#';
    }
    return '#';
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {['ALL', ...categories].map(c => (
          <button key={c} onClick={() => setFilter(c)} className={"px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer " + (filter === c ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:border-gray-500')}>
            {catLabels[c] || c}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <a key={p.id} href={getUrl(p)} target="_blank" rel="noopener noreferrer" className="block card p-5 hover:border-cyan-500/40 transition-all cursor-pointer group">
            <div className="flex items-center gap-2 mb-3">
              <span className={"inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border " + (catColors[p.category] || '')}>{catLabels[p.category] || p.category}</span>
            </div>
            <h2 className="font-display text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{p.name}</h2>
            <p className="text-xs text-gray-500">{p.role}{p.organization ? ` — ${p.organization}` : ''}</p>
            {p.bio && <p className="text-sm text-gray-400 mt-2 mb-3">{p.bio}</p>}
            {p.keyActions.length > 0 && (
              <div className="space-y-1">{p.keyActions.map((a, i) => <div key={i} className="flex items-start gap-2"><span className="text-cyan-500 mt-0.5 text-xs">&#9654;</span><span className="text-xs text-gray-500">{a}</span></div>)}</div>
            )}
          </a>
        ))}
      </div>
    </>
  );
}
