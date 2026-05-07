const base = process.env.NEXT_PUBLIC_API_URL;

const BASE_URL = base + "/blog";

/* ---------------- GET ALL BLOGS ---------------- */

export async function getAllBlogs() {
  try {
    const res = await fetch(`${BASE_URL}/all`);

    if (!res.ok) throw new Error("Failed to fetch blogs");

    const json = await res.json();

    const blogs = json.data || [];

    const mapped = blogs.map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      category: "Engineering", // fallback since API gives categoryId
      tags: ["education", "college"], // fallback tags
      author: "Admin",
      readingTime: Math.max(3, Math.ceil(blog.content?.length / 500)),
      date: blog.publishedAt || blog.createdAt,
      popularScore: blog.views || 0,
    }));

    // Newest first
    return mapped.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Blog fetch error:", error);
    return [];
  }
}

/* ---------------- GET BLOG BY SLUG ---------------- */

export async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${BASE_URL}/blog/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch blog");

    const json = await res.json();
    const blog = json.data;

    if (!blog) return null;

    return {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      category: "Engineering",
      tags: ["education", "college"],
      author: "Admin",
      readingTime: Math.max(3, Math.ceil(blog.content?.length / 500)),
      date: blog.publishedAt || blog.createdAt,
      popularScore: blog.views || 0,
    };
  } catch (error) {
    console.error("Blog slug fetch error:", error);
    return null;
  }
}