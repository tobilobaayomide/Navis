import React from "react";
import { cn } from "../../lib/cn";
import type { DocPage } from "./types";

export function DocsOnThisPage({
  currentPage,
  activeSection,
  isLight
}: {
  currentPage: DocPage;
  activeSection: string;
  isLight: boolean;
}) {
  if (!currentPage || !currentPage.sections || currentPage.sections.length === 0) return null;

  return (
    <aside
      className={cn(
        "fixed top-28 right-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))] z-20 hidden w-[220px] pl-6 xl:block",
        isLight ? "border-l border-[rgba(15,23,42,0.06)]" : "border-l border-white/[0.06]"
      )}
    >
      <div className="space-y-5">
        <div>
          <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", isLight ? "text-slate-500" : "text-slate-400")}>
            On This Page
          </p>
          <div className="mt-4 space-y-1">
            {currentPage.sections.map((section) => (
              <a
                className={cn(
                  "block rounded-md py-1 text-[13px] transition-colors",
                  activeSection === section.id
                    ? isLight
                      ? "text-slate-950"
                      : "text-white"
                    : isLight
                      ? "text-slate-500 hover:text-slate-900"
                      : "text-slate-400 hover:text-slate-100"
                )}
                href={`#${section.id}`}
                key={section.id}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>

       
      </div>
    </aside>
  );
}

export default DocsOnThisPage;
