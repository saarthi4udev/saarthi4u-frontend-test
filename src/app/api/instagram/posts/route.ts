import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "5";
    const debug = searchParams.get("debug") === "1";

    const accessToken =
      process.env.INSTAGRAM_ACCESS_TOKEN ||
      process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

    const tokenPreview = accessToken
      ? `${accessToken.slice(0, 8)}...${accessToken.slice(-6)}`
      : "missing";

    console.log("[Instagram Feed][API] Step 1: request received", {
      limit,
      debug,
      hasServerToken: Boolean(process.env.INSTAGRAM_ACCESS_TOKEN),
      hasPublicToken: Boolean(process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN),
      tokenPreview,
    });

    if (!accessToken) {
      console.error("[Instagram Feed][API] Step 2: token missing");
      return NextResponse.json(
        { error: "Instagram access token not configured" },
        { status: 500 }
      );
    }

    // Fetch posts with minimal required fields first
    const fieldsToFetch =
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.append("fields", fieldsToFetch);
    url.searchParams.append("access_token", accessToken);
    url.searchParams.append("limit", limit);

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("[Instagram Feed][API] Step 3: Instagram response", {
      status: response.status,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Instagram API Error Response:", errorData);

      // Extract meaningful error message
      let errorMessage = "Failed to fetch Instagram posts";
      if (errorData.error?.message) {
        errorMessage = errorData.error.message;
      } else if (typeof errorData.error === "string") {
        errorMessage = errorData.error;
      }

      const errorCode = errorData?.error?.code;
      const isAppNotAuthorized =
        errorCode === 190 &&
        typeof errorMessage === "string" &&
        errorMessage.includes("has not authorized application");

      if (isAppNotAuthorized) {
        console.error("[Instagram Feed][API] Step 4: app not authorized by Instagram user", {
          errorCode,
          appIdHint: "1170998754980118",
        });
        return NextResponse.json(
          {
            error:
              "Instagram account has not authorized this Meta app yet. Authorize the app from Meta Graph API Explorer and generate a fresh user token.",
            details: errorData,
          },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        {
          error: errorMessage,
          details: errorData,
          ...(debug
            ? {
                debug: {
                  step: "instagram-api-error",
                  status: response.status,
                  tokenPreview,
                },
              }
            : {}),
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Process and return posts
    const posts = (data.data || []).map((post: any) => ({
      id: post.id,
      caption: post.caption || "",
      media_type: post.media_type,
      media_url: post.media_url,
      thumbnail_url: post.thumbnail_url || null,
      permalink: post.permalink,
      timestamp: post.timestamp,
      like_count: post.like_count || 0,
      comments_count: post.comments_count || 0,
    }));

    console.log("[Instagram Feed][API] Step 5: posts mapped", {
      count: posts.length,
    });

    return NextResponse.json(posts || []);
  } catch (error: any) {
    console.error("Instagram fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch Instagram posts" },
      { status: 500 }
    );
  }
}
