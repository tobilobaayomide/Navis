"use client";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavOrbit({ items, activePath, onItemClick, className, style }) {
  const mainItems = items.slice(0, -1);
  const lastItem = items[items.length - 1];

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
      {/* Orbit container — customize: rounded, bg, border, shadow, backdrop-blur, p, gap */}
      <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "relative isolate mx-auto max-w-max overflow-hidden rounded-full border border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-black/50 p-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center gap-2 transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          className
        )}
        style={style}
      >
        {/* Main navigation items — customize: h/w, rounded, bg, text colors, scale */}
        <ul className="flex items-center gap-1">
          {mainItems.map((item) => {
            const isActive = item.path === activePath;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <button
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex h-12 w-12 items-center justify-center rounded-full transition-[transform,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    isActive
                      ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-md scale-100"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white scale-95 hover:scale-100 active:scale-90"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item.path)}
                  type="button"
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                      isActive ? "scale-110" : "scale-100 group-hover:scale-110"
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-1" />

        {/* Orbit / Separated Item */}
        {lastItem && (
          <button
            aria-current={lastItem.path === activePath ? "page" : undefined}
            className={cn(
              "group relative flex h-12 w-12 items-center justify-center rounded-full transition-[transform,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm",
              lastItem.path === activePath
                ? "bg-indigo-500 text-white shadow-indigo-500/25 shadow-lg scale-100 rotate-12"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 scale-95 hover:scale-100 hover:rotate-12 active:scale-90"
            )}
            disabled={lastItem.disabled}
            onClick={() => onItemClick?.(lastItem.path)}
            type="button"
          >
            {lastItem.icon && (
              <lastItem.icon
                className={cn(
                  "h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  lastItem.path === activePath ? "scale-110" : "scale-100 group-hover:scale-110"
                )}
              />
            )}
          </button>
        )}
      </nav>
    </div>
  );
}
