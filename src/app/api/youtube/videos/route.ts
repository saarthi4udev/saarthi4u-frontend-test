import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

let cachedUploadsPlaylistId: { handle: string; id: string } | null = null;
const shortsClassificationCache = new Map<string, boolean>();

/**
 * Reliable Shorts detector.
 *
 * YouTube canonicalizes Shorts at `/shorts/{id}` and long-form at `/watch?v=...`.
 * If you HEAD-fetch `/shorts/{id}` for a long-form video, YouTube redirects to
 * `/watch?v={id}`. For an actual Short, the final URL stays at `/shorts/{id}`.
 *
 * Duration-based heuristics are unreliable because YouTube Shorts can run up to
 * 3 minutes, and there's no guarantee a sub-60s video is a Short either.
 */
async function checkIsShort(videoId: string): Promise<boolean> {
  if (shortsClassificationCache.has(videoId)) {
    return shortsClassificationCache.get(videoId)!;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
      method: "HEAD",
      // follow redirects so res.url reflects the canonical destination
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Saarthi4u/1.0; +https://saarthi4u.com)",
      },
    });
    clearTimeout(timeout);

    const finalUrl = res.url || "";
    const isShort = finalUrl.includes("/shorts/");
    shortsClassificationCache.set(videoId, isShort);
    return isShort;
  } catch (err) {
    console.error("[YouTube Feed][API] checkIsShort failed", videoId, err);
    return false;
  }
}

async function resolveUploadsPlaylistId(
  apiKey: string,
  handle: string
): Promise<string | null> {
  if (cachedUploadsPlaylistId && cachedUploadsPlaylistId.handle === handle) {
    return cachedUploadsPlaylistId.id;
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.append("part", "contentDetails");
  url.searchParams.append("forHandle", handle.startsWith("@") ? handle : `@${handle}`);
  url.searchParams.append("key", apiKey);

  const response = await fetch(url.toString(), { cache: "no-store" });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("[YouTube Feed][API] channel resolve failed", err);
    return null;
  }

  const data = await response.json();
  const id =
    data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads || null;

  if (id) {
    cachedUploadsPlaylistId = { handle, id };
  }
  return id;
}

function parseISO8601DurationToSeconds(duration: string): number {
  if (!duration) return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

function formatDurationLabel(totalSeconds: number): string {
  if (!totalSeconds) return "";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "20", 10) || 20, 1),
      50
    );
    const debug = searchParams.get("debug") === "1";

    const apiKey =
      process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const handle =
      process.env.YOUTUBE_CHANNEL_HANDLE ||
      process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_HANDLE ||
      "saarthi4uofficial";

    if (!apiKey) {
      return NextResponse.json(
        { error: "YouTube API key not configured" },
        { status: 500 }
      );
    }

    const uploadsPlaylistId = await resolveUploadsPlaylistId(apiKey, handle);
    if (!uploadsPlaylistId) {
      return NextResponse.json(
        { error: `Could not resolve YouTube channel for handle @${handle}` },
        { status: 404 }
      );
    }

    // Step 1: get latest playlist items (uploads)
    const playlistUrl = new URL(
      "https://www.googleapis.com/youtube/v3/playlistItems"
    );
    playlistUrl.searchParams.append("part", "snippet,contentDetails");
    playlistUrl.searchParams.append("maxResults", String(limit));
    playlistUrl.searchParams.append("playlistId", uploadsPlaylistId);
    playlistUrl.searchParams.append("key", apiKey);

    const playlistResponse = await fetch(playlistUrl.toString(), {
      cache: "no-store",
    });

    if (!playlistResponse.ok) {
      const errorData = await playlistResponse.json().catch(() => ({}));
      const errorMessage =
        errorData?.error?.message || "Failed to fetch YouTube videos";
      return NextResponse.json(
        { error: errorMessage, details: errorData },
        { status: playlistResponse.status }
      );
    }

    const playlistData = await playlistResponse.json();

    const baseItems = (playlistData.items || [])
      .map((item: any) => {
        const videoId =
          item?.contentDetails?.videoId || item?.snippet?.resourceId?.videoId;
        if (!videoId) return null;
        const thumbs = item?.snippet?.thumbnails || {};
        const thumbnail =
          thumbs.maxres?.url ||
          thumbs.standard?.url ||
          thumbs.high?.url ||
          thumbs.medium?.url ||
          thumbs.default?.url ||
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        return {
          id: videoId,
          title: item?.snippet?.title || "",
          description: item?.snippet?.description || "",
          thumbnail,
          publishedAt:
            item?.contentDetails?.videoPublishedAt ||
            item?.snippet?.publishedAt ||
            "",
          channelTitle: item?.snippet?.channelTitle || "",
        };
      })
      .filter(Boolean) as Array<{
      id: string;
      title: string;
      description: string;
      thumbnail: string;
      publishedAt: string;
      channelTitle: string;
    }>;

    // Step 2: enrich with duration + viewCount via videos.list (one call, batched IDs)
    const videoIds = baseItems.map((v) => v.id);
    const detailsMap = new Map<
      string,
      { duration: string; viewCount: string }
    >();

    if (videoIds.length) {
      const videosUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
      videosUrl.searchParams.append("part", "contentDetails,statistics");
      videosUrl.searchParams.append("id", videoIds.join(","));
      videosUrl.searchParams.append("key", apiKey);

      const videosResponse = await fetch(videosUrl.toString(), {
        cache: "no-store",
      });

      if (videosResponse.ok) {
        const videosData = await videosResponse.json();
        for (const item of videosData.items || []) {
          detailsMap.set(item.id, {
            duration: item?.contentDetails?.duration || "",
            viewCount: item?.statistics?.viewCount || "0",
          });
        }
      } else {
        const err = await videosResponse.json().catch(() => ({}));
        console.error("[YouTube Feed][API] videos.list failed", err);
      }
    }

    // Step 3: classify each video as Short vs long-form via HEAD redirect check
    const isShortFlags = await Promise.all(
      baseItems.map((v) => checkIsShort(v.id))
    );

    const videos = baseItems.map((v, i) => {
      const details = detailsMap.get(v.id);
      const durationSeconds = parseISO8601DurationToSeconds(
        details?.duration || ""
      );
      const isShort = isShortFlags[i];

      return {
        id: v.id,
        title: v.title,
        description: v.description,
        thumbnail: v.thumbnail,
        publishedAt: v.publishedAt,
        permalink: isShort
          ? `https://www.youtube.com/shorts/${v.id}`
          : `https://www.youtube.com/watch?v=${v.id}`,
        channelTitle: v.channelTitle,
        durationSeconds,
        durationLabel: formatDurationLabel(durationSeconds),
        isShort,
        viewCount: parseInt(details?.viewCount || "0", 10) || 0,
      };
    });

    console.log("[YouTube Feed][API] result", {
      total: videos.length,
      shorts: videos.filter((v) => v.isShort).length,
      longForm: videos.filter((v) => !v.isShort).length,
    });

    if (debug) {
      return NextResponse.json({
        videos,
        debug: {
          handle,
          uploadsPlaylistId,
          rawPlaylistItemsCount: (playlistData.items || []).length,
          rawPlaylist: playlistData,
        },
      });
    }

    return NextResponse.json(videos);
  } catch (error: any) {
    console.error("[YouTube Feed][API] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch YouTube videos" },
      { status: 500 }
    );
  }
}
