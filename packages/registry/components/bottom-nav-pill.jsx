"use client";

import { useLayoutEffect, useRef, useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomNavPill({ items, activePath, onItemClick, className, style }) {
  const resolvedActivePath = activePath ?? items[0]?.path;

  const [capsule, setCapsule] = useState({ width: 0, x: 0 });
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  const maxWidth = items.length === 3 ? 320 : items.length === 4 ? 385 : 440;

  useLayoutEffect(() => {
    const measure = () => {
      const idx = items.findIndex((item) => item.path === resolvedActivePath);
      const list = listRef.current;
      const itemElement = itemRefs.current[idx >= 0 ? idx : 0];

      if (!list || !itemElement) return;

      setCapsule({
        width: itemElement.offsetWidth,
        x: itemElement.offsetLeft
      });
    };

    measure();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;

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
  }, [resolvedActivePath, items]);

  return (
    <div className={cn("fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]", className)}>
      <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "sm:hidden relative isolate mx-auto w-full overflow-hidden rounded-[1.95rem]",
          "border border-slate-200/80 dark:border-white/10",
          "bg-white/90 dark:bg-[#0a0a0a]/90 p-[0.59rem]",
          "shadow-[0_16px_40px_-16px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)]",
          "backdrop-blur-2xl",
          "transition-[transform,opacity,box-shadow,backdrop-filter,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "motion-reduce:transform-none motion-reduce:transition-none",
          className
        )}
        style={{ maxWidth: `${maxWidth}px`, width: "100%", ...style }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(255,255,255,0.22)_28%,rgba(191,205,232,0)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0)_100%)] opacity-90"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[0.46rem] rounded-[1.52rem] border border-[rgba(148,163,184,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.78),inset_0_-1px_0_rgba(203,213,225,0.22)]"
        />

        <ul
          ref={listRef}
          className="relative z-[1] grid h-12 gap-[0.34rem]"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          <li
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-0 rounded-[1.45rem] bg-black dark:bg-white shadow-[0_14px_22px_-18px_rgba(15,23,42,0.42),inset_0_1px_0_rgba(255,255,255,0.16)] dark:shadow-[0_14px_22px_-18px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.8)] saturate-[1.03] transition-[transform,width,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transform-none motion-reduce:transition-none"
            style={{
              width: `${capsule.width}px`,
              transform: `translate3d(${capsule.x}px, 0, 0)`
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.05)_24%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.05)_24%,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0)_100%)]"
            />
          </li>

          {items.map((item, index) => {
            const isActive = item.path === resolvedActivePath;
            const Icon = item.icon;

            return (
              <li
                key={item.path}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="relative z-[1] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none"
                style={{ transitionDelay: `${index * 22}ms` }}
              >
                <button
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  className={cn(
                    "group relative flex h-full w-full rounded-[1.45rem] text-center",
                    "transition-[transform,opacity,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    "[touch-action:manipulation] motion-reduce:transform-none motion-reduce:transition-none active:scale-[0.965]",
                    isActive
                      ? "text-white dark:text-black"
                      : "text-slate-500 dark:text-slate-400 hover:-translate-y-px hover:text-slate-900 dark:hover:text-white",
                    item.disabled && "cursor-not-allowed opacity-40"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item.path)}
                  type="button"
                >
                  <span
                    className={cn(
                      "relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.45rem] px-2",
                      "transition-[transform,background-color,box-shadow,color,filter,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      "motion-reduce:transform-none motion-reduce:transition-none",
                      isActive
                        ? "scale-[1.006] saturate-[1.03]"
                        : "group-hover:bg-[rgba(15,23,42,0.04)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(15,23,42,0.02)]"
                    )}
                  >
                    <span className="relative z-[1] flex flex-col items-center gap-[0.34rem] transition-[transform,filter,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none group-hover:-translate-y-px">
                      <span className="relative flex h-6 w-6 items-center justify-center">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_center,rgba(111,140,255,0.28)_0%,rgba(111,140,255,0.12)_46%,rgba(111,140,255,0)_82%)] blur-[8px]",
                            "transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:hidden",
                            isActive ? "scale-100 opacity-100" : "scale-[0.7] opacity-0"
                          )}
                        />
                        <Icon
                          className={cn(
                            "relative z-[1] h-[1.3rem] w-[1.3rem]",
                            "transition-[transform,opacity,color,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                            "motion-reduce:transform-none motion-reduce:transition-none",
                            isActive
                              ? "-translate-y-[1px] scale-[1.05] text-white dark:text-black"
                              : "scale-100 text-current opacity-[0.72] group-hover:-translate-y-[2px] group-hover:scale-[1.05]"
                          )}
                          fill="none"
                        />
                      </span>
                    </span>
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
