"use client";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavIsland({ items, activePath, onItemClick, className, style }) {
  const resolvedActivePath = activePath ?? items[0]?.path;

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
    <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "relative isolate mx-auto flex w-fit items-center justify-center overflow-hidden rounded-full border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0a]/90 p-1.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-[transform,opacity,box-shadow,backdrop-filter,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
          className
        )}
        style={style}
      >
        <ul className="relative z-[1] flex items-center justify-center gap-1.5">
          {items.map((item) => {
            const isActive = item.path === resolvedActivePath;
            const Icon = item.icon;
            return (
              <li key={item.path} className="relative z-[1]">
                <button
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  className={cn(
                    "group relative flex h-[3rem] items-center justify-center overflow-hidden rounded-full transition-[width,background-color,color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none active:scale-[0.965]",
                    isActive
                      ? "bg-slate-900 px-4 text-white dark:bg-white dark:text-slate-900"
                      : "w-[3rem] bg-transparent px-0 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white",
                    item.disabled && "cursor-not-allowed opacity-40"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item.path)}
                  type="button"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="relative flex items-center justify-center">
                      <Icon
                        className={cn(
                          "relative z-[1] h-5 w-5 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                          isActive ? "scale-100" : "scale-[0.96] opacity-80 group-hover:scale-100 group-hover:opacity-100"
                        )}
                        fill={isActive ? "currentColor" : "none"}
                      />
                    </span>

                    <div
                      className={cn(
                        "grid transition-[grid-template-columns,opacity,margin] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                        isActive ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
                      )}
                    >
                      <span className="overflow-hidden whitespace-nowrap text-[0.82rem] font-semibold tracking-tight [font-family:Outfit,Geist,'SF_Pro_Display',sans-serif]">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
    </nav>
    </div>
  );
}
