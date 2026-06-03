import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";

export function BottomNavAction({ items, activeId, onItemClick, className, style }: BottomNavProps) {
  const middleIndex = Math.floor(items.length / 2);

  return (
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "action-nav-shell mobile-scale-nav relative mx-auto w-full max-w-[400px]",
        className
      )}
      style={style}
    >
      <div className="relative flex h-16 w-full items-center justify-between rounded-full border border-slate-200/70 bg-white/80 px-4 shadow-[0_18px_38px_-20px_rgba(15,23,42,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#111]/85 dark:shadow-[0_18px_38px_-20px_rgba(0,0,0,0.55)]">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const isMiddle = index === middleIndex;
          const Icon = item.icon;

          if (isMiddle) {
            return (
              <div key={item.id} className="relative -top-6 mx-2">
                <button
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white transition-transform duration-300 active:scale-95",
                    isActive ? "scale-110 bg-indigo-600" : "hover:scale-105"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item)}
                  type="button"
                >
                  <Icon className="h-6 w-6" />
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex h-12 w-12 flex-col items-center justify-center gap-1 transition-colors duration-200",
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              )}
              disabled={item.disabled}
              onClick={() => onItemClick?.(item)}
              type="button"
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
