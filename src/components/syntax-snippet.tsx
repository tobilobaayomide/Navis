import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../lib/cn";

export type SyntaxTone =
  | "comment"
  | "component"
  | "function"
  | "keyword"
  | "number"
  | "plain"
  | "property"
  | "string"
  | "type";

export type SyntaxToken = {
  tone?: SyntaxTone;
  value: string;
};

const KEYWORDS = new Set([
  "as",
  "const",
  "default",
  "else",
  "export",
  "false",
  "from",
  "function",
  "if",
  "import",
  "let",
  "new",
  "null",
  "return",
  "true",
  "undefined",
  "var"
]);

export function tokenizeLine(line: string): SyntaxToken[] {
  const tokens: SyntaxToken[] = [];
  const pattern =
    /(\/\/.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:import|from|export|default|function|return|const|let|var|if|else|true|false|null|undefined|as|new)\b|\b\d+(?:\.\d+)?\b|\b[A-Z][A-Za-z0-9_]*\b|\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*:))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line))) {
    if (match.index > lastIndex) {
      tokens.push({ value: line.slice(lastIndex, match.index) });
    }

    const value = match[0];
    let tone: SyntaxToken["tone"] = "plain";

    if (value.startsWith("//")) {
      tone = "comment";
    } else if (value.startsWith("\"") || value.startsWith("'") || value.startsWith("`")) {
      tone = "string";
    } else if (/^\d/.test(value)) {
      tone = "number";
    } else if (KEYWORDS.has(value)) {
      tone = "keyword";
    } else if (/^[A-Z]/.test(value)) {
      tone = value.endsWith("Icon") || value.startsWith("BottomNav") || value === "Sidebar" ? "component" : "type";
    } else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
      tone = "property";
    }

    tokens.push({ tone, value });
    lastIndex = match.index + value.length;
  }

  if (lastIndex < line.length) {
    tokens.push({ value: line.slice(lastIndex) });
  }

  return tokens.length > 0 ? tokens : [{ value: line }];
}

export function tokenizeSnippet(source: string): SyntaxToken[][] {
  return source
    .trim()
    .split("\n")
    .map((line) => tokenizeLine(line));
}

type SyntaxSnippetProps = {
  className?: string;
  hint?: string;
  isLight: boolean;
  lines: SyntaxToken[][];
  rawText?: string;
  title?: string;
};

const tokenClass = (tone: SyntaxTone | undefined, isLight: boolean) => {
  if (tone === "comment") {
    return isLight ? "text-slate-400" : "text-slate-500";
  }

  if (tone === "component") {
    return isLight ? "text-sky-700" : "text-sky-300";
  }

  if (tone === "function") {
    return isLight ? "text-indigo-700" : "text-indigo-300";
  }

  if (tone === "keyword") {
    return isLight ? "text-violet-700" : "text-violet-300";
  }

  if (tone === "number") {
    return isLight ? "text-amber-700" : "text-amber-300";
  }

  if (tone === "property") {
    return isLight ? "text-rose-700" : "text-rose-300";
  }

  if (tone === "string") {
    return isLight ? "text-emerald-700" : "text-emerald-300";
  }

  if (tone === "type") {
    return isLight ? "text-cyan-700" : "text-cyan-300";
  }

  return isLight ? "text-slate-700" : "text-slate-200";
};

export function SyntaxSnippet({
  className,
  hint,
  isLight,
  lines,
  rawText,
  title
}: SyntaxSnippetProps) {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const snippetText = useMemo(
    () =>
      rawText ??
      lines
        .map((line) => (line.length === 0 ? "" : line.map((token) => token.value).join("")))
        .join("\n"),
    [lines, rawText]
  );

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const shellClass = isLight
    ? "border-[rgba(15,23,42,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(245,247,250,0.94)_100%)] shadow-[0_18px_34px_-26px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.94)]"
    : "border-white/[0.08] bg-[radial-gradient(circle_at_top,rgba(51,65,85,0.26)_0%,rgba(12,16,24,0.96)_34%,rgba(9,13,20,0.94)_100%)] shadow-[0_24px_42px_-30px_rgba(0,0,0,0.76),inset_0_1px_0_rgba(255,255,255,0.05)]";

  const chromeClass = isLight
    ? "border-[rgba(15,23,42,0.06)] bg-[rgba(255,255,255,0.56)]"
    : "border-white/[0.08] bg-[rgba(255,255,255,0.03)]";

  const codePanelClass = isLight
    ? "border-[rgba(15,23,42,0.06)] bg-[linear-gradient(180deg,rgba(252,253,255,0.88)_0%,rgba(246,248,252,0.92)_100%)]"
    : "border-white/[0.06] bg-[linear-gradient(180deg,rgba(7,10,16,0.82)_0%,rgba(9,13,20,0.68)_100%)]";

  const lineNumberClass = isLight
    ? "text-slate-400/90 bg-[linear-gradient(180deg,rgba(15,23,42,0.02)_0%,rgba(15,23,42,0.01)_100%)]"
    : "text-slate-500/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.01)_100%)]";

  const copyButtonClass = isLight
    ? "border-[rgba(15,23,42,0.08)] bg-white/80 text-slate-500 hover:bg-white hover:text-slate-900"
    : "border-white/[0.08] bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippetText);
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className={cn(
        "rounded-[1.35rem] border p-3 md:p-4",
        shellClass,
        className
      )}
    >
      <div
        className={cn(
          "mb-3 flex min-h-[3.1rem] items-center justify-between gap-3 rounded-[1rem] border px-3.5 py-2.5",
          chromeClass
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                isLight ? "bg-rose-400/80" : "bg-rose-400/85"
              )}
            />
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                isLight ? "bg-amber-400/80" : "bg-amber-300/85"
              )}
            />
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                isLight ? "bg-emerald-400/80" : "bg-emerald-300/85"
              )}
            />
          </div>
          <div className="flex items-center gap-2.5">
            {title && (
              <span
                className={cn(
                  "code-face text-[11px] font-semibold uppercase tracking-[0.18em]",
                  isLight ? "text-slate-500" : "text-slate-400"
                )}
              >
                {title}
              </span>
            )}
            {(title || hint) && (
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]",
                  isLight
                    ? "border-[rgba(15,23,42,0.08)] bg-white/70 text-slate-500"
                    : "border-white/[0.08] bg-white/[0.04] text-slate-400"
                )}
              >
                Source
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hint && (
            <span
              className={cn(
                "max-w-[18rem] text-right text-[11px] font-medium leading-5",
                isLight ? "text-slate-500" : "text-slate-500"
              )}
            >
              {hint}
            </span>
          )}
          <button
            aria-label={copied ? "Copied" : "Copy code"}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors active:scale-[0.98]",
              copyButtonClass
            )}
            onClick={handleCopy}
            type="button"
          >
            {copied ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="13" rx="2" width="13" x="9" y="9" />
                <path d="M5 15V5a2 2 0 012-2h10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={cn("overflow-hidden rounded-[1rem] border", codePanelClass)}>
        <div className="overflow-x-auto">
          <div className="code-face text-[12px] leading-6 md:text-[13px]">
          {lines.map((line, index) => (
              <div
                className={cn(
                  "grid grid-cols-[3rem_minmax(0,1fr)] gap-0",
                  isLight ? "hover:bg-[rgba(15,23,42,0.018)]" : "hover:bg-white/[0.02]"
                )}
                key={`line-${index}`}
              >
                <span
                  className={cn(
                    "select-none border-r px-3 py-[0.12rem] text-right text-[11px]",
                    lineNumberClass,
                    isLight ? "border-[rgba(15,23,42,0.05)]" : "border-white/[0.05]"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-max whitespace-pre px-4 py-[0.12rem]">
                  {line.length === 0 ? (
                    <span>&nbsp;</span>
                  ) : (
                    line.map((token, tokenIndex) => (
                      <span className={tokenClass(token.tone, isLight)} key={`token-${index}-${tokenIndex}`}>
                        {token.value}
                      </span>
                    ))
                  )}
                </div>
              </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
