import { type ReactNode, useMemo, useState } from "react";
import { cn } from "../lib/cn";
import type { CodeArtifact } from "./code-artifact-viewer";
import { SyntaxSnippet, tokenizeLine } from "./syntax-snippet";

type VariantId = "minimal" | "floating" | "pill" | "indicator" | "glass";
type AccentColor = "indigo" | "emerald" | "rose" | "amber" | "blue";

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
  badgesEnabled: boolean;
  copiedState: boolean;
  copyToClipboard: (text: string) => void;
  customAccent: AccentColor;
  implementationArtifacts: CodeArtifact[];
  implementationBundleString: string;
  installCommand: string;
  isLight: boolean;
  itemsCount: number;
  onAccentChange: (accent: AccentColor) => void;
  onBadgesEnabledChange: (enabled: boolean) => void;
  onItemsCountChange: (count: number) => void;
  onVariantChange: (variant: VariantId) => void;
  previewNav: ReactNode;
  selectedVariant: VariantId;
};

const VARIANTS = [
  { id: "minimal", label: "Minimal", blurb: "Flat, quiet, content-first tab rail." },
  { id: "floating", label: "Floating", blurb: "Detached capsule with slide-and-morph states." },
  { id: "pill", label: "Pill", blurb: "Concentric segments with soft glowing backings." },
  { id: "indicator", label: "Indicator", blurb: "High contrast with a dedicated floating track line." },
  { id: "glass", label: "Glass", blurb: "Raised concentric center signature action." }
] as const;

const accentColors: Array<{ id: AccentColor; label: string; swatch: string }> = [
  { id: "indigo", label: "Indigo", swatch: "bg-indigo-500" },
  { id: "emerald", label: "Emerald", swatch: "bg-emerald-500" },
  { id: "rose", label: "Rose", swatch: "bg-rose-500" },
  { id: "amber", label: "Amber", swatch: "bg-amber-500" },
  { id: "blue", label: "Blue", swatch: "bg-sky-500" }
];

export function Playground({
  activeVariant,
  badgesEnabled,
  copiedState,
  copyToClipboard,
  customAccent,
  implementationArtifacts,
  implementationBundleString,
  installCommand,
  isLight,
  itemsCount,
  onAccentChange,
  onBadgesEnabledChange,
  onItemsCountChange,
  onVariantChange,
  previewNav,
  selectedVariant
}: PlaygroundProps) {
  const [activeTabId, setActiveTabId] = useState<string>("component");
  const supportsAccent = selectedVariant === "indicator" || selectedVariant === "glass";
  const activeArtifact = implementationArtifacts.find((art) => art.id === activeTabId) ?? implementationArtifacts[0];
  const artifactLines = useMemo(
    () => (activeArtifact?.code ?? "").split("\n").map((line) => tokenizeLine(line)),
    [activeArtifact]
  );

  const softBorderClass = isLight ? "border-[rgba(15,23,42,0.06)]" : "border-white/[0.06]";
  const headingClass = isLight ? "text-slate-950" : "text-white";
  const bodyClass = isLight ? "text-slate-600" : "text-slate-300";
  const mutedClass = isLight ? "text-slate-500" : "text-slate-400";
  
  const panelClass = isLight
    ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.86)] shadow-[0_24px_56px_rgba(15,23,42,0.12)]"
    : "border-white/[0.08] bg-[rgba(12,16,24,0.82)] shadow-[0_24px_64px_rgba(0,0,0,0.34)]";
  
  const insetClass = isLight
    ? "border-[rgba(15,23,42,0.06)] bg-[rgba(248,250,252,0.92)] text-slate-800 hover:bg-slate-100"
    : "border-white/[0.06] bg-[rgba(10,14,21,0.94)] text-slate-200 hover:bg-white/[0.03]";
  
  const toolClass = isLight
    ? "border-[rgba(15,23,42,0.08)] bg-white text-slate-700 hover:bg-slate-50"
    : "border-white/[0.08] bg-white/[0.04] text-slate-200 hover:bg-white/[0.07]";
  
  const activeToolClass = isLight
    ? "border-slate-900 bg-slate-900 text-white"
    : "border-white bg-white text-slate-950";
  
  const codeBgClass = isLight ? "bg-[#F7F8FA]" : "bg-[#090d14]";
  const integrationTree = `src/
  components/
    ui/
      ${activeVariant.fileName}.jsx
    layout/
      sidebar.jsx
  constants/
    navigation.js
  layouts/
    mobile-layout.jsx`;

  return (
    <div className="mx-auto flex max-w-max flex-col gap-20 pb-20 pt-6 ">
      
      {/* Editorial Header */}
      <header className={cn("text-left border-b pb-6", softBorderClass)}>
        <h1 className={cn("text-3xl font-bold tracking-[0.03em]", headingClass)}>Workspace</h1>
        <p className={cn("mt-1 max-w-2xl text-[20px] font-light leading-relaxed sm:text-[22px]", bodyClass)}>
          Select and test our responsive bottom navigation components directly.
        </p>
      </header>

      {/* 50/50 two-column layout */}
      <div className="grid gap-12 xl:grid-cols-[minmax(0,430px)_minmax(0,500px)] xl:items-start xl:justify-between">
        
        {/* LEFT — navbar preview capped at mobile width so all variants stay in proportion */}
        <div className="flex justify-center xl:justify-start">
          {/* Hard-cap at 390px — a standard iPhone viewport width */}
          <div className="w-full max-w-[390px] xl:ml-20 xl:mt-20">
            {previewNav}
          </div>
        </div>

        {/* Right Column: Dynamic Settings & Controls */}
        <div className={cn("w-full max-w-[500px] border p-5 sm:p-6 space-y-6 text-left flex flex-col justify-between xl:ml-0", panelClass)}>
          
          {/* Variant Selector stack */}
          <div className="space-y-3">
            <p className={cn("text-[10px] font-mono font-semibold uppercase tracking-[0.18em]", mutedClass)}>Select Variant</p>
            <div className="space-y-2">
              {VARIANTS.map((variant) => {
                const isActive = variant.id === selectedVariant;
                return (
                  <button
                    key={variant.id}
                    onClick={() => onVariantChange(variant.id)}
                    type="button"
                    className={cn(
                      "w-full rounded-[14px] border px-4 py-2.5 text-left transition-all active:scale-[0.99] flex items-center justify-between",
                      isActive ? activeToolClass : insetClass
                    )}
                  >
                    <span className="text-xs font-normal">{variant.label}</span>
                    <span className={cn("text-[10px] font-mono", isActive ? (isLight ? "text-white/60" : "text-slate-500") : "opacity-0")}>
                      Active
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Configuration controls */}
          <div className={cn("space-y-4 border-t pt-5", softBorderClass)}>
            <div>
              <p className={cn("text-[10px] font-mono font-semibold uppercase tracking-[0.18em] mb-2.5", mutedClass)}>Item Count</p>
              <div className="grid grid-cols-3 gap-2">
                {[3, 4, 5].map((count) => {
                  const isActive = itemsCount === count;
                  return (
                    <button
                      key={count}
                      onClick={() => onItemsCountChange(count)}
                      type="button"
                      className={cn(
                        "rounded-xl border py-2 text-xs font-normal transition-all active:scale-[0.98]",
                        isActive ? activeToolClass : toolClass
                      )}
                    >
                      {count} Tabs
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Badges counter switch */}
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-[10px] font-mono font-semibold uppercase tracking-[0.18em]", mutedClass)}>Badges</p>
                <p className={cn("text-[11px] mt-0.5", mutedClass)}>Adds badge UI and badge values to the generated files only when enabled</p>
              </div>
              <button
                aria-pressed={badgesEnabled}
                className={cn(
                  "relative h-6 w-11 rounded-full border transition-colors",
                  badgesEnabled
                    ? isLight ? "border-slate-900 bg-slate-900" : "border-white bg-white"
                    : isLight ? "border-slate-200 bg-slate-100" : "border-white/[0.08] bg-white/[0.05]"
                )}
                onClick={() => onBadgesEnabledChange(!badgesEnabled)}
                type="button"
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-4.5 w-4.5 rounded-full transition-transform",
                    badgesEnabled
                      ? isLight ? "left-[1.25rem] bg-white" : "left-[1.25rem] bg-slate-950"
                      : isLight ? "left-0.5 bg-white shadow-sm" : "left-0.5 bg-slate-300"
                  )}
                />
              </button>
            </div>

            {/* Color Accent controls */}
            {supportsAccent && (
              <div className={cn("space-y-2 border-t pt-4", softBorderClass)}>
                <p className={cn("text-[10px] font-mono font-semibold uppercase tracking-[0.18em] mb-2.5", mutedClass)}>Accent Color</p>
                <div className="flex flex-wrap gap-2">
                  {accentColors.map((color) => {
                    const isActive = customAccent === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => onAccentChange(color.id)}
                        title={color.label}
                        type="button"
                        className={cn(
                          "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-normal transition-all active:scale-[0.98]",
                          isActive ? activeToolClass : toolClass
                        )}
                      >
                        <span className={cn("inline-block h-3 w-3 rounded-full border border-black/5 dark:border-white/10", color.swatch)} />
                        {color.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      <section className={cn("overflow-hidden border text-left", panelClass)}>
        <div className={cn("border-b px-5 py-4 sm:px-6", softBorderClass)}>
          <p className={cn("text-[11px] font-mono font-semibold uppercase tracking-[0.18em]", mutedClass)}>Integration Guide</p>
          <h2 className={cn("mt-1 text-2xl font-semibold tracking-tight", headingClass)}>Add three files, then wire your router.</h2>
          <p className={cn("mt-2 max-w-[72ch] text-[15px] leading-7 sm:text-base", bodyClass)}>
            Keep the install surface small: one JSX component file, one shared navigation array, and one layout example. Every variant now carries its own styling, so there is no extra CSS file to copy.
          </p>
        </div>

        <div className="grid gap-4 px-5 py-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={cn("rounded-[18px] border p-4", insetClass)}>
            <p className={cn("text-[10px] font-mono font-semibold uppercase tracking-[0.18em]", mutedClass)}>1. Copy the files</p>
            <div className={cn("mt-3 rounded-[14px] border px-4 py-3 font-mono text-[12px]", codeBgClass, softBorderClass)}>
              {installCommand}
            </div>
            <p className={cn("mt-3 text-[15px] leading-7", bodyClass)}>
              If you are installing manually, copy the three files below. The generated snippets are JSX-first, so they paste cleanly into both `.jsx` and `.tsx` projects.
            </p>
            <div className={cn("mt-4 overflow-hidden rounded-[16px] border", softBorderClass)}>
              <pre className={cn("overflow-x-auto px-4 py-4 font-mono text-[12px] leading-6", codeBgClass, headingClass)}>
                <code>{integrationTree}</code>
              </pre>
            </div>
          </div>

          <div className="grid gap-4">
            <div className={cn("rounded-[18px] border p-4", insetClass)}>
              <p className={cn("text-[10px] font-mono font-semibold uppercase tracking-[0.18em]", mutedClass)}>2. Define navigation once</p>
              <p className={cn("mt-2 text-[15px] leading-7", bodyClass)}>
                Put your icons, labels, paths, badges, and disabled states in `navigation.js`. Your desktop sidebar and mobile bottom nav should both import that same `NAV_ITEMS` array directly, so you only maintain one navigation source.
              </p>
              <p className={cn("mt-2 text-[15px] leading-7", bodyClass)}>
                Badge values are optional. If the badge toggle above is off, the generated `navigation.js` file will not include any `badge` fields, and the `Component` tab will stay badge-free too.
              </p>
            </div>

            <div className={cn("rounded-[18px] border p-4", insetClass)}>
              <p className={cn("text-[10px] font-mono font-semibold uppercase tracking-[0.18em]", mutedClass)}>3. Wire the layout</p>
              <p className={cn("mt-2 text-[15px] leading-7", bodyClass)}>
                The `Usage` tab shows the intended pattern: your parent layout does not need `NAV_ITEMS`. It only passes the current route as `activePath` and sends the clicked `path` back into your router.
              </p>
              <div className={cn("mt-3 overflow-hidden rounded-[14px] border", softBorderClass)}>
                <pre className={cn("overflow-x-auto px-4 py-4 font-mono text-[12px] leading-6", codeBgClass, headingClass)}>
                  <code>{`<${activeVariant.componentName}
  activePath={location.pathname}
  onItemClick={(path) => navigate(path)}
/>`}</code>
                </pre>
              </div>
              <p className={cn("mt-3 text-[15px] leading-7", bodyClass)}>
                `activePath={location.pathname}` tells the nav which tab should look active.
              </p>
              <p className={cn("mt-2 text-[15px] leading-7", bodyClass)}>
                `onItemClick={(path) => navigate(path)}` tells your router where to go when someone taps a tab.
              </p>
              <p className={cn("mt-2 text-[15px] leading-7", bodyClass)}>
                In practice: `navigation.js` lives once, `Sidebar.jsx` imports it, `${activeVariant.componentName}.jsx` imports it, and `MobileLayout.jsx` only handles `location.pathname` plus `navigate(path)`.
              </p>
              <p className={cn("mt-2 text-[15px] leading-7", bodyClass)}>
                `mobile-layout.jsx` is just an example place to render it. In a real app, this code can live directly in `App.jsx` or inside your existing layout file.
              </p>
            </div>

            <div className={cn("rounded-[18px] border p-4", insetClass)}>
              <p className={cn("text-[10px] font-mono font-semibold uppercase tracking-[0.18em]", mutedClass)}>What the tabs mean</p>
              <p className={cn("mt-2 text-[15px] leading-7", bodyClass)}>
                `Component` is the drop-in nav file. `Navigation Data` is the shared `NAV_ITEMS` array. `Usage` is the layout example that shows how to pass `activePath` and `onItemClick(path)`.
              </p>
              <p className={cn("mt-2 text-[15px] leading-7", bodyClass)}>
                Keep the generated files as-is first. Most teams only need to change the labels, icons, and paths in `navigation.js`, then connect `activePath` to their router.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Snippets Section (Below Preview Section) */}
      <section className={cn("overflow-hidden border text-left", panelClass)}>
        <div className={cn("flex flex-col gap-4 border-b px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between", softBorderClass)}>
          <div>
            <p className={cn("text-[11px] font-mono font-semibold uppercase tracking-[0.18em]", mutedClass)}>Source Files</p>
            <p className={cn("mt-1 text-[15px] leading-7", bodyClass)}>
              Copy these three files into your app, then edit only the navigation data and router wiring.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={cn("rounded-full border px-4 py-1.5 text-xs font-semibold transition-all active:scale-[0.98]", toolClass)}
              onClick={() => copyToClipboard(implementationBundleString)}
              type="button"
            >
              Copy Bundle
            </button>
            <button
              className={cn("rounded-full border px-4 py-1.5 text-xs font-semibold transition-all active:scale-[0.98]", activeToolClass)}
              onClick={() => copyToClipboard(activeArtifact?.code ?? "")}
              type="button"
            >
              {copiedState ? "Copied" : "Copy Current File"}
            </button>
          </div>
        </div>

        {/* File selector tabs */}
        <div className={cn("flex flex-wrap items-center gap-2 border-b px-5 py-2.5 sm:px-6", softBorderClass)}>
          {implementationArtifacts.map((art) => {
            const isActive = art.id === activeTabId;
            return (
              <button
                key={art.id}
                onClick={() => setActiveTabId(art.id)}
                type="button"
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-all active:scale-[0.98]",
                  isActive ? activeToolClass : toolClass
                )}
              >
                {art.label}
              </button>
            );
          })}
        </div>

        {/* Current file path info */}
        <div className={cn("border-b px-5 py-2.5 sm:px-6 bg-[#F9F9F8]/20 dark:bg-black/5", softBorderClass)}>
          <p className={cn("text-[11px] font-mono", mutedClass)}>
            📄 {activeArtifact?.fileName} <span className="opacity-40">&bull;</span> {activeArtifact?.description}
          </p>
        </div>

        {/* Compact, multicolour code snippets viewport */}
        <div className="px-5 py-5 sm:px-6">
          <SyntaxSnippet
            className="rounded-[1rem]"
            isLight={isLight}
            lines={artifactLines}
          />
        </div>
      </section>
    </div>
  );
}
