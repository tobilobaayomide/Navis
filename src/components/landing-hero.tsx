import { useEffect, useState } from "react";
import { CopyIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { HeroPhoneMockup } from "./hero-phone-mockup";
import { NAV_ITEMS } from "../data/nav-items";
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
    <section className="relative py-28 md:py-22">
      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* Left Copy Side */}
        <div className="space-y-12">
          <div className="space-y-6">
            <span
              className={cn(
                "inline-flex rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]",
                isLight
                  ? "border-slate-200 bg-slate-50 text-slate-800"
                  : "border-white/10 bg-white/5 text-slate-200"
              )}
            >
              Navis UI
            </span>

            <div className="max-w-2xl space-y-6">
              <h1
                className={cn(
                  "text-[2.75rem] font-medium tracking-[0.02em] leading-[1.05] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[6rem]",
                  isLight ? "text-slate-950" : "text-white"
                )}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Stop building generic <span className="text-blue-600">mobile navs</span>
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
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
          <div className="max-w-[28rem] pt-4">
            <button
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-[20px] border px-6 sm:py-2 py-2 text-left transition-all active:scale-[0.98]",
                isLight
                  ? "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              )}
              onClick={() => copyToClipboard(installCommand, "hero")}
              type="button"
            >
              <code className={cn("font-mono sm:text-[15px] text-[12px]", isLight ? "text-slate-900" : "text-slate-200")}>
                {installCommand}
              </code>
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-lg border transition-colors",
                  isLight
                    ? "border-slate-200 bg-white text-slate-500"
                    : "border-white/10 bg-white/5 text-slate-400"
                )}
              >
                <HugeiconsIcon
                  className={cn("h-4 w-4 transition-all duration-300", copiedState === "hero" ? "opacity-100 text-emerald-500 scale-110" : "opacity-80 scale-100")}
                  icon={CopyIcon}
                  size={16}
                  strokeWidth={2}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Right Side Phone Mockup */}
        <div className="relative z-10 hidden items-end justify-center md:flex lg:h-[640px]">
          <HeroPhoneMockup
            isLight={isLight}
            activeId={activeId}
            onNavItemClick={(id) => setActiveId(id)}
          />
        </div>

      </div>
    </section>
  );
}
