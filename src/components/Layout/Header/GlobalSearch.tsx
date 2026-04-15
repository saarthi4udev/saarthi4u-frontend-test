"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { getAllColleges } from "@/app/api/colleges";
import { getAllExams } from "@/app/api/exam";
import { getAllScholarships } from "@/app/api/Scholarship";
import { getAllCategories } from "@/app/api/category";

/* ────────────────── types ────────────────── */
type SearchResult = {
  label: string;
  href: string;
  type: "college" | "exam" | "scholarship" | "category";
  meta?: string;
};

type SearchIndex = {
  items: SearchResult[];
  ready: boolean;
};

/* icons per type */
const TYPE_ICON: Record<SearchResult["type"], string> = {
  college: "solar:buildings-2-bold-duotone",
  exam: "solar:document-text-bold-duotone",
  scholarship: "solar:wallet-money-bold-duotone",
  category: "solar:bookmark-square-bold-duotone",
};

const TYPE_LABEL: Record<SearchResult["type"], string> = {
  college: "Colleges",
  exam: "Exams",
  scholarship: "Scholarships",
  category: "Categories",
};

/* ────────────────── component ────────────────── */
const GlobalSearch: React.FC<{
  onNavigate?: () => void;
  mobile?: boolean;
}> = ({ onNavigate, mobile }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [index, setIndex] = useState<SearchIndex>({ items: [], ready: false });
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);

  /* ── debounce ── */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [query]);

  /* ── build index once on first interaction ── */
  const buildIndex = useCallback(async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setLoading(true);

    try {
      const [collegeRes, examRes, scholarshipRes, categories] = await Promise.all([
        getAllColleges(1, 9999),
        getAllExams(1, 9999),
        getAllScholarships(1, 9999),
        getAllCategories().catch(() => []),
      ]);

      const items: SearchResult[] = [];

      /* colleges */
      const colleges = Array.isArray(collegeRes?.data) ? collegeRes.data : [];
      colleges.forEach((c: any) => {
        items.push({
          label: c.name || c.shortName || "",
          href: `/college/${c.slug}`,
          type: "college",
          meta: [c.location, c.city, c.category].filter(Boolean).join(" · "),
        });
      });

      /* exams */
      const exams = Array.isArray(examRes?.data) ? examRes.data : [];
      exams.forEach((e: any) => {
        items.push({
          label: e.name || "",
          href: `/exam/${e.slug}`,
          type: "exam",
          meta: [e.category, e.level, e.conductingBody].filter(Boolean).join(" · "),
        });
      });

      /* scholarships */
      const scholarships = Array.isArray(scholarshipRes?.data) ? scholarshipRes.data : [];
      scholarships.forEach((s: any) => {
        items.push({
          label: s.name || "",
          href: `/scholarships/${s.slug}`,
          type: "scholarship",
          meta: [s.provider, s.level, s.scholarshipType].filter(Boolean).join(" · "),
        });
      });

      /* categories */
      const cats = Array.isArray(categories) ? categories : [];
      cats.forEach((cat: any) => {
        items.push({
          label: cat.name || "",
          href: `/course?category=${cat.id ?? cat._id ?? ""}`,
          type: "category",
          meta: cat.description?.slice(0, 60) || "",
        });
      });

      setIndex({ items, ready: true });
    } catch (err) {
      console.error("GlobalSearch: index build failed", err);
      setIndex({ items: [], ready: true });
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── search logic ── */
  const results = useMemo(() => {
    if (!debouncedQuery || !index.ready) return [];

    const words = debouncedQuery.split(/\s+/).filter(Boolean);

    const scored = index.items
      .map((item) => {
        const haystack = `${item.label} ${item.meta ?? ""}`.toLowerCase();
        let score = 0;
        let allMatch = true;

        for (const w of words) {
          const idx = haystack.indexOf(w);
          if (idx === -1) {
            allMatch = false;
            break;
          }
          /* boost: exact-start match > substring */
          score += idx === 0 ? 3 : haystack.startsWith(w) ? 2 : 1;
        }

        if (!allMatch) return null;
        return { item, score };
      })
      .filter(Boolean) as { item: SearchResult; score: number }[];

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 20).map((s) => s.item);
  }, [debouncedQuery, index]);

  /* group by type for display */
  const grouped = useMemo(() => {
    const map = new Map<SearchResult["type"], SearchResult[]>();
    for (const r of results) {
      const list = map.get(r.type) || [];
      list.push(r);
      map.set(r.type, list);
    }
    return map;
  }, [results]);

  /* flat list for keyboard nav */
  const flatResults = results;

  /* ── navigation ── */
  const navigate = useCallback(
    (href: string) => {
      setQuery("");
      setFocused(false);
      setActiveIdx(-1);
      inputRef.current?.blur();
      onNavigate?.();
      router.push(href);
    },
    [router, onNavigate]
  );

  /* ── keyboard ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!focused) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIdx((prev) =>
            prev < flatResults.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIdx((prev) =>
            prev > 0 ? prev - 1 : flatResults.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (activeIdx >= 0 && flatResults[activeIdx]) {
            navigate(flatResults[activeIdx].href);
          }
          break;
        case "Escape":
          e.preventDefault();
          setFocused(false);
          inputRef.current?.blur();
          break;
      }
    },
    [focused, activeIdx, flatResults, navigate]
  );

  /* scroll active item into view */
  useEffect(() => {
    if (activeIdx < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  /* reset active on query change */
  useEffect(() => setActiveIdx(-1), [debouncedQuery]);

  /* ── close on outside click ── */
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const showDropdown = focused && debouncedQuery.length > 0;

  /* ────────── render ────────── */
  return (
    <div ref={containerRef} className={`relative ${mobile ? "w-full" : ""}`}>
      {/* input */}
      <div
        className={`flex items-center gap-2 rounded-full border px-3 transition-all duration-300 ${
          mobile
            ? "h-11 border-border bg-white text-midnight_text shadow-sm focus-within:border-secondary/60 dark:border-dark_border dark:bg-dark_b dark:text-white"
            : "h-10 border-border bg-gray-50 text-primary shadow-sm focus-within:border-secondary/60 dark:border-dark_border dark:bg-dark_b dark:text-white"
        }`}
      >
        <Icon
          icon={loading ? "svg-spinners:ring-resize" : "solar:magnifer-linear"}
          className="shrink-0 text-xl text-secondary"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setFocused(true);
            buildIndex();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search colleges, exams, scholarships…"
          className={`bg-transparent p-0 text-14 placeholder:text-muted focus:outline-hidden dark:text-white ${
            mobile ? "w-full" : "w-44 xl:w-48 2xl:w-52"
          }`}
          aria-label="Search colleges, exams, scholarships"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          role="combobox"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="shrink-0 text-muted hover:text-primary dark:hover:text-white"
            aria-label="Clear search"
          >
            <Icon icon="solar:close-circle-linear" className="text-lg" />
          </button>
        )}
      </div>

      {/* dropdown */}
      {showDropdown && (
        <div
          className={`absolute z-[100] mt-2 max-h-[28rem] overflow-y-auto rounded-2xl border border-border/70 bg-white/98 shadow-2xl backdrop-blur-md dark:border-dark_border/70 dark:bg-darkheader/98 ${
            mobile ? "left-0 right-0" : "right-0 w-[26rem]"
          }`}
          ref={listRef}
          role="listbox"
        >
          {/* loading state */}
          {loading && (
            <div className="flex items-center gap-2 px-4 py-6 text-14 text-muted">
              <Icon icon="svg-spinners:ring-resize" className="text-xl text-secondary" />
              Loading search data…
            </div>
          )}

          {/* no results */}
          {!loading && index.ready && results.length === 0 && (
            <div className="px-4 py-6 text-center text-14 text-muted">
              <Icon
                icon="solar:magnifer-zoom-in-linear"
                className="mx-auto mb-2 text-3xl text-muted/60"
              />
              No results for &ldquo;{debouncedQuery}&rdquo;
            </div>
          )}

          {/* grouped results */}
          {!loading && results.length > 0 && (
            <div className="py-2">
              {(["college", "exam", "scholarship", "category"] as const).map((type) => {
                const items = grouped.get(type);
                if (!items?.length) return null;

                let runningIdx = 0;
                for (const t of ["college", "exam", "scholarship", "category"] as const) {
                  if (t === type) break;
                  runningIdx += grouped.get(t)?.length ?? 0;
                }

                return (
                  <div key={type}>
                    <div className="flex items-center gap-2 px-4 pb-1 pt-3 text-[11px] font-bold uppercase tracking-wider text-muted/70">
                      <Icon icon={TYPE_ICON[type]} className="text-sm" />
                      {TYPE_LABEL[type]}
                      <span className="ml-auto text-[10px] font-medium text-muted/50">
                        {items.length}
                      </span>
                    </div>
                    {items.map((item, i) => {
                      const globalIdx = runningIdx + i;
                      const isActive = globalIdx === activeIdx;
                      return (
                        <button
                          key={`${type}-${i}`}
                          data-idx={globalIdx}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => navigate(item.href)}
                          onMouseEnter={() => setActiveIdx(globalIdx)}
                          className={`flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors duration-150 ${
                            isActive
                              ? "bg-secondary/10 dark:bg-secondary/20"
                              : "hover:bg-gray-50 dark:hover:bg-white/5"
                          }`}
                        >
                          <Icon
                            icon={TYPE_ICON[type]}
                            className={`mt-0.5 shrink-0 text-lg ${
                              isActive ? "text-secondary" : "text-muted/60"
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <div
                              className={`truncate text-14 font-medium ${
                                isActive
                                  ? "text-secondary"
                                  : "text-midnight_text dark:text-white/90"
                              }`}
                            >
                              {highlightMatch(item.label, debouncedQuery)}
                            </div>
                            {item.meta && (
                              <div className="truncate text-12 text-muted/70">
                                {item.meta}
                              </div>
                            )}
                          </div>
                          <Icon
                            icon="solar:arrow-right-up-linear"
                            className={`mt-0.5 shrink-0 text-base ${
                              isActive ? "text-secondary" : "text-muted/40"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── highlight matched text ── */
function highlightMatch(text: string, query: string) {
  if (!query) return text;

  const words = query.split(/\s+/).filter(Boolean);
  const pattern = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="font-bold text-secondary">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export default GlobalSearch;
