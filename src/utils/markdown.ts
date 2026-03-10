import fs from "node:fs";
import matter from "gray-matter";
import { join } from "node:path";

const postsDirectory = join(process.cwd(), "markdown/blogs");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processImages = (markdownContent: string) =>
    markdownContent.replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="" />');

  const toPlainText = (markdownContent: string) =>
    markdownContent
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[[^\]]+\]\([^)]*\)/g, "$1")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/[>*_~#-]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const estimateReadingTime = (markdownContent: string) => {
    const words = toPlainText(markdownContent)
      .split(" ")
      .filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 220));
  };

  const extractTags = (markdownContent: string): string[] => {
    if (Array.isArray(data.tags)) {
      return (data.tags as unknown[])
        .map((item) => String(item).trim())
        .filter(Boolean);
    }

    const tagsSection = markdownContent.match(
      /##\s*Tags\s*([\s\S]*?)(\n---|\n##\s|$)/i,
    );

    if (!tagsSection?.[1]) {
      return [];
    }

    return tagsSection[1]
      .split("\n")
      .map((line) => line.replace(/^\s*[-*]\s*/, "").trim())
      .filter((line) => Boolean(line) && !line.includes("["));
  };

  const createAiFeaturedImage = (title: string, category: string) => {
    const palettes = [
      ["#1E3A8A", "#2F73F2"],
      ["#0F766E", "#06B6D4"],
      ["#7C3AED", "#3B82F6"],
      ["#BE185D", "#8B5CF6"],
      ["#0F172A", "#2563EB"],
    ];

    const hash = [...title].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const [start, end] = palettes[hash % palettes.length];
    const safeTitle = (title || "AI Insights").replace(/&/g, "and");
    const safeCategory = (category || "Education").replace(/&/g, "and");

    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='800' viewBox='0 0 1400 800'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${start}' />
          <stop offset='100%' stop-color='${end}' />
        </linearGradient>
      </defs>
      <rect width='1400' height='800' fill='url(#g)' />
      <circle cx='1180' cy='120' r='220' fill='white' fill-opacity='0.1' />
      <circle cx='220' cy='700' r='280' fill='white' fill-opacity='0.08' />
      <rect x='90' y='95' width='260' height='42' rx='21' fill='white' fill-opacity='0.18' />
      <text x='220' y='123' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' font-weight='700' fill='white'>AI Featured</text>
      <text x='90' y='500' font-family='Arial, sans-serif' font-size='58' font-weight='700' fill='white'>${safeTitle.slice(0, 44)}</text>
      <text x='90' y='560' font-family='Arial, sans-serif' font-size='28' fill='white' fill-opacity='0.9'>${safeCategory}</text>
    </svg>`;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const parsedTags = extractTags(content);
  const fallbackCategory = parsedTags[0] || "General";
  const title = String(data.title || realSlug.replace(/-/g, " "));
  const excerpt =
    typeof data.excerpt === "string" && data.excerpt.trim().length > 0
      ? data.excerpt
      : `${toPlainText(content).slice(0, 160)}...`;
  const readingTime = estimateReadingTime(content);
  const popularScore = parsedTags.length * 5 + readingTime * 4 + title.length;
  const featuredImage =
    typeof data.featuredImage === "string" && data.featuredImage.length > 0
      ? data.featuredImage
      : createAiFeaturedImage(title, String(data.category || fallbackCategory));

  type Items = {
    // [key: string]: string;
    [key: string]: string | object | string[] | number;
  };

  const items: any = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      // You can modify the content here to include images
      items[field] = processImages(content);
    }

    if (field === "tags") {
      items[field] = parsedTags;
    }

    if (field === "category") {
      items[field] = String(data.category || fallbackCategory);
    }

    if (field === "featuredImage") {
      items[field] = featuredImage;
    }

    if (field === "readingTime") {
      items[field] = readingTime;
    }

    if (field === "popularScore") {
      items[field] = popularScore;
    }

    if (field === "excerpt" && typeof data.excerpt === "undefined") {
      items[field] = excerpt;
    }

    if (field === "metadata") {
      // Include metadata, including the image information
      items[field] = {
        ...data,
        coverImage: data.coverImage || null,
        category: data.category || fallbackCategory,
        tags: parsedTags,
        featuredImage,
      };
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
