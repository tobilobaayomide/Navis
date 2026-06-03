import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/cn";
import { DOC_GROUPS } from "../../data/docsContent";
import type { DocPage } from "./types";

export function DocsSidebar({ currentPage, isLight, mobile = false }: { currentPage: DocPage; isLight: boolean; mobile?: boolean }) {
  if (mobile) {
    const mobileItems = DOC_GROUPS.flatMap((group) => group.items);

    return (
      <nav
        aria-label="Documentation navigation"
        className={cn(
          "-mx-4 border-y px-4 py-3 backdrop-blur-xl sm:-mx-10 sm:px-10 lg:hidden",
          isLight
            ? "border-[rgba(15,23,42,0.08)] bg-white/86"
            : "border-white/[0.08] bg-[#0a0d13]/86"
        )}
      >
        <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mobileItems.map((item: any) => {
            const ItemIcon = item.icon;
            const isCurrent = item.slug === currentPage.slug;

            return (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                    isActive || isCurrent
                      ? isLight
                        ? "border-[rgba(15,23,42,0.1)] bg-slate-950 text-white"
                        : "border-white/[0.14] bg-white text-slate-950"
                      : isLight
                        ? "border-[rgba(15,23,42,0.08)] bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        : "border-white/[0.08] bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white"
                  )
                }
                key={item.slug}
                to={`/docs/${item.slug}`}
              >
                <ItemIcon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Documentation navigation"
      className={cn(
        "fixed top-28 left-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))] z-20 w-[260px] space-y-8 border-r pr-6",
        isLight ? "border-[rgba(15,23,42,0.06)]" : "border-white/[0.06]"
      )}
    >
      {DOC_GROUPS.map((group) => (
        <div key={group.title}>
          <h4
            className={cn(
              "text-[10px] font-bold uppercase tracking-[0.2em]",
              isLight ? "text-slate-500" : "text-slate-400"
            )}
          >
            {group.title}
          </h4>
          <div className="mt-4 space-y-1">
            {group.items.map((item: any) => {
              const ItemIcon = item.icon;

              return (
                <div className="space-y-1" key={item.slug}>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "transition-colors",
                        "flex items-center rounded-lg border px-3 py-2.5 text-sm font-medium",
                        isActive
                          ? isLight
                            ? "border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.04)] text-slate-950"
                            : "border-white/[0.1] bg-[rgba(255,255,255,0.05)] text-white"
                          : isLight
                            ? "border-transparent text-slate-500 hover:border-[rgba(15,23,42,0.06)] hover:bg-[rgba(15,23,42,0.025)] hover:text-slate-950"
                            : "border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-[rgba(255,255,255,0.03)] hover:text-slate-100"
                      )
                    }
                    to={`/docs/${item.slug}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <ItemIcon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          item.slug === currentPage.slug
                            ? isLight
                              ? "text-slate-900"
                              : "text-slate-100"
                            : isLight
                              ? "text-slate-400"
                              : "text-slate-500"
                        )}
                      />
                      <span>{item.label}</span>
                    </span>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default DocsSidebar;
