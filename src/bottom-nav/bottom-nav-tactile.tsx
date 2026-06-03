import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";

export function BottomNavTactile({ items, activeId, onItemClick, className, style }: BottomNavProps) {
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
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "tactile-nav-shell mobile-scale-nav relative mx-auto w-full max-w-max",
        className
      )}
      style={style}
    >
      <div className="relative flex items-center justify-center gap-1.5 rounded-full bg-[#f0f0f3] p-1.5 shadow-[8px_8px_16px_#d1d1d4,-8px_-8px_16px_#ffffff] dark:bg-[#1a1a1c] dark:shadow-none border border-transparent dark:border-[#2a2a2d]">
        
        {/* Indented Indicator Base */}
        <div
          className="absolute inset-y-1.5 z-0 rounded-full bg-[#e6e6e9] shadow-[inset_4px_4px_8px_#c8c8cb,inset_-4px_-4px_8px_#ffffff] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] dark:bg-[#141416] dark:shadow-[inset_4px_4px_8px_#080809,inset_-4px_-4px_8px_#202023]"
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
                "relative z-10 flex h-12 min-w-[4rem] flex-col items-center justify-center rounded-full px-4 transition-all duration-200",
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              )}
              disabled={item.disabled}
              onClick={() => onItemClick?.(item)}
              type="button"
            >
              <Icon
                className={cn(
                  "h-[22px] w-[22px] transition-transform duration-200",
                  isActive ? "scale-95 drop-shadow-[0_2px_4px_rgba(79,70,229,0.3)]" : "scale-100"
                )}
              />
        
            </button>
          );
        })}
      </div>
    </nav>
  );
}
