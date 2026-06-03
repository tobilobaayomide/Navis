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
        "rounded-2xl border p-4 transition-colors",
        align === "right" ? "md:text-right" : "md:text-left",
        isLight
          ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.82)] hover:bg-white"
          : "border-white/[0.08] bg-[rgba(14,18,26,0.82)] hover:bg-[rgba(18,24,35,0.94)]"
      )}
      to={href}
    >
      <p className={cn("text-[11px] font-semibold uppercase tracking-[0.18em]", isLight ? "text-slate-500" : "text-slate-400")}>{label}</p>
      <p className={cn("mt-2 text-base font-semibold", isLight ? "text-slate-950" : "text-white")}>{title}</p>
    </NavLink>
  );
}

export default DocsPager;
