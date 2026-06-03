import type { CSSProperties } from "react";
import { cn } from "../lib/cn";



export function insetBottomStyle(extraPadding = 12): CSSProperties {
  return {
    paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + ${extraPadding}px)`
  };
}

