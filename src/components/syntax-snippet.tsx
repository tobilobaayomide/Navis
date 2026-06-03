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

  const codePanelClass = isLight
    ? "border-[rgba(15,23,42,0.06)] bg-[linear-gradient(180deg,rgba(252,253,255,0.88)_0%,rgba(246,248,252,0.92)_100%)]"
    : "border-white/[0.06] bg-[linear-gradient(180deg,rgba(7,10,16,0.82)_0%,rgba(9,13,20,0.68)_100%)]";

  const lineNumberClass = isLight
    ? "text-slate-400/90 bg-[linear-gradient(180deg,rgba(15,23,42,0.02)_0%,rgba(15,23,42,0.01)_100%)]"
    : "text-slate-500/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.01)_100%)]";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippetText);
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <div className="code-face text-[12px] leading-6 md:text-[13px]">
          {lines.map((line, index) => (
            <div
              className={cn(
                "grid gap-0",
                showLineNumbers
                  ? "grid-cols-[3rem_minmax(0,1fr)]"
                  : "grid-cols-[minmax(0,1fr)]",
                isLight ? "hover:bg-[rgba(15,23,42,0.018)]" : "hover:bg-white/[0.02]"
              )}
              key={`line-${index}`}
            >
            
              <div
                className={cn(
                  "min-w-max whitespace-pre py-[0.12rem]",
                  showLineNumbers ? "sm:px-4 px-2" : "px-3"
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