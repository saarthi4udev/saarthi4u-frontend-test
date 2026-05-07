export interface YoutubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  permalink: string;
  channelTitle: string;
  durationSeconds: number;
  durationLabel: string;
  isShort: boolean;
  viewCount: number;
}
