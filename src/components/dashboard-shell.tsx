import type { ReactNode } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { insetBottomStyle } from "../bottom-nav/shared";
import type { NavItem } from "../nav/nav.types";

type DashboardShellProps = {
  items: NavItem[];
  activeId?: string;
  onItemClick?: (item: NavItem) => void;
  renderBottomNav: () => ReactNode;
  children: ReactNode;
};

export function DashboardShell({
  items,
  activeId,
  onItemClick,
  renderBottomNav,
  children
}: DashboardShellProps) {
  return (
    <div className="min-h-screen text-slate-950">
      <div className="mx-auto grid min-h-screen max-w-[1600px] md:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[rgba(68,104,189,0.12)] bg-white/56 backdrop-blur-xl md:block">
          <DashboardSidebar activeId={activeId} items={items} onItemClick={onItemClick} />
        </aside>

        <div className="relative flex min-h-screen flex-col">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,_rgba(173,197,255,0.3),_transparent_72%)]" />
          <main className="relative flex-1 pb-28 md:pb-8">{children}</main>

          <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
            <div className="mx-auto max-w-xl px-3 pt-3" style={insetBottomStyle()}>
              {renderBottomNav()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
