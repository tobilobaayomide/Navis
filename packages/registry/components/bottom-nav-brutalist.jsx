"use client";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavBrutalist({ items, activePath, onItemClick, className, style }) {
  const resolvedActivePath = activePath ?? items[0]?.path;
  const maxWidth = items.length === 3 ? 320 : items.length === 4 ? 385 : 440;

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "brutalist-nav-shell mobile-scale-nav mx-auto w-full border-[2px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-black dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
        className
      )}
      style={{ maxWidth: `${maxWidth}px`, width: "100%", ...style }}
    >
      <ul
        className="grid w-full"
        style={
          {
            gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`
          }
        }
      >
        {items.map((item, index) => {
          const isActive = item.path === resolvedActivePath;
          const Icon = item.icon;

          return (
            <li
              key={item.path}
              className={cn(
                "relative flex h-[4.2rem] items-center justify-center border-black dark:border-white",
                index !== items.length - 1 && "border-r-[2px]"
              )}
            >
              <button
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "pressable group flex h-full w-full flex-col items-center justify-center gap-1 transition-colors duration-150 motion-reduce:transition-none active:bg-black/10 dark:active:bg-white/10",
                  isActive ? "bg-black text-white dark:bg-white dark:text-black" : "bg-transparent text-black hover:bg-black/5 dark:text-white dark:hover:bg-white/10",
                  item.disabled && "cursor-not-allowed opacity-40"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item.path)}
                type="button"
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-150 motion-reduce:transition-none group-hover:scale-110",
                    isActive && "scale-110"
                  )}
                  fill={isActive ? "currentColor" : "none"}
                />
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] [font-family:'IBM_Plex_Mono',monospace]">
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
