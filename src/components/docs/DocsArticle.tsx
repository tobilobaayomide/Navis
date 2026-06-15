import React from "react";
import { cn } from "../../lib/cn";
import { SyntaxSnippet, tokenizeSnippet } from "../SyntaxSnippet";
import { navContractSnippet } from "../../data/snippets";
import type { DocPage } from "./types";
import { apiRows, navItemRows, customVarsRows } from "../../data/docsContent";
import * as snippets from "../../data/docsSnippets";

function toSnippet(source: string) {
  return tokenizeSnippet(source);
}

const SNIPPETS_REGISTRY: Record<string, any> = {
  quickStart: toSnippet(snippets.quickStart),
  installLayout: toSnippet(snippets.installLayout),
  routing: toSnippet(snippets.routing),
  usage: toSnippet(snippets.usage),
  badge: toSnippet(snippets.badge),
  accent: toSnippet(snippets.accent),
  sidebar: toSnippet(snippets.sidebar),
  nextRouter: toSnippet(snippets.nextRouter),
  localState: toSnippet(snippets.localState),
  height: toSnippet(snippets.height),
  icon: toSnippet(snippets.icon),
  background: toSnippet(snippets.background),
  styling: toSnippet(snippets.styling),
  navContract: navContractSnippet,
  suggestedStructure: toSnippet(`
src/
  components/
    ui/
      BottomNavMinimal.jsx
      sidebar.jsx
  constants/
    navigation.js
  layouts/
    AppLayout.jsx
`)
};

function formatText(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.flatMap((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return [
        <code className="code-face" key={index}>
          {part.slice(1, -1)}
        </code>
      ];
    }
    // Support simple italics using *stars* in non-code text.
    const subParts = part.split("\n");
    return subParts.map((subPart, sIdx) => {
      const italicsParts = subPart.split(/(\*[^*]+\*)/g);
      return (
        <React.Fragment key={`${index}-${sIdx}`}>
          {italicsParts.map((itPart, iIdx) => {
            if (itPart.startsWith("*") && itPart.endsWith("*")) {
              return (
                <em key={`${index}-${sIdx}-${iIdx}`} className="not-italic">
                  {itPart.slice(1, -1)}
                </em>
              );
            }
            return <React.Fragment key={`${index}-${sIdx}-${iIdx}`}>{itPart}</React.Fragment>;
          })}
          {sIdx < subParts.length - 1 && <br />}
        </React.Fragment>
      );
    });
  });
}

function DocsSection({ id, title, summary, isLight, children }: { id: string; title: string; summary: string; isLight: boolean; children: React.ReactNode }) {
  return (
    <section className="scroll-mt-32 space-y-6 sm:space-y-8" id={id}>
      <div className="space-y-4">
        <div className={cn("h-px w-16", isLight ? "bg-blue-600/40" : "bg-blue-400/40")} />
        <h2 className={cn("text-2xl sm:text-[1.75rem] font-semibold tracking-tight leading-tight", isLight ? "text-slate-900" : "text-white")}>{title}</h2>
        <p className={cn("max-w-[64ch] text-[15px] sm:text-base leading-relaxed", isLight ? "text-slate-500" : "text-slate-400")}>{summary}</p>
      </div>
      {children}
    </section>
  );
}

function InfoCard({ title, body, isLight }: { title: string; body: string; isLight: boolean }) {
  return (
    <div
      className={cn(
        "group rounded-2xl border p-5 sm:p-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1",
        isLight
          ? "border-slate-200/80 bg-white shadow-sm hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/[0.06]"
          : "border-white/[0.06] bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-blue-500/30 hover:bg-blue-500/[0.03] hover:shadow-lg hover:shadow-blue-500/[0.06]"
      )}
    >
      <h3 className={cn("text-[15px] font-semibold transition-colors duration-300", isLight ? "text-slate-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400")}>{title}</h3>
      <p className={cn("mt-2.5 text-[13.5px] leading-[1.7]", isLight ? "text-slate-500" : "text-slate-400")}>{body}</p>
    </div>
  );
}

function NoteCard({ title, children, isLight }: { title: string; children: React.ReactNode; isLight: boolean }) {
  return (
    <div
      className={cn(
        "flex rounded-2xl border overflow-hidden",
        isLight
          ? "border-blue-200/60 bg-gradient-to-br from-blue-50/80 to-white shadow-sm"
          : "border-blue-500/15 bg-gradient-to-br from-blue-500/[0.04] to-transparent"
      )}
    >
      <div className={cn("w-1 shrink-0", isLight ? "bg-blue-500" : "bg-blue-400")} />
      <div className="p-5 sm:p-6">
        <p className={cn("text-[11px] font-bold uppercase tracking-[0.2em]", isLight ? "text-blue-600" : "text-blue-400")}>{title}</p>
        <div className={cn("mt-3 text-[14px] sm:text-[15px] leading-relaxed", isLight ? "text-slate-600" : "text-slate-300")}>{children}</div>
      </div>
    </div>
  );
}

function BulletList({ items, isLight }: { items: string[]; isLight: boolean }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li className="flex items-start gap-3.5" key={item}>
          <span
            className={cn(
              "mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full",
              isLight ? "bg-blue-500/60" : "bg-blue-400/50"
            )}
          />
          <span className={cn("text-[14.5px] sm:text-[15px] leading-relaxed", isLight ? "text-slate-600" : "text-slate-400")}>
            {formatText(item)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function DocsTable({ headers, rows, isLight }: { headers: string[]; rows: React.ReactNode[][]; isLight: boolean }) {
  const tableShell = isLight
    ? "border-slate-200/80 bg-white shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)]"
    : "border-white/[0.06] bg-white/[0.015] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_24px_-8px_rgba(0,0,0,0.4)]";
  const tableHead = isLight
    ? "bg-slate-50/80 text-slate-500 border-b border-slate-200/80"
    : "bg-white/[0.03] text-slate-400 border-b border-white/[0.06]";
  const tableBody = isLight ? "divide-y divide-slate-100" : "divide-y divide-white/[0.04]";

  return (
    <div className={cn("overflow-x-auto rounded-2xl border", tableShell)}>
      <table className="min-w-[620px] w-full border-collapse text-left text-[13px] sm:text-sm">
        <thead className={tableHead}>
          <tr>
            {headers.map((header) => (
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.1em] sm:px-5" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={tableBody}>
          {rows.map((row, rowIndex) => (
            <tr
              className={cn(
                "transition-colors duration-200",
                isLight ? "hover:bg-blue-50/30" : "hover:bg-blue-500/[0.02]"
              )}
              key={`row-${rowIndex}`}
            >
              {row.map((cell, cellIndex) => (
                <td className="px-4 py-4 align-top sm:px-5" key={`cell-${rowIndex}-${cellIndex}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DocsArticle({ currentPage, isLight, installCommand, copyToClipboard }: { currentPage: DocPage; isLight: boolean; installCommand: string; copyToClipboard: (text: string, id: string) => void; }) {
  const headingClass = isLight ? "text-slate-950" : "text-white";
  const bodyClass = isLight ? "text-slate-600" : "text-slate-300";
  const mutedClass = isLight ? "text-slate-500" : "text-slate-400";

  return (
    <div className="space-y-16 sm:space-y-24">
      {currentPage.sections.map((section) => (
        <DocsSection
          id={section.id}
          isLight={isLight}
          key={section.id}
          summary={section.summary ?? ""}
          title={section.label}
        >
          {section.elements?.map((el, index) => {
            switch (el.type) {
              case "infoCards": {
                const colsClass = el.cards.length === 2 ? "md:grid-cols-2" : el.cards.length >= 3 ? "md:grid-cols-3" : "grid-cols-1";
                return (
                  <div className={cn("grid gap-4", colsClass)} key={index}>
                    {el.cards.map((card, cIdx) => (
                      <InfoCard
                        body={card.body}
                        isLight={isLight}
                        key={cIdx}
                        title={card.title}
                      />
                    ))}
                  </div>
                );
              }

              case "bulletList":
                return (
                  <BulletList
                    isLight={isLight}
                    items={el.items}
                    key={index}
                  />
                );

              case "syntaxSnippet": {
                const snippetLines = SNIPPETS_REGISTRY[el.snippetKey];
                return (
                  <SyntaxSnippet
                    hint={el.hint}
                    isLight={isLight}
                    key={index}
                    lines={snippetLines}
                    title={el.title}
                  />
                );
              }

              case "noteCard":
                return (
                  <NoteCard isLight={isLight} key={index} title={el.noteTitle}>
                    {formatText(el.noteText)}
                  </NoteCard>
                );

              case "docsTable": {
                const rowsData =
                  el.tableType === "api"
                    ? apiRows
                    : el.tableType === "navItem"
                    ? navItemRows
                    : customVarsRows;

                return (
                  <DocsTable
                    headers={
                      el.tableType === "customVars"
                        ? ["Variable", "Component", "Usage"]
                        : ["Property", "Type", "Required", "Description"]
                    }
                    isLight={isLight}
                    key={index}
                    rows={rowsData.map((row: any, rIdx) => {
                      if (el.tableType === "customVars") {
                        return [
                          <code className={cn("code-face font-semibold", isLight ? "text-blue-600" : "text-blue-400")} key={`${row.variable}-variable`}>
                            {row.variable}
                          </code>,
                          <span className={cn("font-semibold", headingClass)} key={`${row.variable}-component`}>
                            {row.component}
                          </span>,
                          <span className={bodyClass} key={`${row.variable}-usage`}>
                            {row.usage}
                          </span>
                        ];
                      } else {
                        return [
                          <span className={cn("font-semibold", headingClass)} key={`${row.property}-property`}>
                            {row.property}
                          </span>,
                          <code className={cn("code-face", isLight ? "text-blue-600" : "text-blue-400")} key={`${row.property}-type`}>
                            {row.type}
                          </code>,
                          <span className={mutedClass} key={`${row.property}-required`}>
                            {row.required}
                          </span>,
                          <span className={bodyClass} key={`${row.property}-description`}>
                            {row.description}
                          </span>
                        ];
                      }
                    })}
                  />
                );
              }

              case "installButton":
                return (
                  <button
                    className={cn(
                      "group flex w-full max-w-xl items-center justify-between gap-4 rounded-2xl border px-5 py-4.5 text-left transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.98]",
                      isLight
                        ? "border-slate-200/80 bg-white shadow-sm hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/[0.06]"
                        : "border-white/[0.06] bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/[0.06]"
                    )}
                    key={index}
                    onClick={() => copyToClipboard(installCommand, "docs-install")}
                    type="button"
                  >
                    <code className={cn("code-face min-w-0 overflow-x-auto whitespace-nowrap text-[13px] sm:text-sm transition-colors duration-300", isLight ? "text-slate-700 group-hover:text-blue-700" : "text-slate-200 group-hover:text-blue-300")}>
                      {installCommand}
                    </code>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                        isLight ? "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600" : "bg-white/[0.06] text-slate-500 group-hover:bg-blue-500/20 group-hover:text-blue-400"
                      )}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path
                          d="M8 7v12a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-8a2 2 0 00-2 2zM16 1H4a2 2 0 00-2 2v12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                );

              default:
                return null;
            }
          })}
        </DocsSection>
      ))}
    </div>
  );
}
