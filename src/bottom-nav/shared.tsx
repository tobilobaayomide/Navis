import type { CSSProperties } from "react";
import { cn } from "../lib/cn";

export function formatBadgeValue(value: number) {
  return value > 99 ? "99+" : String(value);
}

export function NavBadge({ value, className }: { value: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[1.15rem] items-center justify-center rounded-full px-1.5 text-[10px] font-semibold leading-none",
        className
      )}
    >
      {formatBadgeValue(value)}
    </span>
  );
}

export function insetBottomStyle(extraPadding = 12): CSSProperties {
  return {
    paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + ${extraPadding}px)`
  };
}

