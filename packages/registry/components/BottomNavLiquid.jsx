"use client";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavLiquid({ items, activePath, onItemClick, className, style }) {
  const resolvedActivePath = activePath ?? items[0]?.path;
  const activeIndex = items.findIndex((item) => item.path === resolvedActivePath);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4">
      {/* Outer wrapper for liquid floating effect */}
      <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "relative flex w-auto items-center justify-center rounded-[2rem] border border-white/20 bg-white/40 px-1 py-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_12px_32px_-4px_rgba(0,0,0,0.1)] backdrop-blur-[48px] dark:border-white/10 dark:bg-[#121212]/40 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_32px_-4px_rgba(0,0,0,0.5)]",
          className
        )}
        style={style}
      >
        {/* Subtle inner gloss highlight for refraction */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/20 to-transparent dark:from-white/5" />

        <ul className="relative flex items-center gap-1">
          {/* Liquid Sliding Indicator */}
          <div
            className="absolute bottom-0 left-0 top-0 w-14 rounded-full bg-black/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:bg-white/[0.08]"
            style={{
              transform: `translateX(calc(${safeActiveIndex} * (100% + 0.25rem)))`
            }}
          />

          {/* Navigation items — customize: w for button width, text colors, icon fill, label size */}
          {items.map((item) => {
            const isActive = item.path === resolvedActivePath;
            const Icon = item.icon;

            return (
              <li key={item.path} className="relative z-10 flex">
                <button
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  className={cn(
                    "group relative flex w-14 flex-col items-center justify-center gap-1 rounded-full py-1.5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-90 motion-reduce:transition-none",
                    item.disabled && "cursor-not-allowed opacity-40"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item.path)}
                  type="button"
                >
                  <div className="relative flex items-center justify-center">
                    <Icon
                      className={cn(
                        "relative z-10 h-5 w-5",
                        isActive
                          ? "text-[#007AFF] dark:text-[#0A84FF]"
                          : "text-[#000000] dark:text-[#FFFFFF]"
                      )}
                      fill={isActive ? "currentColor" : "none"}
                    />
                  </div>
                  <span
                    className={cn(
                      "w-full truncate px-1.5 text-center text-[9px] font-medium tracking-wide",
                      isActive
                        ? "text-[#007AFF] dark:text-[#0A84FF]"
                        : "text-[#000000] dark:text-[#FFFFFF]"
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
