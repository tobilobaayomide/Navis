import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";

export function BottomNavFluid({ items, activeId, onItemClick, className, style }: BottomNavProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const activeIndex = items.findIndex((item) => item.id === activeId);
    const activeEl = itemRefs.current[activeIndex];
    
    if (activeEl) {
      setIndicatorStyle({
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
        "fluid-nav-shell mobile-scale-nav relative mx-auto w-full max-w-max",
        className
      )}
      style={style}
    >
      <div className="relative flex items-center justify-center gap-1 rounded-[2rem] bg-slate-900 p-2 shadow-2xl dark:bg-black dark:border dark:border-white/10">
        
        {/* The Fluid Elastic Bubble */}
        <div
          className="absolute inset-y-2 z-0 rounded-[1.5rem] bg-indigo-500 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />

        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              ref={(el) => (itemRefs.current[index] = el)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative z-10 flex h-[3.5rem] min-w-[4.5rem] flex-col items-center justify-center px-4 transition-colors duration-300",
                isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
              )}
              disabled={item.disabled}
              onClick={() => onItemClick?.(item)}
              type="button"
            >
              <div
                className={cn(
                  "relative flex items-center justify-center transition-transform duration-500 mt-2 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  isActive ? "-translate-y-1 scale-110" : "translate-y-0 scale-100"
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
            </button>
          );
        })}
      </div>
    </nav>
    </div>
  );
}
