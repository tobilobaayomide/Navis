"use client";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavAction({ items, activePath, onItemClick, className, style }) {
  const middleIndex = Math.floor(items.length / 2);

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "relative mx-auto w-full max-w-[400px]",
        className
      )}
      style={style}
    >
      <div className="relative flex h-16 w-full items-center justify-between rounded-full border border-slate-200/50 bg-white/80 px-4 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-[#0a0a0a]/80">
        {items.map((item, index) => {
          const isActive = item.path === activePath;
          const isMiddle = index === middleIndex;
          const Icon = item.icon;

          if (isMiddle) {
            return (
              <div key={item.path} className="relative -top-5 -mx-2 flex items-center justify-center">
                <button
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-95 dark:bg-white dark:text-black",
                    isActive ? "scale-105" : "hover:scale-105"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item.path)}
                  type="button"
                >
                  <Icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.path}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex h-full w-14 flex-col items-center justify-center gap-1",
                isActive
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              )}
              disabled={item.disabled}
              onClick={() => onItemClick?.(item.path)}
              type="button"
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={cn(
                    "h-5 w-5 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    isActive ? "scale-110" : "group-hover:scale-110 group-active:scale-95"
                  )}
                />
              </div>
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
    </div>
  );
}
