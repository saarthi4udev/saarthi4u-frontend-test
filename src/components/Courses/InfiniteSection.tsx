"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  initialData: any;
  fetchFn: (page: number) => Promise<any>;
  type: "colleges" | "exams" | "blogs" | "news";
};

export default function InfiniteSection({ initialData, fetchFn, type }: Props) {
  const [items, setItems] = useState(initialData.data || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(page < initialData.totalPages);
  const loaderRef = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const nextPage = page + 1;

          const res = await fetchFn(nextPage);

          setItems((prev: any) => [...prev, ...res.data]);
          setPage(nextPage);

          if (nextPage >= res.totalPages) {
            setHasMore(false);
          }
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [page, hasMore]);

  return (
    <>
      {/* GRID SAME AS YOUR UI */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item: any) => {
          if (type === "colleges") {
            return (
              <Link
                key={item.id}
                href={`/college/${item.slug}`}
                className="group overflow-hidden rounded-[1.6rem] border border-primary/10 bg-white shadow-sm"
              >
                <div className="relative h-48">
                  {item.bannerImg && (
                    <Image src={item.bannerImg} alt={item.name} fill className="object-cover" />
                  )}
                </div>
                <div className="p-5">
                  <h3>{item.name}</h3>
                </div>
              </Link>
            );
          }

          if (type === "exams") {
            return (
              <Link key={item.id} href={`/exam/${item.slug}`} className="p-6 border rounded-xl">
                <h3>{item.name}</h3>
              </Link>
            );
          }

          if (type === "blogs") {
            return (
              <Link key={item.id} href={`/blog/${item.slug}`} className="p-6 border rounded-xl">
                <h3>{item.title}</h3>
              </Link>
            );
          }

          if (type === "news") {
            return (
              <Link key={item.id} href={`/news/${item.slug}`} className="p-6 border rounded-xl">
                <h3>{item.title}</h3>
              </Link>
            );
          }
        })}
      </div>

      {/* LOADER TRIGGER */}
      {hasMore && (
        <div ref={loaderRef} className="text-center py-6">
          <span>Loading...</span>
        </div>
      )}
    </>
  );
}