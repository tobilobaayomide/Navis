import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";

export function BottomNavMinimal({ items, activeId, onItemClick, className, style }: BottomNavProps) {
  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
    <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 overflow-hidden border-x-0 border-b-0 border-t border-slate-300/80 dark:border-white/20 bg-white/90 dark:bg-black/90 px-3 pt-2 shadow-[0_0_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-[transform,opacity,box-shadow,backdrop-filter,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          className
        )}
        style={{
          ...style
        }}
      >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.46)_0%,rgba(255,255,255,0)_38%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_38%)]"
      />
      <ul
        className="relative z-[1] mx-auto grid w-full max-w-[760px] gap-1"
        style={{
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`
        }}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId || item.path === activeId;
          const Icon = item.icon;

          return (
            <li
              key={item.id}
              className="relative m-0 list-none p-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none"
              style={{ transitionDelay: `${index * 28}ms` }}
            >
              <button
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "pressable group relative flex min-h-[56px] w-full flex-col items-center justify-center gap-1 px-2 pb-2 pt-2 text-center transition-[transform,background-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
                  isActive ? "text-slate-950 dark:text-slate-50" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300",
                  item.disabled && "cursor-not-allowed opacity-40"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item)}
                type="button"
              >
                <span className="relative flex h-10 w-10 items-center justify-center">
                  {/* Ambient Glow Bubble (Active indicator backing) */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.16)_0%,rgba(15,23,42,0.08)_52%,rgba(15,23,42,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.08)_52%,rgba(255,255,255,0)_100%)] blur-[10px] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:hidden",
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[0.62] opacity-0 motion-safe:group-hover:scale-[0.9] motion-safe:group-hover:opacity-[0.58]"
                    )}
                  />
                  
                  {/* Tab Icon */}
                  <Icon
                    className={cn(
                      "relative z-[1] h-[1.4rem] w-[1.4rem] transition-[transform,color,opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
                      isActive
                        ? "-translate-y-[1px] scale-[1.08] text-slate-950 dark:text-slate-50"
                        : "scale-100 text-current opacity-[0.68] motion-safe:group-hover:-translate-y-[1px] motion-safe:group-hover:scale-[1.04]"
                    )}
                    fill={isActive ? "currentColor" : "none"}
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
