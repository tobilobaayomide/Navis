import { useEffect, useMemo, useRef, useState } from "react";
import { LuCopyCheck, LuSparkles } from "react-icons/lu";
import { cn } from "../lib/cn";

type CopyToastProps = {
  copiedState: string | null;
  copiedNonce: number;
  isLight: boolean;
};

type ToastMeta = {
  eyebrow: string;
  title: string;
  description: string;
  sourceLabel: string;
  tone: "command" | "source";
};

const COPY_KIND_MAP: Record<string, ToastMeta> = {
  hero: {
    eyebrow: "Hero",
    title: "Install command copied",
    description: "The command from the hero is ready to paste into your shell.",
    sourceLabel: "Hero command",
    tone: "command"
  },
  install: {
    eyebrow: "Playground",
    title: "Install command copied",
    description: "The playground command is ready to paste into your project.",
    sourceLabel: "Playground command",
    tone: "command"
  },
  "docs-install": {
    eyebrow: "Docs",
    title: "Install command copied",
    description: "The docs install command is ready to paste into your project.",
    sourceLabel: "Docs command",
    tone: "command"
  },
  drawer: {
    eyebrow: "Variant drawer",
    title: "Install command copied",
    description: "The selected variant command is ready to paste into your project.",
    sourceLabel: "Drawer command",
    tone: "command"
  },
  component: {
    eyebrow: "Source",
    title: "Component source copied",
    description: "The component source is ready to paste into your codebase.",
    sourceLabel: "Source file",
    tone: "source"
  }
};

function getToastMeta(copiedState: string | null): ToastMeta | null {
  if (!copiedState) return null;
  return (
    COPY_KIND_MAP[copiedState] ?? {
      eyebrow: "Clipboard",
      title: "Copied to clipboard",
      description: "The selected text is ready to paste.",
      sourceLabel: "Copied text",
      tone: "source"
    }
  );
}

export function CopyToast({ copiedState, copiedNonce, isLight }: CopyToastProps) {
  const [renderedState, setRenderedState] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openFrameRef = useRef<number | null>(null);

  const toast = useMemo(() => getToastMeta(renderedState), [renderedState]);

  useEffect(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (openFrameRef.current !== null) {
      cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }

    if (copiedState) {
      setRenderedState(copiedState);
      setOpen(false);
      openFrameRef.current = requestAnimationFrame(() => {
        setOpen(true);
        openFrameRef.current = null;
      });
      return;
    }

    if (!renderedState) return;

    setOpen(false);
    hideTimerRef.current = setTimeout(() => {
      setRenderedState(null);
      hideTimerRef.current = null;
    }, 240);

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [copiedState, copiedNonce, renderedState]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (openFrameRef.current !== null) cancelAnimationFrame(openFrameRef.current);
    };
  }, []);

  if (!toast) return null;

  const shellClass = isLight
    ? "border-slate-200/80 bg-[rgba(255,255,255,0.88)] text-slate-900 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.28)]"
    : "border-white/10 bg-[rgba(9,12,18,0.84)] text-white shadow-[0_28px_70px_-30px_rgba(0,0,0,0.7)]";

  const accentClass = isLight
    ? toast.tone === "command"
      ? "from-indigo-500/18 via-violet-500/12 to-transparent"
      : "from-emerald-500/18 via-cyan-500/12 to-transparent"
    : toast.tone === "command"
      ? "from-indigo-500/18 via-violet-500/10 to-transparent"
      : "from-emerald-400/18 via-cyan-400/10 to-transparent";

  return (
    <div
      aria-live="polite"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[70] flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] sm:inset-x-auto sm:right-6 sm:justify-end sm:px-0 sm:pb-6",
        "pointer-events-none"
      )}
      role="status"
    >
      <div
        className={cn(
          "pointer-events-auto relative w-full max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-[1.65rem] border backdrop-blur-2xl",
          "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
          "sm:w-[24rem] md:w-[26rem]",
          shellClass,
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0"
        )}
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br", accentClass)} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current/20 to-transparent opacity-40" />
        <div className="relative p-3 sm:p-4">
          <div className="flex items-start gap-3 sm:gap-4">
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-sm",
                isLight
                  ? "border-slate-200 bg-white text-emerald-600"
                  : "border-white/10 bg-white/5 text-emerald-300"
              )}
            >
              <LuCopyCheck className="h-5 w-5" strokeWidth={2.1} />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-[0.22em]",
                  isLight ? "text-slate-500" : "text-slate-400"
                )}
              >
                {toast.eyebrow}
              </p>
              <h3 className="mt-1 text-sm font-semibold tracking-[-0.01em] sm:text-[15px]">
                {toast.title}
              </h3>
              <p
                className={cn(
                  "mt-1.5 text-[12px] leading-5 sm:text-[13px] sm:leading-6",
                  isLight ? "text-slate-600" : "text-slate-300"
                )}
              >
                {toast.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                    isLight
                      ? "border-slate-200 bg-slate-50 text-slate-600"
                      : "border-white/10 bg-white/5 text-slate-300"
                  )}
                >
                  <LuSparkles className="h-3 w-3" />
                  Copied
                </span>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium",
                    isLight
                      ? "bg-slate-100 text-slate-600"
                      : "bg-white/5 text-slate-300"
                  )}
                >
                  {toast.sourceLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CopyToast;
