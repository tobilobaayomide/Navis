import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/cn";
import type { CodeArtifact } from "./code-artifact-viewer";
import { HugeiconsIcon } from "@hugeicons/react";
import { CopyIcon } from "@hugeicons/core-free-icons";
import { SunIcon, MoonIcon } from "../icons/dashboard-icons";
import { SyntaxSnippet, tokenizeLine } from "./syntax-snippet";
import { type VariantId } from "../context/PlaygroundContext";


type ActiveVariant = {
  blurb: string;
  componentName: string;
  fileName: string;
  id: VariantId;
  label: string;
  note: string;
  useFor: string;
};

type PlaygroundProps = {
  activeVariant: ActiveVariant;
  copiedState: string | null;
  copyToClipboard: (text: string, id: string) => void;
  implementationArtifacts: CodeArtifact[];
  installCommand: string;
  isLight: boolean;
  previewNav: ReactNode;
  toggleTheme: () => void;
};

// ─── Bottom Sheet (Full Code Drawer) ──────────────────────────────────────────

type CodeDrawerProps = {
  activeTabId: string;
  artifactLines: ReturnType<typeof tokenizeLine>[];
  codeBgClass: string;
  copiedState: string | null;
  copyToClipboard: (text: string, id: string) => void;
  implementationArtifacts: CodeArtifact[];
  isLight: boolean;
  mutedClass: string;
  onClose: () => void;
  onTabChange: (id: string) => void;
  open: boolean;
  softBorder: string;
};

function CodeDrawer({
  activeTabId,
  artifactLines,
  codeBgClass,
  copiedState,
  copyToClipboard,
  implementationArtifacts,
  isLight,
  mutedClass,
  onClose,
  onTabChange,
  open,
  softBorder,
}: CodeDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const activeArtifact =
    implementationArtifacts.find((art) => art.id === activeTabId) ??
    implementationArtifacts[0];

  const panelBg = isLight ? "bg-white" : "bg-[#0c1018]";
  const handleClass = isLight ? "bg-slate-300" : "bg-white/20";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          isLight ? "bg-black/30" : "bg-black/60"
        )}
        style={{ backdropFilter: "blur(2px)" }}
      />

      {/* Sheet */}
      <div
        ref={drawerRef}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-[20px] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          panelBg,
          open ? "translate-y-0" : "translate-y-full"
        )}
        style={{ height: "92dvh" }}
      >
        {/* Drag handle */}
        <div className="flex shrink-0 justify-center pt-3 pb-1">
          <div className={cn("h-1 w-10 rounded-full", handleClass)} />
        </div>

        {/* Sheet header */}
        <div className={cn("flex shrink-0 items-center justify-between border-b px-5 py-3", softBorder)}>
          {/* Tabs */}
          <div className="no-scrollbar flex items-center gap-1 overflow-x-auto">
            {implementationArtifacts.map((art) => {
              const isActive = art.id === activeTabId;
              return (
                <button
                  key={art.id}
                  onClick={() => onTabChange(art.id)}
                  type="button"
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium transition-all active:scale-[0.97]",
                    isActive
                      ? isLight ? "bg-slate-200 text-slate-900" : "bg-white/10 text-white"
                      : isLight ? "text-slate-500 hover:bg-slate-100 hover:text-slate-800" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  )}
                >
                  {art.label}
                </button>
              );
            })}
          </div>

          <div className="ml-3 flex shrink-0 items-center gap-2 ">
            {/* Copy */}
            <button
              onClick={() => copyToClipboard(activeArtifact?.code ?? "", activeArtifact.id)}
              type="button"
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all active:scale-[0.97]",
                isLight
                  ? "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              )}
            >
              <HugeiconsIcon
                absoluteStrokeWidth
                className={cn("h-3 w-3", copiedState === activeArtifact?.id ? "text-emerald-500" : "")}
                icon={CopyIcon}
                size={12}
                strokeWidth={1.7}
              />
              {copiedState === activeArtifact?.id ? "Copied" : "Copy"}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close"
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                isLight ? "bg-slate-100 text-slate-500 hover:bg-slate-200" : "bg-white/8 text-slate-400 hover:bg-white/12"
              )}
            >
              <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>
        </div>

        {/* File name */}
        <div className={cn("shrink-0 px-5 py-2 border-b", softBorder)}>
          <span className={cn("font-mono text-[11px]", mutedClass)}>
            {activeArtifact?.fileName}
          </span>
        </div>

        {/* Scrollable code — full drawer shows line numbers */}
        <div className="flex-1 overflow-y-auto overflow-x-auto px-4 py-4 ">
          <SyntaxSnippet
            className="text-[12px] leading-6"
            isLight={isLight}
            lines={artifactLines}
          />
        </div>
      </div>
    </>
  );
}


// ─── Main Playground ──────────────────────────────────────────────────────────

export function Playground({
  activeVariant,
  copiedState,
  copyToClipboard,
  implementationArtifacts,
  installCommand,
  isLight,
  previewNav,
  toggleTheme,
}: PlaygroundProps) {
  const [activeTabId, setActiveTabId] = useState<string>("component");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeArtifact =
    implementationArtifacts.find((art) => art.id === activeTabId) ??
    implementationArtifacts[0];

  const artifactLines = useMemo(
    () =>
      (activeArtifact?.code ?? "").split("\n").map((line) => tokenizeLine(line)),
    [activeArtifact]
  );

  const softBorder = isLight ? "border-[rgba(15,23,42,0.06)]" : "border-white/[0.06]";
  const headingClass = isLight ? "text-slate-950" : "text-white";
  const mutedClass   = isLight ? "text-slate-500"  : "text-slate-400";
  const panelClass   = isLight
    ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.86)] shadow-[0_24px_56px_rgba(15,23,42,0.12)]"
    : "border-white/[0.08] bg-[rgba(12,16,24,0.82)] shadow-[0_24px_64px_rgba(0,0,0,0.34)]";
  const codeBgClass  = isLight ? "bg-[#F7F8FA]" : "bg-[#090d14]";
  const codePreviewBg = isLight ? "bg-slate-100/70" : "bg-white/[0.03]";

  return (
    <>
      {/* ── Layout ──────────────────────────────────────────────────────────── */}
      <div className="flex min-h-screen w-full flex-col lg:h-screen lg:flex-row lg:overflow-hidden">

        {/* ── LEFT: Preview ───────────────────────────────────────────────── */}
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-transparent px-5 lg:p-12">

          {/* Breadcrumb */}
          <div className="absolute left-5 top-10 z-10 flex items-center gap-1.5 text-[14px] sm:text-[16px] font-medium lg:left-14 lg:top-8">
            <Link to="/" className={cn("transition-colors hover:text-slate-900 dark:hover:text-white", mutedClass)}>
              Navis UI
            </Link>
            <span className={mutedClass}>/</span>
            <Link to="/components" className={cn("transition-colors hover:text-slate-900 dark:hover:text-white", mutedClass)}>
              Components
            </Link>
            <span className={mutedClass}>/</span>
            <span className={headingClass}>{activeVariant.label}</span>
          </div>

          <div className="flex w-full items-center justify-center pt-16 pb-6 lg:min-h-0 lg:pt-0 lg:pb-0">
            <div className="w-full max-w-[420px] scale-[0.82] sm:scale-[0.9] lg:scale-100 origin-center">
              {previewNav}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Config + Code panel ──────────────────────────────────── */}
        <div
          className={cn(
            "flex w-full shrink-0 flex-col border-t",
            "lg:h-full lg:w-[400px] lg:overflow-y-auto lg:border-l lg:border-t-0",
            "xl:w-[780px]",
            panelClass
          )}
        >
          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className={cn("flex items-center justify-between border-b px-5 py-4", softBorder)}>
            <div className="min-w-0">
              <h1 className={cn("text-xl font-normal tracking-[0.03em] truncate", headingClass)}>
                {activeVariant.label}
              </h1>
              <p className={cn("mt-0.5 text-[13px] font-light truncate", mutedClass)}>
                {activeVariant.blurb}
              </p>
            </div>

            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle theme"
              className={cn(
                "ml-3 shrink-0 rounded-full border p-2 transition-colors duration-200",
                isLight ? "bg-white text-slate-800" : "bg-transparent text-slate-200",
                softBorder
              )}
            >
              {isLight ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
            </button>
          </div>

          {/* ── CLI Install ─────────────────────────────────────────────── */}
          <div className={cn("border-b px-5 py-4", softBorder)}>
            <span className={cn("text-[10px] font-semibold uppercase tracking-[0.18em]", mutedClass)}>
              CLI Installation
            </span>

            <button
              onClick={() => copyToClipboard(installCommand, "install")}
              className={cn(
                "mt-2.5 flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-1 text-left font-mono text-[13px] transition-all active:scale-[0.995] hover:border-slate-500/30",
                isLight ? "bg-slate-50 text-slate-800" : "bg-transparent text-slate-200",
                softBorder
              )}
              type="button"
            >
              <span className="truncate">{installCommand}</span>
              <span className="flex shrink-0 items-center justify-center rounded-lg border border-slate-500/10 bg-slate-500/5 p-1.5">
                <HugeiconsIcon
                  absoluteStrokeWidth
                  className={cn("h-4 w-4 transition-opacity", copiedState === "install" ? "opacity-100" : "opacity-70")}
                  icon={CopyIcon}
                  size={15}
                  strokeWidth={1.7}
                />
              </span>
            </button>
          </div>

          {/* ── Implementation ──────────────────────────────────────────── */}
          <div className="flex flex-1 flex-col px-5 pt-4 pb-5 gap-3">

            {/* Label + tab row */}
            <div className="flex flex-col gap-2">
              <p className={cn("text-[10px] font-semibold uppercase tracking-[0.18em]", headingClass)}>
                Component Source
              </p>
            </div>

            {/* Code card */}
            <div
              className={cn(
                "flex flex-col overflow-hidden rounded-2xl",
                "max-h-[260px] lg:max-h-none lg:flex-1",
                codePreviewBg
              )}
            >
              {/* Editor bar — file name + copy */}
              <div className={cn("flex shrink-0 items-center justify-between px-4 py-2.5 border-b", softBorder)}>
                <p className={cn("font-mono text-[11px]", mutedClass)}>
                  {activeArtifact?.fileName}
                </p>

                {/* Desktop: copy icon */}
                <button
                  className={cn(
                    "hidden lg:flex items-center justify-center rounded-md p-1.5 transition-all active:scale-[0.55]",
                    isLight
                      ? "text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                      : "text-slate-500 hover:bg-white/10 hover:text-slate-300"
                  )}
                  onClick={() => copyToClipboard(activeArtifact?.code ?? "", activeArtifact.id)}
                  type="button"
                  title="Copy code"
                >
                  <HugeiconsIcon
                    absoluteStrokeWidth
                    className={cn(
                      "h-4 w-4 transition-opacity",
                      copiedState === activeArtifact?.id ? "opacity-100 text-emerald-500" : "opacity-80"
                    )}
                    icon={CopyIcon}
                    size={15}
                    strokeWidth={1.7}
                  />
                </button>
              </div>

             { /* Code preview (no line numbers) */}
              <div className="flex-1 overflow-y-auto overflow-x-auto ">
                <SyntaxSnippet
                  className="text-[11px] leading-5"
                  isLight={isLight}
                  lines={artifactLines}
                 
                />
              </div>

              {/* Mobile-only: fade + "View full code" button */}
              <div className="lg:hidden">
                <div
                  className={cn(
                    "h-10 -mt-10 pointer-events-none",
                    isLight
                      ? "bg-gradient-to-b from-transparent to-slate-100/70"
                      : "bg-gradient-to-b from-transparent to-[rgba(9,13,20,0.85)]"
                  )}
                />
                <button
                  onClick={() => setDrawerOpen(true)}
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-b-2xl py-3 text-[12px] font-medium transition-colors",
                    isLight
                      ? "bg-slate-100/70 text-slate-600 hover:bg-slate-200/60"
                      : "bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"
                  )}
                >
                  <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 1v12M1 7l6 6 6-6" />
                  </svg>
                  View full code
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Code Drawer (mobile bottom sheet) ──────────────────────────────── */}
      <CodeDrawer
        activeTabId={activeTabId}
        artifactLines={artifactLines}
        codeBgClass={codeBgClass}
        copiedState={copiedState}
        copyToClipboard={copyToClipboard}
        implementationArtifacts={implementationArtifacts}
        isLight={isLight}
        mutedClass={mutedClass}
        onClose={() => setDrawerOpen(false)}
        onTabChange={setActiveTabId}
        open={drawerOpen}
        softBorder={softBorder}
      />
    </>
  );
}
