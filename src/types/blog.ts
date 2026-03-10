export type BlogPost = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  featuredImage: string;
  date: string;
  author: string;
  authorImage?: string;
  type?: string;
  category: string;
  tags: string[];
  readingTime: number;
  popularScore: number;
};

export type Blog = BlogPost;
