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
        isLight ? "border-l border-slate-200/60" : "border-l border-white/[0.06]"
      )}
    >
      <div className="space-y-5">
        <div>
          <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", isLight ? "text-slate-400" : "text-slate-500")}>
            On This Page
          </p>
          <div className="mt-4 space-y-0.5">
            {currentPage.sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  className={cn(
                    "relative block rounded-md py-1.5 pl-3 text-[13px] transition-all duration-300",
                    isActive
                      ? isLight
                        ? "text-blue-600 font-medium"
                        : "text-blue-400 font-medium"
                      : isLight
                        ? "text-slate-400 hover:text-slate-700"
                        : "text-slate-500 hover:text-slate-200"
                  )}
                  href={`#${section.id}`}
                  key={section.id}
                >
                  {isActive && (
                    <span className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] rounded-full",
                      isLight ? "bg-blue-600" : "bg-blue-400"
                    )} />
                  )}
                  {section.label}
                </a>
              );
            })}
          </div>
        </div>

       
      </div>
    </aside>
  );
}

export default DocsOnThisPage;
