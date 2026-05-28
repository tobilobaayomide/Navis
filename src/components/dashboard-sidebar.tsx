import { cn } from "../lib/cn";
import type { NavItem } from "../nav/nav.types";

type DashboardSidebarProps = {
  items: NavItem[];
  activeId?: string;
  onItemClick?: (item: NavItem) => void;
  className?: string;
};

export function DashboardSidebar({ items, activeId, onItemClick, className }: DashboardSidebarProps) {
  return (
    <div className={cn("flex h-full flex-col bg-white/48 p-6 backdrop-blur-sm", className)}>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[1.1rem] border border-[rgba(68,104,189,0.16)] bg-white/80 text-lg font-bold text-royal-700">
          N
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-950">Navis</p>
          <p className="text-sm text-slate-500">Navigation study for responsive dashboards</p>
        </div>
      </div>

      <div className="premium-panel mb-6 rounded-[1.5rem] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-royal-700">Desktop shell</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          This rail is the desktop source. The mobile bottom bar is meant to inherit the same structure, hierarchy, and route state.
        </p>
      </div>

      <nav aria-label="Desktop primary navigation" className="flex-1">
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <button
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "pressable flex w-full items-center gap-3 rounded-[1.2rem] border px-4 py-3 text-left text-sm font-medium",
                    isActive
                      ? "border-[rgba(37,99,235,0.16)] bg-[rgba(29,78,216,0.92)] text-white shadow-[0_22px_48px_-36px_rgba(24,44,102,0.45)]"
                      : "border-transparent text-slate-600 hover:border-[rgba(68,104,189,0.12)] hover:bg-white/72 hover:text-royal-700",
                    item.disabled && "cursor-not-allowed opacity-40"
                  )}
                  disabled={item.disabled}
                  onClick={() => onItemClick?.(item)}
                  type="button"
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-[0.95rem]",
                      isActive ? "bg-white/12 text-white" : "bg-[rgba(226,236,255,0.64)] text-royal-700"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {typeof item.badge === "number" ? (
                    <span
                      className={cn(
                        "inline-flex min-w-[1.4rem] items-center justify-center rounded-full px-2 py-1 text-xs font-semibold leading-none",
                        isActive ? "bg-white/15 text-white" : "bg-royal-100 text-royal-700"
                      )}
                    >
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 rounded-[1.5rem] border border-dashed border-[rgba(68,104,189,0.18)] bg-white/38 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Mobile switch</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Below the tablet breakpoint, the same route set collapses into a five-item bottom bar with shared active state and badges.
        </p>
      </div>
    </div>
  );
}
