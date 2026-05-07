"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";
import { YoutubeVideo } from "@/app/api/youtube/feed";
import YoutubePlayerModal from "@/components/Youtube/YoutubePlayerModal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface YoutubeSliderProps {
  limit?: number;
}

// ─────────────────────────────────────────────
// Skeletons
// ─────────────────────────────────────────────

const VideoSkeleton = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className="overflow-hidden rounded-2xl"
  >
    <div className="aspect-video w-full animate-pulse rounded-2xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-white/5 dark:via-white/10 dark:to-white/5" />
    <div className="mt-3 h-4 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
    <div className="mt-2 h-3 w-2/5 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
  </motion.div>
);

const ShortSkeleton = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className="aspect-[9/16] w-full animate-pulse rounded-2xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-white/5 dark:via-white/10 dark:to-white/5"
  />
);

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const formatViews = (n: number): string => {
  if (!n) return "";
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${n}`;
};

// Allow middle/cmd/ctrl/shift click to fall through to native open-on-youtube
const isModifiedClick = (e: React.MouseEvent): boolean =>
  e.button === 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

// ─────────────────────────────────────────────
// Featured Video card — 16:9, plays inline on click
// ─────────────────────────────────────────────

const VideoCard = ({
  video,
  index,
  onPlay,
}: {
  video: YoutubeVideo;
  index: number;
  onPlay: (video: YoutubeVideo) => void;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isModifiedClick(e)) return; // let browser open YT in new tab
    e.preventDefault();
    onPlay(video);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 24, scale: 0.95 }
      }
      transition={{
        duration: 0.45,
        delay: (index % 6) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <a
        href={video.permalink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label={`Play "${video.title}"`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-red-300 hover:shadow-2xl hover:shadow-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:border-dark_border/60 dark:bg-dark_b/50 dark:hover:border-red-500/40"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <Image
            src={video.thumbnail}
            alt={video.title?.slice(0, 80) || "YouTube video"}
            width={640}
            height={360}
            quality={85}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

          {/* Center play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/95 shadow-2xl shadow-red-900/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600">
              <Icon icon="fa6-solid:play" className="ml-1 text-xl text-white" />
            </div>
          </div>

          {/* "Watch here" hint */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 translate-y-12 rounded-full bg-white/95 px-3 py-1 text-10 font-semibold text-red-600 opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover:translate-y-14 group-hover:opacity-100">
            Watch here
          </div>

          {/* Top-right: VIDEO badge */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 shadow-md">
            <Icon icon="fa6-brands:youtube" className="text-12 text-white" />
            <span className="text-9 font-semibold uppercase tracking-wider text-white">
              Video
            </span>
          </div>

          {/* Bottom-right: duration */}
          {video.durationLabel && (
            <div className="absolute bottom-3 right-3 z-10 rounded-md bg-black/80 px-2 py-0.5 text-11 font-semibold text-white">
              {video.durationLabel}
            </div>
          )}
        </div>

        {/* Title */}
        <div className="flex flex-1 flex-col px-4 py-4">
          <p className="line-clamp-2 text-14 font-semibold leading-snug text-midnight_text dark:text-white">
            {video.title}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-11 text-muted dark:text-foottext">
            {video.channelTitle && <span>{video.channelTitle}</span>}
            {video.viewCount > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-current opacity-50" />
                <span>{formatViews(video.viewCount)} views</span>
              </>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-red-500/40 transition-all duration-300 group-hover:ring-2" />
      </a>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Short card — 9:16 vertical, plays inline on click
// ─────────────────────────────────────────────

const ShortCard = ({
  video,
  index,
  onPlay,
}: {
  video: YoutubeVideo;
  index: number;
  onPlay: (video: YoutubeVideo) => void;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isModifiedClick(e)) return;
    e.preventDefault();
    onPlay(video);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 24, scale: 0.95 }
      }
      transition={{
        duration: 0.45,
        delay: (index % 6) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <a
        href={video.permalink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label={`Play short "${video.title}"`}
        className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-black shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-red-300 hover:shadow-xl hover:shadow-red-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:border-dark_border/60 dark:hover:border-red-500/40"
      >
        <Image
          src={video.thumbnail}
          alt={video.title?.slice(0, 80) || "YouTube short"}
          width={400}
          height={711}
          quality={85}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600">
            <Icon
              icon="fa6-solid:play"
              className="ml-0.5 text-base text-white"
            />
          </div>
        </div>

        {/* Top-left: SHORTS badge */}
        <div className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 shadow">
          <Icon icon="fa6-solid:bolt" className="text-9 text-white" />
          <span className="text-9 font-bold uppercase tracking-wider text-white">
            Shorts
          </span>
        </div>

        {/* Bottom: title + views */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-3 pb-3">
          <p className="line-clamp-2 text-12 font-semibold leading-snug text-white drop-shadow">
            {video.title}
          </p>
          {video.viewCount > 0 && (
            <p className="mt-1 flex items-center gap-1 text-10 text-white/80">
              <Icon icon="fa6-solid:eye" className="text-9" />
              {formatViews(video.viewCount)} views
            </p>
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-red-500/50 transition-all duration-300 group-hover:ring-2" />
      </a>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

const YoutubeSlider = ({ limit = 24 }: YoutubeSliderProps) => {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<YoutubeVideo | null>(null);

  const handlePlay = useCallback((video: YoutubeVideo) => {
    setActiveVideo(video);
  }, []);

  const handleClose = useCallback(() => {
    setActiveVideo(null);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/youtube/videos?limit=${limit}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          let errorMessage = "Failed to fetch YouTube videos";
          if (typeof errorData.error === "object" && errorData.error?.message) {
            errorMessage = errorData.error.message;
          } else if (typeof errorData.error === "string") {
            errorMessage = errorData.error;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        if (data?.error) {
          throw new Error(
            typeof data.error === "object"
              ? data.error.message || "Unknown error"
              : data.error
          );
        }

        const list: YoutubeVideo[] = Array.isArray(data) ? data : [];
        // eslint-disable-next-line no-console
        console.log("[YouTube] fetched payload", {
          total: list.length,
          shorts: list.filter((v) => v.isShort).length,
          videos: list.filter((v) => !v.isShort).length,
          payload: list,
        });
        setVideos(list);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load YouTube videos");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [limit]);

  const longForm = useMemo(() => videos.filter((v) => !v.isShort), [videos]);
  const shorts = useMemo(() => videos.filter((v) => v.isShort), [videos]);

  if (loading) {
    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <VideoSkeleton key={i} delay={i * 0.07} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <ShortSkeleton key={i} delay={i * 0.06} />
          ))}
        </div>
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-gray-200 bg-white py-14 px-6 text-center shadow-sm dark:border-dark_border dark:bg-dark_b/50"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
          <Icon icon="fa6-brands:youtube" className="text-2xl text-red-500" />
        </div>
        <p className="text-14 font-semibold text-midnight_text dark:text-white">
          Unable to Load YouTube Videos
        </p>
        <p className="max-w-xs text-13 text-muted dark:text-foottext">
          {error || "No videos available. Check back soon!"}
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="space-y-12">
        {/* ─────────────── Featured Videos ─────────────── */}
        {longForm.length > 0 && (
          <div>
            <div className="mb-5 flex items-end justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 shadow-md shadow-red-500/30">
                  <Icon
                    icon="fa6-solid:circle-play"
                    className="text-base text-white"
                  />
                </span>
                <div>
                  <h3 className="text-16 font-bold text-midnight_text dark:text-white md:text-18">
                    Featured Videos
                  </h3>
                  <p className="text-11 text-muted dark:text-foottext">
                    Tap any card — plays right here on the page
                  </p>
                </div>
              </div>
              <span className="hidden shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1 text-11 font-medium text-muted shadow-sm dark:border-dark_border dark:bg-white/5 dark:text-foottext sm:inline-block">
                {longForm.length} video{longForm.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                navigation={{ prevEl: ".yt-vid-prev", nextEl: ".yt-vid-next" }}
                pagination={{ el: ".yt-vid-dots", clickable: true }}
                autoplay={{
                  delay: 5500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 16 },
                  1024: { slidesPerView: 3, spaceBetween: 18 },
                }}
                className="!overflow-visible !pb-2"
              >
                {longForm.map((video, index) => (
                  <SwiperSlide key={video.id} className="!h-auto">
                    <VideoCard
                      video={video}
                      index={index}
                      onPlay={handlePlay}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="mt-7 flex items-center justify-center gap-5">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  aria-label="Previous video"
                  className="yt-vid-prev flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark_border dark:bg-white/5 dark:text-foottext dark:hover:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                  <Icon icon="fa6-solid:chevron-left" className="text-12" />
                </motion.button>
                <div className="yt-vid-dots flex items-center gap-2" />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  aria-label="Next video"
                  className="yt-vid-next flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark_border dark:bg-white/5 dark:text-foottext dark:hover:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                  <Icon icon="fa6-solid:chevron-right" className="text-12" />
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────── Shorts ─────────────── */}
        {shorts.length > 0 && (
          <div>
            <div className="mb-5 flex items-end justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-md shadow-red-500/30">
                  <Icon icon="fa6-solid:bolt" className="text-base text-white" />
                </span>
                <div>
                  <h3 className="text-16 font-bold text-midnight_text dark:text-white md:text-18">
                    Shorts
                  </h3>
                  <p className="text-11 text-muted dark:text-foottext">
                    Bite-sized clips, tap to play
                  </p>
                </div>
              </div>
              <span className="hidden shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1 text-11 font-medium text-muted shadow-sm dark:border-dark_border dark:bg-white/5 dark:text-foottext sm:inline-block">
                {shorts.length} short{shorts.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={12}
                slidesPerView={2}
                navigation={{
                  prevEl: ".yt-shorts-prev",
                  nextEl: ".yt-shorts-next",
                }}
                pagination={{ el: ".yt-shorts-dots", clickable: true }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  480: { slidesPerView: 3, spaceBetween: 12 },
                  768: { slidesPerView: 4, spaceBetween: 14 },
                  1024: { slidesPerView: 5, spaceBetween: 14 },
                  1280: { slidesPerView: 6, spaceBetween: 16 },
                }}
                className="!overflow-visible !pb-2"
              >
                {shorts.map((video, index) => (
                  <SwiperSlide key={video.id}>
                    <ShortCard
                      video={video}
                      index={index}
                      onPlay={handlePlay}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="mt-7 flex items-center justify-center gap-5">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  aria-label="Previous short"
                  className="yt-shorts-prev flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark_border dark:bg-white/5 dark:text-foottext dark:hover:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                  <Icon icon="fa6-solid:chevron-left" className="text-12" />
                </motion.button>
                <div className="yt-shorts-dots flex items-center gap-2" />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  aria-label="Next short"
                  className="yt-shorts-next flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark_border dark:bg-white/5 dark:text-foottext dark:hover:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                  <Icon icon="fa6-solid:chevron-right" className="text-12" />
                </motion.button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          :global(.yt-vid-dots),
          :global(.yt-shorts-dots) {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px;
          }

          :global(.yt-vid-dots .swiper-pagination-bullet),
          :global(.yt-shorts-dots .swiper-pagination-bullet) {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background-color: #d1d5db;
            opacity: 1;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            flex-shrink: 0;
          }

          :global(.dark .yt-vid-dots .swiper-pagination-bullet),
          :global(.dark .yt-shorts-dots .swiper-pagination-bullet) {
            background-color: rgba(255, 255, 255, 0.2);
          }

          :global(.yt-vid-dots .swiper-pagination-bullet-active),
          :global(.yt-shorts-dots .swiper-pagination-bullet-active) {
            width: 22px;
            border-radius: 4px;
            background: linear-gradient(90deg, #ef4444, #b91c1c);
          }
        `}</style>
      </div>

      <YoutubePlayerModal video={activeVideo} onClose={handleClose} />
    </>
  );
};

export default YoutubeSlider;
