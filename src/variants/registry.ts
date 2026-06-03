import type { ReactElement } from "react";
import { FLOATING_NAV_ITEMS, NAV_ITEMS, PILL_NAV_ITEMS } from "../data/nav-items";
import type { BottomNavProps } from "../nav/nav.types";
import { BottomNavAction } from "../bottom-nav/bottom-nav-action";
import { BottomNavAura } from "../bottom-nav/bottom-nav-aura";
import { BottomNavBrutalist } from "../bottom-nav/bottom-nav-brutalist";
import { BottomNavCyber } from "../bottom-nav/bottom-nav-cyber";
import { BottomNavDock } from "../bottom-nav/bottom-nav-dock";
import { BottomNavExpand } from "../bottom-nav/bottom-nav-expand";
import { BottomNavFloating } from "../bottom-nav/bottom-nav-floating";
import { BottomNavFluid } from "../bottom-nav/bottom-nav-fluid";
import { BottomNavGlass } from "../bottom-nav/bottom-nav-glass";
import { BottomNavIndicator } from "../bottom-nav/bottom-nav-indicator";
import { BottomNavIsland } from "../bottom-nav/bottom-nav-island";
import { BottomNavMinimal } from "../bottom-nav/bottom-nav-minimal";
import { BottomNavOrbit } from "../bottom-nav/bottom-nav-orbit";
import { BottomNavPill } from "../bottom-nav/bottom-nav-pill";
import { BottomNavTactile } from "../bottom-nav/bottom-nav-tactile";
import bottomNavActionSource from "../bottom-nav/bottom-nav-action.tsx?raw";
import bottomNavAuraSource from "../bottom-nav/bottom-nav-aura.tsx?raw";
import bottomNavBrutalistSource from "../bottom-nav/bottom-nav-brutalist.tsx?raw";
import bottomNavCyberSource from "../bottom-nav/bottom-nav-cyber.tsx?raw";
import bottomNavDockSource from "../bottom-nav/bottom-nav-dock.tsx?raw";
import bottomNavExpandSource from "../bottom-nav/bottom-nav-expand.tsx?raw";
import bottomNavFloatingSource from "../bottom-nav/bottom-nav-floating.tsx?raw";
import bottomNavFluidSource from "../bottom-nav/bottom-nav-fluid.tsx?raw";
import bottomNavGlassSource from "../bottom-nav/bottom-nav-glass.tsx?raw";
import bottomNavIndicatorSource from "../bottom-nav/bottom-nav-indicator.tsx?raw";
import bottomNavIslandSource from "../bottom-nav/bottom-nav-island.tsx?raw";
import bottomNavMinimalSource from "../bottom-nav/bottom-nav-minimal.tsx?raw";
import bottomNavOrbitSource from "../bottom-nav/bottom-nav-orbit.tsx?raw";
import bottomNavPillSource from "../bottom-nav/bottom-nav-pill.tsx?raw";
import bottomNavTactileSource from "../bottom-nav/bottom-nav-tactile.tsx?raw";

export type VariantId =
  | "minimal"
  | "floating"
  | "pill"
  | "indicator"
  | "glass"
  | "island"
  | "brutalist"
  | "dock"
  | "cyber"
  | "orbit"
  | "action"
  | "aura"
  | "expand"
  | "fluid"
  | "tactile";

export type NavVariant = {
  id: VariantId;
  label: string;
  componentName: string;
  fileName: string;
  blurb: string;
  useFor: string;
  note: string;
};

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
  },
  {
    id: "island",
    label: "Dynamic Island",
    componentName: "BottomNavIsland",
    fileName: "bottom-nav-island",
    blurb: "A floating pill where only the active item expands to show text.",
    useFor: "Modern iOS-style apps, consumer tools",
    note: "Highly trendy, smooth active expansions."
  },
  {
    id: "brutalist",
    label: "Brutalist",
    componentName: "BottomNavBrutalist",
    fileName: "bottom-nav-brutalist",
    blurb: "Rigid edges, stark contrast, and heavy hard shadows.",
    useFor: "Developer tools, crypto, technical products",
    note: "Raw aesthetic utilizing IBM Plex Mono."
  },
  {
    id: "dock",
    label: "Mac Dock",
    componentName: "BottomNavDock",
    fileName: "bottom-nav-dock",
    blurb: "Closely-packed icons sitting on a clean glass shelf.",
    useFor: "Desktop-like experiences, productivity tools",
    note: "Icons magnify fluidly on hover."
  },
  {
    id: "cyber",
    label: "Neon Cyber",
    componentName: "BottomNavCyber",
    fileName: "bottom-nav-cyber",
    blurb: "Intense neon glowing accents on deep dark backgrounds.",
    useFor: "Gaming platforms, dark-mode-first tech tools",
    note: "Vibrant glowing lines and drop shadows."
  },
  {
    id: "orbit",
    label: "Orbit",
    componentName: "BottomNavOrbit",
    fileName: "bottom-nav-orbit",
    blurb: "A split rail with a detached primary action item.",
    useFor: "Profile-heavy apps, tools with a main quick action",
    note: "Visually separates the final item with a divider."
  },
  {
    id: "action",
    label: "Action Center",
    componentName: "BottomNavAction",
    fileName: "bottom-nav-action",
    blurb: "Prominent raised center button for primary creation actions.",
    useFor: "Social apps, camera apps, primary-action driven flows",
    note: "The middle item physically breaks the rail bounds."
  },
  {
    id: "aura",
    label: "Aura Glow",
    componentName: "BottomNavAura",
    fileName: "bottom-nav-aura",
    blurb: "A magical sliding gradient aura with text reveals.",
    useFor: "Premium consumer tools, AI products, wellness apps",
    note: "Highly animated background gradient and morphing text."
  },
  {
    id: "expand",
    label: "Expand",
    componentName: "BottomNavExpand",
    fileName: "bottom-nav-expand",
    blurb: "A floating menu button that pops out into a full navigation pill.",
    useFor: "Minimalist apps, map apps, space-saving layouts",
    note: "The active item becomes the toggle button when collapsed."
  },
  {
    id: "fluid",
    label: "Fluid Elastic",
    componentName: "BottomNavFluid",
    fileName: "bottom-nav-fluid",
    blurb: "A highly elastic, bouncy active indicator.",
    useFor: "Playful consumer apps, youth products",
    note: "Uses exaggerated cubic-bezier spring physics."
  },
  {
    id: "tactile",
    label: "Tactile Neumorphic",
    componentName: "BottomNavTactile",
    fileName: "bottom-nav-tactile",
    blurb: "A physical, iOS-inspired indented hardware button bar.",
    useFor: "High-end tools, music apps, premium control centers",
    note: "Relies on precise skeuomorphic inset shadows."
  }
];

export const navRenderers: Record<VariantId, (props: BottomNavProps) => ReactElement> = {
  minimal: BottomNavMinimal,
  floating: BottomNavFloating,
  pill: BottomNavPill,
  indicator: BottomNavIndicator,
  glass: BottomNavGlass,
  island: BottomNavIsland,
  brutalist: BottomNavBrutalist,
  dock: BottomNavDock,
  cyber: BottomNavCyber,
  orbit: BottomNavOrbit,
  action: BottomNavAction,
  aura: BottomNavAura,
  expand: BottomNavExpand,
  fluid: BottomNavFluid,
  tactile: BottomNavTactile
};

export const componentSourceByVariant: Record<VariantId, string> = {
  minimal: bottomNavMinimalSource,
  floating: bottomNavFloatingSource,
  pill: bottomNavPillSource,
  indicator: bottomNavIndicatorSource,
  glass: bottomNavGlassSource,
  island: bottomNavIslandSource,
  brutalist: bottomNavBrutalistSource,
  dock: bottomNavDockSource,
  cyber: bottomNavCyberSource,
  orbit: bottomNavOrbitSource,
  action: bottomNavActionSource,
  aura: bottomNavAuraSource,
  expand: bottomNavExpandSource,
  fluid: bottomNavFluidSource,
  tactile: bottomNavTactileSource
};

export const publicReactImports: Record<VariantId, string> = {
  minimal: "",
  floating: 'import { useLayoutEffect, useMemo, useRef, useState } from "react";',
  pill: 'import { useLayoutEffect, useRef, useState } from "react";',
  indicator: "",
  glass: "",
  island: "",
  brutalist: "",
  dock: "",
  cyber: "",
  orbit: 'import { useMemo } from "react";',
  action: "",
  aura: 'import { useLayoutEffect, useRef, useState } from "react";',
  expand: 'import { useEffect, useRef, useState } from "react";',
  fluid: 'import { useLayoutEffect, useRef, useState } from "react";',
  tactile: 'import { useLayoutEffect, useRef, useState } from "react";'
};

export function getItemsForVariant(variantId: VariantId) {
  if (variantId === "floating") return FLOATING_NAV_ITEMS;
  if (variantId === "pill") return PILL_NAV_ITEMS;
  return NAV_ITEMS;
}
