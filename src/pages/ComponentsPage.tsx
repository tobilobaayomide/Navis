import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { usePlayground } from "../context/PlaygroundContext";
import { cn } from "../lib/cn";
import { HugeiconsIcon } from "@hugeicons/react";
import { CopyIcon } from "@hugeicons/core-free-icons";
import { getItemsForVariant, navRenderers, VARIANTS, type VariantId } from "../variants/registry";
import type { NavItem } from "../nav/nav.types";

type CardProps = {
  variant: typeof VARIANTS[number];
  isLight: boolean;
  onClick: () => void;
};

function NavbarCard({ variant, isLight, onClick }: CardProps) {
  const items = useMemo(() => getItemsForVariant(variant.id), [variant.id]);

  const [activeId, setActiveId] = useState(items[0]?.id ?? "home");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((prev) => {
        const idx = items.findIndex((item) => item.id === prev);
        const nextIdx = (idx + 1) % items.length;
        return items[nextIdx]?.id ?? items[0]?.id;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [items]);

  const accentStyles = useMemo(() => {
    if (variant.id !== "indicator" && variant.id !== "glass") return {};
    return {
      "--indicator-nav-accent-rgb": "79, 70, 229",
      "--glass-nav-center-bg-start": "#0f172a",
      "--glass-nav-center-bg-end": "#1e293b",
      "--glass-nav-dot-color": "#4f46e5",
      "--glass-nav-text-active": "#4f46e5",
      "--indicator-nav-bg": "rgba(15, 23, 42, 0.1)"
    } as React.CSSProperties;
  }, [variant.id]);

  const SelectedBottomNav = navRenderers[variant.id];

  const softBorderClass = isLight ? "border-[rgba(15,23,42,0.06)]" : "border-white/[0.06]";
  const headingClass = isLight ? "text-slate-950" : "text-white";

  const cardStyle = isLight
    ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.72)] hover:bg-[rgba(255,255,255,0.95)] hover:border-slate-300 shadow-[0_12px_24px_-10px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.1)]"
    : "border-white/[0.08] bg-[rgba(12,16,24,0.64)] hover:bg-[rgba(16,21,31,0.86)] hover:border-white/20 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_48px_-10px_rgba(0,0,0,0.5)]";

  const previewStageBg = isLight ? "bg-white" : "bg-black";

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden border p-4 transition-all duration-300 active:scale-[0.99] cursor-pointer",
        cardStyle
      )}
    >
      {/* Hover gradient overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          isLight
            ? "bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.02)_0%,transparent_60%)]"
            : "bg-[radial-gradient(circle_at_50%_0%,rgba(108,125,194,0.06)_0%,transparent_60%)]"
        )}
      />

      {/* Title */}
      <div className="flex items-center justify-between sm:pb-3 border-b border-slate-500/5">
        <h3 className={cn("text-base font-normal tracking-wide font-sans", headingClass)}>
          {variant.label}
        </h3>
      </div>

      {/* Preview stage — fixed height with scaled nav inside */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden border transition-all duration-300 mt-2 sm:mt-4",
          "h-[140px] sm:h-[180px] lg:h-[220px]",
          previewStageBg,
          softBorderClass
        )}
      >
        {/*
          The nav is rendered at full desktop width (380px) then scaled down
          to fit the card — same technique used elsewhere in the codebase.
          On mobile we scale to ~0.55, on sm to ~0.68, on lg full 1.0.
        */}
        <div
          className={cn(
            "pointer-events-none absolute left-1/2 top-40 w-[380px] -translate-x-1/2 -translate-y-1/2",
            "scale-[0.75] sm:scale-[0.78] lg:scale-100",
            "transition-transform duration-500 group-hover:scale-[0.6] sm:group-hover:scale-[0.74] lg:group-hover:scale-[1.04]",
            variant.id === "island" && "translate-y-[30px]"
          )}
        >
          <SelectedBottomNav
            activeId={activeId}
            className={
              variant.id === "pill"
                ? "!static [&>nav]:!block [&>nav]:sm:!block"
                : variant.id === "island"
                  ? "sm:!flex"
                  : variant.id === "minimal" ||
                      variant.id === "glass" ||
                      variant.id === "dock"
                    ? "sm:!block !static"
                    : undefined
            }
            items={items}
            onItemClick={(item: NavItem) => setActiveId(item.id)}
            style={accentStyles}
          />
        </div>
      </div>
    </div>
  );
}

type DrawerProps = {
  variant: typeof VARIANTS[number] | null;
  isOpen: boolean;
  isLight: boolean;
  onClose: () => void;
  onConfigure: (id: VariantId) => void;
  copyToClipboard: (text: string, id: string) => void;
};

function DockDrawer({ variant, isOpen, isLight, onClose, onConfigure, copyToClipboard }: DrawerProps) {
  const [copied, setCopied] = useState(false);

  const items = useMemo(() => (variant ? getItemsForVariant(variant.id) : []), [variant]);

  const [activeId, setActiveId] = useState(items[0]?.id ?? "home");

  useEffect(() => {
    if (!variant || items.length === 0) return;
    setActiveId(items[0].id);
    const interval = setInterval(() => {
      setActiveId((prev) => {
        const idx = items.findIndex((item) => item.id === prev);
        const nextIdx = (idx + 1) % items.length;
        return items[nextIdx]?.id ?? items[0]?.id;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [variant, items]);

  const accentStyles = useMemo(() => {
    if (!variant || (variant.id !== "indicator" && variant.id !== "glass")) return {};
    return {
      "--indicator-nav-accent-rgb": "79, 70, 229",
      "--glass-nav-center-bg-start": "#0f172a",
      "--glass-nav-center-bg-end": "#1e293b",
      "--glass-nav-dot-color": "#4f46e5",
      "--glass-nav-text-active": "#4f46e5",
      "--indicator-nav-bg": "rgba(15, 23, 42, 0.1)"
    } as React.CSSProperties;
  }, [variant]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!variant) return null;

  const SelectedBottomNav = navRenderers[variant.id];

  const installCommand = `npx navisinit add ${variant.fileName}`;

  const handleCopy = () => {
    copyToClipboard(installCommand, "drawer");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const softBorderClass = isLight ? "border-[rgba(15,23,42,0.06)]" : "border-white/[0.06]";
  const headingClass = isLight ? "text-slate-950" : "text-white";
  const bodyClass = isLight ? "text-slate-600" : "text-slate-300";
  const mutedClass = isLight ? "text-slate-500" : "text-slate-400";

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 transition-opacity duration-300 pointer-events-none",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity pointer-events-auto"
        onClick={onClose}
      />

      {/*
        Modal:
        - Mobile: slides up from the bottom as a bottom sheet (rounded top corners only)
        - sm+: centered modal with all rounded corners
      */}
      <div
        className={cn(
          "relative flex w-full flex-col border-2 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform pointer-events-auto overflow-hidden",
          // Mobile: full-width bottom sheet, capped height
          "max-h-[92dvh] rounded-t-2xl sm:rounded-2xl",
          // sm+: constrained centered modal
          "sm:max-w-[800px] sm:max-h-[90vh]",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-full sm:translate-y-8 sm:scale-95 opacity-0",
          isLight ? "bg-white border-[rgba(15,23,42,0.08)]" : "bg-black border-white/[0.08]"
        )}
      >
        {/* Drag handle pill — mobile only */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className={cn("h-1 w-10 rounded-full", isLight ? "bg-slate-200" : "bg-white/20")} />
        </div>

        {/* Header */}
        <div className={cn("flex items-center justify-between border-b px-5 sm:px-8 py-4 sm:py-5", softBorderClass)}>
          <h2 className={cn("text-xl sm:text-2xl font-normal tracking-[0.03em]", headingClass)}>
            {variant.label} Rail
          </h2>
          <button
            onClick={onClose}
            className={cn(
              "flex items-center justify-center transition-all active:scale-[0.96]",
              isLight
                ? "border-[rgba(15,23,42,0.08)] bg-white text-slate-800 hover:bg-slate-50"
                : "border-white/[0.08] bg-neutral-900 text-slate-200 hover:bg-neutral-800"
            )}
            type="button"
            aria-label="Close details drawer"
          >
            <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">

          {/* Nav preview — scaled down on mobile, full size on sm+ */}
          <div
            className={cn(
              "relative flex items-center justify-center overflow-hidden rounded-2xl border transition-colors duration-300 shadow-inner",
              // Shorter on mobile, taller on desktop
              "h-[130px] sm:h-[220px]",
              isLight ? "bg-slate-50" : "bg-black",
              softBorderClass
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute left-1/2 top-1/2 w-[440px] -translate-x-1/2 -translate-y-1/2",
                "scale-[0.65] sm:scale-[0.75] md:scale-90 lg:scale-100",
                "transition-transform duration-300",
                variant.id === "island" && "translate-y-[30px]"
              )}
            >
          <SelectedBottomNav
            activeId={activeId}
            className={
              variant.id === "pill"
                ? "!static [&>nav]:!block [&>nav]:sm:!block"
                : variant.id === "island"
                  ? "sm:!flex"
                  : variant.id === "minimal" ||
                      variant.id === "glass" ||
                      variant.id === "dock"
                    ? "sm:!block !static"
                    : undefined
            }
            items={items}
            onItemClick={(item: NavItem) => setActiveId(item.id)}
            style={accentStyles}
              />
            </div>
          </div>

          {/* Detail cards */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            <div
              className={cn(
                "rounded-[20px] border p-4 sm:p-5 transition-colors",
                isLight ? "border-slate-500/10 bg-slate-50" : "border-white/[0.04] bg-[#0a0a0a]"
              )}
            >
              <span className={cn("text-[10px] uppercase tracking-[0.16em] font-semibold", mutedClass)}>
                Best For Projects
              </span>
              <p className={cn("text-[14px] sm:text-[16px] font-extralight mt-2", headingClass)}>
                {variant.useFor}
              </p>
            </div>

            <div
              className={cn(
                "rounded-[20px] border p-4 sm:p-5 transition-colors",
                isLight ? "border-slate-500/10 bg-slate-50" : "border-white/[0.04] bg-[#0a0a0a]"
              )}
            >
              <span className={cn("text-[10px] uppercase tracking-[0.16em] font-semibold", mutedClass)}>
                Aesthetic & Motion Traits
              </span>
              <p className={cn("text-[14px] sm:text-[16px] font-extralight mt-2", headingClass)}>
                {variant.note}
              </p>
            </div>
          </div>

          {/* CLI strip */}
          <div className="space-y-3">
            <span className={cn("text-[11px] font-semibold uppercase tracking-[0.18em]", mutedClass)}>
              CLI Installation
            </span>
            <button
              onClick={handleCopy}
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-[20px] border px-4 sm:px-6 py-2 font-mono text-[12px] sm:text-[14px] text-left transition-all active:scale-[0.995] hover:border-slate-500/30",
                isLight ? "bg-slate-50 text-slate-800" : "bg-[#0a0a0a] text-slate-200",
                softBorderClass
              )}
              type="button"
            >
              <span className="truncate">{installCommand}</span>
              <span className="shrink-0 flex items-center justify-center p-2 rounded-lg border border-slate-500/10 bg-slate-500/5">
                <HugeiconsIcon
                  absoluteStrokeWidth
                  className={cn("h-4 w-4 transition-opacity", copied ? "opacity-100" : "opacity-80")}
                  icon={CopyIcon}
                  size={16}
                  strokeWidth={1.7}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className={cn("border-t px-5 sm:px-8 py-4 sm:py-6 flex flex-col-reverse sm:flex-row justify-end gap-3", softBorderClass)}>
          <button
            onClick={onClose}
            className={cn(
              "rounded-full border px-6 py-3 sm:py-3.5 text-sm font-semibold transition-all active:scale-[0.98]",
              isLight
                ? "border-[rgba(15,23,42,0.08)] bg-white text-slate-800 hover:bg-slate-50"
                : "border-white/[0.08] bg-neutral-900 text-slate-200 hover:bg-neutral-800"
            )}
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfigure(variant.id)}
            className={cn(
              "rounded-full border px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold transition-all active:scale-[0.98]",
              isLight
                ? "bg-slate-900 border-slate-900 text-white hover:bg-slate-800 shadow-md"
                : "bg-white border-white text-slate-950 hover:bg-[#ececea] shadow-md"
            )}
            type="button"
          >
            Configure in Playground
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ComponentsPage() {
  const navigate = useNavigate();
  const { isLight, copyToClipboard, setSelectedVariant } = usePlayground();
  const [selectedDrawerVariant, setSelectedDrawerVariant] = useState<typeof VARIANTS[number] | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const softBorderClass = isLight ? "border-[rgba(15,23,42,0.06)]" : "border-white/[0.06]";
  const headingClass = isLight ? "text-slate-950" : "text-white";
  const bodyClass = isLight ? "text-slate-600" : "text-slate-300";

  const handleConfigure = (variantId: VariantId) => {
    setSelectedVariant(variantId);
    setSelectedDrawerVariant(null);
    navigate("/playground");
  };

  return (
    <div className="mx-auto w-full py-8 space-y-12">
      {/* Header */}
      <header className={cn("text-left border-b pb-6", softBorderClass)}>
        <h1 className={cn("text-2xl sm:text-3xl font-medium tracking-[0.03em] Outfit", headingClass)}>
          Components
        </h1>
        <p className={cn("mt-2 max-w-max text-[16px] sm:text-[18px] lg:text-[20px] font-light leading-relaxed", bodyClass)}>
          Explore and interact with responsive bottom navigation layout variants. Click on any navbar card to reveal a spacious preview deck equipped with detail traits, installation code, and global playground options.
        </p>
      </header>

      {/* Cards grid — 1 col mobile, 2 col md, 3 col lg */}
      <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {VARIANTS.map((variant) => (
          <NavbarCard
            key={variant.id}
            variant={variant}
            isLight={isLight}
            onClick={() => setSelectedDrawerVariant(variant)}
          />
        ))}
      </div>

      <DockDrawer
        variant={selectedDrawerVariant}
        isOpen={selectedDrawerVariant !== null}
        isLight={isLight}
        onClose={() => setSelectedDrawerVariant(null)}
        onConfigure={handleConfigure}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
}
