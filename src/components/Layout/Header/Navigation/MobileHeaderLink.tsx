import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { Icon } from "@iconify/react";

const MobileHeaderLink: React.FC<{ item: HeaderItem; onNavigate?: () => void }> = ({
  item,
  onNavigate,
}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div className="w-full rounded-xl border border-border/60 bg-white/70 px-2 dark:border-dark_border/80 dark:bg-dark_b/80">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex min-h-12 flex-1 items-center rounded-lg px-2 text-16 font-medium text-midnight_text transition-colors duration-200 hover:text-secondary dark:text-white"
        >
          {item.label}
        </Link>

        {item.submenu && (
          <button
            type="button"
            onClick={handleToggle}
            className="grid h-10 w-10 place-items-center rounded-lg text-midnight_text transition-colors duration-200 hover:bg-secondary/10 hover:text-secondary dark:text-white"
            aria-label={`Toggle ${item.label} submenu`}
            aria-expanded={submenuOpen}
          >
            <Icon
              icon="solar:alt-arrow-down-outline"
              className={`text-xl transition-transform duration-300 ${
                submenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {item.submenu && (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            submenuOpen ? "max-h-80 pb-2" : "max-h-0"
          }`}
        >
          <div className="space-y-1 border-t border-border/70 pt-2 dark:border-dark_border/80">
            {item.submenu.map((subItem, index) => (
              <Link
                key={index}
                href={subItem.href}
                onClick={onNavigate}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-14 font-medium text-midnight_text transition-all duration-200 hover:bg-secondary hover:text-white dark:text-white/90"
              >
                {subItem.label}
                <Icon icon="solar:arrow-right-linear" className="text-base" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
