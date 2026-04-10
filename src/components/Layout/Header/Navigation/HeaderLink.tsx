"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { HeaderItem, SubmenuItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

const NestedSubmenuItem: React.FC<{
  item: SubmenuItem;
  path: string;
  onClose: () => void;
}> = ({ item, path, onClose }) => {
  const [isNestedOpen, setIsNestedOpen] = useState(false);
  const nestedRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const hasNestedSubmenu = Boolean(item.submenu?.length);
  const isCurrentItem = path === item.href || path.startsWith(`${item.href}/`);

  const handleMouseLeave = useCallback(() => {
    setIsNestedOpen(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!hasNestedSubmenu) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setIsNestedOpen(!isNestedOpen);
        break;
      case "Escape":
        e.preventDefault();
        setIsNestedOpen(false);
        break;
      case "ArrowRight":
        e.preventDefault();
        setIsNestedOpen(true);
        break;
      case "ArrowLeft":
        e.preventDefault();
        setIsNestedOpen(false);
        break;
    }
  }, [hasNestedSubmenu, isNestedOpen]);

  useEffect(() => {
    if (!hasNestedSubmenu || !nestedRef.current) return;

    nestedRef.current.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      nestedRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasNestedSubmenu, handleMouseLeave]);

  if (!hasNestedSubmenu) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-14 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
          isCurrentItem
            ? "bg-secondary text-white"
            : "text-midnight_text hover:bg-secondary/10 hover:text-secondary dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white"
        }`}
      >
        {item.label}
        <Icon icon="solar:arrow-right-linear" className="text-base" />
      </Link>
    );
  }

  return (
    <div
      ref={nestedRef}
      className="relative"
      onMouseEnter={() => setIsNestedOpen(true)}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        onClick={() => setIsNestedOpen(!isNestedOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isNestedOpen}
        aria-haspopup="menu"
        className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-14 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
          isCurrentItem || isNestedOpen
            ? "bg-secondary/10 text-secondary dark:bg-secondary/20"
            : "text-midnight_text hover:bg-secondary/10 hover:text-secondary dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white"
        }`}
      >
        <span>{item.label}</span>
        <Icon
          icon="solar:alt-arrow-right-outline"
          className={`text-base transition-transform duration-200 ${
            isNestedOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {item.submenu && (
        <div
          className={`absolute left-full top-0 ml-2 w-56 transition-all duration-200 ${
            isNestedOpen
              ? "pointer-events-auto visible translate-x-0 opacity-100"
              : "pointer-events-none invisible -translate-x-2 opacity-0"
          }`}
          role="menu"
        >
          <div className="rounded-2xl border border-border/70 bg-white/95 p-2 shadow-xl backdrop-blur-sm dark:border-dark_border/70 dark:bg-darkheader/95">
            {item.submenu.map((nestedItem, idx) => {
              const isNestedCurrentItem =
                path === nestedItem.href || path.startsWith(`${nestedItem.href}/`);
              return (
                <Link
                  key={`${item.label}-${idx}`}
                  href={nestedItem.href}
                  onClick={onClose}
                  role="menuitem"
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-14 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                    isNestedCurrentItem
                      ? "bg-secondary text-white"
                      : "text-midnight_text hover:bg-secondary/10 hover:text-secondary dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  {nestedItem.label}
                  <Icon icon="solar:arrow-right-linear" className="text-base" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const path = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hoverLeaveTimeoutRef = useRef<number | null>(null);
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const [isClickOpen, setIsClickOpen] = useState(false);

  const hasSubmenu = Boolean(item.submenu?.length);
  const isDropdownOpen = hasSubmenu && (isHoverOpen || isClickOpen);

  const clearHoverLeaveTimeout = useCallback(() => {
    if (hoverLeaveTimeoutRef.current) {
      window.clearTimeout(hoverLeaveTimeoutRef.current);
      hoverLeaveTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!hasSubmenu) return;
    clearHoverLeaveTimeout();
    setIsHoverOpen(true);
  }, [hasSubmenu, clearHoverLeaveTimeout]);

  const handleMouseLeave = useCallback(() => {
    if (!hasSubmenu) return;
    clearHoverLeaveTimeout();
    hoverLeaveTimeoutRef.current = window.setTimeout(() => {
      setIsHoverOpen(false);
    }, 120);
  }, [hasSubmenu, clearHoverLeaveTimeout]);

  const closeDropdown = useCallback(() => {
    setIsClickOpen(false);
    setIsHoverOpen(false);
    requestAnimationFrame(() => {
      const activeElement = document.activeElement as HTMLElement | null;
      activeElement?.blur();
    });
  }, []);

  const handleMainClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hasSubmenu) return;

    event.preventDefault();
    clearHoverLeaveTimeout();
    setIsHoverOpen(true);
    setIsClickOpen((prev) => !prev);
  }, [hasSubmenu, clearHoverLeaveTimeout]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (!hasSubmenu) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        handleMainClick(e as any);
        break;
      case "Escape":
        e.preventDefault();
        closeDropdown();
        break;
      case "ArrowDown":
        e.preventDefault();
        setIsClickOpen(true);
        break;
    }
  }, [hasSubmenu, handleMainClick, closeDropdown]);

  useEffect(() => {
    if (!hasSubmenu) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsClickOpen(false);
        setIsHoverOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsClickOpen(false);
        setIsHoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
      clearHoverLeaveTimeout();
    };
  }, [hasSubmenu, clearHoverLeaveTimeout]);

  const isSubmenuActive =
    item.submenu?.some(
      (subItem) => path === subItem.href || path.startsWith(`${subItem.href}/`)
    ) ?? false;

  const isActive =
    path === item.href || path.startsWith(`${item.href}/`) || isSubmenuActive;

  return (
    <div
      ref={containerRef}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        onClick={hasSubmenu ? handleMainClick : closeDropdown}
        onKeyDown={handleKeyDown}
        aria-expanded={isDropdownOpen}
        aria-haspopup={hasSubmenu ? "menu" : undefined}
        className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-16 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 dark:focus:ring-offset-dark_b ${
          isActive
            ? "bg-secondary/20 text-secondary"
            : "text-primary/80 hover:bg-primary/10 hover:text-primary dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white"
        }`}
      >
        {item.label}
        {item.submenu && (
          <Icon
            icon="solar:alt-arrow-down-outline"
            className={`text-[1.05rem] transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        )}
      </Link>

      {item.submenu && (
        <div
          className={`absolute left-0 top-[calc(100%+0.25rem)] z-50 w-64 transition-all duration-200 ${
            isDropdownOpen
              ? "pointer-events-auto visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-1 opacity-0"
          }`}
          role="menu"
        >
          <div className="rounded-2xl border border-border/70 bg-white/95 p-2 shadow-xl backdrop-blur-sm dark:border-dark_border/70 dark:bg-darkheader/95">
            {item.submenu.map((subItem, index) => (
              <NestedSubmenuItem
                key={`${item.label}-submenu-${index}`}
                item={subItem}
                path={path}
                onClose={closeDropdown}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
