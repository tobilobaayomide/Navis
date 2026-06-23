import { type CSSProperties } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";

export function BottomNavGlass({
  items,
  activeId,
  onItemClick,
  className,
  style
}: BottomNavProps & { style?: CSSProperties }) {
  const resolvedActiveId = activeId ?? items[0]?.id;
  const centerIndex = Math.floor(items.length / 2);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      {/* Glass bar — customize: h, bg, border, shadow, backdrop-blur */}
      <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "relative z-30 flex h-[90px] w-full items-start justify-center border-t border-white/40 bg-white/20 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_32px_rgba(0,0,0,0.05)] backdrop-blur-3xl dark:border-white/10 dark:bg-[#050505]/40 dark:shadow-[0_-8px_32px_rgba(0,0,0,0.4)]",
          className
        )}
        style={style}
      >
        <ul className="relative mx-auto flex w-full max-w-md items-center justify-between px-6 pt-2">
          {items.map((item, index) => {
            const isActive = item.id === resolvedActiveId;
            const Icon = item.icon;
            const isCenter = index === centerIndex;

            {/* Elevated center button — customize: h/w for size, bg gradient, shadow, rounded */}
            if (isCenter) {
              return (
                <li key={item.id} className="relative z-50 flex w-[4.25rem] shrink-0 items-center justify-center">
                  <div className="absolute -top-[3.5rem] left-1/2 -translate-x-1/2">
                    <button
                      aria-current={isActive ? "page" : undefined}
                      aria-label={item.label}
                      className="group relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-white/50 bg-gradient-to-b from-white/80 to-white/40 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] active:scale-95 dark:border-white/20 dark:from-white/10 dark:to-white/5"
                      disabled={item.disabled}
                      onClick={() => onItemClick?.(item)}
                      type="button"
                    >
                      {/* High-tech pulsing inner ring */}
                      <span className="absolute inset-1 rounded-full border border-slate-900/10 transition-transform duration-700 group-hover:scale-[1.05] dark:border-white/20" />
                      
                      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-slate-900 shadow-inner dark:bg-white">
                        <Icon className="h-7 w-7 text-white transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110 dark:text-slate-900" />
                      </div>
                    </button>
                  </div>
                </li>
              );
            }

            {/* Side navigation items — customize: icon h/w, text colors for active/inactive */}
            return (
              <li key={item.id} className="relative z-10 flex flex-1 items-center justify-center">
                <button
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex flex-col items-center justify-center gap-1.5 rounded-2xl p-2 active:scale-95",
                    item.disabled && "cursor-not-allowed opacity-40"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item)}
                  type="button"
                >
                  <Icon
                    className={cn(
                      "relative z-10 h-[1.6rem] w-[1.6rem]",
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
