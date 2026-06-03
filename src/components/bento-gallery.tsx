import { useEffect, useState } from "react";
import { cn } from "../lib/cn";
import { BottomNavCyber } from "../bottom-nav/bottom-nav-cyber";
import { BottomNavTactile } from "../bottom-nav/bottom-nav-tactile";
import { BottomNavOrbit } from "../bottom-nav/bottom-nav-orbit";
import { BottomNavBrutalist } from "../bottom-nav/bottom-nav-brutalist";
import { BottomNavIndicator } from "../bottom-nav/bottom-nav-indicator";
import { BottomNavFloating } from "../bottom-nav/bottom-nav-floating";
import { NAV_ITEMS, FLOATING_NAV_ITEMS } from "../data/nav-items";
import { useNavigate } from "react-router-dom";
import { usePlayground, type VariantId } from "../context/PlaygroundContext";

type BentoGalleryProps = {
  isLight: boolean;
};

export function BentoGallery({ isLight }: BentoGalleryProps) {
  const navigate = useNavigate();
  const { setSelectedVariant } = usePlayground();

  // Simple auto-cycler for the navs so they feel alive
  const [activeId, setActiveId] = useState("home");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((prev) => {
        const idx = NAV_ITEMS.findIndex((item) => item.id === prev);
        const nextIdx = (idx + 1) % NAV_ITEMS.length;
        return NAV_ITEMS[nextIdx].id;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenPlayground = (variant: VariantId) => {
    setSelectedVariant(variant);
    navigate("/playground");
  };

  const softBorderClass = isLight ? "border-slate-200" : "border-white/10";
  const cardBgClass = isLight ? "bg-white hover:bg-slate-50" : "bg-[#0a0a0a] hover:bg-[#111]";
  const stageBgClass = isLight ? "bg-slate-50" : "bg-black";
  
  return (
    <section className="py-24 md:py-32">
      <div className="space-y-12">
        <div className="max-w-3xl space-y-4 text-left">
          <span
            className={cn(
              "inline-flex rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]",
              isLight
                ? "border-slate-200 bg-slate-50 text-slate-800"
                : "border-white/10 bg-white/5 text-slate-300"
            )}
          >
            Variant Gallery
          </span>
          <h2
            className={cn(
              "text-[2rem] font-medium tracking-[0.02em] leading-[1.1] sm:text-[3.5rem]",
              isLight ? "text-slate-950" : "text-white"
            )}
          >
            15 Distinct <span className="text-blue-600">Design</span> Systems
          </h2>
          <p className={cn("text-[16px] font-light leading-relaxed sm:text-[18px] md:text-[22px]", isLight ? "text-slate-600" : "text-slate-400")}>
            Every app has a different soul. Navis UI provides exactly the right aesthetic out of the box, meticulously crafted so you don't have to fiddle with padding and cubic-beziers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Cyber Card */}
          <div onClick={() => handleOpenPlayground("cyber")} className={cn("group flex cursor-pointer flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-xl", softBorderClass, cardBgClass)}>
            <div className={cn("relative flex sm:h-[240px] h-[150px] w-full items-center justify-center overflow-hidden border-b", stageBgClass, softBorderClass)}>
               <div className="pointer-events-none absolute left-1/2 top-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2 scale-75 transition-transform duration-500 group-hover:scale-90">
                 <BottomNavCyber items={NAV_ITEMS} activeId={activeId} className="!static shadow-2xl" />
               </div>
            </div>
            <div className="sm:p-6 p-4">
              <h3 className={cn("sm:text-lg text-base font-medium", isLight ? "text-slate-900" : "text-white")}>Neon Cyber</h3>
              <p className={cn("mt-2 text-sm font-light", isLight ? "text-slate-500" : "text-slate-400")}>Vibrant glowing lines and drop shadows. Best for gaming or dark-mode tech.</p>
            </div>
          </div>

          {/* Tactile Card */}
          <div onClick={() => handleOpenPlayground("tactile")} className={cn("group flex cursor-pointer flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-xl", softBorderClass, cardBgClass)}>
            <div className={cn("relative flex sm:h-[240px] h-[150px] w-full items-center justify-center overflow-hidden border-b", stageBgClass, softBorderClass)}>
               <div className="pointer-events-none absolute left-1/2 top-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2 scale-75 transition-transform duration-500 group-hover:scale-90">
                 <BottomNavTactile items={NAV_ITEMS} activeId={activeId} className="!static shadow-2xl" />
               </div>
            </div>
            <div className="sm:p-6 p-4">
              <h3 className={cn("sm:text-lg text-base font-medium", isLight ? "text-slate-900" : "text-white")}>Tactile Neumorphic</h3>
              <p className={cn("mt-2 text-sm font-light", isLight ? "text-slate-500" : "text-slate-400")}>A physical, iOS-inspired indented hardware button bar with skeuomorphic shadows.</p>
            </div>
          </div>

          {/* Orbit Card */}
          <div onClick={() => handleOpenPlayground("orbit")} className={cn("group flex cursor-pointer flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-xl", softBorderClass, cardBgClass)}>
            <div className={cn("relative flex sm:h-[240px] h-[150px] w-full items-center justify-center overflow-hidden border-b", stageBgClass, softBorderClass)}>
               <div className="pointer-events-none absolute left-1/2 top-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2 scale-75 transition-transform duration-500 group-hover:scale-90">
                 <BottomNavOrbit items={NAV_ITEMS} activeId={activeId} className="!static shadow-lg" />
               </div>
            </div>
            <div className="sm:p-6 p-4">
              <h3 className={cn("sm:text-lg text-base font-medium", isLight ? "text-slate-900" : "text-white")}>Orbit</h3>
              <p className={cn("mt-2 text-sm font-light", isLight ? "text-slate-500" : "text-slate-400")}>A split rail with a detached primary action item. Great for profile-heavy apps.</p>
            </div>
          </div>

          {/* Brutalist Card */}
          <div onClick={() => handleOpenPlayground("brutalist")} className={cn("group flex cursor-pointer flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-xl", softBorderClass, cardBgClass)}>
            <div className={cn("relative flex sm:h-[240px] h-[150px] w-full items-center justify-center overflow-hidden border-b", stageBgClass, softBorderClass)}>
               <div className="pointer-events-none absolute left-1/2 top-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2 scale-75 transition-transform duration-500 group-hover:scale-90">
                 <BottomNavBrutalist items={NAV_ITEMS} activeId={activeId} className="!static shadow-xl" />
               </div>
            </div>
            <div className="sm:p-6 p-4">
              <h3 className={cn("sm:text-lg text-base font-medium", isLight ? "text-slate-900" : "text-white")}>Brutalist</h3>
              <p className={cn("mt-2 text-sm font-light", isLight ? "text-slate-500" : "text-slate-400")}>Rigid edges, stark contrast, and heavy hard shadows. Raw utilitarian aesthetic.</p>
            </div>
          </div>

          {/* Indicator Card */}
          <div onClick={() => handleOpenPlayground("indicator")} className={cn("group flex cursor-pointer flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-xl", softBorderClass, cardBgClass)}>
            <div className={cn("relative flex sm:h-[240px] h-[150px] w-full items-center justify-center overflow-hidden border-b", stageBgClass, softBorderClass)}>
               <div className="pointer-events-none absolute left-1/2 top-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2 scale-75 transition-transform duration-500 group-hover:scale-90">
                 <BottomNavIndicator items={NAV_ITEMS} activeId={activeId} className="!static shadow-xl" style={{ "--indicator-nav-accent-rgb": "79, 70, 229" } as React.CSSProperties} />
               </div>
            </div>
            <div className="sm:p-6 p-4">
              <h3 className={cn("sm:text-lg text-base font-medium", isLight ? "text-slate-900" : "text-white")}>Indicator</h3>
              <p className={cn("mt-2 text-sm font-light", isLight ? "text-slate-500" : "text-slate-400")}>High contrast with a dedicated floating active indicator line. Perfect for dashboards.</p>
            </div>
          </div>

          {/* Floating Card */}
          <div onClick={() => handleOpenPlayground("floating")} className={cn("group flex cursor-pointer flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-xl", softBorderClass, cardBgClass)}>
            <div className={cn("relative flex sm:h-[240px] h-[150px] w-full items-center justify-center overflow-hidden border-b", stageBgClass, softBorderClass)}>
               <div className="pointer-events-none absolute left-1/2 top-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2 scale-75 transition-transform duration-500 group-hover:scale-90">
                 <BottomNavFloating items={NAV_ITEMS} activeId={activeId} className="!static shadow-lg" />
               </div>
            </div>
            <div className="sm:p-6 p-4">
              <h3 className={cn("sm:text-lg text-base font-medium", isLight ? "text-slate-900" : "text-white")}>Floating</h3>
              <p className={cn("mt-2 text-sm font-light", isLight ? "text-slate-500" : "text-slate-400")}>A detached glass rail with a kinetic active capsule that morphs to fit the text.</p>
            </div>
          </div>

        </div>

        <div className="flex justify-center sm:pt-8 pt-3">
          <button
            onClick={() => {
              setSelectedVariant("minimal");
              navigate("/components");
            }}
            className={cn(
              "rounded-full border px-8 py-4 text-sm font-medium transition-all active:scale-[0.98]",
              isLight
                ? "border-slate-200 bg-white text-slate-900 hover:bg-slate-50 shadow-sm"
                : "border-white/10 bg-[#0a0a0a] text-white hover:bg-[#111]"
            )}
            type="button"
          >
            View All Components
          </button>
        </div>
      </div>
    </section>
  );
}
