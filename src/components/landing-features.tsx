import { useEffect, useMemo, useState, type ComponentType } from "react";
import { LuFolderOpen } from "react-icons/lu";
import { NAV_ITEMS } from "../data/nav-items";
import { cn } from "../lib/cn";
import { tokenizeLine, type SyntaxTone } from "./syntax-snippet";
import FolderSvg from "./FolderSvg";

type LandingFeaturesProps = {
  isLight: boolean;
};

const INTEGRATION_SNIPPET = `import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavFloating } from "../bottom-nav/bottom-nav-floating";
import { navItems } from "../data/nav-items";

export function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeId = navItems.find((item) => item.path === location.pathname)?.id ?? "home";

  return (
      <BottomNavFloating
        items={navItems}
        activeId={activeId}
        onItemClick={(item) => navigate(item.path)}
      />
    
  );
}`;


function toneClass(tone: SyntaxTone | undefined, isLight: boolean) {
  if (tone === "comment") return isLight ? "text-slate-400" : "text-slate-500";
  if (tone === "component") return isLight ? "text-sky-700" : "text-sky-300";
  if (tone === "function") return isLight ? "text-indigo-700" : "text-indigo-300";
  if (tone === "keyword") return isLight ? "text-violet-700" : "text-violet-300";
  if (tone === "number") return isLight ? "text-amber-700" : "text-amber-300";
  if (tone === "property") return isLight ? "text-rose-700" : "text-rose-300";
  if (tone === "string") return isLight ? "text-emerald-700" : "text-emerald-300";
  if (tone === "type") return isLight ? "text-cyan-700" : "text-cyan-300";
  return isLight ? "text-slate-700" : "text-slate-200";
}


function FolderStackCard({ isLight }: { isLight: boolean }) {
  return (
    <div className="group relative z-10 hidden sm:flex h-full w-full">
      <div className="relative mt-8 h-[24rem] w-full overflow-hidden">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1000 560"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="folder-flow-gradient" x1="296" y1="188" x2="742" y2="265" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={isLight ? "#94a3b8" : "#64748b"} stopOpacity="0.25" />
              <stop offset="55%" stopColor={isLight ? "#4f6bff" : "#6ea8ff"} stopOpacity="0.85" />
              <stop offset="100%" stopColor={isLight ? "#94a3b8" : "#64748b"} stopOpacity="0.3" />
            </linearGradient>
            <filter id="folder-flow-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 0.65 0"
              />
            </filter>
            <marker
              id="folder-flow-arrow"
              markerHeight="10"
                markerWidth="10"
                orient="auto"
                refX="8"
                refY="5"
                viewBox="0 0 10 10"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={isLight ? "#4f6bff" : "#6ea8ff"} />
            </marker>
          </defs>

          <path
            d="M296 186 C 396 186, 476 202, 548 228 C 590 243, 622 252, 646 260"
            className={cn(
              "transition-opacity duration-300 opacity-55 group-hover:opacity-95",
              isLight ? "stroke-slate-400/50" : "stroke-white/14"
            )}
            stroke="url(#folder-flow-gradient)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            markerEnd="url(#folder-flow-arrow)"
          />
          <path
            d="M296 402 C 396 402, 476 382, 548 352 C 590 334, 622 302, 646 272"
            className={cn(
              "transition-opacity duration-300 opacity-55 group-hover:opacity-95",
              isLight ? "stroke-slate-400/50" : "stroke-white/14"
            )}
            stroke="url(#folder-flow-gradient)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            markerEnd="url(#folder-flow-arrow)"
          />

          <path
            d="M646 265 C 680 265, 712 265, 742 265"
            className={cn(
              "transition-opacity duration-300 opacity-55 group-hover:opacity-95",
              isLight ? "stroke-slate-400/50" : "stroke-white/14"
            )}
            stroke="url(#folder-flow-gradient)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            markerEnd="url(#folder-flow-arrow)"
          />

          <circle cx="646" cy="265" r="10" fill={isLight ? "#4f6bff" : "#6ea8ff"} opacity="0.1" filter="url(#folder-flow-glow)">
            <animate attributeName="opacity" values="0.06;0.16;0.06" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="296" cy="186" r="3" fill={isLight ? "#4f6bff" : "#6ea8ff"} opacity="0.55" />
          <circle cx="296" cy="402" r="3" fill={isLight ? "#4f6bff" : "#6ea8ff"} opacity="0.55" />
          <circle cx="742" cy="265" r="4" fill={isLight ? "#4f6bff" : "#6ea8ff"} opacity="0.88" />

          <circle r="4.5" fill={isLight ? "#4f6bff" : "#6ea8ff"} filter="url(#folder-flow-glow)">
            <animateMotion dur="3.4s" repeatCount="indefinite" rotate="auto">
              <mpath href="#folder-flow-top" />
            </animateMotion>
          </circle>
          <circle r="4.5" fill={isLight ? "#4f6bff" : "#6ea8ff"} filter="url(#folder-flow-glow)">
            <animateMotion dur="3.4s" begin="1.7s" repeatCount="indefinite" rotate="auto">
              <mpath href="#folder-flow-bottom" />
            </animateMotion>
          </circle>

          <path id="folder-flow-top" d="M296 186 C 396 186, 476 202, 548 228 C 590 243, 622 252, 646 260 C 680 263, 712 264, 742 265" fill="none" />
          <path id="folder-flow-bottom" d="M296 402 C 396 402, 476 382, 548 352 C 590 334, 622 302, 646 272 C 680 267, 712 266, 742 265" fill="none" />
        </svg>

        <div className="absolute left-20 top-0 flex flex-col items-start gap-4">
          <div className="relative flex ml-25 flex-col items-center gap-4">
            <FolderSvg className="h-[8rem] w-[8rem]" />
            <div className="text-center">
              <p className={cn("text-[16px] -mt-8 font-light", isLight ? "text-slate-950" : "text-white")}>
                BottomNavFloating.tsx
              </p>
            </div>
          </div>
        </div>

        <div className="absolute left-20  bottom-0 flex flex-col items-start gap-4">
          <div className="relative flex ml-30 flex-col items-center gap-4">
            <FolderSvg className="h-[8rem] w-[8rem]" />
            <div className="text-center">
              <p className={cn("text-[16px] -mt-8 font-light", isLight ? "text-slate-950" : "text-white")}>
                navItems.ts
              </p>
            </div>
          </div>
        </div>

        <div className="absolute right-20 top-1/2 -translate-y-1/2">
          <div className="relative flex flex-col mr-20 items-center gap-4">
            <FolderSvg className="h-[8rem] w-[8rem]" />
            <div className="text-center">
              <p className={cn("text-[16px] -mt-8 font-light", isLight ? "text-slate-950" : "text-white")}>
                AppLayout.tsx
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingEditorCard({ isLight, activeId }: { isLight: boolean; activeId: string }) {
  const editorClass = isLight
    ? "border-slate-200/80 bg-white"
    : "border-slate-400/20 bg-black";

  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    if (typedLength >= INTEGRATION_SNIPPET.length) {
      const resetTimer = window.setTimeout(() => setTypedLength(0), 1800);
      return () => window.clearTimeout(resetTimer);
    }

    const nextChar = INTEGRATION_SNIPPET[typedLength];
    const delay = nextChar === "\n" ? 190 : nextChar === " " ? 22 : 16;
    const timer = window.setTimeout(() => {
      setTypedLength((current) => Math.min(current + 1, INTEGRATION_SNIPPET.length));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [typedLength]);

  const visibleText = useMemo(() => INTEGRATION_SNIPPET.slice(0, typedLength), [typedLength]);
  const visibleLines = useMemo(() => visibleText.split("\n"), [visibleText]);

  return (
    <article
      className={cn(
        "group relative h-[30rem] overflow-hidden rounded-xl sm:rounded-3xl border shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] transition-transform duration-500 hover:-translate-y-1 sm:h-[36rem] lg:h-[32rem]",
        editorClass
      )}
    >


      <div className="relative z-10 flex h-full flex-col">
        <div className={cn("flex flex-wrap items-center justify-between gap-3 border-b sm:px-5 py-2 sm:py-4", isLight ? "border-slate-200/80" : "border-white/10")}>
          <div className="flex items-center gap-2">
            <span className={cn("ml-2 text-[10px] sm:text-[13px] font-medium text-[#6e6e73]")}>
              <LuFolderOpen className="mr-1.5 inline-block h-3.5 w-3.5 align-[-2px]" />
              AppLayout.tsx
            </span>
          </div>

        
        </div>

        <div className={cn("no-scrollbar min-h-0 flex-1 overflow-y-auto py-2 sm:py-5 font-mono text-[10px] leading-6 sm:text-[14px]", isLight ? "text-black" : "text-white")}>
          <div className="no-scrollbar overflow-x-auto">
            <div className="min-w-max">
              {visibleLines.map((line, index) => {
                const isLastLine = index === visibleLines.length - 1;
                const tokens = line.length > 0 ? tokenizeLine(line) : [];

                return (
                  <div className="grid grid-cols-[2.6rem_minmax(0,1fr)] ml-5 gap-4" key={`line-${index}`}>
                  
                    <div className="whitespace-pre">
                      {line.length === 0 ? (
                        <span className="inline-block min-h-[1.5rem]">&nbsp;</span>
                      ) : (
                        <>
                          {tokens.map((token, tokenIndex) => (
                            <span className={toneClass(token.tone, isLight)} key={`token-${index}-${tokenIndex}`}>
                              {token.value}
                            </span>
                          ))}
                        </>
                      )}
                      {isLastLine && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "ml-[5px] inline-block h-[20px] mb-[5px] w-[1px] translate-y-[0.14em] rounded-[0.12rem] bg-current align-middle opacity-90 animate-pulse",
                            isLight ? "text-slate-500" : "text-slate-300"
                          )}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

       
      </div>
    </article>
  );
}

export function LandingFeatures({ isLight }: LandingFeaturesProps) {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0]?.id ?? "home");

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

  return (
    <section className="relative py-24 sm:py-28 lg:py-32">
     

      <div className="relative mx-auto w-full">
        <div className="max-w-3xl space-y-4">
        
          <h2
             className={cn(
              "text-[2rem] font-medium tracking-[0.02em] leading-[1.1] sm:text-[3.5rem]",
              isLight ? "text-slate-950" : "text-white"
            )}
          >
           Own Your <span className="text-blue-600">UI</span>
          </h2>
<p className={cn("text-[16px] font-light leading-relaxed sm:text-[18px] md:text-[22px]", isLight ? "text-slate-600" : "text-slate-400")}>
You own the code, you own the UI. Navis is a React component library that gives you the building blocks to create your own custom navigation experiences, without sacrificing performance or accessibility.
</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <FolderStackCard isLight={isLight} />
          <TypingEditorCard activeId={activeId} isLight={isLight} />
        </div>
      </div>
    </section>
  );
}