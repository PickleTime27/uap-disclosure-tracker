'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import VideoBackground from '@/components/VideoBackground';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
}

const SEARCH_CATEGORIES = [
  { label: 'ALL', query: 'UAP disclosure hearing official' },
  { label: 'HEARINGS', query: 'UAP congressional hearing testimony' },
  { label: 'NEWS', query: 'UAP UFO government disclosure news' },
  { label: 'PENTAGON', query: 'Pentagon AARO UAP briefing official' },
  { label: 'WHISTLEBLOWER', query: 'UAP whistleblower David Grusch testimony' },
];

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const fetchVideos = async (category: string) => {
    setLoading(true);
    setError(null);
    const cat = SEARCH_CATEGORIES.find(c => c.label === category);
    const query = cat ? cat.query : SEARCH_CATEGORIES[0].query;
    try {
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      if (!apiKey) {
        throw new Error('YouTube API key not configured');
      }
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=12&order=date&relevanceLanguage=en&key=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || 'YouTube API error');
      }
      const data = await res.json();
      const items: Video[] = (data.items || []).map((item: any) => ({
        id: item.id?.videoId || '',
        title: item.snippet?.title || '',
        description: item.snippet?.description || '',
        thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || '',
        publishedAt: item.snippet?.publishedAt || '',
        channelTitle: item.snippet?.channelTitle || '',
      }));
      setVideos(items);
    } catch (err: any) {
      setError(err.message || 'Failed to load videos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(activeCategory);
  }, [activeCategory]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <>
      <VideoBackground videoId="cdJLaqNEFMM" />
      <div className="relative" style={{ zIndex: 10 }}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">UAP Videos & Footage</h1>
          <p className="text-gray-400">Latest congressional hearings, Pentagon briefings, whistleblower testimony, and UAP news coverage.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {SEARCH_CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => { setActiveCategory(cat.label); setPlayingVideo(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeCategory === cat.label
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Searching YouTube...</p>
            </div>
          </div>
        )}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
            <p className="text-red-400 font-semibold mb-2">Error Loading Videos</p>
            <p className="text-red-400/70 text-sm">{error}</p>
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all group">
                <div className="relative aspect-video bg-black">
                  {playingVideo === video.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full cursor-pointer" onClick={() => setPlayingVideo(video.id)}>
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="text-white font-semibold text-sm leading-tight hover:text-cyan-400 transition-colors line-clamp-2">
                    {decodeHtml(video.title)}
                  </a>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-cyan-400 font-medium">{video.channelTitle}</span>
                    <span className="text-xs text-gray-600">|</span>
                    <span className="text-xs text-gray-500">{formatDate(video.publishedAt)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{decodeHtml(video.description)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && videos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No videos found for this category.</p>
          </div>
        )}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-600">Videos sourced from YouTube Data API v3. Content is owned by respective creators.</p>
        </div>
      </main>
      </div>
    </>
  );
}