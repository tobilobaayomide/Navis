import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";

export function BottomNavAura({ items, activeId, onItemClick, className, style }: BottomNavProps) {
  const [auraStyle, setAuraStyle] = useState({ left: 0, width: 0 });
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const activeIndex = items.findIndex((item) => item.id === activeId);
    const activeEl = itemRefs.current[activeIndex];
    
    if (activeEl) {
      setAuraStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeId, items]);

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "aura-nav-shell mobile-scale-nav relative mx-auto w-full max-w-max overflow-visible",
        className
      )}
      style={style}
    >
      <div className="relative flex items-center justify-center gap-1 rounded-full bg-white/50 p-1.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-white/40 dark:bg-black/40 dark:border-white/10 dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]">
        
        {/* The Aura Radial Glow & Underline Indicator */}
        <div
          className="absolute bottom-1.5 z-0 h-full transition-all duration-500 pointer-events-none ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{
            left: auraStyle.left,
            width: auraStyle.width,
          }}
        >
          {/* Subtle background radial aura */}
          <div className="absolute inset-0 top-2 mx-auto w-12 rounded-full bg-indigo-500/20 blur-xl dark:bg-indigo-400/30" />
          
          {/* Glowing Underline */}
          <div className="absolute bottom-0 inset-x-0 mx-auto h-[2px] w-6 rounded-t-full bg-indigo-600 shadow-[0_-2px_8px_rgba(79,70,229,0.8)] dark:bg-indigo-400 dark:shadow-[0_-2px_8px_rgba(129,140,248,0.8)]" />
        </div>

        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              ref={(el) => (itemRefs.current[index] = el)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative z-10 flex h-12 w-14 flex-col items-center justify-center transition-colors duration-300",
                isActive
                  ? "text-indigo-600 dark:text-indigo-300"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              )}
              disabled={item.disabled}
              onClick={() => onItemClick?.(item)}
              type="button"
            >
              <Icon
                className={cn(
                  "h-[22px] w-[22px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  isActive ? "-translate-y-[2px] scale-110 drop-shadow-md" : "scale-100"
                )}
              />
            </button>
          );
        })}
      </div>
    </nav>
    </div>
  );
}
