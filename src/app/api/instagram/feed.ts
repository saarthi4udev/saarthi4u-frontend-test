import axios from "axios";

export interface InstagramPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

export const fetchInstagramPosts = async (
  limit: number = 5
): Promise<InstagramPost[]> => {
  try {
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("Instagram access token not found in environment variables");
      return [];
    }

    const response = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&access_token=${accessToken}&limit=${limit}`
    );

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return [];
  }
};

// Client-side fetch for use in components
export const getInstagramPosts = async (
  limit: number = 5
): Promise<InstagramPost[]> => {
  try {
    const response = await axios.get(`/api/instagram/posts?limit=${limit}`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return [];
  }
};
