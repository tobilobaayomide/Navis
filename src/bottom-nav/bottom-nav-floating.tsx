import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";
import { NavBadge } from "./shared";

/**
 * ============================================================================
 * BOTTOM NAVIGATION FLOATING (Sliding Capsule - Plug-and-Play React Component)
 * ============================================================================
 * 
 * DESIGN SPECIFICATION:
 * - A premium detached sliding capsule tab rail designed for bezel-less mobile screens.
 * - Leverages browser-native ResizeObservers and layout measurements to coordinate
 *   fluid capsule morphing transitions in real-time.
 * - Combines translucent backing sheets with physical card shadow metrics.
 * 
 * DEVELOPER RULES & COMPONENT RULES:
 * 1. Single Source of Truth Config:
 *    Always map the `items` prop from a shared configuration file (e.g., `src/data/navigation.ts`).
 *    Pass the exact same navigation config to both your Desktop Sidebar and Mobile Bottom Bar.
 * 
 * 2. Dynamic Sliding Measurement:
 *    Uses a `useLayoutEffect` to track changes in the active index. It calculates list boundary 
 *    dimensions and positions a physical sliding HTML capsule (`.floating-nav-capsule`) directly 
 *    behind the active item, avoiding fragile hardcoded pixel offsets.
 * 
 * 3. Route-Aware Synchronization:
 *    For active tab tracking, NEVER use standalone local state inside the component in production.
 *    Instead, bind `activeId` directly to your router's location segment (e.g., `location.pathname`).
 *    Set `onItemClick` to trigger your router's navigation handler (e.g., `navigate(item.href)`).
 * 
 * 4. Content Cutoff Prevention:
 *    Place a spacer at the bottom of your layout view to prevent the floating bar from overlapping
 *    vital page content: `<div className="md:hidden h-20" aria-hidden="true" />`
 * 
 * ============================================================================
 */
type CapsuleMetrics = {
  width: number;
  x: number;
};

export function BottomNavFloating({ items, activeId, onItemClick, className, style }: BottomNavProps) {
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];
  const ActiveIcon = activeItem?.icon;

  const trackColumns = useMemo(
    () => items.map((item) => (item.id === activeId ? "2fr" : "1fr")).join(" "),
    [activeId, items]
  );

  const maxWidth = useMemo(() => {
    return items.length === 3 ? 320 : items.length === 4 ? 385 : 440;
  }, [items.length]);

  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [capsule, setCapsule] = useState<CapsuleMetrics>({ width: 132, x: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const activeIndex = items.findIndex((item) => item.id === activeId);
      const list = listRef.current;
      const itemElement = itemRefs.current[activeIndex];

      if (!list || !itemElement) return;

      const listBounds = list.getBoundingClientRect();
      const itemBounds = itemElement.getBoundingClientRect();

      // Measure the exact rendered content width
      const contentEl = list.querySelector(".floating-nav-capsule-content");
      const contentWidth = contentEl ? contentEl.getBoundingClientRect().width : itemBounds.width;

      // Position the capsule: flush-left on first tab, flush-right on last tab, centered on middle tabs
      let capsuleX = 0;
      if (activeIndex === 0) {
        capsuleX = 0;
      } else if (activeIndex === items.length - 1) {
        capsuleX = listBounds.width - contentWidth;
      } else {
        capsuleX = itemBounds.left - listBounds.left + (itemBounds.width - contentWidth) / 2;
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
  }, [activeId, items, trackColumns]);

  return (
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "floating-nav-shell relative isolate mx-auto max-w-full overflow-hidden rounded-full border border-white/35 bg-[rgba(255,255,255,0.22)] p-[0.48rem] shadow-[0_26px_60px_-28px_rgba(15,23,42,0.34)] backdrop-blur-[22px] transition-[transform,opacity,box-shadow,backdrop-filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
      style={{ maxWidth: `${maxWidth}px`, width: "100%", ...style }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.08)_36%,rgba(255,255,255,0.16)_100%)] opacity-95"
      />
      <ul
        ref={listRef}
        className="floating-nav-track relative z-[1] grid min-h-[3.15rem] w-full items-center justify-center gap-[0.32rem]"
        style={{ gridTemplateColumns: trackColumns }}
      >
        <li
          aria-hidden="true"
          className="floating-nav-capsule pointer-events-none absolute inset-y-0 left-0 z-0 transition-[transform,width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transform-none motion-reduce:transition-none"
          style={{ width: `${capsule.width}px`, transform: `translate3d(${capsule.x}px, 0, 0)` }}
        >
          <div className="floating-nav-capsule-surface absolute inset-0 flex items-center overflow-hidden rounded-full bg-[rgba(255,255,255,0.98)] shadow-[0_20px_36px_-24px_rgba(15,23,42,0.42),inset_0_1px_0_rgba(255,255,255,0.92)]">
            <span
              key={activeItem?.id}
              className="floating-nav-capsule-content flex items-center gap-[0.45rem] px-[0.92rem] pl-[0.82rem] text-slate-900 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span className="floating-nav-capsule-icon relative inline-flex h-[1.6rem] w-[1.6rem] shrink-0 items-center justify-center">
                {ActiveIcon ? <ActiveIcon className="h-[1.45rem] w-[1.45rem]" /> : null}
                {activeItem && typeof activeItem.badge === "number" ? (
                  <NavBadge
                    className="absolute -right-1.5 -top-1.5 flex h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full border border-white/80 bg-slate-950 px-0 text-[8px] text-white shadow-[0_8px_18px_-12px_rgba(15,23,42,0.48)] [font-variant-numeric:tabular-nums]"
                    value={activeItem.badge}
                  />
                ) : null}
              </span>
              <span className="floating-nav-capsule-label whitespace-nowrap text-[0.88rem] font-semibold tracking-[-0.025em] [font-family:Outfit,Geist,'SF_Pro_Display',sans-serif]">
                {activeItem?.label}
              </span>
            </span>
          </div>
        </li>

        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;

          return (
            <li
              key={item.id}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              className="floating-nav-item relative z-[1] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none"
              style={{ transitionDelay: `${index * 28}ms` }}
            >
              <button
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "floating-nav-hit pressable relative flex h-[3.15rem] w-full items-center justify-center rounded-full border border-transparent bg-transparent transition-[transform,color,opacity,filter,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [touch-action:manipulation] motion-reduce:transform-none motion-reduce:transition-none active:scale-[0.985]",
                  isActive ? "text-transparent" : "text-slate-400 hover:-translate-y-px hover:bg-white/35 hover:text-slate-700 hover:opacity-95",
                  item.disabled && "cursor-not-allowed opacity-40"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item)}
                type="button"
              >
                <span
                  className={cn(
                    "floating-nav-icon relative flex h-8 w-8 items-center justify-center rounded-full transition-[transform,color,opacity,filter] duration-220 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
                    isActive ? "scale-[0.9] opacity-0" : "scale-[0.94] opacity-[0.58] group-hover:-translate-y-px group-hover:scale-[0.98] group-hover:opacity-[0.78]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[1.45rem] w-[1.45rem] transition-[transform,opacity,filter] duration-220 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
                      isActive ? "scale-[0.92] opacity-0 blur-[2px]" : "scale-100 group-hover:-translate-y-[0.5px] group-hover:scale-[1.035]"
                    )}
                  />
                  {!isActive && typeof item.badge === "number" ? (
                    <NavBadge
                      className="absolute -right-1.5 -top-1.5 flex h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full border border-white/70 bg-slate-950 px-0 text-[8px] text-white shadow-[0_8px_18px_-12px_rgba(15,23,42,0.42)] [font-variant-numeric:tabular-nums]"
                      value={item.badge}
                    />
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
