import { type CSSProperties } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";

export function BottomNavDock({ items, activeId, onItemClick, className, style }: BottomNavProps) {
  const resolvedActiveId = activeId ?? items[0]?.id;

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
      <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "relative mx-auto flex w-fit items-end justify-center gap-2 rounded-[2rem] border border-white/40 bg-white/30 px-3 pb-2 pt-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
          className
        )}
        style={style}
      >
        <ul className="flex items-end justify-center gap-2">
          {items.map((item) => {
            const isActive = item.id === resolvedActiveId;
            const Icon = item.icon;

            return (
              <li key={item.id} className="relative flex flex-col items-center">
                <button
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  className={cn(
                    "group relative flex aspect-square w-[3rem] items-center justify-center rounded-2xl bg-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition-all duration-300 ease-out hover:bg-white dark:bg-white/15 dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] dark:ring-white/10 dark:hover:bg-white/20",
                    item.disabled && "cursor-not-allowed opacity-40 hover:bg-white/80 dark:hover:bg-white/15"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item)}
                  type="button"
                >
                  <Icon
                    className={cn(
                      "h-6 w-6 text-slate-700 dark:text-slate-200",
                      isActive && "text-slate-900 dark:text-white"
                    )}
                    fill={isActive ? "currentColor" : "none"}
                  />
                </button>
                
                {/* Active Indicator Dot */}
                <div className="absolute -bottom-1.5 flex h-1 w-full justify-center">
                  <span
                    className={cn(
                      "h-1 w-1 rounded-full bg-black/60 transition-opacity duration-300 dark:bg-white/60",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
