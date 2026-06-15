"use client";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavCyber({ items, activePath, onItemClick, className, style }) {
  const resolvedActivePath = activePath ?? items[0]?.path;
  const activeIndex = items.findIndex((item) => item.path === resolvedActivePath);

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex justify-center pb-[env(safe-area-inset-bottom)]">
      <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "relative isolate mx-auto w-full overflow-hidden border-t border-slate-200 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.05)] dark:border-[#1a1a1a] dark:bg-[#050505] dark:shadow-none",
          className
        )}
        style={style}
      >
        {/* Subtle dot matrix background */}
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-[0.03] dark:block"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "4px 4px"
          }}
        />

        <ul className="relative z-10 flex w-full items-center divide-x divide-slate-200 dark:divide-[#1a1a1a]">
          {/* Sharp Stealth Indicator Block */}
          <li
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transform-none motion-reduce:transition-none"
            style={{
              width: `calc(100% / ${items.length})`,
              transform: `translate3d(calc(${Math.max(activeIndex, 0)} * 100%), 0, 0)`
            }}
          >
            <span className="absolute inset-0 bg-slate-900 dark:bg-white" />
          </li>

          {items.map((item) => {
            const isActive = item.path === resolvedActivePath;
            const Icon = item.icon;

            return (
              <li key={item.path} className="relative z-[1] flex-1">
                <button
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  className={cn(
                    "pressable group flex h-[72px] w-full flex-col items-center justify-center gap-1.5 transition-colors duration-200 ease-out motion-reduce:transition-none",
                    !isActive && "hover:bg-slate-50 dark:hover:bg-white/5",
                    item.disabled && "cursor-not-allowed opacity-40"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item.path)}
                  type="button"
                >
                  <div className="relative flex h-6 w-6 items-center justify-center">
                    <Icon
                      className={cn(
                        "relative z-10 h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                        isActive ? "scale-110 text-white dark:text-[#050505]" : "text-slate-500 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-300"
                      )}
                      fill={isActive ? "currentColor" : "none"}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-medium uppercase tracking-[0.08em] transition-colors duration-200 [font-family:'IBM_Plex_Mono',monospace]",
                      isActive ? "text-white dark:text-[#050505]" : "text-slate-500 group-hover:text-slate-800 dark:text-slate-500 dark:group-hover:text-slate-300"
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
