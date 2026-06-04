"use client";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavCyber({ items, activePath, onItemClick, className, style }) {
  const resolvedActivePath = activePath ?? items[0]?.path;
  const activeIndex = items.findIndex((item) => item.path === resolvedActivePath);

  return (
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "cyber-nav-shell mobile-scale-nav relative isolate mx-auto w-full overflow-hidden border-t-[2px] border-slate-200 bg-white p-2 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] dark:border-[#111] dark:bg-[#050505] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.8)]",
        className
      )}
      style={
        {
          "--cyber-accent": "var(--indicator-nav-accent-rgb, 0, 255, 255)", // Cyan glow default
          ...style
        }
      }
    >

      <div
        className="pointer-events-none absolute inset-0 hidden opacity-20 dark:block"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "8px 8px"
        }}
      />

      <ul
        className="relative z-10 flex w-full items-center justify-between gap-1"
      >
        {/* Animated Cyber Indicator */}
        <li
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-[2px] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transform-none motion-reduce:transition-none"
          style={{
            width: `calc(100% / ${items.length})`,
            transform: `translate3d(calc(${Math.max(activeIndex, 0)} * 100%), 0, 0)`
          }}
        >
          <span
            className="absolute inset-x-2 bottom-0 h-[2px]"
            style={{
              backgroundColor: "rgb(var(--cyber-accent))",
              boxShadow: "0 -2px 10px 1px rgba(var(--cyber-accent), 0.5), 0 0 4px rgba(var(--cyber-accent), 0.8)"
            }}
          />
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
                  "pressable group flex h-14 w-full flex-col items-center justify-center gap-1.5 transition-colors duration-200 ease-out motion-reduce:transition-none",
                  isActive ? "bg-slate-100/80 dark:bg-white/5" : "bg-transparent hover:bg-slate-50 dark:hover:bg-white/5",
                  item.disabled && "cursor-not-allowed opacity-40"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item.path)}
                type="button"
              >
                <div className="relative flex h-6 w-6 items-center justify-center">
                  {/* Glitch/Glow Behind Active Icon */}
                  {isActive && (
                    <span
                      className="absolute inset-0 blur-md"
                      style={{ backgroundColor: "rgba(var(--cyber-accent), 0.25)" }}
                    />
                  )}
                  <Icon
                    className={cn(
                      "relative z-10 h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                      isActive ? "scale-110" : "text-slate-500 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-300"
                    )}
                    fill={isActive ? "currentColor" : "none"}
                    style={isActive ? { color: "rgb(var(--cyber-accent))" } : undefined}
                  />
                </div>
                <span
                  className={cn(
                    "text-[9px] font-bold uppercase tracking-widest transition-colors duration-200 [font-family:'IBM_Plex_Mono',monospace]",
                    isActive ? "" : "text-slate-500 group-hover:text-slate-800 dark:text-slate-500 dark:group-hover:text-slate-300"
                  )}
                  style={isActive ? { color: "rgb(var(--cyber-accent))", textShadow: "0 0 6px rgba(var(--cyber-accent), 0.4)" } : undefined}
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
