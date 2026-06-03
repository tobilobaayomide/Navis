import { useMemo } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";

export function BottomNavOrbit({ items, activeId, onItemClick, className, style }: BottomNavProps) {
  // We'll separate the last item from the rest
  const mainItems = useMemo(() => items.slice(0, -1), [items]);
  const lastItem = useMemo(() => items[items.length - 1], [items]);

  return (
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "orbit-nav-shell mobile-scale-nav relative isolate mx-auto max-w-max overflow-hidden rounded-full border border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-black/50 p-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center gap-2 transition-all duration-300",
        className
      )}
      style={style}
    >
      <ul className="flex items-center gap-1">
        {mainItems.map((item) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;

          return (
            <li key={item.id}>
              <button
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-md"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item)}
                type="button"
              >
                <Icon className={cn("h-5 w-5 transition-transform duration-300", isActive && "scale-110")} />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Divider */}
      <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-1" />

      {/* Orbit / Separated Item */}
      {lastItem && (
        <button
          aria-current={lastItem.id === activeId ? "page" : undefined}
          className={cn(
            "relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
            lastItem.id === activeId
              ? "bg-indigo-500 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          )}
          disabled={lastItem.disabled}
          onClick={() => onItemClick?.(lastItem)}
          type="button"
        >
          {lastItem.icon && <lastItem.icon className="h-5 w-5" />}
        </button>
      )}
    </nav>
  );
}
