import Navbar from '@/components/layout/Navbar';
import VideoBackground from '@/components/VideoBackground';
import { prisma } from '@/lib/db';
import DocumentsList from './DocumentsList';

export default async function DocumentsPage() {
  const docs = await prisma.document.findMany({
    orderBy: { datePublished: 'desc' },
  });

  // Serialize dates and build unique source list for filter buttons
  const serialized = docs.map(d => ({
    id: d.id,
    title: d.title,
    source: d.source,
    sourceAgency: d.sourceAgency,
    datePublished: d.datePublished
      ? d.datePublished.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : null,
    classification: d.classification,
    summary: d.summary,
    sourceUrl: d.sourceUrl,
  }));

  const sources = [...new Set(docs.map(d => d.source))];

  return (
    <><VideoBackground videoId="rO_M0hLlJ-Q" />
    <div className="relative" style={{ zIndex: 10 }}>
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Document Library</h1>
        <p className="text-sm text-gray-400">Declassified documents, FOIA releases, AARO reports, and NARA transfers.</p>
      </div>
      <DocumentsList docs={serialized} sources={sources} />
    </main>
    </div></>
  );
}
