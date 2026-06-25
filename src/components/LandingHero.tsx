import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { CopyIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { HeroPhoneMockup } from "./HeroPhoneMockup";
import { NAV_ITEMS } from "../data/NavItems";
import { cn } from "../lib/cn";

type LandingHeroProps = {
  isLight: boolean;
  onComponentsClick: () => void;
  onDocsClick: () => void;
  installCommand: string;
  copyToClipboard: (text: string, id: string) => void;
  copiedState: string | null;
};

export function LandingHero({
  isLight,
  onComponentsClick,
  onDocsClick,
  installCommand,
  copyToClipboard,
  copiedState
}: LandingHeroProps) {
  const [activeId, setActiveId] = useState("home");
  const heroRef = useRef<HTMLElement>(null);
  const copied = copiedState === "hero";
  const softBorderClass = isLight ? "border-slate-200" : "border-white/10";

  const handleCopy = useCallback(() => {
    copyToClipboard(installCommand, "hero");
  }, [copyToClipboard, installCommand]);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const tiltEl = el.querySelector<HTMLElement>('.hero-phone-tilt');
    if (tiltEl) {
      tiltEl.style.setProperty('--tilt-x', `${-y * 6}deg`);
      tiltEl.style.setProperty('--tilt-y', `${x * 8}deg`);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = heroRef.current;
    if (!el) return;
    const tiltEl = el.querySelector<HTMLElement>('.hero-phone-tilt');
    if (tiltEl) {
      tiltEl.style.setProperty('--tilt-x', '0deg');
      tiltEl.style.setProperty('--tilt-y', '0deg');
    }
  }, []);

  // Cycle the active tab every 3 seconds for the hero presentation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((prev) => {
        const idx = NAV_ITEMS.findIndex((item) => item.id === prev);
        const nextIdx = (idx + 1) % NAV_ITEMS.length;
        return NAV_ITEMS[nextIdx].id;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative py-28 md:py-24"
      )}
    >
      <div className="grid px-4 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* Left Copy Side */}
        <div className="space-y-8">
          <div className="space-y-6">
            <span
              className={cn(
                "hero-stagger-1 inline-flex rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]",
                isLight
                  ? "border-slate-200 bg-slate-50 text-slate-800"
                  : "border-white/10 bg-white/5 text-slate-200"
              )}
            >
              Navis UI
            </span>

            <div className="max-w-2xl space-y-2 hero-stagger-2">
              <h1
                className={cn(
                  "text-[2.75rem] font-medium tracking-[0.02em] leading-[1.05] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[6rem]",
                  isLight ? "text-slate-950" : "text-white"
                )}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Stop building generic <span className={isLight ? "hero-gradient-text-light" : "hero-gradient-text-dark"} data-text="mobile navs">mobile navs</span>
              </h1>
              <p
                className={cn(
                  "max-w-[48ch] text-[16px] font-light leading-relaxed sm:text-[18px] md:text-[22px]",
                  isLight ? "text-slate-600" : "text-slate-400"
                )}
              >
                Copy-and-paste bottom navigation rails with premium motion, precise layouts, and zero bloat. Pick one that actually feels finished.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 hero-stagger-3">
            <button
              className={cn(
                "rounded-full border px-8 py-4 sm:py-5 text-[16px] font-medium transition-all active:scale-[0.98] w-full sm:w-auto",
                isLight
                  ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20"
                  : "border-white bg-white text-slate-950 hover:bg-slate-100 shadow-xl shadow-white/10"
              )}
              onClick={onComponentsClick}
              type="button"
            >
              Browse Components
            </button>

            <button
              className={cn(
                "rounded-full border px-8 py-4 sm:py-5 text-[16px] font-medium transition-all active:scale-[0.98] w-full sm:w-auto",
                isLight
                  ? "border-slate-200 bg-white text-slate-900 hover:bg-slate-50 shadow-sm"
                  : "border-white/10 bg-white/5 text-white hover:bg-white/10"
              )}
              onClick={onDocsClick}
              type="button"
            >
              Documentation
            </button>
          </div>

          {/* Quick CLI Copy */}
          <div className="max-w-[28rem] hero-stagger-4">
            <button
              onClick={handleCopy}
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-[20px] border px-4 sm:px-6 py-2 font-mono text-[12px] sm:text-[14px] text-left transition-all active:scale-[0.995] hover:border-slate-500/30",
                isLight ? "bg-slate-50 text-slate-800" : "bg-[#0a0a0a] text-slate-200",
                softBorderClass
              )}
              type="button"
            >
              <span className="truncate">
                <span className="terminal-prompt">$</span> {installCommand}
              </span>
              <span className={cn(
                "shrink-0 flex items-center justify-center gap-1.5 p-2 rounded-lg border border-slate-500/10 bg-slate-500/5 transition-all duration-300",
                copied && "bg-emerald-500/10 border-emerald-500/20"
              )}>
                {copied ? (
                  <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-wider">Copied</span>
                ) : (
                  <HugeiconsIcon
                    absoluteStrokeWidth
                    className="h-4 w-4 opacity-80"
                    icon={CopyIcon}
                    size={16}
                    strokeWidth={1.7}
                  />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Right Side Phone Mockup */}
        <div className="relative z-10 hidden items-end justify-center md:flex lg:h-[640px] hero-phone-entrance" style={{ perspective: '1200px' }}>
          <div className="hero-phone-tilt">
            <HeroPhoneMockup
              isLight={isLight}
              activeId={activeId}
              onNavItemClick={(id) => setActiveId(id)}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
