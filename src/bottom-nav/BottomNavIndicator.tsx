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

  // Auto-calculate max width based on item count
  const maxWidth = items.length === 3 ? 320 : items.length === 4 ? 385 : 440;

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
      <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "relative isolate mx-auto w-full overflow-hidden rounded-full border border-slate-200/50 bg-white/80 px-2 py-1.5 shadow-sm backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-[#0a0a0a]/80 dark:shadow-sm",
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
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {/* Sliding active indicator dot */}
          <li
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 z-0 h-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              width: `calc(100% / ${items.length})`,
              transform: `translate3d(calc(${Math.max(activeIndex, 0)} * 100%), 0, 0)`
            }}
          >
            <span className="absolute bottom-[2px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-blue-400" />
          </li>

          {/* Navigation Items */}
          {items.map((item) => {
            const isActive = item.id === resolvedActiveId;
            const Icon = item.icon;

            return (
              <li key={item.id} className="relative z-[1]">
                <button
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex w-full flex-col items-center justify-center gap-1 rounded-full py-2 text-[10px] font-medium tracking-wide [touch-action:manipulation] active:scale-[0.95]",
                    isActive 
                      ? "text-blue-700 dark:text-blue-600" 
                      : "text-black dark:text-white",
                    item.disabled && "cursor-not-allowed opacity-40"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item)}
                  type="button"
                >
                  <span className={cn(
                    "relative flex h-5 w-5 items-center justify-center",
                    isActive ? "scale-105" : "group-hover:scale-105"
                  )}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={cn(
                      "text-[0.65rem] leading-none tracking-tight ",
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
    </div>
  );
}
