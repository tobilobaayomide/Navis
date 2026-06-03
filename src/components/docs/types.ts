import type { ComponentType } from "react";

export type DocSectionElement =
  | { type: "infoCards"; cards: { title: string; body: string }[] }
  | { type: "bulletList"; items: string[] }
  | { type: "syntaxSnippet"; snippetKey: string; title: string; hint?: string }
  | { type: "noteCard"; noteTitle: string; noteText: string }
  | { type: "docsTable"; tableType: "api" | "navItem" | "customVars" }
  | { type: "installButton" };

export type TocItem = {
  id: string;
  label: string;
  summary?: string;
  elements?: DocSectionElement[];
};

export type DocPage = {
  slug: string;
  label: string;
  title: string;
  description: string;
  groupTitle: string;
  icon?: ComponentType<{ className?: string } | any> | null;
  sections: TocItem[];
};

export type DocGroup = {
  title: string;
  items: DocPage[];
};

export type DocsProps = {
  isLight: boolean;
  installCommand: string;
  copyToClipboard: (text: string) => void;
};

export default {};
