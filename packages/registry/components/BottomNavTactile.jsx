"use client";

import { useLayoutEffect, useRef, useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavTactile({ items, activePath, onItemClick, className, style }) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const itemRefs = useRef([]);

  useLayoutEffect(() => {
    const activeIndex = items.findIndex((item) => item.path === activePath);
    const activeEl = itemRefs.current[activeIndex];
    
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activePath, items]);

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
    <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "relative mx-auto w-full max-w-max",
        )}
      >
      <div className="relative flex items-center justify-center gap-1.5 rounded-full bg-[#f0f0f3] p-1.5 dark:bg-[#1a1a1c] dark:shadow-none border border-[#e9e9e9] dark:border-[#2a2a2d]">
        
        <div
          className="absolute inset-y-1.5 z-0 rounded-full bg-[#e6e6e9] shadow-[inset_4px_4px_8px_#c8c8cb,inset_-4px_-4px_8px_#ffffff] transition-[left,width] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] dark:bg-[#141416] dark:shadow-[inset_4px_4px_8px_#080809,inset_-4px_-4px_8px_#202023]"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />

        {items.map((item, index) => {
          const isActive = item.path === activePath;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              ref={(el) => (itemRefs.current[index] = el)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative z-10 flex h-12 min-w-[4rem] flex-col items-center justify-center rounded-full px-4",
                isActive
                  ? "text-blue-700 dark:text-blue-500"
                  : "text-black  dark:text-white "
              )}
              disabled={item.disabled}
              onClick={() => onItemClick?.(item.path)}
              type="button"
            >
              <Icon
                className={cn(
                  "h-[22px] w-[22px] ",
                  isActive ? "scale-95 drop-shadow-[0_2px_4px_rgba(79,70,229,0.3)]" : "scale-100"
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
