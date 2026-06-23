import { FLOATING_NAV_ITEMS, NAV_ITEMS, PILL_NAV_ITEMS } from "../data/NavItems";

export type VariantId =
  | "minimal"
  | "floating"
  | "pill"
  | "indicator"
  | "glass"
  | "island"
  | "liquid"
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
    fileName: "BottomNavMinimal",
    blurb: "Flat and quiet. The perfect clean slate baseline.",
    useFor: "Admin panels, data dashboards, lightweight tools",
    note: "Understated active states that keep content first."
  },
  {
    id: "floating",
    label: "Floating",
    componentName: "BottomNavFloating",
    fileName: "BottomNavFloating",
    blurb: "A detached glass rail with a kinetic active capsule.",
    useFor: "Inbox-first interfaces, consumer apps, feed layouts",
    note: "Active capsules expand dynamically to fit the path label."
  },
  {
    id: "pill",
    label: "Pill",
    componentName: "BottomNavPill",
    fileName: "BottomNavPill",
    blurb: "Concentric segments with rich ambient backing glows.",
    useFor: "Education portals, community spaces, profile-first apps",
    note: "Warmer, tactile active states that slide elegantly on active switches."
  },
  {
    id: "indicator",
    label: "Indicator",
    componentName: "BottomNavIndicator",
    fileName: "BottomNavIndicator",
    blurb: "High contrast with a dedicated floating active indicator line.",
    useFor: "Operations monitoring, active utilities, developer tools",
    note: "Highly recognizable active state indicator with direct accent customizability."
  },
  {
    id: "glass",
    label: "Glass",
    componentName: "BottomNavGlass",
    fileName: "BottomNavGlass",
    blurb: "Premium double-bezel concentric layout with raised primary center button.",
    useFor: "Brand-led products, media applications, discovery-heavy tools",
    note: "A 72px raised circle acts as the primary layout signature."
  },
  {
    id: "island",
    label: "Dynamic Island",
    componentName: "BottomNavIsland",
    fileName: "BottomNavIsland",
    blurb: "A floating pill where only the active item expands to show text.",
    useFor: "Modern iOS-style apps, consumer tools",
    note: "Highly trendy, smooth active expansions."
  },
  {
    id: "liquid",
    label: "Telegram Liquid Glass",
    componentName: "BottomNavLiquid",
    fileName: "BottomNavLiquid",
    blurb: "A floating pill with extreme liquid glass blur, based on Telegram's Android UI.",
    useFor: "Messaging apps, native app ports, modern consumer apps",
    note: "Features rounded floating cards and softer icon spacing."
  },
  {
    id: "dock",
    label: "Mac Dock",
    componentName: "BottomNavDock",
    fileName: "BottomNavDock",
    blurb: "Closely-packed icons sitting on a clean glass shelf.",
    useFor: "Desktop-like experiences, productivity tools",
    note: "Icons magnify fluidly on hover."
  },
  {
    id: "cyber",
    label: "Neon Cyber",
    componentName: "BottomNavCyber",
    fileName: "BottomNavCyber",
    blurb: "Intense neon glowing accents on deep dark backgrounds.",
    useFor: "Gaming platforms, dark-mode-first tech tools",
    note: "Vibrant glowing lines and drop shadows."
  },
  {
    id: "orbit",
    label: "Orbit",
    componentName: "BottomNavOrbit",
    fileName: "BottomNavOrbit",
    blurb: "A split rail with a detached primary action item.",
    useFor: "Profile-heavy apps, tools with a main quick action",
    note: "Visually separates the final item with a divider."
  },
  {
    id: "action",
    label: "Action Center",
    componentName: "BottomNavAction",
    fileName: "BottomNavAction",
    blurb: "Prominent raised center button for primary creation actions.",
    useFor: "Social apps, camera apps, primary-action driven flows",
    note: "The middle item physically breaks the rail bounds."
  },
  {
    id: "aura",
    label: "Aura Glow",
    componentName: "BottomNavAura",
    fileName: "BottomNavAura",
    blurb: "A magical sliding gradient aura with text reveals.",
    useFor: "Premium consumer tools, AI products, wellness apps",
    note: "Highly animated background gradient and morphing text."
  },
  {
    id: "expand",
    label: "Expand",
    componentName: "BottomNavExpand",
    fileName: "BottomNavExpand",
    blurb: "A floating menu button that pops out into a full navigation pill.",
    useFor: "Minimalist apps, map apps, space-saving layouts",
    note: "The active item becomes the toggle button when collapsed."
  },
  {
    id: "fluid",
    label: "Fluid Elastic",
    componentName: "BottomNavFluid",
    fileName: "BottomNavFluid",
    blurb: "A highly elastic, bouncy active indicator.",
    useFor: "Playful consumer apps, youth products",
    note: "Uses exaggerated cubic-bezier spring physics."
  },
  {
    id: "tactile",
    label: "Tactile Neumorphic",
    componentName: "BottomNavTactile",
    fileName: "BottomNavTactile",
    blurb: "A physical, iOS-inspired indented hardware button bar.",
    useFor: "High-end tools, music apps, premium control centers",
    note: "Relies on precise skeuomorphic inset shadows."
  }
];

export function getItemsForVariant(variantId: VariantId) {
  if (variantId === "floating") return FLOATING_NAV_ITEMS;
  if (variantId === "pill") return PILL_NAV_ITEMS;
  return NAV_ITEMS;
}
