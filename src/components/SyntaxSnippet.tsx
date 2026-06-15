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
  showLineNumbers?: boolean;
};

const tokenClass = (tone: SyntaxTone | undefined, isLight: boolean) => {
  if (tone === "comment")   return isLight ? "text-slate-400" : "text-slate-500";
  if (tone === "component") return isLight ? "text-sky-700"   : "text-sky-300";
  if (tone === "function")  return isLight ? "text-indigo-700": "text-indigo-300";
  if (tone === "keyword")   return isLight ? "text-violet-700": "text-violet-300";
  if (tone === "number")    return isLight ? "text-amber-700" : "text-amber-300";
  if (tone === "property")  return isLight ? "text-rose-700"  : "text-rose-300";
  if (tone === "string")    return isLight ? "text-emerald-700": "text-emerald-300";
  if (tone === "type")      return isLight ? "text-cyan-700"  : "text-cyan-300";
  return isLight ? "text-slate-700" : "text-slate-200";
};

export function SyntaxSnippet({
  className,
  hint,
  isLight,
  lines,
  rawText,
  showLineNumbers = true,
  title,
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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippetText);
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border",
        isLight
          ? "border-slate-200/80 bg-white shadow-sm"
          : "border-white/[0.06] bg-[#0a0d14] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        className
      )}
    >
      {/* Title bar */}
      {(title || hint) && (
        <div
          className={cn(
            "flex items-center justify-between gap-4 border-b px-4 py-2.5 sm:px-5",
            isLight
              ? "border-slate-200/60 bg-slate-50/60"
              : "border-white/[0.06] bg-white/[0.02]"
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* File dot indicators */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className={cn("h-2.5 w-2.5 rounded-full", isLight ? "bg-slate-300/70" : "bg-white/10")} />
              <span className={cn("h-2.5 w-2.5 rounded-full", isLight ? "bg-slate-300/70" : "bg-white/10")} />
              <span className={cn("h-2.5 w-2.5 rounded-full", isLight ? "bg-slate-300/70" : "bg-white/10")} />
            </div>
            <div className="min-w-0">
              {title && (
                <span className={cn("code-face text-[12px] font-medium truncate block", isLight ? "text-slate-600" : "text-slate-300")}>
                  {title}
                </span>
              )}
            </div>
          </div>
          <button
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300 active:scale-90",
              copied
                ? isLight ? "bg-emerald-50 text-emerald-600" : "bg-emerald-500/20 text-emerald-400"
                : isLight ? "text-slate-400 hover:bg-slate-100 hover:text-slate-600" : "text-slate-500 hover:bg-white/[0.06] hover:text-slate-300"
            )}
            onClick={handleCopy}
            type="button"
            aria-label="Copy code"
          >
            {copied ? (
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 7v12a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-8a2 2 0 00-2 2zM16 1H4a2 2 0 00-2 2v12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Hint bar */}
      {hint && (
        <div className={cn("border-b px-4 py-2 sm:px-5", isLight ? "border-slate-200/40 bg-blue-50/30" : "border-white/[0.03] bg-blue-500/[0.02]")}>
          <p className={cn("text-[11px] leading-snug", isLight ? "text-slate-400" : "text-slate-500")}>
            {hint}
          </p>
        </div>
      )}

      {/* Code body */}
      <div className="overflow-x-auto">
        <div className={cn("code-face text-[12px] leading-6 md:text-[13px] py-3", !title && !hint && "py-4")}>
          {lines.map((line, index) => (
            <div
              className={cn(
                "grid gap-0",
                showLineNumbers
                  ? "grid-cols-[3rem_minmax(0,1fr)]"
                  : "grid-cols-[minmax(0,1fr)]",
                isLight ? "hover:bg-blue-50/30" : "hover:bg-white/[0.02]"
              )}
              key={`line-${index}`}
            >
              {showLineNumbers && (
                <span
                  className={cn(
                    "select-none text-right pr-4 py-[0.12rem] text-[11px]",
                    isLight ? "text-slate-300" : "text-slate-600"
                  )}
                >
                  {index + 1}
                </span>
              )}
              <div
                className={cn(
                  "min-w-max whitespace-pre py-[0.12rem]",
                  showLineNumbers ? "sm:pr-4 pr-2" : "px-4 sm:px-5"
                )}
              >
                {line.length === 0 ? (
                  <span>&nbsp;</span>
                ) : (
                  line.map((token, tokenIndex) => (
                    <span
                      className={tokenClass(token.tone, isLight)}
                      key={`token-${index}-${tokenIndex}`}
                    >
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
  );
}