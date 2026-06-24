import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { cn } from "../lib/cn";
import DocsSidebar from "./docs/DocsSidebar";
import DocsOnThisPage from "./docs/DocsOnThisPage";
import DocsArticle from "./docs/DocsArticle";
import DocsPager from "./docs/DocsPager";
import { DOC_GROUPS } from "../data/docsContent";
import type { DocPage } from "./docs/types";

type Props = {
  isLight: boolean;
  installCommand: string;
  copyToClipboard: (text: string, id: string) => void;
};

const DOC_PAGES: DocPage[] = DOC_GROUPS.flatMap((g) => g.items);

export default function Docs({ isLight, installCommand, copyToClipboard }: Props) {
  const { docSlug } = useParams();
  const location = useLocation();
  const currentPage = DOC_PAGES.find((p) => p.slug === docSlug);
  const [activeSection, setActiveSection] = useState<string>(currentPage?.sections?.[0]?.id ?? "");

  useEffect(() => {
    if (!currentPage) return;
    const nextSection = location.hash.replace("#", "") || currentPage.sections[0]?.id || "";
    setActiveSection(nextSection);
  }, [currentPage, location.hash]);

  useEffect(() => {
    if (!location.hash) return;
    const hashId = location.hash.replace("#", "");
    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(hashId)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (!currentPage) return;
    const sectionElements = currentPage.sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentPage]);

  if (!currentPage) return <Navigate replace to="/docs/introduction" />;

  const currentIndex = DOC_PAGES.findIndex((p) => p.slug === currentPage.slug);
  const previousPage = DOC_PAGES[currentIndex - 1];
  const nextPage = DOC_PAGES[currentIndex + 1];

  return (
    <div className="relative px-4">
      <div 
        className={cn(
          "pointer-events-none absolute left-[20%] top-0 -z-10 -translate-x-1/2 -translate-y-[20%] w-[600px] h-[400px] rounded-[100%] blur-[120px] transition-opacity duration-1000",
          isLight ? "bg-blue-400/20" : "bg-blue-600/15"
        )} 
        aria-hidden="true" 
      />

      <div className="grid items-start gap-8 pb-14 pt-0 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 lg:pt-2 xl:grid-cols-[260px_minmax(0,1fr)_220px]">
        <aside className="hidden lg:block" aria-hidden="true">
          <DocsSidebar currentPage={currentPage} isLight={isLight} />
        </aside>

        <div className="min-w-0 max-w-4xl space-y-8 lg:space-y-10">
          <header className="relative space-y-5 pb-10 sm:pb-14 pt-2 sm:pt-6">
            <h1 className={cn(
              "text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold tracking-tight leading-[1.1]",
              isLight ? "text-slate-950" : "text-white"
            )}>
              {currentPage.title}
            </h1>
            <p className={cn(
              "max-w-[60ch] text-[15px] sm:text-[17px] leading-relaxed",
              isLight ? "text-slate-500" : "text-slate-400"
            )}>
              {currentPage.description}
            </p>
            <div className={cn("h-px w-full mt-4", isLight ? "bg-slate-200/60" : "bg-white/[0.06]")} />
          </header>

          <article>
            <DocsArticle copyToClipboard={copyToClipboard} currentPage={currentPage} installCommand={installCommand} isLight={isLight} />
          </article>

          <div className={cn("mt-16 sm:mt-24 grid gap-4 border-t pt-8 sm:grid-cols-2", isLight ? "border-slate-200/60" : "border-white/[0.06]")}>
          <DocsPager align="left" href={previousPage ? `/docs/${previousPage.slug}` : undefined} isLight={isLight} label="Previous" title={previousPage?.title ?? ""} />
          <DocsPager align="right" href={nextPage ? `/docs/${nextPage.slug}` : undefined} isLight={isLight} label="Next" title={nextPage?.title ?? ""} />
          </div>
      </div>

      <div className="hidden xl:block" aria-hidden="true">
        <DocsOnThisPage activeSection={activeSection} currentPage={currentPage} isLight={isLight} />
      </div>
    </div>
    </div>
  );
}
