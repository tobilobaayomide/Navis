import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";
import { NavBadge, insetBottomStyle } from "./shared";

/**
 * ============================================================================
 * BOTTOM NAVIGATION MINIMAL (Plug-and-Play React Component)
 * ============================================================================
 * 
 * DESIGN SPECIFICATION:
 * - A flat, quiet, content-first tab rail engineered for mobile viewports.
 * - Integrates soft radial ambient backing glows that transition via spring curves.
 * - Hardware-accelerated CSS animations configured for 60fps responsive rendering.
 * 
 * DEVELOPER RULES & COMPONENT RULES:
 * 1. Single Source of Truth Config:
 *    Always map the `items` prop from a shared configuration file (e.g., `src/data/navigation.ts`).
 *    Pass the exact same navigation config to both your Desktop Sidebar and Mobile Bottom Bar.
 * 
 * 2. Route-Aware Synchronization:
 *    For active tab tracking, NEVER use standalone local state inside the component in production.
 *    Instead, bind `activeId` directly to your router's location segment (e.g., `location.pathname`).
 *    Set `onItemClick` to trigger your router's navigation handler (e.g., `navigate(item.href)`).
 * 
 * 3. Safe-Area Layout Fallback:
 *    Uses `insetBottomStyle` to calculate device home bar offsets dynamically. On iOS and modern
 *    Androids, it respects `env(safe-area-inset-bottom)` to prevent keyway overlap.
 * 
 * 4. Content Cutoff Prevention:
 *    When rendering this navbar fixed at the bottom of your layout, remember to place a spacer
 *    component at the bottom of your main layout: `<div className="md:hidden h-20" aria-hidden="true" />`
 *    This reserves physical viewport margins so scrollable lists do not get hidden behind the bar.
 * 
 * ============================================================================
 */
export function BottomNavMinimal({ items, activeId, onItemClick, className, style }: BottomNavProps) {
  return (
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 overflow-hidden border-x-0 border-b-0 border-t border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.48)] px-3 pt-2 shadow-[0_-24px_44px_-34px_rgba(15,23,42,0.2)] backdrop-blur-2xl transition-[transform,opacity,box-shadow,backdrop-filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
        className
      )}
      style={{
        ...insetBottomStyle(8),
        ...style
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.46)_0%,rgba(255,255,255,0)_38%)]"
      />
      <ul
        className="relative z-[1] mx-auto grid w-full max-w-[760px] gap-1"
        style={{
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`
        }}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId || item.href === activeId;
          const Icon = item.icon;

          return (
            <li
              key={item.id}
              className="relative m-0 list-none p-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none"
              style={{ transitionDelay: `${index * 28}ms` }}
            >
              <button
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "pressable group relative flex min-h-[64px] w-full flex-col items-center justify-center gap-1.5 px-2 pb-3 pt-3 text-center transition-[transform,background-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
                  isActive ? "text-slate-950" : "text-slate-400 hover:text-slate-600",
                  item.disabled && "cursor-not-allowed opacity-40"
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item)}
                type="button"
              >
                <span className="relative flex h-10 w-10 items-center justify-center">
                  {/* Ambient Glow Bubble (Active indicator backing) */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.16)_0%,rgba(15,23,42,0.08)_52%,rgba(15,23,42,0)_100%)] blur-[10px] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:hidden",
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[0.62] opacity-0 motion-safe:group-hover:scale-[0.9] motion-safe:group-hover:opacity-[0.58]"
                    )}
                  />
                  
                  {/* Tab Icon */}
                  <Icon
                    className={cn(
                      "relative z-[1] h-[1.72rem] w-[1.72rem] transition-[transform,color,opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
                      isActive
                        ? "-translate-y-[1px] scale-[1.08] text-slate-950"
                        : "scale-100 text-current opacity-[0.68] motion-safe:group-hover:-translate-y-[1px] motion-safe:group-hover:scale-[1.04]"
                    )}
                    fill={isActive ? "#111111" : "none"}
                  />
                  
                  {/* Numeric Badge (Dynamic count alerts) */}
                  {typeof item.badge === "number" ? (
                    <span
                      className={cn(
                        "absolute right-0.5 -top-0.5 z-[2] flex h-[1.38rem] w-[1.38rem] items-center justify-center rounded-full bg-white transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none motion-reduce:transition-none",
                        isActive ? "-translate-y-[1px] scale-[1.03]" : ""
                      )}
                    >
                      <NavBadge
                        className="flex h-[1.2rem] w-[1.2rem] items-center justify-center rounded-full bg-slate-900 p-0 text-[9px] text-white [font-variant-numeric:tabular-nums]"
                        value={item.badge}
                      />
                    </span>
                  ) : null}
                </span>

                {/* Tab Label Text */}
                <span
                  className={cn(
                    "text-[11px] font-medium tracking-[-0.025em] transition-[transform,color,opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [font-family:Outfit,Geist,'SF_Pro_Display',sans-serif] motion-reduce:transform-none motion-reduce:transition-none",
                    isActive ? "-translate-y-[1px] text-slate-950" : "text-current opacity-[0.64] motion-safe:group-hover:opacity-[0.92]"
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
