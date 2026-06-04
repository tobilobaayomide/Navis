"use client";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavDock({ items, activePath, onItemClick, className, style }) {
  const resolvedActivePath = activePath ?? items[0]?.path;

  return (
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "dock-nav-shell mobile-scale-nav relative isolate mx-auto flex w-fit items-end justify-center gap-3 rounded-3xl border border-slate-200/50 bg-white/40 px-4 pb-2 pt-3 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.15)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
      style={style}
    >
      <ul className="flex items-end justify-center gap-3">
        {items.map((item) => {
          const isActive = item.path === resolvedActivePath;
          const Icon = item.icon;

          return (
            <li key={item.path} className="relative flex flex-col items-center">
              <button
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "pressable group relative flex aspect-square w-12 origin-bottom items-center justify-center rounded-2xl bg-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:scale-[1.3] hover:bg-white hover:z-10 dark:bg-white/10 dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:bg-white/20",
                  isActive && "scale-[1.15] -translate-y-1 bg-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:bg-white/15",
                  item.disabled && "cursor-not-allowed opacity-40 hover:-translate-y-0 hover:scale-100"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item.path)}
                type="button"
              >
                <Icon
                  className={cn(
                    "h-5 w-5 text-slate-600 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white",
                    isActive && "h-6 w-6 text-slate-900 dark:text-white"
                  )}
                  fill={isActive ? "currentColor" : "none"}
                />
              </button>
              
              {/* Active Indicator Dot */}
              <div className="absolute -bottom-1.5 flex h-1 w-full justify-center">
                <span
                  className={cn(
                    "h-1 w-1 rounded-full bg-slate-800 transition-all duration-300 dark:bg-white",
                    isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  )}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
