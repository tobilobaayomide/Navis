import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";

export function BottomNavFluid({ items, activeId, onItemClick, className, style }: BottomNavProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeIndex = items.findIndex((item) => item.id === activeId);
      const activeEl = itemRefs.current[activeIndex];
      
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1, // Ensures bubble doesn't fly in from left on initial render
        });
      }
    };

    updateIndicator();
    
    // Crucial for playground/resize support
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeId, items]);

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
        <div className="relative flex w-full items-center justify-between rounded-full bg-white/80 p-2 shadow-xl backdrop-blur-2xl dark:border dark:border-white/10 dark:bg-[#111]/80 dark:shadow-2xl">
          
          {/* The Fluid Elastic Bubble */}
          <div
            className={cn(
              "absolute inset-y-2 z-0 rounded-full bg-indigo-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              indicatorStyle.opacity === 0 ? "transition-none" : "transition-all duration-700"
            )}
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.opacity,
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
                  "relative z-10 flex h-14 flex-1 flex-col items-center justify-center transition-colors duration-300",
                  isActive ? "text-white" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item)}
                type="button"
              >
                <div
                  className={cn(
                    "relative flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    isActive ? "scale-110" : "scale-100 group-hover:scale-105"
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
