"use client";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavMinimal({ items, activePath, onItemClick, className, style }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200/50 bg-white/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0a0a0a]/80">
      <nav
        aria-label="Mobile primary navigation"
        className={cn("mx-auto w-full max-w-md px-2", className)}
        style={style}
      >
        <ul
          className="relative grid h-16 w-full"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((item) => {
            const isActive = item.path === activePath || item.path === activePath;
            const Icon = item.icon;

            return (
              <li key={item.path} className="relative flex items-center justify-center">
                <button
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex w-full flex-col items-center justify-center gap-1 py-1 active:scale-95",
                    isActive
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-700",
                    item.disabled && "cursor-not-allowed opacity-40"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item.path)}
                  type="button"
                >
                  <Icon
                    className={cn(
                      "h-6 w-6 ",
                      isActive ? "scale-110" : "scale-100 group-hover:scale-105"
                    )}
                  />
                  <span className="text-[10px] font-medium tracking-wide">
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
