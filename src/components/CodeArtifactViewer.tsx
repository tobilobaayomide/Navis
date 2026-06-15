import { useMemo, useState } from "react";
import { cn } from "../lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CodeArtifact = {
  code: string;
  description: string;
  fileName: string;
  id: string;
  label: string;
};

type CodeArtifactViewerProps = {
  artifacts: CodeArtifact[];
  copiedState: boolean;
  copyToClipboard: (text: string) => void;
  isLight: boolean;
};

// ─── Tokeniser (single source of truth — also re-exported for Playground) ────

export type TokenTone =
  | "comment"
  | "component"
  | "keyword"
  | "number"
  | "plain"
  | "property"
  | "string"
  | "type";

export type Token = {
  tone: TokenTone;
  value: string;
};

/**
 * Genuine JS/TS reserved words only.
 * React hooks (useState, useMemo, …) are ordinary identifiers, not keywords,
 * so they should not receive keyword colouring.
 */
const KEYWORDS = new Set([
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "let",
  "new",
  "null",
  "of",
  "return",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "type",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "yield",
]);

export function getTokenClass(tone: TokenTone, isLight: boolean): string {
  switch (tone) {
    case "comment":   return isLight ? "text-slate-400"   : "text-slate-500";
    case "component": return isLight ? "text-sky-700"     : "text-sky-300";
    case "keyword":   return isLight ? "text-violet-700"  : "text-violet-300";
    case "number":    return isLight ? "text-amber-700"   : "text-amber-300";
    case "property":  return isLight ? "text-rose-700"    : "text-rose-300";
    case "string":    return isLight ? "text-emerald-700" : "text-emerald-300";
    case "type":      return isLight ? "text-cyan-700"    : "text-cyan-300";
    default:          return isLight ? "text-slate-700"   : "text-slate-200";
  }
}

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  const pattern =
    /(\/\/.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:import|from|export|default|function|return|const|let|var|type|if|else|true|false|null|undefined|as|async|await|class|extends|for|while|do|switch|case|break|continue|throw|try|catch|finally|new|delete|in|of|instanceof|typeof|void|this|super|static|yield)\b|\b\d+(?:\.\d+)?\b|\b[A-Z][A-Za-z0-9_]*\b|\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*:))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line))) {
    if (match.index > lastIndex) {
      tokens.push({ tone: "plain", value: line.slice(lastIndex, match.index) });
    }

    const value = match[0];
    let tone: TokenTone = "plain";

    if (value.startsWith("//")) {
      tone = "comment";
    } else if (
      value.startsWith('"') ||
      value.startsWith("'") ||
      value.startsWith("`")
    ) {
      tone = "string";
    } else if (/^\d/.test(value)) {
      tone = "number";
    } else if (KEYWORDS.has(value)) {
      tone = "keyword";
    } else if (/^[A-Z]/.test(value)) {
      // PascalCase: heuristic — Icon suffix → component, otherwise type
      tone = value.endsWith("Icon") || /^[A-Z][a-z]/.test(value)
        ? "component"
        : "type";
    } else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
      tone = "property";
    }

    tokens.push({ tone, value });
    lastIndex = match.index + value.length;
  }

  if (lastIndex < line.length) {
    tokens.push({ tone: "plain", value: line.slice(lastIndex) });
  }

  return tokens.length > 0 ? tokens : [{ tone: "plain", value: line }];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CodeArtifactViewer({
  artifacts,
  copiedState,
  copyToClipboard,
  isLight,
}: CodeArtifactViewerProps) {
  const [activeArtifactId, setActiveArtifactId] = useState(
    artifacts[0]?.id ?? ""
  );

  const activeArtifact =
    artifacts.find((a) => a.id === activeArtifactId) ?? artifacts[0];

  const highlightedLines = useMemo(() => {
    if (!activeArtifact) return [];
    return activeArtifact.code.split("\n").map((line) => tokenizeLine(line));
  }, [activeArtifact]);

  if (!activeArtifact) return null;

  const softBorder = isLight
    ? "border-[rgba(15,23,42,0.08)]"
    : "border-white/[0.08]";

  const innerBorder = isLight
    ? "border-[rgba(15,23,42,0.06)]"
    : "border-white/[0.06]";

  const mutedClass = isLight ? "text-slate-500" : "text-slate-400";

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
        {/* ── Header row ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.18em]",
                mutedClass
              )}
            >
              Source output
            </p>
            <h3
              className={cn(
                "text-2xl font-bold tracking-tight",
                isLight ? "text-slate-950" : "text-white"
              )}
            >
              Real component source.
            </h3>
            <p
              className={cn(
                "max-w-[62ch] text-sm leading-relaxed",
                isLight ? "text-slate-600" : "text-slate-300"
              )}
            >
              The selected rail outputs the component file the CLI installs.
              Navigation data and parent usage remain documented examples.
            </p>
          </div>

          {/* Copy buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors active:scale-[0.98]",
                isLight
                  ? "border-[rgba(15,23,42,0.08)] bg-white text-slate-800 hover:bg-slate-50"
                  : "border-white/[0.08] bg-[rgba(255,255,255,0.04)] text-slate-100 hover:bg-[rgba(255,255,255,0.07)]"
              )}
              onClick={() => copyToClipboard(activeArtifact.code)}
              type="button"
            >
              {copiedState ? "Copied" : "Copy current file"}
            </button>
          </div>
        </div>

        {/* ── File tabs ──────────────────────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          {artifacts.map((artifact) => {
            const isActive = artifact.id === activeArtifact.id;
            return (
              <button
                key={artifact.id}
                className={cn(
                  "rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors active:scale-[0.98]",
                  isActive
                    ? isLight
                      ? "border-[rgba(15,23,42,0.1)] bg-slate-950 text-white"
                      : "border-white/[0.08] bg-[rgba(255,255,255,0.07)] text-white"
                    : isLight
                      ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.8)] text-slate-500 hover:text-slate-950"
                      : "border-white/[0.08] bg-[rgba(255,255,255,0.03)] text-slate-400 hover:text-slate-100"
                )}
                onClick={() => setActiveArtifactId(artifact.id)}
                type="button"
              >
                {artifact.label}
              </button>
            );
          })}
        </div>

        {/* ── Code panel ─────────────────────────────────────────────────── */}
        <div
          className={cn(
            "mt-6 overflow-hidden rounded-xl border",
            isLight
              ? "border-[rgba(15,23,42,0.08)] bg-[rgba(248,250,252,0.94)]"
              : "border-white/[0.08] bg-[rgba(10,13,20,0.84)]"
          )}
        >
          {/* File meta bar */}
          <div
            className={cn(
              "flex flex-col gap-1 border-b px-5 py-4 md:flex-row md:items-center md:justify-between",
              innerBorder
            )}
          >
            <div>
              <span
                className={cn(
                  "code-face text-[11px] font-semibold uppercase tracking-[0.18em]",
                  mutedClass
                )}
              >
                {activeArtifact.fileName}
              </span>
              <p
                className={cn(
                  "mt-1 text-sm",
                  isLight ? "text-slate-600" : "text-slate-300"
                )}
              >
                {activeArtifact.description}
              </p>
            </div>
          </div>

          {/* Code lines */}
          <div className="overflow-x-auto">
            <div className="code-face min-w-full text-[12px] leading-6 md:text-[13px]">
              {highlightedLines.map((line, lineIndex) => (
                <div
                  key={`line-${lineIndex}`}
                  className={cn(
                    "grid grid-cols-[3rem_minmax(0,1fr)] gap-4 px-5",
                    isLight
                      ? "odd:bg-[rgba(255,255,255,0.26)]"
                      : "odd:bg-[rgba(255,255,255,0.012)]"
                  )}
                >
                  <span
                    className={cn(
                      "select-none py-0.5 text-right text-[11px]",
                      mutedClass
                    )}
                  >
                    {String(lineIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="whitespace-pre py-0.5">
                    {line.map((token, tokenIndex) => (
                      <span
                        key={`token-${lineIndex}-${tokenIndex}`}
                        className={getTokenClass(token.tone, isLight)}
                      >
                        {token.value}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
