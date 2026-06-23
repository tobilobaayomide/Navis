import { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "../lib/cn";
import { BottomNavCyber } from "../bottom-nav/BottomNavCyber";
import { BottomNavTactile } from "../bottom-nav/BottomNavTactile";
import { BottomNavOrbit } from "../bottom-nav/BottomNavOrbit";
import { BottomNavLiquid } from "../bottom-nav/BottomNavLiquid";
import { BottomNavIndicator } from "../bottom-nav/BottomNavIndicator";
import { BottomNavFloating } from "../bottom-nav/BottomNavFloating";
import { BottomNavDock } from "../bottom-nav/BottomNavDock";
import { NAV_ITEMS, FLOATING_NAV_ITEMS } from "../data/NavItems";
import { useNavigate } from "react-router-dom";
import { usePlayground, type VariantId } from "../context/PlaygroundContext";

type BentoGalleryProps = {
  isLight: boolean;
};

/* ── Card configuration: defines the bento layout personality ── */
const BENTO_CARDS = [
  {
    id: "cyber" as VariantId,
    label: "Neon Cyber",
    blurb: "Vibrant glowing lines and drop shadows. Built for gaming and dark-mode-first products.",
    tag: "Popular",
    span: "featured",
    Nav: BottomNavCyber,
    items: NAV_ITEMS,
  },
  {
    id: "tactile" as VariantId,
    label: "Tactile Neumorphic",
    blurb: "A physical, iOS-inspired button bar with skeuomorphic shadows.",
    tag: "Premium",
    span: "standard",
    Nav: BottomNavTactile,
    items: NAV_ITEMS,
  },
  {
    id: "orbit" as VariantId,
    label: "Orbit",
    blurb: "Split rail with a detached primary action. Great for profile-heavy apps.",
    tag: null,
    span: "standard",
    Nav: BottomNavOrbit,
    items: NAV_ITEMS,
  },
  {
    id: "liquid" as VariantId,
    label: "Liquid Glass",
    blurb: "Floating pill with extreme blur, inspired by Telegram's Android UI.",
    tag: "Trending",
    span: "standard",
    Nav: BottomNavLiquid,
    items: NAV_ITEMS,
  },
  {
    id: "indicator" as VariantId,
    label: "Indicator",
    blurb: "High contrast with a dedicated floating active indicator line.",
    tag: null,
    span: "standard",
    Nav: BottomNavIndicator,
    items: NAV_ITEMS,
  },
  {
    id: "floating" as VariantId,
    label: "Floating",
    blurb: "A detached glass rail with a kinetic capsule that morphs to fit the text.",
    tag: "New",
    span: "wide",
    Nav: BottomNavFloating,
    items: FLOATING_NAV_ITEMS,
  },
  {
    id: "dock" as VariantId,
    label: "Mac Dock",
    blurb: "Closely-packed icons sitting on a clean glass shelf with fluid magnification.",
    tag: null,
    span: "standard",
    Nav: BottomNavDock,
    items: NAV_ITEMS,
  },
] as const;

/* ── Tag color mapping for distinctive badges ── */
const TAG_STYLES = {
  Popular: {
    light: "bg-amber-50 text-amber-700 border-amber-200/60",
    dark: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    dot: { light: "bg-amber-500", dark: "bg-amber-400" },
  },
  Premium: {
    light: "bg-violet-50 text-violet-700 border-violet-200/60",
    dark: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    dot: { light: "bg-violet-500", dark: "bg-violet-400" },
  },
  Trending: {
    light: "bg-rose-50 text-rose-700 border-rose-200/60",
    dark: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    dot: { light: "bg-rose-500", dark: "bg-rose-400" },
  },
  New: {
    light: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    dark: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    dot: { light: "bg-emerald-500", dark: "bg-emerald-400" },
  },
} as const;

export function BentoGallery({ isLight }: BentoGalleryProps) {
  const navigate = useNavigate();
  const { setSelectedVariant } = usePlayground();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  /* Intersection Observer for scroll-triggered entrance */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleOpenPlayground = (variant: VariantId) => {
    setSelectedVariant(variant);
    navigate("/Playground");
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-36">
      <div className="space-y-20">
        {/* ── Section Header ── */}
        <div className="max-w-3xl space-y-5 text-left">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
              isLight
                ? "border-slate-200 bg-slate-50 text-slate-800"
                : "border-white/10 bg-white/5 text-slate-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"
            )}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", isLight ? "bg-indigo-400" : "bg-indigo-300")} />
              <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", isLight ? "bg-indigo-500" : "bg-indigo-400")} />
            </span>
            Variant Gallery
          </span>
          <h2
            className={cn(
              "text-[2rem] font-medium tracking-[0.02em] leading-[1.1] sm:text-[3.5rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
              isLight ? "text-slate-950" : "text-white",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"
            )}
            style={{ transitionDelay: "60ms" }}
          >
            15 Distinct{" "}
            <span className={cn(
              "bg-clip-text text-transparent bg-gradient-to-br",
              isLight ? "from-indigo-600 via-violet-600 to-purple-600" : "from-indigo-400 via-purple-400 to-fuchsia-400"
            )}>
              Design
            </span>{" "}
            Systems
          </h2>
          <p
            className={cn(
              "text-[16px] font-light leading-relaxed sm:text-[18px] md:text-[22px] max-w-[52ch] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
              isLight ? "text-slate-500" : "text-slate-400",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"
            )}
            style={{ transitionDelay: "120ms" }}
          >
            Every app has a different soul. Navis UI provides exactly the right
            aesthetic out of the box, meticulously crafted so you don't have to
            fiddle with padding and cubic-beziers.
          </p>
        </div>

        {/* ── Bento Grid — Asymmetric Masonry ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-auto">
          {BENTO_CARDS.map((card, i) => {
            const currentActiveId = card.items[0].id;

            const indicatorStyles =
              card.id === "indicator"
                ? ({ "--indicator-nav-accent-rgb": "79, 70, 229" } as React.CSSProperties)
                : {};

            const isFeatured = card.span === "featured";
            const isWide = card.span === "wide";

            const tagStyle = card.tag ? TAG_STYLES[card.tag as keyof typeof TAG_STYLES] : null;

            return (
              <BentoCard
                key={card.id}
                card={card}
                index={i}
                isLight={isLight}
                isVisible={isVisible}
                isFeatured={isFeatured}
                isWide={isWide}
                tagStyle={tagStyle}
                currentActiveId={currentActiveId}
                indicatorStyles={indicatorStyles}
                onOpen={handleOpenPlayground}
              />
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center sm:pt-2 pt-1">
          <button
            onClick={() => {
              setSelectedVariant("minimal");
              navigate("/components");
            }}
            className={cn(
              "group/cta relative inline-flex items-center gap-3 rounded-full py-4 pl-8 pr-6 text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
              isLight
                ? "bg-white border border-slate-200 text-slate-900 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06),0_12px_40px_-12px_rgba(15,23,42,0.08)] hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(15,23,42,0.08),0_20px_50px_-16px_rgba(15,23,42,0.12)]"
                : "bg-white/[0.04] border border-white/[0.08] text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:bg-white/[0.07] hover:border-white/[0.14] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_32px_-8px_rgba(99,102,241,0.12)]",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
            type="button"
          >
            <span>View All Components</span>
            <span className={cn(
              "inline-flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cta:translate-x-0.5",
              isLight ? "bg-slate-900/5 text-slate-700" : "bg-white/10 text-slate-200"
            )}>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Individual Bento Card — isolated for cursor-tracking spotlight ── */
type BentoCardProps = {
  card: typeof BENTO_CARDS[number];
  index: number;
  isLight: boolean;
  isVisible: boolean;
  isFeatured: boolean;
  isWide: boolean;
  tagStyle: (typeof TAG_STYLES)[keyof typeof TAG_STYLES] | null;
  currentActiveId: string;
  indicatorStyles: React.CSSProperties;
  onOpen: (variant: VariantId) => void;
};

function BentoCard({
  card,
  index,
  isLight,
  isVisible,
  isFeatured,
  isWide,
  tagStyle,
  currentActiveId,
  indicatorStyles,
  onOpen,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Cursor-tracking spotlight glow */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => onOpen(card.id)}
      onMouseMove={handleMouseMove}
      className={cn(
        "bento-card-spotlight group relative cursor-pointer rounded-[1.25rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden flex flex-col h-full",
        /* Grid span logic — 12-col grid for precise asymmetry */
        isFeatured && "sm:col-span-2 lg:col-span-8",
        isWide && "sm:col-span-2 lg:col-span-8",
        !isFeatured && !isWide && "sm:col-span-1 lg:col-span-4",
        /* Outer shell */
        isLight
          ? "bg-white border border-slate-200/80 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_6px_24px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_4px_16px_-4px_rgba(15,23,42,0.08),0_20px_50px_-12px_rgba(15,23,42,0.08)] hover:border-slate-300/90"
          : "bg-[#0c0e14] border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] hover:border-white/[0.1] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_48px_-12px_rgba(0,0,0,0.5)]",
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[24px] scale-[0.97]"
      )}
      style={{ transitionDelay: `${index * 80 + 180}ms` }}
    >
      {/* Cursor-tracking spotlight overlay (dark mode only) */}
      {!isLight && (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(640px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(99, 102, 241, 0.06), transparent 40%)"
          }}
        />
      )}

      {/* Light mode cursor spotlight — very subtle warm glow */}
      {isLight && (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(99, 102, 241, 0.04), transparent 40%)"
          }}
        />
      )}

      {/* Shimmer top-border on hover */}
      <div className={cn("card-shimmer-line", isLight && "card-shimmer-line-light")} />

      {/* Tag badge */}
      {card.tag && tagStyle && (
        <span className={cn(
          "absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-[0.08em] uppercase border backdrop-blur-sm",
          isLight ? tagStyle.light : tagStyle.dark
        )}>
          <span className={cn(
            "h-1 w-1 rounded-full",
            isLight ? tagStyle.dot.light : tagStyle.dot.dark
          )} />
          {card.tag}
        </span>
      )}

      {/* Preview stage */}
      <div className={cn(
        "relative flex items-center justify-center overflow-hidden shrink-0 h-[200px] sm:h-[240px] lg:h-[260px]",
        isLight
          ? "bento-preview-dots-light"
          : "bento-preview-dots-dark"
      )}>
        {/* Ambient glow behind component */}
        <div className={cn(
          "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
          isLight
            ? "bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04)_0%,transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)]"
        )} />

        <div className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2",
          "[&>div]:!bottom-auto [&>div]:!top-1/2 [&>div]:!-translate-y-1/2",
          isFeatured ? "scale-[0.82] sm:scale-90 lg:scale-100" : "scale-[0.68] sm:scale-75 lg:scale-[0.85]",
          "transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[0.72] sm:group-hover:scale-[0.82] lg:group-hover:scale-[0.92]",
          isFeatured && "lg:group-hover:scale-105",
          "override-safe-area-preview"
        )}>
          <card.Nav
            items={card.items}
            activeId={currentActiveId}
            className="shadow-2xl"
            style={indicatorStyles}
          />
        </div>
      </div>

      {/* Separator */}
      <div className={cn(
        "mx-5",
        isLight ? "border-t border-slate-100" : "border-t border-white/[0.04]"
      )} />

      {/* Text content */}
      <div className="px-5 py-4 sm:px-6 sm:py-5 flex-1 flex flex-col justify-start">
        <div className="flex items-center justify-between">
          <h3 className={cn(
            "text-[15px] sm:text-base font-medium tracking-tight",
            isLight ? "text-slate-900" : "text-white/90"
          )}>
            {card.label}
          </h3>
          <svg
            className={cn(
              "h-4 w-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0",
              isLight ? "text-slate-400" : "text-slate-500"
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </div>
        <p className={cn(
          "mt-1.5 text-[12.5px] sm:text-[13px] font-light leading-relaxed line-clamp-2",
          isLight ? "text-slate-400" : "text-slate-500"
        )}>
          {card.blurb}
        </p>
      </div>
    </div>
  );
}
