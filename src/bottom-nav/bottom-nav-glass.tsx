import { type CSSProperties } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";
import { NavBadge, insetBottomStyle } from "./shared";

export function BottomNavGlass({
  items,
  activeId,
  onItemClick,
  className,
  style
}: BottomNavProps & { style?: CSSProperties }) {
  const resolvedActiveId = activeId ?? items[0]?.id;
  const centerIndex = Math.floor(items.length / 2);

  return (
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "glass-nav-container fixed inset-x-0 bottom-0 z-30 border-x-0 border-b-0 border-t border-[var(--glass-nav-border,rgba(255,255,255,0.22))] bg-[var(--glass-nav-bg,rgba(255,255,255,0.48))] px-3 shadow-[0_-24px_44px_-34px_rgba(15,23,42,0.2),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-[24px] transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
      style={{
        ...insetBottomStyle(8),
        ...style
      }}
    >
      <ul
        className="glass-nav-list relative mx-auto grid w-full max-w-[760px] items-end"
        style={
          {
            gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`
          } as CSSProperties
        }
      >
        {items.map((item, index) => {
          const isActive = item.id === resolvedActiveId;
          const Icon = item.icon;
          const isCenter = index === centerIndex;

          if (isCenter) {
            return (
              <li key={item.id} className="glass-nav-item relative z-10 flex h-[85px] items-center justify-center">
                <button
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  className="glass-nav-center-button absolute bottom-[2.4rem] left-1/2 z-20 h-16 w-16 -translate-x-1/2 rounded-full border border-[rgba(255,255,255,0.35)] bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.18)_100%)] p-1 shadow-[0_16px_36px_-12px_rgba(15,23,42,0.35),0_4px_12px_-6px_rgba(15,23,42,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none active:scale-[0.93] hover:motion-safe:-translate-y-[2px]"
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item)}
                  type="button"
                >
                  <span className="glass-nav-center-inner flex h-full w-full items-center justify-center rounded-full border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(135deg,var(--glass-nav-center-bg-start,#0f172a)_0%,var(--glass-nav-center-bg-end,#1e293b)_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_14px_rgba(15,23,42,0.25)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:motion-safe:bg-[linear-gradient(135deg,var(--glass-nav-center-hover-start,#1e293b)_0%,var(--glass-nav-center-hover-end,#334155)_100%)]">
                    <Icon className="h-[2.25rem] w-[2.25rem] text-white" />
                  </span>
                </button>
              </li>
            );
          }

          return (
            <li key={item.id} className="glass-nav-item relative z-[1] flex h-[85px] items-center justify-center">
              <button
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "pressable glass-nav-hit group flex h-full w-full flex-col items-center justify-center gap-1.5 px-2 pb-3 pt-3 text-center text-[var(--glass-nav-text-color,#8e9aa8)] transition-[transform,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none active:scale-[0.965]",
                  isActive ? "font-semibold text-[var(--glass-nav-text-active,#0f172a)]" : "hover:text-[var(--glass-nav-text-active,#0f172a)]",
                  item.disabled && "cursor-not-allowed opacity-40"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item)}
                type="button"
              >
                <span className="relative flex h-10 w-10 items-center justify-center">
                  {/* Subtle ambient active light under standard icons */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.14)_0%,rgba(15,23,42,0.06)_52%,rgba(15,23,42,0)_100%)] blur-[10px] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none",
                      isActive ? "scale-100 opacity-100" : "scale-[0.62] opacity-0"
                    )}
                  />
                  {/* Icon sizing matches minimal nav standard tabs */}
                  <Icon
                    className={cn(
                      "relative z-[1] h-[1.72rem] w-[1.72rem] transition-[transform,color,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      isActive ? "-translate-y-[1px] scale-[1.08]" : "scale-100 text-current opacity-[0.68] group-hover:-translate-y-[2px]"
                    )}
                  />
                  {typeof item.badge === "number" ? (
                    <span className="absolute right-0.5 -top-0.5 z-[2] flex h-[1.38rem] w-[1.38rem] items-center justify-center rounded-full bg-white shadow-[0_4px_8px_rgba(15,23,42,0.15)]">
                      <NavBadge
                        className="flex h-[1.2rem] w-[1.2rem] items-center justify-center rounded-full bg-slate-900 p-0 text-[9px] text-white [font-variant-numeric:tabular-nums]"
                        value={item.badge}
                      />
                    </span>
                  ) : null}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-medium tracking-[-0.025em] [font-family:Outfit,Geist,'SF_Pro_Display',sans-serif] transition-[transform,color,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    isActive ? "-translate-y-[1px] text-[var(--glass-nav-text-active,#0f172a)]" : "text-current opacity-[0.84]"
                  )}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
