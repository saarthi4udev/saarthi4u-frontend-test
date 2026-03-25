"use client";

import { getResultLinks } from "@/app/api/results";
import { ResultItem, ResultSection } from "@/types/result";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SectionFilter = "All Results" | ResultSection;
type ScopeFilter = "All" | "National" | "International";

export default function ResultsSection() {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeScope, setActiveScope] = useState<ScopeFilter>("All");
  const [activeSection, setActiveSection] = useState<SectionFilter>("All Results");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);

  const RESULTS_PER_PAGE = 12;

  useEffect(() => {
    const loadResults = async () => {
      const data = await getResultLinks();
      setResults(data);
    };

    loadResults();
  }, []);

  const scopedResults = useMemo(() => {
    if (activeScope === "National") {
      return results.filter((item) => item.section !== "Global Results");
    }

    if (activeScope === "International") {
      return results.filter((item) => item.section === "Global Results");
    }

    return results;
  }, [activeScope, results]);

  const sectionResults = useMemo(() => {
    if (activeSection === "All Results") {
      return scopedResults;
    }

    return scopedResults.filter((item) => item.section === activeSection);
  }, [activeSection, scopedResults]);

  const categoryOptions = useMemo(() => {
    const categories = [...new Set(sectionResults.map((item) => item.category).filter(Boolean))];
    return ["All Categories", ...categories.sort((a, b) => a.localeCompare(b))];
  }, [sectionResults]);

  useEffect(() => {
    if (!categoryOptions.includes(activeCategory)) {
      setActiveCategory("All Categories");
    }
  }, [activeCategory, categoryOptions]);

  useEffect(() => {
    if (activeScope === "International" && activeSection !== "All Results" && activeSection !== "Global Results") {
      setActiveSection("Global Results");
      return;
    }

    if (activeScope === "National" && activeSection === "Global Results") {
      setActiveSection("All Results");
    }
  }, [activeScope, activeSection]);

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return sectionResults
      .filter((item) => {
        if (activeCategory !== "All Categories" && item.category !== activeCategory) {
          return false;
        }

        if (!query) {
          return true;
        }

        return (
          item.resultName.toLowerCase().includes(query) ||
          item.section.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.board.toLowerCase().includes(query) ||
          (item.source || "").toLowerCase().includes(query) ||
          (item.description || "").toLowerCase().includes(query)
        );
      })
      .sort((a, b) => a.resultName.localeCompare(b.resultName));
  }, [activeCategory, searchQuery, sectionResults]);

  const stats = useMemo(() => {
    const boardCount = results.filter((item) => item.section === "Board Results").length;
    const examCount = results.filter((item) => item.section === "Competitive Exams").length;
    const globalCount = results.filter((item) => item.section === "Global Results").length;
    const authorities = new Set(results.map((item) => item.source || item.board)).size;

    return { boardCount, examCount, globalCount, authorities };
  }, [results]);

  const featuredGlobal = useMemo(
    () =>
      results
        .filter((item) => item.section === "Global Results")
        .slice(0, 8),
    [results]
  );

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All Categories");
    setActiveScope("All");
    setActiveSection("All Results");
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeScope, activeSection, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / RESULTS_PER_PAGE));

  const currentPageResults = useMemo(() => {
    const start = (currentPage - 1) * RESULTS_PER_PAGE;
    return filteredResults.slice(start, start + RESULTS_PER_PAGE);
  }, [currentPage, filteredResults]);

  const pageButtons = useMemo(() => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const sectionTabs: SectionFilter[] =
    activeScope === "International"
      ? ["All Results", "Global Results"]
      : activeScope === "National"
      ? ["All Results", "Competitive Exams", "Board Results"]
      : ["All Results", "Competitive Exams", "Board Results", "Global Results"];

  const scopeTabs: ScopeFilter[] = ["All", "National", "International"];

  const isExternalLink = (url: string) => /^https?:\/\//i.test(url);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-hero-bg to-white py-12 dark:from-darkmode dark:to-darkmode">
      <div className="pointer-events-none absolute -left-24 top-10 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-16 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />

      <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mb-6 rounded-3xl border border-border bg-white/90 px-6 py-8 text-center shadow-sm backdrop-blur-sm dark:border-dark_border dark:bg-darkheader/80"
        >
          <span className="mb-4 inline-flex h-9 items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-4 text-13 font-bold uppercase tracking-[0.08em] text-primary dark:border-primary/35 dark:bg-primary/15">
            <Icon icon="solar:medal-ribbons-star-outline" className="text-16" />
            Official Results Directory
          </span>

          <h1 className="mb-2 text-32 font-extrabold text-midnight_text dark:text-white md:text-44">
            Pan India Results Hub
          </h1>
          <p className="mx-auto max-w-3xl text-16 text-muted dark:text-white/70">
            All major national and international result links in one place with fast filters and easy access.
          </p>
        </motion.div>

        <div className="mb-6 grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-white p-3 dark:border-dark_border dark:bg-darkheader">
            <p className="text-12 text-muted dark:text-white/65">Board Links</p>
            <p className="mt-1 text-20 font-bold text-midnight_text dark:text-white">{stats.boardCount}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-3 dark:border-dark_border dark:bg-darkheader">
            <p className="text-12 text-muted dark:text-white/65">Exam Links</p>
            <p className="mt-1 text-20 font-bold text-midnight_text dark:text-white">{stats.examCount}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-3 dark:border-dark_border dark:bg-darkheader">
            <p className="text-12 text-muted dark:text-white/65">Global Links</p>
            <p className="mt-1 text-20 font-bold text-midnight_text dark:text-white">{stats.globalCount}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-3 dark:border-dark_border dark:bg-darkheader">
            <p className="text-12 text-muted dark:text-white/65">Authorities</p>
            <p className="mt-1 text-20 font-bold text-midnight_text dark:text-white">{stats.authorities}</p>
          </div>
        </div>

        {(activeSection === "All Results" || activeSection === "Global Results") && featuredGlobal.length > 0 && (
          <div className="mb-6 rounded-2xl border border-border bg-white p-4 shadow-sm dark:border-dark_border dark:bg-darkheader">
            <div className="mb-3 flex items-center gap-2">
              <Icon icon="solar:global-bold-duotone" className="text-20 text-secondary" />
              <p className="text-14 font-semibold text-midnight_text dark:text-white">Worldwide Top Results</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {featuredGlobal.map((item) => (
                <a
                  key={item.id}
                  href={item.officialResultLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center gap-1 rounded-full border border-secondary/30 bg-secondary/10 px-3 text-12 font-semibold text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:text-white"
                >
                  {item.resultName.replace(" Result", "")}
                  <Icon icon="solar:arrow-right-up-linear" className="text-14" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 rounded-2xl border border-border bg-white p-4 shadow-sm dark:border-dark_border dark:bg-darkheader">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <p className="text-13 font-semibold text-midnight_text dark:text-white">Scope:</p>
            {scopeTabs.map((scope) => {
              const isActive = activeScope === scope;
              return (
                <button
                  key={scope}
                  type="button"
                  onClick={() => setActiveScope(scope)}
                  className={`inline-flex h-9 items-center rounded-full border px-4 text-13 font-semibold transition-all duration-300 ${
                    isActive
                      ? "border-secondary/40 bg-secondary text-white"
                      : "border-border bg-hero-bg text-midnight_text hover:border-secondary/35 hover:text-secondary dark:border-dark_border dark:bg-dark_b dark:text-white"
                  }`}
                >
                  {scope}
                </button>
              );
            })}

            <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-12 font-semibold text-primary dark:bg-primary/20">
              {activeScope === "All"
                ? "Showing national + international"
                : activeScope === "National"
                ? "Showing India-focused results"
                : "Showing worldwide results"}
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {sectionTabs.map((tab) => {
              const isActive = activeSection === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveSection(tab)}
                  className={`inline-flex h-9 items-center rounded-full border px-4 text-13 font-semibold transition-all duration-300 ${
                    isActive
                      ? "border-primary/40 bg-primary text-white"
                      : "border-border bg-hero-bg text-midnight_text hover:border-primary/35 hover:text-primary dark:border-dark_border dark:bg-dark_b dark:text-white"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="relative">
              <Icon
                icon="solar:magnifer-linear"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-18 text-muted dark:text-white/60"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search exam, board, category, authority..."
                className="h-11 w-full rounded-xl border border-border bg-hero-bg pl-10 pr-10 text-15 text-midnight_text transition-all duration-300 focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/15 dark:border-dark_border dark:bg-dark_b dark:text-white"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-primary/10 hover:text-primary dark:text-white/70"
                  aria-label="Clear search"
                >
                  <Icon icon="solar:close-circle-linear" className="text-18" />
                </button>
              )}
            </div>

            <p className="text-14 text-muted dark:text-white/65">
              Showing {filteredResults.length} result links
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categoryOptions.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex h-8 items-center rounded-full border px-3 text-12 font-semibold transition-all duration-300 ${
                    isActive
                      ? "border-secondary/40 bg-secondary text-white"
                      : "border-border bg-hero-bg text-midnight_text hover:border-secondary/35 hover:text-secondary dark:border-dark_border dark:bg-dark_b dark:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {(searchQuery || activeCategory !== "All Categories" || activeSection !== "All Results" || activeScope !== "All") && (
            <div className="mt-4 border-t border-border pt-4 dark:border-dark_border">
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-9 items-center rounded-full border border-primary/35 px-4 text-13 font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {filteredResults.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm dark:border-dark_border dark:bg-darkheader"
          >
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon icon="solar:document-text-search-linear" className="text-24" />
            </div>
            <h3 className="text-20 font-semibold text-midnight_text dark:text-white">No matching result link found</h3>
            <p className="mt-2 text-15 text-muted dark:text-white/70">Try another keyword or reset filters.</p>
          </motion.div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {currentPageResults.map((result, index) => {
              const external = isExternalLink(result.officialResultLink);
              return (
                <motion.article
                  key={result.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: index * 0.01 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-md dark:border-dark_border dark:bg-darkheader"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-6 items-center rounded-full border border-secondary/25 bg-secondary/10 px-2.5 text-11 font-semibold text-secondary">
                      {result.section}
                    </span>
                    <span className="inline-flex h-6 items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 text-11 font-semibold text-primary">
                      {result.category}
                    </span>
                  </div>

                  <h3 className="text-16 font-bold text-midnight_text dark:text-white">{result.resultName}</h3>

                  <p className="mt-1 text-13 font-semibold text-midnight_text/75 dark:text-white/75">
                    {result.source || result.board}
                  </p>

                  <p className="mt-2 min-h-[2.8rem] text-14 text-muted dark:text-white/70">{result.description}</p>

                  {external ? (
                    <a
                      href={result.officialResultLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-14 font-semibold text-white transition-all duration-300 hover:opacity-90"
                    >
                      Open Official Result
                      <Icon icon="solar:arrow-right-linear" className="text-16" />
                    </a>
                  ) : (
                    <Link
                      href={result.officialResultLink}
                      className="mt-auto inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-14 font-semibold text-white transition-all duration-300 hover:opacity-90"
                    >
                      Open Result Details
                      <Icon icon="solar:arrow-right-linear" className="text-16" />
                    </Link>
                  )}
                </motion.article>
              );
              })}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-13 text-muted dark:text-white/65">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex h-9 items-center rounded-full border border-border px-4 text-13 font-semibold text-midnight_text transition-all duration-300 hover:border-primary/35 hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 dark:border-dark_border dark:text-white"
                >
                  Prev
                </button>

                {pageButtons.map((pageNum) => {
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-13 font-semibold transition-all duration-300 ${
                        isActive
                          ? "border-primary/40 bg-primary text-white"
                          : "border-border bg-white text-midnight_text hover:border-primary/35 hover:text-primary dark:border-dark_border dark:bg-darkheader dark:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex h-9 items-center rounded-full border border-border px-4 text-13 font-semibold text-midnight_text transition-all duration-300 hover:border-primary/35 hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 dark:border-dark_border dark:text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
