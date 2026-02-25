// src/lib/youtube.ts
// YouTube Data API v3 — Pull recent UAP/UFO footage
// FREE: 10,000 quota units/day (each search = 100 units = ~100 searches/day)

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  thumbnail: string;
  thumbnailHigh: string;
  url: string;
  embedUrl: string;
}

interface YouTubeSearchResponse {
  items: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      channelTitle: string;
      channelId: string;
      publishedAt: string;
      thumbnails: {
        medium: { url: string };
        high: { url: string };
      };
    };
  }>;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  nextPageToken?: string;
}

/**
 * Search YouTube for recent UAP/UFO footage uploaded after a specific date.
 *
 * @param sinceDate  - ISO date string (e.g. '2026-02-17T00:00:00Z')
 * @param maxResults - Number of videos to return (max 50)
 * @param pageToken  - For pagination
 */
export async function fetchRecentUAPFootage(
  sinceDate: string,
  maxResults: number = 25,
  pageToken?: string
): Promise<{ videos: YouTubeVideo[]; nextPageToken?: string; totalResults: number }> {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YOUTUBE_API_KEY not set in environment variables');
  }

  // Multiple search queries to cast a wide net
  const searchQueries = [
    'UAP footage 2026',
    'UFO sighting footage',
    'alien UFO video',
    'UAP disclosure video',
    'unidentified aerial phenomena footage',
  ];

  const allVideos: Map<string, YouTubeVideo> = new Map();

  for (const query of searchQueries) {
    const params = new URLSearchParams({
      part: 'snippet',
      q: query,
      type: 'video',
      order: 'date',
      publishedAfter: sinceDate,
      maxResults: String(Math.min(maxResults, 50)),
      relevanceLanguage: 'en',
      safeSearch: 'moderate',
      key: YOUTUBE_API_KEY,
    });

    if (pageToken) {
      params.set('pageToken', pageToken);
    }

    try {
      const response = await fetch(`${YOUTUBE_API_BASE}/search?${params}`);

      if (!response.ok) {
        console.error(`YouTube API error for "${query}":`, response.status);
        continue;
      }

      const data: YouTubeSearchResponse = await response.json();

      for (const item of data.items || []) {
        const videoId = item.id.videoId;
        if (!allVideos.has(videoId)) {
          allVideos.set(videoId, {
            id: videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle,
            channelId: item.snippet.channelId,
            publishedAt: item.snippet.publishedAt,
            thumbnail: item.snippet.thumbnails.medium?.url || '',
            thumbnailHigh: item.snippet.thumbnails.high?.url || '',
            url: `https://www.youtube.com/watch?v=${videoId}`,
            embedUrl: `https://www.youtube.com/embed/${videoId}`,
          });
        }
      }
    } catch (error) {
      console.error(`YouTube search error for "${query}":`, error);
    }
  }

  // Sort by most recent first
  const videos = Array.from(allVideos.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return {
    videos,
    totalResults: videos.length,
  };
}

/**
 * Fetch videos from specific trusted UAP YouTube channels only.
 * These are vetted channels known for credible UAP content.
 */
export async function fetchFromTrustedChannels(
  sinceDate: string,
  maxResults: number = 10
): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YOUTUBE_API_KEY not set in environment variables');
  }

  // Curated list of trusted/credible UAP content channels
  const trustedChannels = [
    { id: 'UCLBr28xEjNJaEpQHxtMG1Jw', name: 'The Why Files' },
    { id: 'UC2iMFVBSVMmByc_GmUNE9Qg', name: 'NewsNation' },
    { id: 'UCvSbzThCfsiETLp3eOdVkNw', name: 'C-SPAN' },
    { id: 'UCYxRlFDqcWM4y7FfpiAN3KQ', name: 'The Hill' },
    // Add more trusted channels as you vet them
  ];

  const allVideos: YouTubeVideo[] = [];

  for (const channel of trustedChannels) {
    const params = new URLSearchParams({
      part: 'snippet',
      channelId: channel.id,
      q: 'UAP OR UFO OR alien OR disclosure OR AARO',
      type: 'video',
      order: 'date',
      publishedAfter: sinceDate,
      maxResults: String(maxResults),
      key: YOUTUBE_API_KEY,
    });

    try {
      const response = await fetch(`${YOUTUBE_API_BASE}/search?${params}`);
      if (!response.ok) continue;

      const data: YouTubeSearchResponse = await response.json();

      for (const item of data.items || []) {
        allVideos.push({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          channelTitle: item.snippet.channelTitle,
          channelId: item.snippet.channelId,
          publishedAt: item.snippet.publishedAt,
          thumbnail: item.snippet.thumbnails.medium?.url || '',
          thumbnailHigh: item.snippet.thumbnails.high?.url || '',
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
        });
      }
    } catch (error) {
      console.error(`YouTube channel fetch error for ${channel.name}:`, error);
    }
  }

  return allVideos.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get video statistics (views, likes, comments) for a batch of video IDs.
 * Costs only 1 quota unit per call (vs 100 for search).
 */
export async function getVideoStats(
  videoIds: string[]
): Promise<Map<string, { views: number; likes: number; comments: number }>> {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YOUTUBE_API_KEY not set in environment variables');
  }

  const stats = new Map<string, { views: number; likes: number; comments: number }>();

  // API allows up to 50 video IDs per request
  const chunks = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    chunks.push(videoIds.slice(i, i + 50));
  }

  for (const chunk of chunks) {
    const params = new URLSearchParams({
      part: 'statistics',
      id: chunk.join(','),
      key: YOUTUBE_API_KEY,
    });

    try {
      const response = await fetch(`${YOUTUBE_API_BASE}/videos?${params}`);
      if (!response.ok) continue;

      const data = await response.json();

      for (const item of data.items || []) {
        stats.set(item.id, {
          views: parseInt(item.statistics.viewCount || '0'),
          likes: parseInt(item.statistics.likeCount || '0'),
          comments: parseInt(item.statistics.commentCount || '0'),
        });
      }
    } catch (error) {
      console.error('YouTube stats error:', error);
    }
  }

  return stats;
}
