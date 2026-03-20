"use client";

import { getBoardResults } from "@/app/api/results";
import { BoardResult } from "@/types/result";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function ResultsSection() {
  const [results, setResults] = useState<BoardResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBoard, setActiveBoard] = useState("All Boards");

  useEffect(() => {
    const loadResults = async () => {
      const data = await getBoardResults();
      setResults(data);
    };

    loadResults();
  }, []);

  const groupedResults = useMemo(
    () =>
      results.reduce<Record<string, BoardResult[]>>((groups, item) => {
        if (!groups[item.board]) {
          groups[item.board] = [];
        }

        groups[item.board].push(item);
        return groups;
      }, {}),
    [results]
  );

  const boards = useMemo(
    () => Object.keys(groupedResults).sort((a, b) => a.localeCompare(b)),
    [groupedResults]
  );

  const visibleBoards = useMemo(
    () => ["All Boards", ...boards],
    [boards]
  );

  const filteredGroupedResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return boards.reduce<Record<string, BoardResult[]>>((groups, board) => {
      if (activeBoard !== "All Boards" && board !== activeBoard) {
        return groups;
      }

      const matches = groupedResults[board].filter((item) => {
        if (!query) {
          return true;
        }

        return (
          item.board.toLowerCase().includes(query) ||
          item.resultName.toLowerCase().includes(query) ||
          (item.description ?? "").toLowerCase().includes(query)
        );
      });

      if (matches.length > 0) {
        groups[board] = matches;
      }

      return groups;
    }, {});
  }, [activeBoard, boards, groupedResults, searchQuery]);

  const filteredBoards = useMemo(
    () => Object.keys(filteredGroupedResults),
    [filteredGroupedResults]
  );

  const totalFilteredResults = useMemo(
    () =>
      filteredBoards.reduce(
        (count, board) => count + filteredGroupedResults[board].length,
        0
      ),
    [filteredBoards, filteredGroupedResults]
  );

  const topBoard = useMemo(() => {
    if (boards.length === 0) return "-";

    return boards.reduce((bestBoard, currentBoard) => {
      const bestCount = groupedResults[bestBoard]?.length ?? 0;
      const currentCount = groupedResults[currentBoard]?.length ?? 0;
      return currentCount > bestCount ? currentBoard : bestBoard;
    }, boards[0]);
  }, [boards, groupedResults]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveBoard("All Boards");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-hero-bg to-white py-14 dark:from-darkmode dark:to-darkmode">
      <div className="pointer-events-none absolute -left-24 top-10 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-16 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-8 rounded-3xl border border-border bg-white/85 px-6 py-10 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:border-dark_border dark:bg-darkheader/80"
        >
          <span className="mb-4 inline-flex h-9 items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-4 text-13 font-bold uppercase tracking-[0.08em] text-primary dark:border-primary/35 dark:bg-primary/15">
            <Icon icon="solar:medal-ribbons-star-outline" className="text-16" />
            Official Results Directory
          </span>
          <h1 className="mb-3 text-35 font-extrabold text-midnight_text dark:text-white md:text-5xl">
            Board Results
          </h1>
          <p className="mx-auto max-w-3xl text-17 font-medium text-muted dark:text-white/70">
            Browse available SSC, HSC, NCERT, CBSE, and other board result entries.
            Select any result to continue on the official website.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8 grid gap-4 sm:grid-cols-3"
        >
          {[
            {
              label: "Total Boards",
              value: String(boards.length),
              icon: "solar:buildings-outline",
            },
            {
              label: "Listed Results",
              value: String(results.length),
              icon: "solar:document-text-outline",
            },
            {
              label: "Top Board",
              value: topBoard,
              icon: "solar:star-bold",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-white/90 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md dark:border-dark_border dark:bg-midnight_text"
            >
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon icon={item.icon} className="text-18" />
              </div>
              <p className="text-13 font-semibold text-muted dark:text-white/65">{item.label}</p>
              <p className="mt-1 text-22 font-extrabold text-midnight_text dark:text-white">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {boards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="mb-8 rounded-2xl border border-border bg-white p-4 shadow-sm dark:border-dark_border dark:bg-darkheader"
          >
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
                  placeholder="Search board or result name..."
                  className="h-11 rounded-xl border border-border bg-hero-bg pl-10 pr-10 text-15 text-midnight_text transition-all duration-300 focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/15 dark:border-dark_border dark:bg-dark_b dark:text-white dark:focus:border-primary/40"
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

              <div className="flex flex-wrap gap-2">
                {visibleBoards.map((board) => {
                  const isActive = activeBoard === board;

                  return (
                    <motion.button
                      key={board}
                      type="button"
                      onClick={() => setActiveBoard(board)}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className={`inline-flex h-9 items-center rounded-full border px-3 text-13 font-semibold transition-all duration-300 ${
                        isActive
                          ? "border-primary/40 bg-primary text-white shadow-sm shadow-primary/30"
                          : "border-border bg-hero-bg text-midnight_text hover:border-primary/35 hover:text-primary dark:border-dark_border dark:bg-dark_b dark:text-white dark:hover:border-primary/35 dark:hover:text-primary"
                      }`}
                    >
                      {board}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 dark:border-dark_border">
              <p className="text-14 text-muted dark:text-white/70">
                Showing <span className="font-semibold text-primary">{totalFilteredResults}</span> result
                {totalFilteredResults !== 1 ? "s" : ""} across {filteredBoards.length} board
                {filteredBoards.length !== 1 ? "s" : ""}.
              </p>

              {(searchQuery || activeBoard !== "All Boards") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-9 items-center rounded-full border border-primary/35 px-4 text-13 font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </motion.div>
        )}

        {boards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-border bg-white p-6 text-center text-16 text-muted shadow-sm dark:border-dark_border dark:bg-midnight_text dark:text-white/70"
          >
            No result entries are available right now.
          </motion.div>
        ) : filteredBoards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
                className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm dark:border-dark_border dark:bg-darkheader"
          >
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon icon="solar:document-text-search-linear" className="text-24" />
            </div>
            <h3 className="text-20 font-semibold text-midnight_text dark:text-white">
              No matching result found
            </h3>
            <p className="mt-2 text-15 text-muted dark:text-white/70">
              Try another board name or clear your filters to see all available results.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex h-10 items-center rounded-full bg-primary px-5 text-14 font-semibold text-white transition-all duration-300 hover:opacity-90"
            >
              Show All Results
            </button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {filteredBoards.map((board, boardIndex) => (
              <motion.div
                key={board}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.5, delay: boardIndex * 0.06 }}
                className="rounded-3xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-dark_border dark:bg-darkheader"
              >
                <div className="mb-4 flex flex-wrap items-center gap-2.5">
                  <h2 className="text-24 font-extrabold text-midnight_text dark:text-white">
                    {board}
                  </h2>
                  <span className="inline-flex h-7 items-center rounded-full border border-primary/20 bg-primary/10 px-3 text-13 font-semibold text-primary dark:border-primary/30 dark:bg-primary/15">
                    {filteredGroupedResults[board].length} Result
                    {filteredGroupedResults[board].length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {filteredGroupedResults[board].map((result, resultIndex) => (
                    <motion.article
                      key={result.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -4, scale: 1.01 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: resultIndex * 0.06 }}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-hero-bg/60 p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-md dark:border-dark_border dark:bg-dark_b/75"
                    >
                      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

                      <h3 className="relative min-h-[3rem] text-18 font-bold text-midnight_text transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                        {result.resultName}
                      </h3>

                      {result.description && (
                        <p className="relative mt-2 min-h-[2.7rem] text-15 text-muted dark:text-white/70">
                          {result.description}
                        </p>
                      )}

                      <motion.a
                        href={result.officialResultLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative mt-auto inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-14 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                      >
                        View Official Result
                        <Icon
                          icon="solar:arrow-right-linear"
                          className="text-16 transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </motion.a>

                      <p className="mt-3 text-13 text-muted dark:text-white/60">
                        Opens official board website in a new tab.
                      </p>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/35 hover:shadow-md dark:border-dark_border dark:bg-darkheader"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-20 font-extrabold text-midnight_text dark:text-white">
                    Can’t find your board result?
                  </h3>
                  <p className="mt-1 text-15 text-muted dark:text-white/70">
                    Contact us and we will add/update official links quickly.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex h-10 items-center rounded-full border border-primary/35 px-5 text-14 font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  Request New Result Link
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
