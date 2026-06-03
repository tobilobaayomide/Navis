import React from "react";
import { cn } from "../../lib/cn";
import { SyntaxSnippet, tokenizeSnippet } from "../syntax-snippet";
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
      bottom-nav-minimal.jsx
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
    <section className="scroll-mt-32 space-y-4 sm:space-y-5" id={id}>
      <div className="space-y-3">
        <h2 className={cn("text-[1.35rem] font-semibold tracking-[0.02em] sm:text-2xl", isLight ? "text-slate-950" : "text-white")}>{title}</h2>
        <p className={cn("max-w-[72ch] text-base font-light leading-7 sm:text-[18px] sm:leading-8", isLight ? "text-slate-600" : "text-slate-300")}>{summary}</p>
      </div>
      {children}
    </section>
  );
}

function InfoCard({ title, body, isLight }: { title: string; body: string; isLight: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 sm:p-5",
        isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.86)]" : "border-white/[0.08] bg-[rgba(255,255,255,0.03)]"
      )}
    >
      <h3 className={cn("text-base font-semibold", isLight ? "text-slate-950" : "text-white")}>{title}</h3>
      <p className={cn("mt-2 text-sm leading-6 sm:leading-7", isLight ? "text-slate-600" : "text-slate-300")}>{body}</p>
    </div>
  );
}

function NoteCard({ title, children, isLight }: { title: string; children: React.ReactNode; isLight: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 sm:p-5",
        isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(248,250,252,0.9)]" : "border-white/[0.08] bg-[rgba(255,255,255,0.04)]"
      )}
    >
      <p className={cn("text-[11px] font-semibold uppercase tracking-[0.18em]", isLight ? "text-slate-500" : "text-slate-400")}>{title}</p>
      <div className={cn("mt-3 text-[15px] leading-7 sm:text-[16px]", isLight ? "text-slate-600" : "text-slate-300")}>{children}</div>
    </div>
  );
}

function BulletList({ items, isLight }: { items: string[]; isLight: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li className="flex items-start gap-3" key={item}>
          <span
            className={cn(
              "mt-2 h-1.5 w-1.5 rounded-full",
              isLight ? "bg-slate-400" : "bg-slate-500"
            )}
          />
          <span className={cn("text-base font-light leading-7 sm:text-[18px]", isLight ? "text-slate-600" : "text-slate-300")}>
            {formatText(item)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function DocsTable({ headers, rows, isLight }: { headers: string[]; rows: React.ReactNode[][]; isLight: boolean }) {
  const tableShell = isLight
    ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.82)] shadow-[0_20px_38px_-28px_rgba(15,23,42,0.16)]"
    : "border-white/[0.08] bg-[rgba(14,18,26,0.88)] shadow-[0_18px_34px_-20px_rgba(0,0,0,0.68)]";
  const tableHead = isLight
    ? "bg-[rgba(15,23,42,0.03)] text-slate-500 border-b border-[rgba(15,23,42,0.08)]"
    : "bg-[rgba(255,255,255,0.04)] text-slate-300 border-b border-white/[0.08]";
  const tableBody = isLight ? "divide-y divide-[rgba(15,23,42,0.05)]" : "divide-y divide-white/[0.06]";

  return (
    <div className={cn("overflow-x-auto rounded-2xl border", tableShell)}>
      <table className="min-w-[620px] w-full border-collapse text-left text-xs sm:text-sm">
        <thead className={tableHead}>
          <tr>
            {headers.map((header) => (
              <th className="px-3 py-3 font-semibold sm:px-4" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={tableBody}>
          {rows.map((row, rowIndex) => (
            <tr
              className={cn(
                "transition-colors",
                isLight ? "hover:bg-[rgba(15,23,42,0.025)]" : "hover:bg-[rgba(255,255,255,0.035)]"
              )}
              key={`row-${rowIndex}`}
            >
              {row.map((cell, cellIndex) => (
                <td className="px-3 py-4 align-top sm:px-4" key={`cell-${rowIndex}-${cellIndex}`}>
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
    <div className="space-y-10 sm:space-y-12">
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
                          <code className="code-face font-semibold text-indigo-400" key={`${row.variable}-variable`}>
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
                          <code className="code-face text-indigo-400" key={`${row.property}-type`}>
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
                      "group flex w-full max-w-xl items-center justify-between gap-3 rounded-2xl border px-4 py-4 text-left transition-colors sm:px-5",
                      isLight
                        ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.88)] hover:bg-white"
                        : "border-white/[0.08] bg-[rgba(15,19,28,0.82)] hover:bg-[rgba(20,26,36,0.9)]"
                    )}
                    key={index}
                    onClick={() => copyToClipboard(installCommand, "docs-install")}
                    type="button"
                  >
                    <code className={cn("code-face min-w-0 overflow-x-auto whitespace-nowrap text-xs sm:text-sm", isLight ? "text-slate-700" : "text-slate-100")}>
                      {installCommand}
                    </code>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        isLight ? "bg-[rgba(15,23,42,0.05)] text-slate-500" : "bg-[rgba(255,255,255,0.06)] text-slate-300"
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
