import { useEffect, useMemo, useState, useRef } from "react";
import { cn } from "../lib/cn";
import { BottomNavFloating } from "../bottom-nav/BottomNavFloating";
import { NAV_ITEMS } from "../data/NavItems";
import { tokenizeLine, type SyntaxTone } from "./SyntaxSnippet";

type LandingFeaturesProps = {
  isLight: boolean;
};

const COMPONENT_SNIPPET = `import { BottomNavFloating } from "navis";
import { navItems } from "./data";

export function AppLayout() {
  return (
    <div className="relative min-h-screen">
      <BottomNavFloating 
        items={navItems}
        activeId="home"
      />
    </div>
  );
}`;

const DATA_SNIPPET = `import { HomeIcon, AnalyticsIcon, 
WalletIcon, UserIcon, AlertIcon, 
SettingsIcon } from "@hugeicons/react";

export const navItems = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "analytics", label: "Analytics", icon: AnalyticsIcon },
  { id: "wallet", label: "Wallet", icon: WalletIcon },
  { id: "alert", label: "Alert", icon: AlertIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon }
];`;

function toneClass(tone: SyntaxTone | undefined, isLight: boolean) {
  if (tone === "comment") return isLight ? "text-slate-400" : "text-slate-500";
  if (tone === "component") return isLight ? "text-sky-600" : "text-sky-300";
  if (tone === "function") return isLight ? "text-indigo-600" : "text-indigo-300";
  if (tone === "keyword") return isLight ? "text-violet-600" : "text-violet-300";
  if (tone === "number") return isLight ? "text-amber-600" : "text-amber-300";
  if (tone === "property") return isLight ? "text-rose-600" : "text-rose-300";
  if (tone === "string") return isLight ? "text-emerald-600" : "text-emerald-300";
  if (tone === "type") return isLight ? "text-cyan-600" : "text-cyan-300";
  return isLight ? "text-slate-700" : "text-slate-200";
}

function CodeBlock({ code, isLight, filename }: { code: string; isLight: boolean; filename: string }) {
  const lines = useMemo(() => code.split("\n"), [code]);

  return (
    <div className={cn(
      "h-full w-full max-h-full rounded-[1rem] p-6 md:px-10 flex flex-col backdrop-blur-3xl transition-colors duration-500",
      isLight 
        ? "bg-slate-100 border-white/80 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]" 
        : "bg-white/[0.05]  shadow-[0_30px_60px_-20px_rgba(15,23,42,0.1)]"
    )}>
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-rose-500/20 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-rose-500 "></div></div>
          <div className="w-3.5 h-3.5 rounded-full bg-amber-500/20 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-amber-500 "></div></div>
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-emerald-500 "></div></div>
        </div>
        <div className={cn("text-[13px] font-medium font-mono tracking-widest uppercase", isLight ? "text-slate-400" : "text-slate-500")}>
          {filename}
        </div>
      </div>
      <div className="font-mono text-[11px] sm:text-[14px] leading-[1.8] overflow-y-auto no-scrollbar pb-2">
        {lines.map((line, i) => {
          const tokens = line.length > 0 ? tokenizeLine(line) : [];
          return (
            <div key={i} className="whitespace-pre">
              {line.length === 0 ? <span className="inline-block">&nbsp;</span> : null}
              {tokens.map((token, j) => (
                <span key={j} className={toneClass(token.tone, isLight)}>{token.value}</span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LandingFeatures({ isLight }: LandingFeaturesProps) {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0]?.id ?? "home");
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Nav item auto-cycler
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveId((prev) => {
        const currentIndex = NAV_ITEMS.findIndex((item) => item.id === prev);
        const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % NAV_ITEMS.length;
        return NAV_ITEMS[nextIndex]?.id ?? NAV_ITEMS[0]?.id ?? "home";
      });
    }, 2800);
    return () => window.clearInterval(interval);
  }, []);

  // Scroll tracking logic
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress from 0 (when top hits top of viewport) 
      // to 1 (when bottom hits bottom of viewport)
      const scrollDistance = height - windowHeight;
      const currentScroll = -top;
      
      const progress = Math.max(0, Math.min(1, currentScroll / scrollDistance));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCardStyle = (index: number) => {
    const peak = index === 0 ? 0.1 : index === 1 ? 0.5 : 0.9;
    const distance = Math.abs(scrollProgress - peak);
    
    // Smooth opacity calculation (fully visible at peak, fades out quickly)
    const opacity = Math.max(0, 1 - (distance * 3.5));
    
    // Parallax translation (moves up as you scroll down)
    const translateY = (scrollProgress - peak) * -120;
    
    // Slight scale effect for depth
    const scale = Math.max(0.9, 1 - (distance * 0.15));
    
    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      pointerEvents: opacity > 0.5 ? "auto" as const : "none" as const,
      willChange: "opacity, transform"
    };
  };

  return (
    // 300vh creates a long scrolling area so the sticky container remains pinned
    <section ref={sectionRef} className="relative h-[300vh] w-full max-w-[100vw] bg-transparent">
      
      {/* Sticky Edge-to-Edge Container */}
      <div className="sticky top-0 h-screen flex flex-col lg:flex-row items-center w-full overflow-hidden z-10">
        
        {/* Editorial Left Side */}
        <div className="w-full lg:w-[55%] px-0 relative z-20 shrink-0">
          <span
            className={cn(
              "inline-flex rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] mb-8",
              isLight
                ? "border-slate-200 bg-slate-50 text-slate-800"
                : "border-white/10 bg-white/5 text-slate-300"
            )}
          >
            Radical Control
          </span>
          <h2
            className={cn(
              "text-[3rem] font-medium tracking-[-0.02em] leading-[1.05] sm:text-[4.5rem] lg:text-[5rem] mb-8",
              isLight ? "text-slate-950" : "text-white"
            )}
          >
            Unstyled.<br/>
            Unopinioned.<br/>
            <span className={cn(
              "bg-clip-text text-transparent bg-gradient-to-br",
              isLight ? "from-indigo-600 via-violet-600 to-purple-600" : "from-indigo-400 via-purple-400 to-fuchsia-400"
            )}>
              Design
            </span>{" "}
          </h2>
          <p className={cn("text-lg font-light leading-relaxed sm:text-xl lg:text-2xl max-w-xl", isLight ? "text-slate-600" : "text-slate-400")}>
            You own the code. You own the UI. Navis provides the raw, hardware-accelerated building blocks. Copy, paste, and compile your own premium aesthetic down to the exact cubic-bezier.
          </p>
        </div>

        {/* Scrolling Cinematic Stage (Bleeding off right edge) */}
        <div className="relative h-full w-full lg:w-[55%] flex items-center justify-center lg:justify-start mt-12 lg:mt-0">
          
          {/* Ambient Lighting for the Glass to refract */}
         
          {/* Cards Stack Container */}
          <div className="relative w-full max-w-[570px] lg:max-w-[650px] h-[300px] lg:h-[420px] ml-0 lg:ml-12">
            
            {/* Card 1: Data Foundation (Shows at peak 0.1) */}
            <div 
              className="absolute inset-0 transition-none"
              style={getCardStyle(0)}
            >
              <CodeBlock code={DATA_SNIPPET} isLight={isLight} filename="nav-items.ts" />
            </div>

            {/* Card 2: React Logic (Shows at peak 0.5) */}
            <div 
              className="absolute inset-0 transition-none"
              style={getCardStyle(1)}
            >
              <CodeBlock code={COMPONENT_SNIPPET} isLight={isLight} filename="AppLayout.tsx" />
            </div>

            {/* Card 3: Rendered UI (Shows at peak 0.9) */}
            <div 
              className="absolute inset-0 flex items-center bottom-20 justify-center transition-none"
              style={getCardStyle(2)}
            >
            
                
                <BottomNavFloating
                  items={NAV_ITEMS}
                  activeId={activeId}
                  className="!static shadow-2xl mx-auto w-full"
                  onItemClick={() => {}}
                />
              </div>
            </div>

          </div>
        </div>

     
    </section>
  );
}