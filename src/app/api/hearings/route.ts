// src/app/api/footage/route.ts
// API endpoint for recent UAP/UFO YouTube footage

import { NextResponse } from 'next/server';
import { fetchRecentUAPFootage, fetchFromTrustedChannels, getVideoStats } from '@/lib/youtube';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Default: last 7 days
  const daysBack = parseInt(searchParams.get('days') || '7');
  const source = searchParams.get('source') || 'all'; // 'all' | 'trusted'
  const limit = parseInt(searchParams.get('limit') || '25');

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - daysBack);
  const sinceDateISO = sinceDate.toISOString();

  try {
    let videos;

    if (source === 'trusted') {
      // Only from vetted, credible channels
      videos = await fetchFromTrustedChannels(sinceDateISO, limit);
    } else {
      // Broad search across all of YouTube
      const result = await fetchRecentUAPFootage(sinceDateISO, limit);
      videos = result.videos;
    }

    // Optionally fetch view/like stats for ranking
    if (videos.length > 0) {
      const videoIds = videos.map((v) => v.id);
      const stats = await getVideoStats(videoIds);

      // Enrich videos with stats
      const enrichedVideos = videos.map((video) => ({
        ...video,
        stats: stats.get(video.id) || { views: 0, likes: 0, comments: 0 },
      }));

      return NextResponse.json({
        success: true,
        data: enrichedVideos,
        meta: {
          since: sinceDateISO,
          source,
          count: enrichedVideos.length,
          fetchedAt: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: videos,
      meta: {
        since: sinceDateISO,
        source,
        count: videos.length,
        fetchedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Footage API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch footage' },
      { status: 500 }
    );
  }
}
