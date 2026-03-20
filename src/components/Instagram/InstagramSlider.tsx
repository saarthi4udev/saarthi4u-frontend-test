"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";
import { InstagramPost } from "@/app/api/instagram/feed";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface InstagramSliderProps {
  limit?: number;
}

// ── Shimmer skeleton card ──
const SkeletonCard = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className="aspect-square overflow-hidden rounded-2xl"
  >
    <div className="h-full w-full animate-pulse rounded-2xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-white/5 dark:via-white/10 dark:to-white/5" />
  </motion.div>
);

// ── Individual post card ──
const PostCard = ({ post, index }: { post: InstagramPost; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const isVideo = post.media_type === "VIDEO";
  const isCarousel = post.media_type === "CAROUSEL_ALBUM";
  const imgSrc = post.thumbnail_url || (!isVideo ? post.media_url : null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.95 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={post.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-square overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-500/10 dark:border-dark_border/60 dark:bg-dark_b/50 dark:hover:border-pink-500/30"
      >
        {/* Thumbnail */}
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={post.caption?.slice(0, 80) || "Instagram post"}
            width={500}
            height={500}
            quality={85}
            priority={false}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-500/15 dark:to-purple-600/15">
            <Icon icon="fa6-brands:instagram" className="text-4xl text-pink-300/60" />
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Caption slide-up on hover */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-3 px-2.5 pb-2.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {post.caption && (
            <p className="line-clamp-3 text-center text-10 leading-snug text-white drop-shadow">
              {post.caption}
            </p>
          )}
        </div>

        {/* Media type badge (top-right) */}
        {(isVideo || isCarousel) && (
          <div className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Icon
              icon={isVideo ? "fa6-solid:play" : "fa6-regular:clone"}
              className="text-9 text-white"
            />
          </div>
        )}

        {/* IG gradient icon badge (bottom-left) — reveal on hover */}
        <div className="absolute bottom-2 left-2 z-10 flex h-6 w-6 scale-75 items-center justify-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] opacity-0 shadow transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <Icon icon="fa6-brands:instagram" className="text-10 text-white" />
        </div>

        {/* Pink border glow on hover */}
        <div className="absolute inset-0 rounded-2xl ring-0 ring-pink-400/50 transition-all duration-300 group-hover:ring-2" />
      </Link>
    </motion.div>
  );
};

const InstagramSlider = ({ limit = 9 }: InstagramSliderProps) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/instagram/posts?limit=${limit}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          const errorData = await response.json();
          let errorMessage = "Failed to fetch Instagram posts";
          if (typeof errorData.error === "object" && errorData.error?.message) {
            errorMessage = errorData.error.message;
          } else if (typeof errorData.error === "string") {
            errorMessage = errorData.error;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(
            typeof data.error === "object"
              ? data.error.message || "Unknown error"
              : data.error
          );
        }

        setPosts(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load Instagram posts");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} delay={i * 0.07} />
        ))}
      </div>
    );
  }

  if (error || posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-gray-200 bg-white py-14 px-6 text-center shadow-sm dark:border-dark_border dark:bg-dark_b/50"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 dark:bg-yellow-500/10">
          <Icon icon="fa6-solid:triangle-exclamation" className="text-2xl text-yellow-500" />
        </div>
        <p className="text-14 font-semibold text-midnight_text dark:text-white">
          Unable to Load Instagram Feed
        </p>
        <p className="max-w-xs text-13 text-muted dark:text-foottext">
          {error || "No posts available. Check back soon!"}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={12}
        slidesPerView={2}
        navigation={{ prevEl: ".ig-prev", nextEl: ".ig-next" }}
        pagination={{ el: ".ig-dots", clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          480: { slidesPerView: 3, spaceBetween: 12 },
          768: { slidesPerView: 4, spaceBetween: 14 },
          1024: { slidesPerView: 5, spaceBetween: 14 },
          1280: { slidesPerView: 6, spaceBetween: 14 },
        }}
        className="!overflow-visible !pb-2"
      >
        {posts.map((post, index) => (
          <SwiperSlide key={post.id}>
            <PostCard post={post} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation row */}
      <div className="mt-7 flex items-center justify-center gap-5">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="ig-prev flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors duration-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark_border dark:bg-white/5 dark:text-foottext dark:hover:border-pink-500/50 dark:hover:bg-pink-500/10 dark:hover:text-pink-400"
        >
          <Icon icon="fa6-solid:chevron-left" className="text-12" />
        </motion.button>

        <div className="ig-dots flex items-center gap-2" />

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="ig-next flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors duration-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark_border dark:bg-white/5 dark:text-foottext dark:hover:border-pink-500/50 dark:hover:bg-pink-500/10 dark:hover:text-pink-400"
        >
          <Icon icon="fa6-solid:chevron-right" className="text-12" />
        </motion.button>
      </div>

      <style jsx>{`
        :global(.ig-dots) {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }

        :global(.ig-dots .swiper-pagination-bullet) {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #d1d5db;
          opacity: 1;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          flex-shrink: 0;
        }

        :global(.dark .ig-dots .swiper-pagination-bullet) {
          background-color: rgba(255, 255, 255, 0.2);
        }

        :global(.ig-dots .swiper-pagination-bullet-active) {
          width: 22px;
          border-radius: 4px;
          background: linear-gradient(90deg, #ee2a7b, #6228d7);
        }
      `}</style>
    </div>
  );
};

export default InstagramSlider;

