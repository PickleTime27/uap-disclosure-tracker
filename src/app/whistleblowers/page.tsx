import Navbar from '@/components/layout/Navbar';
import { prisma } from '@/lib/db';
import KeyPlayersList from './KeyPlayersList';

export default async function KeyPlayersPage() {
  const players = await prisma.keyPlayer.findMany({
    orderBy: { name: 'asc' },
  });

  // Serialize for client component
  const serialized = players.map(p => ({
    id: p.id,
    name: p.name,
    role: p.role,
    organization: p.organization,
    category: p.category,
    bio: p.bio,
    keyActions: p.keyActions,
    socialLinks: p.socialLinks as Record<string, string> | null,
  }));

  const categories = [...new Set(players.map(p => p.category))];

  return (
    <><Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Key Players</h1>
        <p className="text-sm text-gray-400">Legislators, whistleblowers, and officials driving UAP disclosure.</p>
      </div>
      <KeyPlayersList players={serialized} categories={categories} />
    </main></>
  );
}
