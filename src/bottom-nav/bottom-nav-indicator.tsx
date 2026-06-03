import { type CSSProperties } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";


export function BottomNavIndicator({
  items,
  activeId,
  onItemClick,
  className,
  style
}: BottomNavProps & { style?: CSSProperties }) {
  const resolvedActiveId = activeId ?? items[0]?.id;
  const activeIndex = items.findIndex((item) => item.id === resolvedActiveId);

  const maxWidth = items.length === 3 ? 320 : items.length === 4 ? 385 : 440;

  return (
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "indicator-nav-shell mobile-scale-nav relative isolate mx-auto w-full overflow-hidden rounded-[2.1rem] border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0a]/90 px-2 py-1.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-[transform,opacity,box-shadow,backdrop-filter,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
      style={{
        maxWidth: `${maxWidth}px`,
        width: "100%",
        ...style
      } as any}
    >
        <ul
          className="relative grid gap-1.5"
          style={
            {
              gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`
            } as CSSProperties
          }
        >
          {/* Hardware-accelerated sliding active indicator line at the top */}
          <li
            aria-hidden="true"
            className="indicator-nav-slider pointer-events-none absolute top-0 left-0 z-0 h-[3px] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transform-none motion-reduce:transition-none"
            style={{
              width: `calc(100% / ${items.length})`,
              transform: `translate3d(calc(${Math.max(activeIndex, 0)} * 100%), 0, 0)`
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 left-1/2 w-[32px] -translate-x-1/2 rounded-full"
              style={{
                backgroundColor: "rgb(var(--indicator-nav-accent-rgb, 79, 70, 229))",              }}
            />
          </li>

          {items.map((item, index) => {
            const isActive = item.id === resolvedActiveId;
            const Icon = item.icon;

            return (
              <li
                key={item.id}
                className="relative z-[1]"
                style={
                  {
                    transitionDelay: `${index * 22}ms`
                  } as CSSProperties
                }
              >
                <button
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "pressable indicator-nav-hit group relative flex w-full flex-col items-center justify-center gap-1 rounded-[1.4rem] pb-3.5 pt-3.5 text-[10px] font-medium tracking-[-0.01em] transition-[color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [touch-action:manipulation] motion-reduce:transform-none motion-reduce:transition-none active:scale-[0.965]",
                    isActive ? "font-semibold" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 motion-safe:hover:-translate-y-[1px]",
                    item.disabled && "cursor-not-allowed opacity-40"
                  )}
                  style={isActive ? { color: "rgb(var(--indicator-nav-accent-rgb, 79, 70, 229))" } : undefined}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item)}
                  type="button"
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <Icon
                      className={cn(
                        "relative z-[1] h-[1.28rem] w-[1.28rem] transition-[transform,color] duration-220 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:-translate-y-[2px] motion-safe:group-hover:scale-[1.05]"
                      )}
                      style={{ color: isActive ? "rgb(var(--indicator-nav-accent-rgb, 79, 70, 229))" : "currentColor" }}
                    />

                  </span>
                  <span
                    className={cn(
                      "text-[0.68rem] leading-none transition-[opacity,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      isActive ? "" : "opacity-[0.84]"
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
    </nav>
  );
}
