import {
  createContext,
  type ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { useNavigate } from "react-router-dom";
import * as DashboardIcons from "../icons/dashboard-icons";
import { BottomNavFloating } from "../bottom-nav/bottom-nav-floating";
import { BottomNavGlass } from "../bottom-nav/bottom-nav-glass";
import { BottomNavIndicator } from "../bottom-nav/bottom-nav-indicator";
import { BottomNavMinimal } from "../bottom-nav/bottom-nav-minimal";
import { BottomNavPill } from "../bottom-nav/bottom-nav-pill";
import bottomNavFloatingSource from "../bottom-nav/bottom-nav-floating.tsx?raw";
import bottomNavGlassSource from "../bottom-nav/bottom-nav-glass.tsx?raw";
import bottomNavIndicatorSource from "../bottom-nav/bottom-nav-indicator.tsx?raw";
import bottomNavMinimalSource from "../bottom-nav/bottom-nav-minimal.tsx?raw";
import bottomNavPillSource from "../bottom-nav/bottom-nav-pill.tsx?raw";
import type { BottomNavProps } from "../nav/nav.types";
import { FLOATING_NAV_ITEMS, NAV_ITEMS, PILL_NAV_ITEMS } from "../data/nav-items";
import type { CodeArtifact } from "../components/code-artifact-viewer";

// ─── Types ───────────────────────────────────────────────────────────────────

export type VariantId = "minimal" | "floating" | "pill" | "indicator" | "glass";
export type AccentColor = "indigo" | "emerald" | "rose" | "amber" | "blue";
export type SiteTheme = "dark" | "light";

export type NavVariant = {
  id: VariantId;
  label: string;
  componentName: string;
  fileName: string;
  blurb: string;
  useFor: string;
  note: string;
};

// ─── Static data (not state, never changes) ──────────────────────────────────

export const VARIANTS: NavVariant[] = [
  {
    id: "minimal",
    label: "Minimal",
    componentName: "BottomNavMinimal",
    fileName: "bottom-nav-minimal",
    blurb: "Flat and quiet. The perfect clean slate baseline.",
    useFor: "Admin panels, data dashboards, lightweight tools",
    note: "Understated active states that keep content first."
  },
  {
    id: "floating",
    label: "Floating",
    componentName: "BottomNavFloating",
    fileName: "bottom-nav-floating",
    blurb: "A detached glass rail with a kinetic active capsule.",
    useFor: "Inbox-first interfaces, consumer apps, feed layouts",
    note: "Active capsules expand dynamically to fit the path label."
  },
  {
    id: "pill",
    label: "Pill",
    componentName: "BottomNavPill",
    fileName: "bottom-nav-pill",
    blurb: "Concentric segments with rich ambient backing glows.",
    useFor: "Education portals, community spaces, profile-first apps",
    note: "Warmer, tactile active states that slide elegantly on active switches."
  },
  {
    id: "indicator",
    label: "Indicator",
    componentName: "BottomNavIndicator",
    fileName: "bottom-nav-indicator",
    blurb: "High contrast with a dedicated floating active indicator line.",
    useFor: "Operations monitoring, active utilities, developer tools",
    note: "Highly recognizable active state indicator with direct accent customizability."
  },
  {
    id: "glass",
    label: "Glass",
    componentName: "BottomNavGlass",
    fileName: "bottom-nav-glass",
    blurb: "Premium double-bezel concentric layout with raised primary center button.",
    useFor: "Brand-led products, media applications, discovery-heavy tools",
    note: "A 72px raised circle acts as the primary layout signature."
  }
];

const navRenderers: Record<VariantId, (props: BottomNavProps) => ReactElement> = {
  minimal: BottomNavMinimal,
  floating: BottomNavFloating,
  pill: BottomNavPill,
  indicator: BottomNavIndicator,
  glass: BottomNavGlass
};

const componentSourceByVariant: Record<VariantId, string> = {
  minimal: bottomNavMinimalSource,
  floating: bottomNavFloatingSource,
  pill: bottomNavPillSource,
  indicator: bottomNavIndicatorSource,
  glass: bottomNavGlassSource
};

const PUBLIC_REACT_IMPORTS: Record<VariantId, string> = {
  minimal: "",
  floating: 'import { useLayoutEffect, useMemo, useRef, useState } from "react";',
  pill: 'import { useLayoutEffect, useRef, useState } from "react";',
  indicator: "",
  glass: ""
};

const PUBLIC_BASE_HELPERS = `/**
 * Each item describes one tab in the bottom navigation.
 * Keep it simple: id, label, href, icon, and optional badge/disabled.
 */

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function insetBottomStyle(extraPadding = 12) {
  return {
    paddingBottom: \`calc(env(safe-area-inset-bottom, 0px) + \${extraPadding}px)\`
  };
}`;

const PUBLIC_BADGE_HELPERS = `

function formatBadgeValue(value) {
  return value > 99 ? "99+" : String(value);
}

function NavBadge({ value, className }) {
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
}`;

function buildPublicHelpers(includeBadges: boolean) {
  return `${PUBLIC_BASE_HELPERS}${includeBadges ? PUBLIC_BADGE_HELPERS : ""}`;
}

function stripBadgeCode(source: string) {
  return source
    .replace(/\n\s*\{\/\*[^*]*Badge[\s\S]*?\*\/\}\n/g, "\n")
    .replace(
      /\n\s*\{(?:!isActive && )?(?:activeItem && )?typeof (?:activeItem|item)\.badge === "number" \? \([\s\S]*?\) : null\}\n/g,
      "\n"
    );
}

function buildPublicComponentSource(variantId: VariantId, source: string, includeBadges: boolean) {
  const cleanedSource = source
    .replace(/^import .* from "react";\n/m, "")
    .replace(/^import { cn } from "\.\.\/lib\/cn";\n/m, "")
    .replace(/^import type { BottomNavProps } from "\.\.\/nav\/nav\.types";\n/m, "")
    .replace(/^import { NavBadge, insetBottomStyle } from "\.\/shared";\n/m, "")
    .replace(/^import { NavBadge } from "\.\/shared";\n/m, "")
    .replace(/^\/\*\*[\s\S]*?\*\/\n/m, "")
    .replace(/^type [\s\S]*?^};\n\n/gm, "")
    .replace(/function cn\(...classes: Array<string \| false \| null \| undefined>\)/g, "function cn(...classes)")
    .replace(/function NavBadge\(\{ value, className \}: \{ value: number; className\?: string \}\)/g, "function NavBadge({ value, className })")
    .replace(/type \w+ = ComponentType<SVGProps<SVGSVGElement>>;\n\n/g, "")
    .replace(/export type [\s\S]*?^};\n\n/gm, "")
    .replace(/function (\w+)\(([^)]*?): [^)]+\)/g, "function $1($2)")
    .replace(/export function (\w+)\(\{([\s\S]*?)\}: BottomNavProps(?: & \{ style\?: CSSProperties \})?\)/g, "export function $1({$2})")
    .replace(/export function (\w+)\(/g, "export default function $1(")
    .replace(/useRef<Array<[^>]+>>\(/g, "useRef(")
    .replace(/useRef<[^>]+>\(/g, "useRef(")
    .replace(/useState<[^>]+>\(/g, "useState(")
    .replace(/\)\s+as\s+CSSProperties/g, ")")
    .replace(/\s+as\s+CSSProperties/g, "")
    .replace(/\s+as\s+any/g, "")
    .replace(/: CSSProperties/g, "")
    .replace(/: BottomNavProps/g, "")
    .replace(/: ComponentType<SVGProps<SVGSVGElement>>/g, "")
    .replace(/: NavItem\[]/g, "")
    .replace(/: string/g, "")
    .replace(/: number/g, "")
    .replace(/: boolean/g, "")
    .trim();

  const importBlock = PUBLIC_REACT_IMPORTS[variantId] ? `${PUBLIC_REACT_IMPORTS[variantId]}\n` : "";
  const navImport = 'import { NAV_ITEMS } from "../../constants/navigation";\n';
  const simpleSource = cleanedSource
    .replace(
      /export default function (\w+)\(\{[\s\S]*?\}\) \{/,
      `export default function $1({ activePath, onItemClick }) {`
    )
    .replace(/const activeItem = items\.find\(\(item\) => item\.id === activeId\) \?\? items\[0\];/g, 'const activeItem = NAV_ITEMS.find((item) => item.path === activePath) ?? NAV_ITEMS[0];')
    .replace(/const resolvedActiveId = activeId \?\? items\[0\]\?\.id;/g, 'const resolvedActivePath = activePath ?? NAV_ITEMS[0]?.path;')
    .replace(/items\.findIndex\(\(item\) => item\.id === activeId\)/g, 'NAV_ITEMS.findIndex((item) => item.path === activePath)')
    .replace(/items\.findIndex\(\(item\) => item\.id === resolvedActiveId\)/g, 'NAV_ITEMS.findIndex((item) => item.path === resolvedActivePath)')
    .replace(/item\.id === activeId/g, "item.path === activePath")
    .replace(/item\.id === resolvedActiveId/g, "item.path === resolvedActivePath")
    .replace(/item\.href === activeId/g, "item.path === activePath")
    .replace(/activeItem\?\.id/g, "activeItem?.path")
    .replace(/items\.length/g, "NAV_ITEMS.length")
    .replace(/items\.map\(/g, "NAV_ITEMS.map(")
    .replace(/items\.forEach\(/g, "NAV_ITEMS.forEach(")
    .replace(/\[resolvedActiveId,\s*items,\s*trackColumns\]/g, "[activePath, trackColumns]")
    .replace(/\[resolvedActiveId,\s*items\]/g, "[resolvedActivePath]")
    .replace(/\[activeId,\s*items,\s*trackColumns\]/g, "[activePath, trackColumns]")
    .replace(/\[activeId,\s*items\]/g, "[activePath]")
    .replace(/\[items\.length\]/g, "[]")
    .replace(/items=\{[^}]+\}\n/g, "")
    .replace(/activeId=\{[^}]+\}\n/g, "")
    .replace(/onItemClick=\{\(item\) => [^}]+\}/g, "")
    .replace(/\n\s*\.\.\.style,?\n/g, "\n")
    .replace(/className=\{cn\(\s*("[\s\S]*?"),\s*className\s*\)\}/g, 'className={cn($1)}')
    .replace(/style=\{\{\s*maxWidth: `\$\{maxWidth\}px`, width: "100%", \.\.\.style\s*\}\}/g, 'style={{ maxWidth: `${maxWidth}px`, width: "100%" }}')
    .replace(/style=\{\{\s*\.\.\.insetBottomStyle\((\d+)\),\s*\.\.\.style\s*\}\}/g, 'style={insetBottomStyle($1)}')
    .replace(/onClick=\{\(\) => onItemClick\?\.\(item\)\}/g, "onClick={() => onItemClick?.(item.path)}")
    .replace(/key=\{item\.id\}/g, "key={item.path}")
    .replace(/const maxWidth = useMemo\(\(\) => \{\s*return NAV_ITEMS\.length === 3 \? 320 : NAV_ITEMS\.length === 4 \? 385 : 440;\s*\}, \[NAV_ITEMS\.length\]\);/g, 'const maxWidth = useMemo(() => {\n    return NAV_ITEMS.length === 3 ? 320 : NAV_ITEMS.length === 4 ? 385 : 440;\n  }, []);')
    .replace(/const maxWidth = NAV_ITEMS\.length === 3 \? 320 : NAV_ITEMS\.length === 4 \? 385 : 440;/g, 'const maxWidth = NAV_ITEMS.length === 3 ? 320 : NAV_ITEMS.length === 4 ? 385 : 440;');

  let wrappedSource = includeBadges ? simpleSource : stripBadgeCode(simpleSource);
  if (variantId === "floating") {
    wrappedSource = wrappedSource
      .replace(/className=\{cn\("floating-nav-shell /, 'className={cn("floating-nav-shell pointer-events-auto ')
      .replace(/return \(\n\s*<nav/, 'return (\n    <div className="md:hidden fixed inset-x-0 bottom-4 z-30 px-4 w-full flex justify-center pointer-events-none">\n      <nav')
      .replace(/\n\s*<\/nav>\n\s*\);\n\}/, '\n      </nav>\n    </div>\n  );\n}');
  }
  if (variantId === "pill") {
    wrappedSource = wrappedSource
      .replace(/className=\{cn\("pill-nav-shell /, 'className={cn("pill-nav-shell pointer-events-auto ')
      .replace(/return \(\n\s*<nav/, 'return (\n    <div className="md:hidden fixed inset-x-0 bottom-4 z-30 px-4 w-full flex justify-center pointer-events-none">\n      <nav')
      .replace(/\n\s*<\/nav>\n\s*\);\n\}/, '\n      </nav>\n    </div>\n  );\n}');
  }
  if (variantId === "indicator") {
    wrappedSource = wrappedSource
      .replace(/className=\{cn\("indicator-nav-shell /, 'className={cn("indicator-nav-shell pointer-events-auto ')
      .replace(/return \(\n\s*<nav/, 'return (\n    <div className="md:hidden fixed inset-x-0 bottom-4 z-30 px-4 w-full flex justify-center pointer-events-none">\n      <nav')
      .replace(/\n\s*<\/nav>\n\s*\);\n\}/, '\n      </nav>\n    </div>\n  );\n}');
  }
  if (variantId === "minimal") {
    wrappedSource = wrappedSource.replace(/className=\{cn\("/, 'className={cn("md:hidden ');
  }
  if (variantId === "glass") {
    wrappedSource = wrappedSource.replace(/className=\{cn\("glass-nav-container /, 'className={cn("md:hidden glass-nav-container ');
  }

  return `${importBlock}${navImport}\n${buildPublicHelpers(includeBadges)}\n\n${wrappedSource}`.trim();
}

function resolveIconImportName(icon: BottomNavProps["items"][number]["icon"]) {
  const match = Object.entries(DashboardIcons).find(([, exported]) => exported === icon);
  return match?.[0] ?? "HomeIcon";
}

// ─── Context shape ────────────────────────────────────────────────────────────

type PlaygroundContextValue = {
  // Theme
  isLight: boolean;
  theme: SiteTheme;
  toggleTheme: () => void;

  // Variant
  selectedVariant: VariantId;
  activeVariant: NavVariant;
  setSelectedVariant: (v: VariantId) => void;

  // Active nav tab (within preview)
  activeId: string;
  setActiveId: (id: string) => void;

  // Controls
  customAccent: AccentColor;
  setCustomAccent: (a: AccentColor) => void;
  itemsCount: number;
  setItemsCount: (n: number) => void;
  badgesEnabled: boolean;
  setBadgesEnabled: (b: boolean) => void;

  // Derived
  visibleItems: BottomNavProps["items"];
  customStyles: Record<string, string>;
  previewNav: ReactElement;
  installCommand: string;
  implementationArtifacts: CodeArtifact[];
  implementationBundleString: string;

  // Copy
  copiedState: boolean;
  copyToClipboard: (text: string) => void;

  // Navigation helpers
  goToPlayground: () => void;
  goToDocs: () => void;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export function usePlayground() {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error("usePlayground must be used within <PlaygroundProvider>");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  // ── Theme ──────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState<SiteTheme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("navis-site-theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("navis-site-theme", theme);
  }, [theme]);

  const isLight = theme === "light";
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // ── Variant ────────────────────────────────────────────────────────────────
  const [selectedVariant, setSelectedVariant] = useState<VariantId>("minimal");
  const activeVariant = VARIANTS.find((v) => v.id === selectedVariant) ?? VARIANTS[0];
  const SelectedBottomNav = navRenderers[selectedVariant];

  // ── Controls ───────────────────────────────────────────────────────────────
  const [activeId, setActiveId] = useState("home");
  const [customAccent, setCustomAccent] = useState<AccentColor>("indigo");
  const [itemsCount, setItemsCount] = useState(5);
  const [badgesEnabled, setBadgesEnabled] = useState(true);

  // ── Derived: items ─────────────────────────────────────────────────────────
  const defaultItems = useMemo(() => {
    if (selectedVariant === "floating") return FLOATING_NAV_ITEMS;
    if (selectedVariant === "pill") return PILL_NAV_ITEMS;
    return NAV_ITEMS;
  }, [selectedVariant]);

  const visibleItems = useMemo(() => {
    return defaultItems.slice(0, itemsCount).map((item) => {
      if (!badgesEnabled) {
        const { badge, ...rest } = item;
        return rest;
      }
      return item;
    });
  }, [badgesEnabled, defaultItems, itemsCount]);

  // Keep activeId valid when items change
  useEffect(() => {
    if (!visibleItems.some((item) => item.id === activeId)) {
      setActiveId(visibleItems[0]?.id ?? "home");
    }
  }, [activeId, visibleItems]);

  // ── Derived: accent styles ─────────────────────────────────────────────────
  const supportsAccent = selectedVariant === "indicator" || selectedVariant === "glass";

  const customStyles = useMemo(() => {
    if (!supportsAccent) return {};
    const s: Record<string, string> = {};

    if (customAccent === "emerald") {
      s["--indicator-nav-accent-rgb"] = "16, 185, 129";
      s["--glass-nav-center-bg-start"] = "#064e3b";
      s["--glass-nav-center-bg-end"] = "#0f766e";
      s["--glass-nav-dot-color"] = "#10b981";
      s["--glass-nav-text-active"] = "#10b981";
      s["--indicator-nav-bg"] = "rgba(6, 78, 59, 0.1)";
    } else if (customAccent === "rose") {
      s["--indicator-nav-accent-rgb"] = "244, 63, 94";
      s["--glass-nav-center-bg-start"] = "#4c0519";
      s["--glass-nav-center-bg-end"] = "#881337";
      s["--glass-nav-dot-color"] = "#f43f5e";
      s["--glass-nav-text-active"] = "#f43f5e";
      s["--indicator-nav-bg"] = "rgba(76, 5, 25, 0.1)";
    } else if (customAccent === "amber") {
      s["--indicator-nav-accent-rgb"] = "245, 158, 11";
      s["--glass-nav-center-bg-start"] = "#451a03";
      s["--glass-nav-center-bg-end"] = "#78350f";
      s["--glass-nav-dot-color"] = "#f59e0b";
      s["--glass-nav-text-active"] = "#f59e0b";
      s["--indicator-nav-bg"] = "rgba(69, 26, 3, 0.1)";
    } else if (customAccent === "blue") {
      s["--indicator-nav-accent-rgb"] = "14, 165, 233";
      s["--glass-nav-center-bg-start"] = "#0c4a6e";
      s["--glass-nav-center-bg-end"] = "#0369a1";
      s["--glass-nav-dot-color"] = "#0ea5e9";
      s["--glass-nav-text-active"] = "#0ea5e9";
      s["--indicator-nav-bg"] = "rgba(12, 74, 110, 0.1)";
    } else {
      // indigo (default)
      s["--indicator-nav-accent-rgb"] = "79, 70, 229";
      s["--glass-nav-center-bg-start"] = "#0f172a";
      s["--glass-nav-center-bg-end"] = "#1e293b";
      s["--glass-nav-dot-color"] = "#4f46e5";
      s["--glass-nav-text-active"] = "#4f46e5";
      s["--indicator-nav-bg"] = "rgba(15, 23, 42, 0.1)";
    }

    return s;
  }, [customAccent, supportsAccent]);

  // ── Derived: preview nav ───────────────────────────────────────────────────
  const previewNav = useMemo(
    () => (
      <SelectedBottomNav
        activeId={activeId}
        className={
          selectedVariant === "minimal" || selectedVariant === "glass"
            ? "!static !shadow-none"
            : undefined
        }
        items={visibleItems}
        onItemClick={(item) => setActiveId(item.id)}
        style={customStyles}
      />
    ),
    [SelectedBottomNav, activeId, customStyles, selectedVariant, visibleItems]
  );

  // ── Derived: install command ───────────────────────────────────────────────
  const installCommand = `npx navis add ${activeVariant.fileName}`;

  const navigationCodeString = useMemo(() => {
    const resolvedItems: Array<BottomNavProps["items"][number] & { iconName: string }> = visibleItems.map((item) => ({
      ...item,
      iconName: resolveIconImportName(item.icon)
    }));
    const iconImports = Array.from(new Set(resolvedItems.map((item) => item.iconName)));
    const navItemsCode = resolvedItems
      .map((item) => {
        const badge = typeof item.badge === "number" ? `, badge: ${item.badge}` : "";
        const disabled = item.disabled ? ", disabled: true" : "";
        return `  { id: "${item.id}", label: "${item.label}", path: "${item.href}", icon: ${item.iconName}${badge}${disabled} }`;
      })
      .join(",\n");

    return `import { ${iconImports.join(", ")} } from "../components/icons/dashboard-icons";

export const NAV_ITEMS = [
${navItemsCode}
];`;
  }, [visibleItems]);

  // ── Derived: usage code string ────────────────────────────────────────────
  const usageCodeString = useMemo(() => {
    return `import { useLocation, useNavigate } from "react-router-dom";
import ${activeVariant.componentName} from "../components/ui/${activeVariant.fileName}";

export default function MobileLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen pb-20">
      {children}

      <${activeVariant.componentName}
        activePath={location.pathname}
        onItemClick={(path) => navigate(path)}
      />

      <div className="md:hidden h-24" aria-hidden="true" />
    </div>
  );
}`;
  }, [activeVariant.componentName, activeVariant.fileName]);

  const publicComponentSource = useMemo(
    () => buildPublicComponentSource(selectedVariant, componentSourceByVariant[selectedVariant], badgesEnabled),
    [badgesEnabled, selectedVariant]
  );

  // ── Derived: implementation artifacts ─────────────────────────────────────
  const implementationArtifacts = useMemo<CodeArtifact[]>(
    () => [
        {
          id: "component",
          label: "Component",
          fileName: `${activeVariant.fileName}.jsx`,
          code: publicComponentSource,
          description: "A copy-ready JSX component file with its tiny helper logic already inlined."
        },
        {
          id: "navigation",
          label: "Navigation Data",
          fileName: "constants/navigation.js",
          code: navigationCodeString,
          description: "Your shared navigation array. Import this directly into both the sidebar and the bottom nav."
        },
        {
          id: "usage",
          label: "Usage",
          fileName: "mobile-layout.jsx",
          code: usageCodeString,
          description: "Your parent layout only passes the current path and a click handler."
        }
      ],
    [navigationCodeString, publicComponentSource, usageCodeString]
  );

  const implementationBundleString = useMemo(
    () => implementationArtifacts.map((a) => `// ${a.fileName}\n${a.code}`).join("\n\n"),
    [implementationArtifacts]
  );

  // ── Copy ───────────────────────────────────────────────────────────────────
  const [copiedState, setCopiedState] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopiedState(false), 2000);
  };

  // ── Navigation helpers ─────────────────────────────────────────────────────
  const goToPlayground = () => navigate("/playground");
  const goToDocs = () => navigate("/docs/introduction");

  // ── Scroll to top on route change ─────────────────────────────────────────
  // (This is now handled per-page with useEffect if needed)

  const value: PlaygroundContextValue = {
    isLight,
    theme,
    toggleTheme,
    selectedVariant,
    activeVariant,
    setSelectedVariant,
    activeId,
    setActiveId,
    customAccent,
    setCustomAccent,
    itemsCount,
    setItemsCount,
    badgesEnabled,
    setBadgesEnabled,
    visibleItems,
    customStyles,
    previewNav,
    installCommand,
    implementationArtifacts,
    implementationBundleString,
    copiedState,
    copyToClipboard,
    goToPlayground,
    goToDocs
  };

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}
