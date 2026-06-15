import { useEffect, useState, useRef } from "react";
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

export function BentoGallery({ isLight }: BentoGalleryProps) {
  const navigate = useNavigate();
  const { setSelectedVariant } = usePlayground();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % NAV_ITEMS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* Intersection Observer for scroll-triggered entrance */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.12 }
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
      <div className="space-y-16">
        {/* ── Section Header ── */}
        <div className="max-w-3xl space-y-5 text-left">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] ease-[cubic-bezier(0.23,1,0.32,1)]",
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
              "text-[2rem] font-medium tracking-[0.02em] leading-[1.1] sm:text-[3.5rem] ease-[cubic-bezier(0.23,1,0.32,1)]",
              isLight ? "text-slate-950" : "text-white",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"
            )}
            style={{ transitionDelay: "80ms" }}
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
              "text-[16px] font-light leading-relaxed sm:text-[18px] md:text-[22px] ease-[cubic-bezier(0.23,1,0.32,1)]",
              isLight ? "text-slate-600" : "text-slate-400",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"
            )}
          >
            Every app has a different soul. Navis UI provides exactly the right
            aesthetic out of the box, meticulously crafted so you don't have to
            fiddle with padding and cubic-beziers.
          </p>
        </div>

        {/* ── Bento Grid — Asymmetric Masonry ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {BENTO_CARDS.map((card, i) => {
            const currentActiveId = card.items[activeIndex % card.items.length].id;

            const indicatorStyles =
              card.id === "indicator"
                ? ({ "--indicator-nav-accent-rgb": "79, 70, 229" } as React.CSSProperties)
                : {};

            const isFeatured = card.span === "featured";
            const isWide = card.span === "wide";

            return (
              <div
                key={card.id}
                onClick={() => handleOpenPlayground(card.id)}
                className={cn(
                  "group relative rounded-[1.5rem] p-1 cursor-pointer ease-[cubic-bezier(0.23,1,0.32,1)]",
                  isFeatured && "sm:col-span-2 lg:col-span-2 lg:row-span-1",
                  isWide && "sm:col-span-2 lg:col-span-2",
                  isLight ? "bg-slate-900/[0.02] border border-slate-900/[0.06]" : "bg-white/5 border border-white/[0.06]",
                  isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[20px] scale-[0.97]"
                )}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {/* Inner double-bezel core */}
                <div className={cn(
                  "relative z-0 flex flex-col h-full overflow-hidden rounded-[calc(1.5rem-4px)] transition-shadow duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  isLight 
                    ? "bg-white border border-slate-900/5 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.06)] group-hover:shadow-[0_24px_48px_-12px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]" 
                    : "bg-[#0a0c12] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_48px_-12px_rgba(0,0,0,0.5)]"
                )}>
                  {/* Tag badge */}
                  {card.tag && (
                    <span className={cn(
                      "absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase backdrop-blur-md",
                      isLight 
                        ? "bg-indigo-600/5 text-indigo-600 border border-indigo-600/10" 
                        : "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                    )}>
                      {card.tag}
                    </span>
                  )}

                  {/* Preview stage */}
                  <div className={cn(
                    "relative flex items-center justify-center overflow-hidden border-b",
                    isFeatured ? "h-[200px] sm:h-[260px] lg:h-[300px]" : "h-[160px] sm:h-[220px] lg:h-[240px]",
                    isLight 
                      ? "bg-gradient-to-b from-slate-50 to-slate-100 border-slate-900/5" 
                      : "bg-gradient-to-b from-[#0c0e14] to-[#080a0f] border-white/5"
                  )}>
                    <div className={cn(
                      "pointer-events-none absolute left-1/2 w-[380px] -translate-x-1/2",
                      isFeatured ? "top-[60%] -translate-y-1/2 scale-[0.82] sm:scale-90 lg:scale-100" : "top-[62%] -translate-y-1/2 scale-[0.68] sm:scale-75 lg:scale-[0.88]",
                      "transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[0.72] sm:group-hover:scale-[0.82] lg:group-hover:scale-95",
                      isFeatured && "lg:group-hover:scale-105"
                    )}>
                      <card.Nav
                        items={card.items}
                        activeId={currentActiveId}
                        className="shadow-2xl"
                        style={indicatorStyles}
                      />
                    </div>

                    {/* Active-item dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {card.items.slice(0, 5).map((item) => (
                        <span
                          key={item.id}
                          className={cn(
                            "block h-[4px] w-[4px] rounded-full",
                            item.id === currentActiveId
                              ? cn(
                                  isLight ? "bg-indigo-500" : "bg-indigo-400",
                                  "active-dot"
                                )
                              : isLight
                                ? "bg-slate-300"
                                : "bg-white/15"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="p-4 sm:p-5 lg:p-6">
                    <div className="flex items-center justify-between">
                      <h3 className={cn(
                        "text-base sm:text-lg font-medium tracking-wide",
                        isLight ? "text-slate-900" : "text-white"
                      )}>
                        {card.label}
                      </h3>
                      <svg
                        className={cn(
                          "h-4 w-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0",
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
                      "mt-2 text-[13px] sm:text-sm font-light leading-relaxed line-clamp-2",
                      isLight ? "text-slate-500" : "text-slate-400"
                    )}>
                      {card.blurb}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center sm:pt-4 pt-1">
          <button
            onClick={() => {
              setSelectedVariant("minimal");
              navigate("/components");
            }}
            className={cn(
              "group/cta inline-flex items-center gap-3 rounded-full py-3.5 pl-7 pr-5 text-sm font-semibold transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
              isLight 
                ? "bg-white border border-slate-900/10 text-slate-900 shadow-[0_4px_12px_-4px_rgba(15,23,42,0.06)] hover:border-slate-900/15 hover:shadow-[0_12px_24px_-8px_rgba(15,23,42,0.1)]" 
                : "bg-white/5 border border-white/10 text-slate-50 hover:bg-white/10 hover:border-white/15 hover:shadow-[0_8px_24px_-8px_rgba(99,102,241,0.15)]"
            )}
            type="button"
          >
            <span>View All Components</span>
            <span className={cn(
              "inline-flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cta:translate-x-0.5 group-hover/cta:scale-105",
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
