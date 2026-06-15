import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/cn";
import type { CodeArtifact } from "./CodeArtifactViewer";
import { HugeiconsIcon } from "@hugeicons/react";
import { CopyIcon } from "@hugeicons/core-free-icons";
import { SunIcon, MoonIcon } from "../icons/DashboardIcons";
import { SyntaxSnippet, tokenizeLine } from "./SyntaxSnippet";
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

// ─── Breadcrumb Chevron ───────────────────────────────────────────────────────

function ChevronSeparator({ className }: { className?: string }) {
  return (
    <span className={cn("breadcrumb-chevron", className)}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </span>
  );
}

// ─── Traffic Light Dots ───────────────────────────────────────────────────────

function TrafficDots({ isLight }: { isLight: boolean }) {
  return (
    <div className={cn("traffic-dots", isLight ? "traffic-dots-light" : "traffic-dots-dark")}>
      <span />
      <span />
      <span />
    </div>
  );
}

// ─── Bottom Sheet (Full Code Drawer) ──────────────────────────────────────────

type CodeDrawerProps = {
  activeTabId: string;
  artifactLines: ReturnType<typeof tokenizeLine>[];
  codeBgClass: string;
  copiedState: string | null;
  copyToClipboard: (text: string, id: string) => void;
  implementationArtifacts: CodeArtifact[];
  isLight: boolean;
  lineCount: number;
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
  lineCount,
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
      {/* Backdrop with blur */}
      <div
        onClick={handleBackdropClick}
        className={cn(
          "fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          isLight ? "bg-black/30" : "bg-black/60"
        )}
      />

      {/* Sheet */}
      <div
        ref={drawerRef}
        className={cn(
          "fixed z-50 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          panelBg,
          "bottom-0 left-0 right-0 h-[92dvh] rounded-t-[20px]",
          "lg:top-[50%] lg:left-[50%] lg:bottom-auto lg:right-auto lg:h-[85vh] lg:w-[800px] lg:max-w-[90vw] lg:rounded-[24px] lg:border",
          isLight ? "lg:border-slate-200/60 lg:shadow-2xl" : "lg:border-white/10 lg:shadow-[0_0_80px_rgba(0,0,0,0.5)]",
          open 
            ? "translate-y-0 opacity-100 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:scale-100 pointer-events-auto" 
            : "translate-y-full opacity-0 lg:-translate-x-1/2 lg:translate-y-[-45%] lg:scale-95 pointer-events-none"
        )}
      >
        {/* Drag handle (mobile only) */}
        <div className="flex lg:hidden shrink-0 justify-center pt-3 pb-1">
          <div className={cn("h-1 w-10 rounded-full", handleClass)} />
        </div>

        {/* Sheet header */}
        <div className={cn("flex shrink-0 items-center justify-between border-b px-5 py-3", softBorder)}>
          <div className="flex items-center gap-3">
            <TrafficDots isLight={isLight} />
            {/* Tabs */}
            <div className="no-scrollbar flex items-center gap-1 overflow-x-auto ml-1">
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

        {/* File info row */}
        <div className={cn("shrink-0 px-5 py-2 border-b flex items-center justify-between", softBorder)}>
          <span className={cn("font-mono text-[11px]", mutedClass)}>
            {activeArtifact?.fileName}
          </span>
          <span className={cn("text-[10px] font-medium tabular-nums", mutedClass)}>
            {lineCount} lines
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
  const [variantKey, setVariantKey] = useState(0);
  const [copyFlashKey, setCopyFlashKey] = useState(0);
  const [themeKey, setThemeKey] = useState(0);
  const prevVariantRef = useRef(activeVariant.id);

  // Trigger crossfade when variant changes
  useEffect(() => {
    if (prevVariantRef.current !== activeVariant.id) {
      setVariantKey((k) => k + 1);
      prevVariantRef.current = activeVariant.id;
    }
  }, [activeVariant.id]);

  const activeArtifact =
    implementationArtifacts.find((art) => art.id === activeTabId) ??
    implementationArtifacts[0];

  const artifactLines = useMemo(
    () =>
      (activeArtifact?.code ?? "").split("\n").map((line) => tokenizeLine(line)),
    [activeArtifact]
  );

  const lineCount = artifactLines.length;

  const softBorder = isLight ? "border-[rgba(15,23,42,0.06)]" : "border-white/[0.06]";
  const headingClass = isLight ? "text-slate-950" : "text-white";
  const mutedClass   = isLight ? "text-slate-500"  : "text-slate-400";
  const panelClass   = isLight
    ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.86)] shadow-[0_24px_56px_rgba(15,23,42,0.12)]"
    : "border-white/[0.08] bg-[rgba(12,16,24,0.82)] shadow-[0_24px_64px_rgba(0,0,0,0.34)]";
  const codeBgClass  = isLight ? "bg-[#F7F8FA]" : "bg-[#090d14]";

  const handleInstallCopy = () => {
    copyToClipboard(installCommand, "install");
    setCopyFlashKey((k) => k + 1);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setThemeKey((k) => k + 1);
  };

  return (
    <>
      {/* ── Layout ──────────────────────────────────────────────────────────── */}
      <div className="flex min-h-screen w-full flex-col lg:h-screen lg:flex-row lg:overflow-hidden">

        {/* ── LEFT: Preview ───────────────────────────────────────────────── */}
        <div className={cn(
          "relative flex min-h-[280px] sm:min-h-[360px] lg:min-h-0 flex-1 flex-col items-center justify-center overflow-hidden bg-transparent px-4 sm:px-6 lg:p-12",
          isLight ? "dot-grid-light" : "dot-grid-dark"
        )}>

          {/* Breadcrumb */}
          <div className="absolute left-4 top-8 z-10 flex items-center gap-1 text-[13px] sm:text-[14px] font-medium lg:left-14 lg:top-8">
            <Link to="/" className={cn("transition-colors hover:text-slate-900 dark:hover:text-white", mutedClass)}>
              Navis UI
            </Link>
            <ChevronSeparator className={mutedClass} />
            <Link to="/components" className={cn("transition-colors hover:text-slate-900 dark:hover:text-white", mutedClass)}>
              Components
            </Link>
            <ChevronSeparator className={mutedClass} />
            <span className={headingClass}>{activeVariant.label}</span>
          </div>

          {/* Live Preview badge */}
          <div className="absolute hidden md:flex right-4 top-8 z-10 lg:right-14 lg:top-8">
            <span className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-[0.14em]",
              isLight
                ? "bg-white/80 text-slate-500 border border-slate-200/60 backdrop-blur-sm"
                : "bg-white/[0.06] text-slate-400 border border-white/[0.06] backdrop-blur-sm"
            )}>
              <span className={cn(
                "h-1.5 w-1.5 rounded-full",
                isLight ? "bg-emerald-500" : "bg-emerald-400"
              )} />
              Live Preview
            </span>
          </div>

          {/* Phone frame with nav preview */}
          <div className={cn(
            "flex w-full items-center justify-center",
            "flex-1 mt-20 mb-4 lg:mt-10 lg:mb-0 rounded-[20px]",
            isLight
              ? "bg-slate-100 "
              : "bg-white/[0.05] "
          )}>
            
              <div
                key={variantKey}
                className={cn(
                  "variant-crossfade relative w-[380px] h-[100px] shrink-0 scale-[0.85] sm:scale-[0.95] lg:scale-100 origin-center",
                )}
              >
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
          <div className={cn("flex flex-col px-5 sm:px-6 pt-5 sm:pt-6 pb-4 gap-3", "border-b", softBorder)}>
            <div className="flex items-start justify-between gap-4 panel-stagger-1" key={`header-${activeVariant.id}`}>
              <div className="min-w-0 flex-1">
                <h1 className={cn(
                  "text-[1.375rem] sm:text-2xl font-semibold tracking-[-0.02em] truncate leading-tight",
                  headingClass
                )}>
                  {activeVariant.label}
                </h1>
                <p className={cn(
                  "mt-2 text-[13px] sm:text-sm leading-[1.6]",
                  mutedClass,
                  "whitespace-normal"
                )}>
                  {activeVariant.blurb}
                </p>
              </div>

              {/* Theme toggle pill */}
              <div className={cn(
                "theme-toggle-pill shrink-0",
                isLight ? "theme-toggle-pill-light" : "theme-toggle-pill-dark"
              )}>
                <button
                  onClick={() => { if (!isLight) handleThemeToggle(); }}
                  type="button"
                  aria-label="Light mode"
                  className={cn(
                    "theme-toggle-option",
                    isLight
                      ? "theme-toggle-option-active-light"
                      : "theme-toggle-option-inactive-dark"
                  )}
                >
                  <SunIcon className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => { if (isLight) handleThemeToggle(); }}
                  type="button"
                  aria-label="Dark mode"
                  className={cn(
                    "theme-toggle-option",
                    !isLight
                      ? "theme-toggle-option-active-dark"
                      : "theme-toggle-option-inactive-light"
                  )}
                >
                  <MoonIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* USE CASE + MOTION TRAITS */}
            <div className="flex flex-col gap-2 panel-stagger-2" key={`tags-${activeVariant.id}`}>
              <div className={cn(
                "variant-meta-row",
                isLight ? "variant-meta-row-light" : "variant-meta-row-dark"
              )}>
                <span className={cn(
                  "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-[0.12em] shrink-0",
                  isLight ? "bg-indigo-50 text-indigo-500" : "bg-indigo-500/10 text-indigo-400"
                )}>
                  Best for
                </span>
                <span className={cn("text-[12px] font-medium", isLight ? "text-slate-600" : "text-slate-300")}>
                  {activeVariant.useFor}
                </span>
              </div>
              {activeVariant.note && (
                <p className={cn("text-[11px] sm:text-[12px] italic font-light leading-relaxed px-1", mutedClass)}>
                  {activeVariant.note}
                </p>
              )}
            </div>
          </div>

          {/* Gradient divider */}
          <div className={cn("gradient-divider", isLight && "gradient-divider-light")} />

          {/* ── CLI Install Section ───────────────────────────────────── */}
          <div className={cn("px-5 sm:px-6 py-4 sm:py-5 panel-stagger-3")} key={`cli-${activeVariant.id}`}>
            <div className="section-label-row">
              <div className={cn(
                "section-label-icon",
                isLight ? "section-label-icon-light" : "section-label-icon-dark"
              )}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </div>
              <span className={cn("text-[10px] font-semibold uppercase tracking-[0.16em]", mutedClass)}>
                Quick Install
              </span>
            </div>

            <button
              key={copyFlashKey}
              onClick={handleInstallCopy}
              className={cn(
                "terminal-install w-full flex items-center gap-3 px-4 py-3 text-left text-[12.5px] sm:text-[13px]",
                isLight ? "terminal-install-light" : "terminal-install-dark",
                copiedState === "install" && "copy-flash"
              )}
              type="button"
            >
              <span className="terminal-prompt">$</span>
              <span className={cn("truncate flex-1", isLight ? "text-slate-700" : "text-slate-200")}>
                {installCommand}
              </span>
              <span className={cn(
                "flex shrink-0 items-center justify-center rounded-md px-2 py-1 text-[9px] font-semibold uppercase tracking-wider transition-all duration-200",
                copiedState === "install"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : isLight
                    ? "text-slate-400 hover:text-slate-600"
                    : "text-slate-500 hover:text-slate-300"
              )}>
                {copiedState === "install" ? (
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Copied
                  </span>
                ) : (
                  <HugeiconsIcon
                    absoluteStrokeWidth
                    className="h-3.5 w-3.5"
                    icon={CopyIcon}
                    size={14}
                    strokeWidth={1.7}
                  />
                )}
              </span>
            </button>
          </div>

          {/* Subtle separator */}
          <div className={cn("mx-5 sm:mx-6 h-px", isLight ? "bg-slate-100" : "bg-white/[0.04]")} />

          {/* ── Component Source Section ──────────────────────────────── */}
          <div className="flex flex-1 flex-col px-5 sm:px-6 pt-4 sm:pt-5 pb-5 sm:pb-6 gap-3 panel-stagger-4" key={`code-${activeVariant.id}`}>

            {/* Section label row */}
            <div className="flex items-center justify-between">
              <div className="section-label-row" style={{ marginBottom: 0 }}>
                <div className={cn(
                  "section-label-icon",
                  isLight ? "section-label-icon-light" : "section-label-icon-dark"
                )}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <span className={cn("text-[10px] font-semibold uppercase tracking-[0.16em]", mutedClass)}>
                  Component Source
                </span>
              </div>
              <span className={cn("lang-badge", isLight ? "lang-badge-light" : "lang-badge-dark")}>
                JSX
              </span>
            </div>

            {/* Code card */}
            <div
              className={cn(
                "code-card flex flex-col",
                "max-h-[280px] lg:max-h-none lg:flex-1",
                isLight ? "code-card-light" : "code-card-dark"
              )}
            >
              {/* Editor header bar */}
              <div className={cn("code-header-bar", isLight && "code-header-bar-light")}>
                <div className="flex items-center gap-2.5">
                  <TrafficDots isLight={isLight} />
                  <div className={cn("file-tab-chip", isLight ? "file-tab-chip-light" : "file-tab-chip-dark")}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                      <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    {activeArtifact?.fileName}
                  </div>
                  <span className={cn("text-[10px] tabular-nums font-medium", isLight ? "text-slate-300" : "text-slate-600")}>
                    {lineCount} ln
                  </span>
                </div>

                {/* Desktop: action buttons */}
                <div className="hidden lg:flex items-center gap-0.5">
                  <button
                    className={cn("action-icon-btn", isLight ? "action-icon-btn-light" : "action-icon-btn-dark")}
                    onClick={() => copyToClipboard(activeArtifact?.code ?? "", activeArtifact.id)}
                    type="button"
                    title="Copy code"
                  >
                    <HugeiconsIcon
                      absoluteStrokeWidth
                      className={cn(
                        "h-3.5 w-3.5 transition-colors duration-200",
                        copiedState === activeArtifact?.id ? "text-emerald-500" : ""
                      )}
                      icon={CopyIcon}
                      size={14}
                      strokeWidth={1.7}
                    />
                  </button>
                  <button
                    className={cn("action-icon-btn", isLight ? "action-icon-btn-light" : "action-icon-btn-dark")}
                    onClick={() => setDrawerOpen(true)}
                    type="button"
                    title="Expand code"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Code preview */}
              <div className="flex-1 overflow-y-auto overflow-x-auto">
                <SyntaxSnippet
                  className="text-[11px] leading-5"
                  isLight={isLight}
                  lines={artifactLines}
                />
              </div>

              {/* Mobile-only: fade + "View full code" */}
              <div className="lg:hidden">
                <div
                  className={cn(
                    "h-10 -mt-10 pointer-events-none",
                    isLight
                      ? "bg-gradient-to-b from-transparent to-[rgba(15,23,42,0.02)]"
                      : "bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.3)]"
                  )}
                />
                <button
                  onClick={() => setDrawerOpen(true)}
                  type="button"
                  className={cn(
                    "expand-code-btn rounded-b-[1rem]",
                    isLight ? "expand-code-btn-light" : "expand-code-btn-dark"
                  )}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
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
        lineCount={lineCount}
        mutedClass={mutedClass}
        onClose={() => setDrawerOpen(false)}
        onTabChange={setActiveTabId}
        open={drawerOpen}
        softBorder={softBorder}
      />
    </>
  );
}
