import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { insetBottomStyle } from "../bottom-nav/shared";

type MobilePreviewProps = {
  nav: ReactNode;
  className?: string;
  label?: string;
  flushBottom?: boolean;
  lightStage?: boolean;
};

export function MobilePreview({
  nav,
  className,
  label = "Component preview",
  flushBottom = false,
  lightStage = false
}: MobilePreviewProps) {
  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">{label}</p>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Live preview</span>
      </div>
      <div
        className={cn(
          "relative isolate min-h-[31rem] overflow-hidden rounded-[10px]",
          lightStage
            ? "bg-[#f7f6f3] ring-1 ring-[rgba(15,23,42,0.06)]"
            : "bg-[#12151b] ring-1 ring-[rgba(255,255,255,0.08)]"
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-px",
            lightStage
              ? "bg-[rgba(255,255,255,0.92)]"
              : "bg-[rgba(255,255,255,0.08)]"
          )}
        />

        <div className="pointer-events-none absolute inset-x-6 top-7 flex items-center justify-between">
          <div className="space-y-2">
            <div
              className={cn(
                "h-2.5 rounded-[4px]",
                lightStage ? "w-24 bg-[rgba(15,23,42,0.1)]" : "w-24 bg-[rgba(255,255,255,0.1)]"
              )}
            />
            <div
              className={cn(
                "h-2.5 rounded-[4px]",
                lightStage ? "w-40 bg-[rgba(15,23,42,0.07)]" : "w-40 bg-[rgba(255,255,255,0.07)]"
              )}
            />
          </div>
          <div
            className={cn(
              "h-9 w-9 rounded-[8px]",
              lightStage
                ? "bg-[rgba(255,255,255,0.92)] ring-1 ring-[rgba(15,23,42,0.05)]"
                : "bg-[rgba(255,255,255,0.08)] ring-1 ring-[rgba(255,255,255,0.08)]"
            )}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-6 top-24 grid grid-cols-[1.15fr_0.85fr] gap-4">
          <div
            className={cn(
              "rounded-[10px] p-4",
              lightStage
                ? "bg-[rgba(255,255,255,0.78)] ring-1 ring-[rgba(15,23,42,0.05)]"
                : "bg-[rgba(255,255,255,0.04)] ring-1 ring-[rgba(255,255,255,0.06)]"
            )}
          >
            <div
              className={cn(
                "h-20 rounded-[8px]",
                lightStage
                  ? "bg-[rgba(15,23,42,0.05)]"
                  : "bg-[rgba(255,255,255,0.05)]"
              )}
            />
            <div className="mt-4 space-y-2">
              <div
                className={cn(
                  "h-2.5 w-20 rounded-[4px]",
                  lightStage ? "bg-[rgba(15,23,42,0.1)]" : "bg-[rgba(255,255,255,0.08)]"
                )}
              />
              <div
                className={cn(
                  "h-2.5 w-28 rounded-[4px]",
                  lightStage ? "bg-[rgba(15,23,42,0.07)]" : "bg-[rgba(255,255,255,0.06)]"
                )}
              />
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <div
              className={cn(
                "rounded-[10px] p-4",
                lightStage
                  ? "bg-[rgba(255,255,255,0.72)] ring-1 ring-[rgba(15,23,42,0.05)]"
                  : "bg-[rgba(255,255,255,0.04)] ring-1 ring-[rgba(255,255,255,0.05)]"
              )}
            >
              <div
                className={cn(
                  "h-10 rounded-[8px]",
                  lightStage ? "bg-[rgba(15,23,42,0.06)]" : "bg-[rgba(255,255,255,0.06)]"
                )}
              />
            </div>
            <div
              className={cn(
                "ml-6 rounded-[10px] p-4",
                lightStage
                  ? "bg-[rgba(255,255,255,0.66)] ring-1 ring-[rgba(15,23,42,0.04)]"
                  : "bg-[rgba(255,255,255,0.03)] ring-1 ring-[rgba(255,255,255,0.04)]"
              )}
            >
              <div
                className={cn(
                  "h-14 rounded-[8px]",
                  lightStage ? "bg-[rgba(15,23,42,0.05)]" : "bg-[rgba(255,255,255,0.05)]"
                )}
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-x-0 pt-3",
            flushBottom ? "bottom-0 px-0" : "bottom-5 px-4"
          )}
          style={flushBottom ? undefined : insetBottomStyle()}
        >
          {nav}
        </div>
      </div>
    </section>
  );
}
