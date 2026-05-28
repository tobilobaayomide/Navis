import { type CSSProperties, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";
import { NavBadge } from "./shared";

export function BottomNavPill({ items, activeId, onItemClick, className, style }: BottomNavProps) {
  const resolvedActiveId = activeId ?? items[0]?.id;
  const activeIndex = items.findIndex((item) => item.id === resolvedActiveId);

  const [capsule, setCapsule] = useState({ width: 0, x: 0 });
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  const maxWidth = items.length === 3 ? 320 : items.length === 4 ? 385 : 440;

  useLayoutEffect(() => {
    const measure = () => {
      const idx = items.findIndex((item) => item.id === resolvedActiveId);
      const list = listRef.current;
      const itemElement = itemRefs.current[idx >= 0 ? idx : 0];

      if (!list || !itemElement) return;

      const listBounds = list.getBoundingClientRect();
      const itemBounds = itemElement.getBoundingClientRect();

      setCapsule({
        width: itemBounds.width,
        x: itemBounds.left - listBounds.left
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
  }, [resolvedActiveId, items]);

  return (
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "pill-nav-shell relative isolate mx-auto w-full overflow-hidden rounded-[1.95rem] border border-[rgba(148,163,184,0.16)] bg-[linear-gradient(180deg,rgba(253,254,255,0.98)_0%,rgba(242,246,252,0.98)_100%)] p-[0.59rem] shadow-[0_30px_60px_-42px_rgba(15,23,42,0.34)] transition-[transform,opacity,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
      style={{ maxWidth: `${maxWidth}px`, width: "100%", ...style }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(255,255,255,0.22)_28%,rgba(191,205,232,0.12)_100%)] opacity-90"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[0.46rem] rounded-[1.52rem] border border-[rgba(148,163,184,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.78),inset_0_-1px_0_rgba(203,213,225,0.22)]"
      />
      <ul
        ref={listRef}
        className="relative z-[1] grid gap-[0.34rem]"
        style={
          {
            gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`
          } as CSSProperties
        }
      >
        {/* Dynamic sliding indicator capsule */}
        <li
          aria-hidden="true"
          className="pill-nav-active-indicator pointer-events-none absolute inset-y-0 left-0 z-0 h-full rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(28,34,44,0.99)_0%,rgba(16,21,30,0.995)_48%,rgba(10,14,21,1)_100%)] shadow-[0_14px_22px_-18px_rgba(15,23,42,0.42),0_22px_32px_-30px_rgba(111,140,255,0.16),inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(15,23,42,0.48),inset_0_0_0_1px_rgba(255,255,255,0.06)] saturate-[1.03] transition-[transform,width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transform-none motion-reduce:transition-none"
          style={{
            width: `${capsule.width}px`,
            transform: `translate3d(${capsule.x}px, 0, 0)`
          }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.05)_24%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0)_100%),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(111,140,255,0.08),transparent_56%)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[0.95rem] right-[0.95rem] top-[54%] h-px -translate-y-1/2 scale-x-90 rounded-full bg-[linear-gradient(90deg,rgba(148,163,184,0)_0%,rgba(148,163,184,0.06)_22%,rgba(255,255,255,0.16)_50%,rgba(148,163,184,0.06)_78%,rgba(148,163,184,0)_100%)] opacity-[0.38]"
          />
        </li>

        {items.map((item, index) => {
          const isActive = item.id === resolvedActiveId;
          const Icon = item.icon;

          return (
            <li
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="pill-nav-item relative z-[1] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none"
              style={
                {
                  transitionDelay: `${index * 22}ms`
                } as CSSProperties
              }
            >
              <button
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "pill-nav-hit pressable group relative flex w-full rounded-[1.45rem] text-center transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [touch-action:manipulation] motion-reduce:transform-none motion-reduce:transition-none active:scale-[0.965]",
                  isActive ? "text-slate-50" : "text-slate-400 hover:-translate-y-px hover:text-slate-700",
                  item.disabled && "cursor-not-allowed opacity-40"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item)}
                type="button"
              >
                <span
                  className={cn(
                    "pill-nav-surface relative flex min-h-[3rem] w-full items-center justify-center overflow-hidden rounded-[1.45rem] px-2 pb-[0.5rem] pt-[0.5rem] transition-[transform,background-color,box-shadow,color,filter,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
                    isActive
                      ? "pill-nav-surface-active scale-[1.006] saturate-[1.03]"
                      : "pill-nav-surface-idle group-hover:bg-[rgba(15,23,42,0.04)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(15,23,42,0.02)]"
                  )}
                >
                  <span className="pill-nav-content relative z-[1] flex flex-col items-center gap-[0.34rem] transition-[transform,filter,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none group-hover:-translate-y-px">
                    <span className="relative flex h-9 w-9 items-center justify-center">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "pill-nav-ambient absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_center,rgba(111,140,255,0.28)_0%,rgba(111,140,255,0.12)_46%,rgba(111,140,255,0)_82%)] blur-[8px] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:hidden",
                          isActive ? "scale-100 opacity-100" : "scale-[0.7] opacity-0"
                        )}
                      />
                      <Icon
                        className={cn(
                          "relative z-[1] h-[1.52rem] w-[1.52rem] transition-[transform,opacity,color,filter] duration-220 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
                          isActive
                            ? "-translate-y-[1px] scale-[1.05] text-slate-50"
                            : "scale-100 text-current opacity-[0.72] group-hover:-translate-y-[2px] group-hover:scale-[1.05]"
                        )}
                        fill="none"
                      />
                      {typeof item.badge === "number" ? (
                        <NavBadge
                          className={cn(
                            "absolute -right-1 -top-1.5 z-[2] flex h-[1.18rem] min-w-[1.18rem] items-center justify-center rounded-full border px-0 text-[8px] shadow-[0_10px_18px_-14px_rgba(15,23,42,0.45)] transition-[background-color,border-color,color] duration-220 ease-[cubic-bezier(0.23,1,0.32,1)] [font-variant-numeric:tabular-nums]",
                            isActive
                              ? "border-white/20 bg-white text-slate-950"
                              : "border-slate-900/10 bg-slate-950 text-white"
                          )}
                          value={item.badge}
                        />
                      ) : null}
                    </span>
                    <span
                      className={cn(
                        "pill-nav-label text-[0.72rem] font-medium tracking-[-0.02em] [font-family:Outfit,Geist,'SF_Pro_Display',sans-serif] transition-[transform,opacity,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                        isActive ? "text-white opacity-[0.92]" : "text-current opacity-[0.92] group-hover:opacity-100"
                      )}
                    >
                      {item.label}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
