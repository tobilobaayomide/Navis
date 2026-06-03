import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
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
    <div className="grid items-start gap-8 pb-14 pt-0 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 lg:pt-2 xl:grid-cols-[260px_minmax(0,1fr)_220px]">
      <aside className="hidden lg:block" aria-hidden="true">
        <DocsSidebar currentPage={currentPage} isLight={isLight} />
      </aside>

      <div className="min-w-0 max-w-4xl space-y-8 lg:space-y-10">
        <header className={isLight ? "space-y-4 border-b pb-8 sm:pb-10 border-[rgba(15,23,42,0.06)]" : "space-y-4 border-b pb-8 sm:pb-10 border-white/[0.06]"}>
          <h1 className={isLight ? "text-[2.2rem] font-semibold tracking-[0.02em] leading-[1.05] text-slate-950 sm:text-[2.75rem]" : "text-[2.2rem] font-semibold tracking-[0.02em] leading-[1.05] text-white sm:text-[2.75rem]"}>
            {currentPage.title}
          </h1>
          <p className={isLight ? "max-w-[72ch] text-base leading-7 text-slate-600 sm:text-[18px] sm:leading-8" : "max-w-[72ch] text-base leading-7 text-slate-300 sm:text-[18px] sm:leading-8"}>
            {currentPage.description}
          </p>
        </header>

        <article className="space-y-12">
          <DocsArticle copyToClipboard={copyToClipboard} currentPage={currentPage} installCommand={installCommand} isLight={isLight} />
        </article>

        <div className={isLight ? "grid gap-3 border-t pt-6 sm:grid-cols-2 border-[rgba(15,23,42,0.06)]" : "grid gap-3 border-t pt-6 sm:grid-cols-2 border-white/[0.06]"}>
          <DocsPager align="left" href={previousPage ? `/docs/${previousPage.slug}` : undefined} isLight={isLight} label="Previous" title={previousPage?.title ?? ""} />
          <DocsPager align="right" href={nextPage ? `/docs/${nextPage.slug}` : undefined} isLight={isLight} label="Next" title={nextPage?.title ?? ""} />
        </div>
      </div>

      <div className="hidden xl:block" aria-hidden="true">
        <DocsOnThisPage activeSection={activeSection} currentPage={currentPage} isLight={isLight} />
      </div>
    </div>
  );
}
