import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type VariantId = "minimal" | "floating" | "pill" | "indicator" | "glass";

type PlaygroundPreviewStageProps = {
  blurb: string;
  isLight: boolean;
  nav: ReactNode;
  selectedVariant: VariantId;
  useFor: string;
  variantLabel: string;
};

export function PlaygroundPreviewStage({
  blurb,
  isLight,
  nav,
  selectedVariant,
  useFor,
  variantLabel
}: PlaygroundPreviewStageProps) {
  const flushBottom = selectedVariant === "minimal" || selectedVariant === "glass";

  return (
    <div
      className={cn(
        "rounded-xl border p-4 sm:p-5",
        isLight
          ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.84)]"
          : "border-white/[0.08] bg-[rgba(12,16,24,0.76)]"
      )}
    >
      <div
        className={cn(
          "rounded-xl border p-5 md:p-6",
          isLight
            ? "border-[rgba(15,23,42,0.06)] bg-[rgba(255,255,255,0.9)]"
            : "border-white/[0.06] bg-[rgba(9,13,20,0.9)]"
        )}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className={cn("text-[11px] font-semibold uppercase tracking-[0.18em]", isLight ? "text-slate-500" : "text-slate-400")}>Live stage</p>
            <h3 className={cn("text-2xl font-bold tracking-tight", isLight ? "text-slate-950" : "text-white")}>{variantLabel}</h3>
            <p className={cn("max-w-[52ch] text-sm leading-relaxed", isLight ? "text-slate-600" : "text-slate-300")}>{blurb}</p>
          </div>
          <p className={cn("max-w-[26ch] text-sm leading-relaxed md:text-right", isLight ? "text-slate-500" : "text-slate-400")}>{useFor}</p>
        </div>

        <div
          className={cn(
            "relative mt-6 overflow-hidden rounded-xl border",
            isLight
              ? "border-[rgba(15,23,42,0.06)] bg-[rgba(248,250,252,0.96)]"
              : "border-white/[0.06] bg-[rgba(10,14,21,0.96)]"
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-px",
              isLight ? "bg-[rgba(255,255,255,0.92)]" : "bg-[rgba(255,255,255,0.08)]"
            )}
          />

          <div className="relative mx-auto flex min-h-[27rem] w-full max-w-[460px] flex-col px-5 pb-0 pt-6 md:min-h-[28rem] md:px-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className={cn("h-2.5 w-24 rounded-[4px]", isLight ? "bg-[rgba(15,23,42,0.08)]" : "bg-[rgba(255,255,255,0.08)]")} />
                  <div className={cn("h-2.5 w-40 rounded-[4px]", isLight ? "bg-[rgba(15,23,42,0.06)]" : "bg-[rgba(255,255,255,0.06)]")} />
                </div>
                <div
                  className={cn(
                    "h-9 w-9 rounded-[8px]",
                    isLight
                      ? "bg-[rgba(255,255,255,0.92)] ring-1 ring-[rgba(15,23,42,0.05)]"
                      : "bg-[rgba(255,255,255,0.08)] ring-1 ring-[rgba(255,255,255,0.08)]"
                  )}
                />
              </div>

              <div className="grid grid-cols-[1.15fr_0.85fr] gap-3.5">
                <div
                  className={cn(
                    "rounded-[10px] p-4",
                    isLight
                      ? "bg-[rgba(255,255,255,0.78)] ring-1 ring-[rgba(15,23,42,0.05)]"
                      : "bg-[rgba(255,255,255,0.04)] ring-1 ring-[rgba(255,255,255,0.06)]"
                  )}
                >
                  <div
                    className={cn(
                      "h-20 rounded-[8px]",
                      isLight
                        ? "bg-[rgba(15,23,42,0.05)]"
                        : "bg-[rgba(255,255,255,0.05)]"
                    )}
                  />
                  <div className="mt-4 space-y-2">
                    <div className={cn("h-2.5 w-20 rounded-[4px]", isLight ? "bg-[rgba(15,23,42,0.1)]" : "bg-[rgba(255,255,255,0.08)]")} />
                    <div className={cn("h-2.5 w-28 rounded-[4px]", isLight ? "bg-[rgba(15,23,42,0.07)]" : "bg-[rgba(255,255,255,0.06)]")} />
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div
                    className={cn(
                      "rounded-[10px] p-4",
                      isLight
                        ? "bg-[rgba(255,255,255,0.72)] ring-1 ring-[rgba(15,23,42,0.05)]"
                        : "bg-[rgba(255,255,255,0.04)] ring-1 ring-[rgba(255,255,255,0.05)]"
                    )}
                  >
                    <div className={cn("h-10 rounded-[8px]", isLight ? "bg-[rgba(15,23,42,0.06)]" : "bg-[rgba(255,255,255,0.06)]")} />
                  </div>
                  <div
                    className={cn(
                      "ml-6 rounded-[10px] p-4",
                      isLight
                        ? "bg-[rgba(255,255,255,0.66)] ring-1 ring-[rgba(15,23,42,0.04)]"
                        : "bg-[rgba(255,255,255,0.03)] ring-1 ring-[rgba(255,255,255,0.04)]"
                    )}
                  >
                    <div className={cn("h-14 rounded-[8px]", isLight ? "bg-[rgba(15,23,42,0.05)]" : "bg-[rgba(255,255,255,0.05)]")} />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "absolute inset-x-0 pt-3",
                flushBottom ? "bottom-0 px-0" : "bottom-5 px-4 md:px-5"
              )}
            >
              {nav}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
