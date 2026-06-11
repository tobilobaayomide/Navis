import { type CSSProperties } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";
import { insetBottomStyle } from "./shared";

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
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "glass-nav-container mobile-scale-nav fixed inset-x-0 bottom-0 z-30 border-x-0 border-b-0 border-t border-slate-300/80 dark:border-white/20 bg-white/70 dark:bg-[#0a0a0a]/70 px-3 shadow-[0_0_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
      style={{
        ...insetBottomStyle(8),
        ...style
      }}
    >
      <ul
        className="glass-nav-list relative mx-auto grid w-full max-w-[760px] items-end"
        style={
          {
            gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`
          } as CSSProperties
        }
      >
        {items.map((item, index) => {
          const isActive = item.id === resolvedActiveId;
          const Icon = item.icon;
          const isCenter = index === centerIndex;

          if (isCenter) {
            return (
              <li key={item.id} className="glass-nav-item relative z-10 flex h-[85px] items-center justify-center">
                <button
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  className="glass-nav-center-button absolute bottom-[2.4rem] left-1/2 z-20 h-16 w-16 -translate-x-1/2 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0a]/90 p-1.5 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.16)] dark:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.8)] backdrop-blur-md transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none active:scale-[0.93] hover:motion-safe:-translate-y-[2px]"
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item)}
                  type="button"
                >
                  <span className="glass-nav-center-inner flex h-full w-full items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <Icon className="h-[1.75rem] w-[1.75rem] text-current" />
                  </span>
                </button>
              </li>
            );
          }

          return (
            <li key={item.id} className="glass-nav-item relative z-[1] flex h-[85px] items-center justify-center">
              <button
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "pressable glass-nav-hit group flex h-full w-full flex-col items-center justify-center gap-1 px-2 pb-2 pt-2 text-center transition-[transform,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none active:scale-[0.965]",
                  isActive ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300",
                  item.disabled && "cursor-not-allowed opacity-40"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item)}
                type="button"
              >
                <span className="relative flex h-10 w-10 items-center justify-center">
                  {/* Subtle ambient active light under standard icons */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.14)_0%,rgba(15,23,42,0.06)_52%,rgba(15,23,42,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.06)_52%,rgba(255,255,255,0)_100%)] blur-[10px] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none",
                      isActive ? "scale-100 opacity-100" : "scale-[0.62] opacity-0"
                    )}
                  />
                  {/* Icon sizing matches minimal nav standard tabs */}
                  <Icon
                    className={cn(
                      "relative z-[1] h-[1.4rem] w-[1.4rem] transition-[transform,color,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      isActive ? "-translate-y-[1px] scale-[1.08] text-slate-900 dark:text-white" : "scale-100 text-current opacity-[0.68] group-hover:-translate-y-[2px]"
                    )}
                  />

                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
    </div>
  );
}
