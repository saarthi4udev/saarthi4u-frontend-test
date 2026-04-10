import { useState, useCallback } from "react";
import Link from "next/link";
import { HeaderItem, SubmenuItem } from "../../../../types/menu";
import { Icon } from "@iconify/react";

const MobileNestedSubmenuItem: React.FC<{
  item: SubmenuItem;
  onNavigate?: () => void;
}> = ({ item, onNavigate }) => {
  const [nestedOpen, setNestedOpen] = useState(false);
  const hasNestedSubmenu = Boolean(item.submenu?.length);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!hasNestedSubmenu) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setNestedOpen(!nestedOpen);
        break;
      case "Escape":
        e.preventDefault();
        setNestedOpen(false);
        break;
    }
  }, [hasNestedSubmenu, nestedOpen]);

  if (!hasNestedSubmenu) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="flex items-center justify-between rounded-lg px-3 py-2 text-14 font-medium text-midnight_text transition-all duration-200 hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary dark:text-white/90"
      >
        {item.label}
        <Icon icon="solar:arrow-right-linear" className="text-base" />
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex flex-1 items-center rounded-lg px-3 py-2 text-14 font-medium text-midnight_text transition-colors duration-200 hover:bg-secondary/10 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary dark:text-white/90"
        >
          {item.label}
        </Link>

        <button
          type="button"
          onClick={() => setNestedOpen(!nestedOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={nestedOpen}
          aria-label={`Toggle ${item.label} submenu`}
          className="grid h-8 w-8 place-items-center rounded-lg text-midnight_text transition-colors duration-200 hover:bg-secondary/10 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary dark:text-white"
        >
          <Icon
            icon="solar:alt-arrow-right-outline"
            className={`text-base transition-transform duration-300 ${
              nestedOpen ? "rotate-90" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {hasNestedSubmenu && (
        <div
          className={`overflow-hidden transition-all duration-300 pl-2 ${
            nestedOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className="space-y-1 border-l-2 border-secondary/30 pl-2 py-2">
            {item.submenu?.map((nestedItem, idx) => (
              <Link
                key={`mobile-nested-${idx}`}
                href={nestedItem.href}
                onClick={onNavigate}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-14 font-medium text-midnight_text transition-all duration-200 hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary dark:text-white/90"
              >
                {nestedItem.label}
                <Icon icon="solar:arrow-right-linear" className="text-base" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileHeaderLink: React.FC<{ item: HeaderItem; onNavigate?: () => void }> = ({
  item,
  onNavigate,
}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setSubmenuOpen(!submenuOpen);
  }, [submenuOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!item.submenu?.length) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        handleToggle();
        break;
      case "Escape":
        e.preventDefault();
        setSubmenuOpen(false);
        break;
    }
  }, [item.submenu?.length, handleToggle]);

  return (
    <div className="w-full rounded-xl border border-border/60 bg-white/70 px-2 dark:border-dark_border/80 dark:bg-dark_b/80">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex min-h-12 flex-1 items-center rounded-lg px-2 text-16 font-medium text-midnight_text transition-colors duration-200 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary dark:text-white"
        >
          {item.label}
        </Link>

        {item.submenu && (
          <button
            type="button"
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            aria-expanded={submenuOpen}
            aria-label={`Toggle ${item.label} submenu`}
            className="grid h-10 w-10 place-items-center rounded-lg text-midnight_text transition-colors duration-200 hover:bg-secondary/10 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary dark:text-white"
          >
            <Icon
              icon="solar:alt-arrow-down-outline"
              className={`text-xl transition-transform duration-300 ${
                submenuOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      {item.submenu && (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            submenuOpen ? "max-h-96 pb-2" : "max-h-0"
          }`}
          role={submenuOpen ? "menu" : undefined}
        >
          <div className="space-y-1 border-t border-border/70 pt-2 dark:border-dark_border/80">
            {item.submenu.map((subItem, index) =>
              subItem.submenu ? (
                <MobileNestedSubmenuItem
                  key={`mobile-submenu-${index}`}
                  item={subItem}
                  onNavigate={onNavigate}
                />
              ) : (
                <Link
                  key={`mobile-link-${index}`}
                  href={subItem.href}
                  onClick={onNavigate}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-14 font-medium text-midnight_text transition-all duration-200 hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary dark:text-white/90"
                >
                  {subItem.label}
                  <Icon icon="solar:arrow-right-linear" className="text-base" />
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
