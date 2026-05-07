"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { YoutubeVideo } from "@/app/api/youtube/feed";

interface YoutubePlayerModalProps {
  video: YoutubeVideo | null;
  onClose: () => void;
}

const YoutubePlayerModal = ({ video, onClose }: YoutubePlayerModalProps) => {
  useEffect(() => {
    if (!video) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          key="yt-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/90 px-4 py-8 backdrop-blur-md sm:px-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${
              video.isShort ? "max-w-[min(92vw,400px)]" : "max-w-5xl"
            }`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close player"
              className="absolute -top-2 -right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-2xl transition-all duration-200 hover:scale-110 hover:bg-red-50 hover:text-red-600 sm:-top-4 sm:-right-4 sm:h-11 sm:w-11"
            >
              <Icon icon="fa6-solid:xmark" className="text-base" />
            </button>

            {/* Player frame */}
            <div
              className={`overflow-hidden rounded-2xl bg-black shadow-[0_30px_80px_-20px_rgba(220,38,38,0.45)] ring-1 ring-white/10 ${
                video.isShort ? "aspect-[9/16]" : "aspect-video"
              }`}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full"
              />
            </div>

            {/* Footer */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-14 font-semibold text-white">
                  {video.title}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-11 text-white/60">
                  {video.channelTitle && <span>{video.channelTitle}</span>}
                  {video.durationLabel && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-white/40" />
                      <span>{video.durationLabel}</span>
                    </>
                  )}
                  {video.viewCount > 0 && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-white/40" />
                      <span>{video.viewCount.toLocaleString()} views</span>
                    </>
                  )}
                </p>
              </div>
              <Link
                href={video.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/20 bg-white/5 px-4 py-2 text-12 font-semibold text-white backdrop-blur-sm transition-all hover:border-red-400/50 hover:bg-red-500/15 sm:self-auto"
              >
                <Icon
                  icon="fa6-brands:youtube"
                  className="text-base text-red-500"
                />
                Open on YouTube
                <Icon
                  icon="fa6-solid:arrow-up-right-from-square"
                  className="text-9 opacity-70"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default YoutubePlayerModal;
