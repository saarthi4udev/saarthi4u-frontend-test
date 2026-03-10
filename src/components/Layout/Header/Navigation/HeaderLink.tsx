"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const path = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hoverLeaveTimeoutRef = useRef<number | null>(null);
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const [isClickOpen, setIsClickOpen] = useState(false);

  const hasSubmenu = Boolean(item.submenu?.length);
  const isDropdownOpen = hasSubmenu && (isHoverOpen || isClickOpen);

  const clearHoverLeaveTimeout = () => {
    if (hoverLeaveTimeoutRef.current) {
      window.clearTimeout(hoverLeaveTimeoutRef.current);
      hoverLeaveTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (!hasSubmenu) return;
    clearHoverLeaveTimeout();
    setIsHoverOpen(true);
  };

  const handleMouseLeave = () => {
    if (!hasSubmenu) return;
    clearHoverLeaveTimeout();
    hoverLeaveTimeoutRef.current = window.setTimeout(() => {
      setIsHoverOpen(false);
    }, 120);
  };

  const closeDropdown = () => {
    setIsClickOpen(false);
    setIsHoverOpen(false);
    requestAnimationFrame(() => {
      const activeElement = document.activeElement as HTMLElement | null;
      activeElement?.blur();
    });
  };

  const handleMainClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hasSubmenu) return;

    event.preventDefault();
    clearHoverLeaveTimeout();
    setIsHoverOpen(true);
    setIsClickOpen((prev) => !prev);
  };

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
  }, [hasSubmenu]);

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
        className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-16 font-medium transition-all duration-300 ${
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
          />
        )}
      </Link>

      {item.submenu && (
        <div
          className={`absolute left-0 top-full z-30 w-64 pt-2 transition-all duration-200 ${
            isDropdownOpen
              ? "pointer-events-auto visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-1 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-border/70 bg-white/95 p-2 shadow-xl backdrop-blur-sm dark:border-dark_border/70 dark:bg-darkheader/95">
          {item.submenu.map((subItem, index) => {
            const isCurrentSubItem =
              path === subItem.href || path.startsWith(`${subItem.href}/`);

            return (
              <Link
                key={index}
                href={subItem.href}
                onClick={closeDropdown}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-14 font-medium transition-all duration-200 ${
                  isCurrentSubItem
                    ? "bg-secondary text-white"
                    : "text-midnight_text hover:bg-secondary/10 hover:text-secondary dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                {subItem.label}
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

export default HeaderLink;
