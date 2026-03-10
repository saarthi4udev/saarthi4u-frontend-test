// "use client";

// import { useMemo, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { format } from "date-fns";
// import { Icon } from "@iconify/react";
// import { BlogPost } from "@/types/blog";

// type BlogListProps = {
//   posts: BlogPost[];
// };

// const ALL_CATEGORIES = "All Categories";
// const ALL_TAGS = "All Tags";

// export default function BlogList({ posts }: Readonly<BlogListProps>) {
//   const [query, setQuery] = useState("");
//   const [category, setCategory] = useState(ALL_CATEGORIES);
//   const [tag, setTag] = useState(ALL_TAGS);

//   const categories = useMemo(
//     () => [ALL_CATEGORIES, ...Array.from(new Set(posts.map((p) => p.category))).sort()],
//     [posts]
//   );

//   const tags = useMemo(
//     () => [ALL_TAGS, ...Array.from(new Set(posts.flatMap((p) => p.tags))).sort()],
//     [posts]
//   );

//   const filteredPosts = useMemo(() => {
//     const normalizedQuery = query.trim().toLowerCase();

//     return posts.filter((post) => {
//       const categoryMatch = category === ALL_CATEGORIES || post.category === category;
//       const tagMatch = tag === ALL_TAGS || post.tags.includes(tag);

//       if (!normalizedQuery) return categoryMatch && tagMatch;

//       const textMatch =
//         post.title.toLowerCase().includes(normalizedQuery) ||
//         post.excerpt.toLowerCase().includes(normalizedQuery) ||
//         post.author.toLowerCase().includes(normalizedQuery) ||
//         post.tags.some((t) => t.toLowerCase().includes(normalizedQuery));

//       return categoryMatch && tagMatch && textMatch;
//     });
//   }, [category, posts, query, tag]);

//   const latestPosts = useMemo(() => posts.slice(0, 5), [posts]);

//   const popularPosts = useMemo(
//     () =>
//       [...posts]
//         .sort((a, b) => b.popularScore - a.popularScore)
//         .slice(0, 5),
//     [posts]
//   );

//   return (
//     <section
//       className="py-10 md:py-16 lg:py-20 bg-white dark:bg-slate-950 transition-colors duration-300"
//       id="blog"
//     >
//       <div className="container mx-auto px-4 sm:px-6">

//         {/* FILTER BAR */}
//         <div className="
//           mb-10 rounded-3xl border
//           border-gray-200 dark:border-slate-800
//           bg-white dark:bg-slate-900
//           p-4 md:p-6 shadow-sm
//           transition-colors
//         ">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

//             {/* SEARCH */}
//             <div className="
//               lg:col-span-6 flex items-center
//               bg-white dark:bg-slate-800
//               border border-gray-200 dark:border-slate-700
//               rounded-xl px-4 h-12
//             ">
//               <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2" />
//               <input
//                 type="text"
//                 placeholder="Search blogs, author, tags..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="bg-transparent w-full text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
//               />
//             </div>

//             {/* CATEGORY */}
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="
//                 lg:col-span-3 h-12 px-3 rounded-xl border
//                 bg-white dark:bg-slate-800
//                 border-gray-200 dark:border-slate-700
//                 text-gray-800 dark:text-gray-100
//                 focus:ring-2 focus:ring-primary focus:outline-none
//               "
//             >
//               {categories.map((item) => (
//                 <option key={item}>{item}</option>
//               ))}
//             </select>

//             {/* TAG */}
//             <select
//               value={tag}
//               onChange={(e) => setTag(e.target.value)}
//               className="
//                 lg:col-span-3 h-12 px-3 rounded-xl border
//                 bg-white dark:bg-slate-800
//                 border-gray-200 dark:border-slate-700
//                 text-gray-800 dark:text-gray-100
//                 focus:ring-2 focus:ring-primary focus:outline-none
//               "
//             >
//               {tags.map((item) => (
//                 <option key={item}>{item}</option>
//               ))}
//             </select>

//           </div>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

//           {/* BLOG CARDS */}
//           <div className="xl:col-span-8 grid sm:grid-cols-2 gap-6">
//             {filteredPosts.map((post) => (
//               <article
//                 key={post.slug}
//                 className="
//                   rounded-2xl border
//                   border-gray-200 dark:border-slate-800
//                   bg-white dark:bg-slate-900
//                   overflow-hidden flex flex-col
//                   shadow-sm hover:shadow-md transition-all duration-200
//                 "
//               >
//                 <Link href={`/blog/${post.slug}`} className="relative h-52 block">
//                   <Image
//                     src={post.featuredImage}
//                     alt={post.title}
//                     fill
//                     className="object-cover"
//                     unoptimized
//                   />
//                 </Link>

//                 <div className="p-5 flex flex-col h-full">
//                   <div className="flex justify-between text-xs mb-3">
//                     <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
//                       {post.category}
//                     </span>
//                     <span className="text-gray-500 dark:text-gray-400">
//                       {post.readingTime} min read
//                     </span>
//                   </div>

//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
//                     {post.title}
//                   </h3>

//                   <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">
//                     {post.excerpt}
//                   </p>

//                   <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
//                     <span>{post.author}</span>
//                     <span>{format(new Date(post.date), "dd MMM yyyy")}</span>
//                   </div>

//                   <Link
//                     href={`/blog/${post.slug}`}
//                     className="mt-auto inline-flex items-center gap-2 text-primary font-medium"
//                   >
//                     Read More
//                     <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
//                   </Link>
//                 </div>
//               </article>
//             ))}

//             {filteredPosts.length === 0 && (
//               <div className="
//                 col-span-full rounded-2xl border
//                 border-gray-200 dark:border-slate-800
//                 p-10 text-center text-gray-500 dark:text-gray-400
//               ">
//                 No blogs found for your search.
//               </div>
//             )}
//           </div>

//           {/* SIDEBAR */}
//           <aside className="xl:col-span-4 space-y-6">

//             {/* Latest */}
//             <SidebarBlock title="Latest Posts">
//               {latestPosts.map((post) => (
//                 <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
//                   <p className="text-sm text-gray-900 dark:text-white group-hover:text-primary line-clamp-2">
//                     {post.title}
//                   </p>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     {format(new Date(post.date), "dd MMM yyyy")}
//                   </span>
//                 </Link>
//               ))}
//             </SidebarBlock>

//             {/* Popular */}
//             <SidebarBlock title="Popular Posts">
//               {popularPosts.map((post) => (
//                 <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
//                   <p className="text-sm text-gray-900 dark:text-white group-hover:text-primary line-clamp-2">
//                     {post.title}
//                   </p>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     {post.readingTime} min read
//                   </span>
//                 </Link>
//               ))}
//             </SidebarBlock>

//             {/* Tags */}
//             <SidebarBlock title="Browse Tags">
//               <div className="flex flex-wrap gap-2">
//                 {tags
//                   .filter((item) => item !== ALL_TAGS)
//                   .map((item) => (
//                     <button
//                       key={item}
//                       onClick={() => setTag(item)}
//                       className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white transition"
//                     >
//                       {item}
//                     </button>
//                   ))}
//               </div>
//             </SidebarBlock>

//           </aside>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* SIDEBAR REUSABLE BLOCK */
// function SidebarBlock({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="
//       rounded-2xl border
//       border-gray-200 dark:border-slate-800
//       p-5 bg-white dark:bg-slate-900
//       shadow-sm transition-colors
//     ">
//       <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//         {title}
//       </h4>
//       <div className="space-y-4">{children}</div>
//     </div>
//   );
// }


"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

const ALL_CATEGORIES = "All Categories";
const ALL_TAGS = "All Tags";

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [tag, setTag] = useState(ALL_TAGS);

  /* FETCH BLOGS */
  const fetchBlogs = async () => {
    try {
      const res = await fetch("https://saarthi4u-backend-test.onrender.com/api/blog/all");

      if (!res.ok) throw new Error("Failed to fetch blogs");

      const json = await res.json();
      const blogs = json.data || [];

      const formattedBlogs = blogs.map((blog: any) => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt || "",
        featuredImage: blog.featuredImage || "/placeholder.jpg",
        category: blog.category?.name || "Engineering",
        tags: blog.tags?.map((t: any) => t.name) || [],
        author: blog.author?.name || "Admin",
        readingTime: Math.max(3, Math.ceil((blog.content || "").length / 500)),
        date: blog.publishedAt || blog.createdAt,
        popularScore: blog.views || 0,
      }));

      setPosts(formattedBlogs);
    } catch (error) {
      console.error("Blog fetch error:", error);
    }
  };

  /* INITIAL LOAD + AUTO REFRESH */
  useEffect(() => {
    fetchBlogs();

    const interval = setInterval(fetchBlogs, 30000); // refresh every 30s

    return () => clearInterval(interval);
  }, []);

  /* CATEGORIES */
  const categories = useMemo(
    () => [ALL_CATEGORIES, ...Array.from(new Set(posts.map((p) => p.category))).sort()],
    [posts]
  );

  /* TAGS */
  const tags = useMemo(
    () => [ALL_TAGS, ...Array.from(new Set(posts.flatMap((p) => p.tags))).sort()],
    [posts]
  );

  /* FILTER LOGIC */
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const categoryMatch = category === ALL_CATEGORIES || post.category === category;
      const tagMatch = tag === ALL_TAGS || post.tags.includes(tag);

      if (!normalizedQuery) return categoryMatch && tagMatch;

      const textMatch =
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.author.toLowerCase().includes(normalizedQuery) ||
        post.tags.some((t: string) => t.toLowerCase().includes(normalizedQuery));

      return categoryMatch && tagMatch && textMatch;
    });
  }, [category, posts, query, tag]);

  /* LATEST POSTS */
  const latestPosts = useMemo(() => posts.slice(0, 5), [posts]);

  /* POPULAR POSTS */
  const popularPosts = useMemo(
    () => [...posts].sort((a, b) => b.popularScore - a.popularScore).slice(0, 5),
    [posts]
  );

  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white dark:bg-slate-950 transition-colors duration-300"
      id="blog"
    >
      <div className="container mx-auto px-4 sm:px-6">

        {/* FILTER BAR */}
        <div className="mb-10 rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 md:p-6 shadow-sm transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* SEARCH */}
            <div className="lg:col-span-6 flex items-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 h-12">
              <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search blogs, author, tags..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent w-full text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="lg:col-span-3 h-12 px-3 rounded-xl border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            {/* TAG */}
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="lg:col-span-3 h-12 px-3 rounded-xl border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {tags.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* BLOG CARDS */}
          <div className="xl:col-span-8 grid sm:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Link href={`/blog/${post.slug}`} className="relative h-52 block">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </Link>

                <div className="p-5 flex flex-col h-full">
                  <div className="flex justify-between text-xs mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {post.readingTime} min read
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{post.author}</span>
                    <span>{format(new Date(post.date), "dd MMM yyyy")}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-primary font-medium"
                  >
                    Read More
                    <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}

            {filteredPosts.length === 0 && (
              <div className="col-span-full rounded-2xl border border-gray-200 dark:border-slate-800 p-10 text-center text-gray-500 dark:text-gray-400">
                No blogs found for your search.
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="xl:col-span-4 space-y-6">

            {/* Latest */}
            <SidebarBlock title="Latest Posts">
              {latestPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <p className="text-sm text-gray-900 dark:text-white group-hover:text-primary line-clamp-2">
                    {post.title}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(post.date), "dd MMM yyyy")}
                  </span>
                </Link>
              ))}
            </SidebarBlock>

            {/* Popular */}
            <SidebarBlock title="Popular Posts">
              {popularPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <p className="text-sm text-gray-900 dark:text-white group-hover:text-primary line-clamp-2">
                    {post.title}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {post.readingTime} min read
                  </span>
                </Link>
              ))}
            </SidebarBlock>

            {/* Tags */}
            <SidebarBlock title="Browse Tags">
              <div className="flex flex-wrap gap-2">
                {tags
                  .filter((item) => item !== ALL_TAGS)
                  .map((item) => (
                    <button
                      key={item}
                      onClick={() => setTag(item)}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white transition"
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </SidebarBlock>

          </aside>
        </div>
      </div>
    </section>
  );
}

/* SIDEBAR BLOCK */
function SidebarBlock({ title, children }: any) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900 shadow-sm transition-colors">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
}