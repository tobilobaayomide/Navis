import { useEffect, useMemo, useState } from "react";
import { CopyIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MobilePreview } from "./mobile-preview";
import { BottomNavFloating } from "../bottom-nav/bottom-nav-floating";
import { FLOATING_NAV_ITEMS } from "../data/nav-items";
import { cn } from "../lib/cn";

type LandingHeroProps = {
  isLight: boolean;
  onPlaygroundClick: () => void;
  onDocsClick: () => void;
  installCommand: string;
  copyToClipboard: (text: string) => void;
  copiedState: boolean;
};

export function LandingHero({
  isLight,
  onPlaygroundClick,
  onDocsClick,
  installCommand,
  copyToClipboard,
  copiedState
}: LandingHeroProps) {
  const [mockActiveId, setMockActiveId] = useState("home");
  const cycleItems = FLOATING_NAV_ITEMS;

  useEffect(() => {
    const interval = setInterval(() => {
      setMockActiveId((prev) => {
        const currentIndex = cycleItems.findIndex((item) => item.id === prev);
        const nextIndex = (currentIndex + 1) % cycleItems.length;
        return cycleItems[nextIndex].id;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [cycleItems]);

  const mockNav = useMemo(() => {
    return (
      <BottomNavFloating
        activeId={mockActiveId}
        items={cycleItems}
        onItemClick={(item) => setMockActiveId(item.id)}
      />
    );
  }, [mockActiveId, cycleItems]);

  return (
    <section className="relative py-24 md:py-32">
      <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-10">
          <div className="space-y-5">
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                isLight
                  ? "border-[rgba(15,23,42,0.08)] bg-[rgba(225,243,254,0.7)] text-[#1f6c9f]"
                  : "border-white/[0.08] bg-[rgba(255,255,255,0.04)] text-slate-300"
              )}
            >
              Bottom navigation rails
            </span>

            <div className="max-w-5xl space-y-5">
              <h1
                className={cn(
                  "max-w-[18ch] text-[3.35rem] font-semibold tracking-[0.03em] leading-[0.94] sm:text-[4.4rem] md:text-[5.4rem]",
                  isLight ? "text-[#171717]" : "text-[#f5f5f4]"
                )}
              >
                Pick a rail that already feels finished.
              </h1>
              <p
                className={cn(
                  "max-w-[56ch] text-[15px] font-light leading-8 md:text-[24px] md:leading-8",
                  isLight ? "text-[#787774]" : "text-slate-300"
                )}
              >
                Navis gives you a small set of polished bottom navigation patterns with real motion, stable layout behavior, and source code you can actually use.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              className={cn(
                "rounded-[35px] border px-7 py-5 text-[16px] font-normal transition-all active:scale-[0.98]",
                isLight
                  ? "border-[#171717] bg-[#171717] text-white hover:bg-[#2b2b2b]"
                  : "border-white/[0.08] bg-white text-[#111111] hover:bg-[#ececea]"
              )}
              onClick={onPlaygroundClick}
              type="button"
            >
              Open Playground
            </button>

            <button
                        className={cn(
                          "group relative flex items-center justify-between gap-3.5 rounded-full border px-7 py-5 text-[16px] font-normal transition-all active:scale-[0.98]",
                        isLight
                            ? "border-[rgba(15,23,42,0.08)] bg-white text-slate-900 shadow-[0_18px_34px_-24px_rgba(15,23,42,0.2)] hover:bg-[rgba(15,23,42,0.05)]"
                            : "border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.035)_100%)] text-white shadow-[0_20px_38px_-24px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.05)_100%)]"
                        )}
                        onClick={onDocsClick}
                        type="button"
                      >
                        Documentation
                      </button>
          </div>

          <div className="max-w-[25rem]">
            <button
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-[28px] border px-4 py-3 text-left transition-all active:scale-[0.98]",
                isLight
                  ? "border-[rgba(15,23,42,0.08)] bg-[#fbfbfa] text-[#171717] hover:bg-white"
                  : "border-white/[0.08] bg-[rgba(255,255,255,0.03)] text-slate-100 hover:bg-[rgba(255,255,255,0.05)]"
              )}
              onClick={() => copyToClipboard(installCommand)}
              type="button"
            >
              <div className="space-y-1">
             
                <code className={cn("code-face text-[16px] font-normal", isLight ? "text-[#171717]" : "text-slate-100")}>
                  {installCommand}
                </code>
              </div>
              <span
                className={cn(
                  "inline-flex h-8 min-w-8 items-center justify-center rounded-[6px] border px-2",
                  isLight
                    ? "border-[rgba(15,23,42,0.08)] bg-white text-[#787774]"
                    : "border-white/[0.08] bg-[rgba(255,255,255,0.04)] text-slate-300"
                )}
              >
                <HugeiconsIcon
                  absoluteStrokeWidth
                  className={cn("h-4 w-4 transition-opacity", copiedState ? "opacity-100" : "opacity-80")}
                  icon={CopyIcon}
                  size={16}
                  strokeWidth={1.7}
                />
              </span>
            </button>
          </div>
        </div>

        <div className="xl:pt-6">
          <div
            className={cn(
              "rounded-[12px] border p-3",
              isLight
                ? "border-[rgba(15,23,42,0.08)] bg-[#fbfbfa]"
                : "border-white/[0.08] bg-[rgba(17,20,27,0.9)]"
            )}
          >
            <div
              className={cn(
                "mb-2 flex items-center gap-2 border-b pb-3",
                isLight ? "border-[rgba(15,23,42,0.08)]" : "border-white/[0.08]"
              )}
            >
              <span className={cn("h-2.5 w-2.5 rounded-full", isLight ? "bg-[#d6d3d1]" : "bg-white/15")} />
              <span className={cn("h-2.5 w-2.5 rounded-full", isLight ? "bg-[#d6d3d1]" : "bg-white/15")} />
              <span className={cn("h-2.5 w-2.5 rounded-full", isLight ? "bg-[#d6d3d1]" : "bg-white/15")} />
              <span className={cn("ml-2 text-[11px] font-medium uppercase tracking-[0.16em]", isLight ? "text-[#787774]" : "text-slate-400")}>
                Preview
              </span>
            </div>

            <MobilePreview
              className="w-full max-w-[400px]"
              flushBottom={false}
              label="Floating rail"
              lightStage={isLight}
              nav={mockNav}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
