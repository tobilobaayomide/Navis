import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/cn";
import type { DocPage } from "./types";

export function DocsPager({ isLight, href, label, title, align }: { isLight: boolean; href?: string; label: string; title: string; align: "left" | "right"; }) {
  if (!href) {
    return <div className="hidden md:block" />;
  }

  return (
    <NavLink
      className={cn(
        "group flex items-center gap-4 rounded-2xl border p-5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5",
        align === "right" ? "flex-row-reverse text-right" : "",
        isLight
          ? "border-slate-200/80 bg-white shadow-sm hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/[0.06]"
          : "border-white/[0.06] bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/[0.06]"
      )}
      to={href}
    >
      <span className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
        isLight 
          ? "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600" 
          : "bg-white/[0.06] text-slate-500 group-hover:bg-blue-500/20 group-hover:text-blue-400"
      )}>
        <svg className={cn("h-4 w-4 transition-transform duration-300", align === "left" ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5")} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", isLight ? "text-slate-400" : "text-slate-500")}>{label}</p>
        <p className={cn("mt-1.5 text-[15px] font-semibold truncate transition-colors duration-300", isLight ? "text-slate-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400")}>{title}</p>
      </div>
    </NavLink>
  );
}

export default DocsPager;
