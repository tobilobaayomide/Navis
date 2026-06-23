"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavFloating({ items, activePath, onItemClick, className, style }) {
  const activeItem = items.find((item) => item.path === activePath) ?? items[0];
  const ActiveIcon = activeItem?.icon;

  const trackColumns = useMemo(
    () => items.map((item) => (item.path === activePath ? "2fr" : "1fr")).join(" "),
    [activePath, items]
  );

  const maxWidth = useMemo(() => {
    return items.length === 3 ? 320 : items.length === 4 ? 385 : 440;
  }, [items.length]);

  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const [capsule, setCapsule] = useState({ width: 132, x: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const activeIndex = items.findIndex((item) => item.path === activePath);
      const list = listRef.current;
      const itemElement = itemRefs.current[activeIndex];

      if (!list || !itemElement) return;

      const listWidth = list.offsetWidth;
      const itemWidth = itemElement.offsetWidth;
      const itemLeft = itemElement.offsetLeft;

      // Measure the exact rendered content width
      const contentEl = list.querySelector(".floating-nav-capsule-content");
      const contentWidth = contentEl ? contentEl.offsetWidth : itemWidth;

      // Position the capsule: flush-left on first tab, flush-right on last tab, centered on middle tabs
      let capsuleX = 0;
      if (activeIndex === 0) {
        capsuleX = 0;
      } else if (activeIndex === items.length - 1) {
        capsuleX = listWidth - contentWidth;
      } else {
        capsuleX = itemLeft + (itemWidth - contentWidth) / 2;
      }

      setCapsule({
        width: contentWidth,
        x: capsuleX
      });
    };

    measure();

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;

    if (resizeObserver) {
      if (listRef.current) resizeObserver.observe(listRef.current);
      items.forEach((_, idx) => {
        const el = itemRefs.current[idx];
        if (el) resizeObserver.observe(el);
      });
    } else {
      window.addEventListener("resize", measure);
    }

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [activePath, items, trackColumns]);

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
    {/* Floating container — customize: rounded, bg, border, shadow, backdrop-blur, p */}
    <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "relative isolate mx-auto max-w-full rounded-full border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0a]/90 p-[0.48rem] shadow-[0_16px_40px_-16px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-[transform,opacity,box-shadow,backdrop-filter,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
          className
        )}
        style={{ maxWidth: `${maxWidth}px`, width: "100%", ...style }}
      >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.08)_36%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_36%,rgba(255,255,255,0)_100%)] opacity-95"
      />
      <ul
        ref={listRef}
        className="relative z-[1] grid min-h-[3.15rem] w-full items-center justify-center gap-[0.32rem]"
        style={{ gridTemplateColumns: trackColumns }}
      >
        {/* Sliding capsule indicator — expands to show icon + label on active tab */}
        <li
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-0 transition-[transform,width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transform-none motion-reduce:transition-none"
          style={{ width: `${capsule.width}px`, transform: `translate3d(${capsule.x}px, 0, 0)` }}
        >
          <div className="absolute inset-0 flex items-center overflow-hidden rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <span
              key={activeItem?.id}
              className="floating-nav-capsule-content w-max shrink-0 flex items-center gap-[0.45rem] px-[0.92rem] pl-[0.82rem] text-slate-900 dark:text-white motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span className="relative inline-flex h-[1.6rem] w-[1.6rem] shrink-0 items-center justify-center">
                {ActiveIcon ? <ActiveIcon className="h-[1.45rem] w-[1.45rem]" /> : null}
              </span>
              <span className="whitespace-nowrap text-[0.88rem] font-semibold tracking-[-0.025em] [font-family:Outfit,Geist,'SF_Pro_Display',sans-serif]">
                {activeItem?.label}
              </span>
            </span>
          </div>
        </li>

        {/* Navigation items — customize: text colors, icon size, hover effects */}
        {items.map((item, index) => {
          const isActive = item.path === activePath;
          const Icon = item.icon;

          return (
            <li
              key={item.path}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              className="relative z-[1] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none"
              style={{ transitionDelay: `${index * 28}ms` }}
            >
              <button
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "pressable relative flex h-[3.15rem] w-full items-center justify-center rounded-full border border-transparent bg-transparent transition-[transform,color,opacity,filter,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [touch-action:manipulation] motion-reduce:transform-none motion-reduce:transition-none active:scale-[0.985]",
                  isActive ? "text-transparent" : "text-slate-500 dark:text-slate-400 hover:-translate-y-px hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white",
                  item.disabled && "cursor-not-allowed opacity-40"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item.path)}
                type="button"
              >
                <span
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full transition-[transform,color,opacity,filter] duration-220 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
                    isActive ? "scale-[0.9] opacity-0" : "scale-[0.94] opacity-[0.58] group-hover:-translate-y-px group-hover:scale-[0.98] group-hover:opacity-[0.78]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[1.45rem] w-[1.45rem] transition-[transform,opacity,filter] duration-220 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none translate-z-0",
                      isActive ? "scale-[0.92] opacity-0 blur-[2px]" : "scale-100 group-hover:-translate-y-[0.5px] group-hover:scale-[1.035]"
                    )}
                  />
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
