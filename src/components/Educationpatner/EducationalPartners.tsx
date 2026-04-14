"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { getAllPartners } from "@/app/api/partner";
import EduLoader from "@/components/Common/EduLoader";

const EducationalPartners = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 4; // cards per page

  useEffect(() => {
    const loadPartners = async () => {
      setLoading(true);
      try {
        const res = await getAllPartners(page, LIMIT);

        setPartners(res.data);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPartners();
  }, [page]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <EduLoader overlay={false} message="Loading partners…" />
      </div>
    );
  }

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ opacity: 1 }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative mx-auto px-4">

        {/* Title block */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-secondary mb-3">
            Trusted by institutions
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Our Educational{" "}
            <span className="relative text-secondary">
              Partners
              <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-secondary/40" />
            </span>
          </h2>
          <p className="mt-3 text-muted text-sm">
            {totalPages > 1 && (
              <span className="inline-flex items-center gap-1.5 bg-white dark:bg-dark_b border border-border dark:border-dark_border rounded-full px-3 py-0.5 text-xs font-medium shadow-sm">
                <Icon icon="solar:document-text-bold" className="text-secondary" />
                Page {page} of {totalPages}
              </span>
            )}
          </p>
        </div>

        {/* Cards */}
        {partners.length === 0 ? (
          <p className="text-center mt-10 text-muted">No partners found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
            {partners.map((partner, idx) => (
              <div
                key={partner.id}
                className="group relative rounded-2xl bg-white dark:bg-dark_b border border-border dark:border-dark_border p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(48,216,201,0.12)]"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Gradient accent line at top */}
                <span className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full bg-gradient-to-r from-secondary/60 via-secondary to-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Image */}
                <div className="w-full h-[110px] flex items-center justify-center mb-4 rounded-xl bg-hero-bg dark:bg-darkHeroBg p-3">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={120}
                    height={100}
                    unoptimized
                    className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-primary dark:text-white group-hover:text-secondary transition-colors duration-200">
                  {partner.name}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                  {partner.description}
                </p>

                {/* Services pill */}
                <div className="mt-4 text-xs font-medium text-muted bg-hero-bg dark:bg-darkHeroBg px-4 py-1.5 rounded-full border border-border dark:border-dark_border">
                  {partner.services || "No Services"}
                </div>

                {/* Tag */}
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
                  <Icon icon="solar:check-circle-bold" className="text-[18px]" />
                  <span>{partner.tag}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-14">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-full border border-border dark:border-dark_border bg-white dark:bg-dark_b flex items-center justify-center text-primary dark:text-white transition-all duration-200 hover:border-secondary hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              <Icon icon="solar:arrow-left-linear" className="text-lg" />
            </button>

            <div className="flex gap-2 items-center">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`rounded-full transition-all duration-300 ${
                    page === i + 1
                      ? "w-8 h-3 bg-secondary shadow-[0_0_10px_rgba(48,216,201,0.5)]"
                      : "w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-secondary/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-full border border-border dark:border-dark_border bg-white dark:bg-dark_b flex items-center justify-center text-primary dark:text-white transition-all duration-200 hover:border-secondary hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              <Icon icon="solar:arrow-right-linear" className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EducationalPartners;