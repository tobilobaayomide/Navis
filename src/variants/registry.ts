import type { ReactElement } from "react";
import { BottomNavAction } from "../bottom-nav/BottomNavAction";
import { BottomNavAura } from "../bottom-nav/BottomNavAura";
import { BottomNavLiquid } from "../bottom-nav/BottomNavLiquid";
import { BottomNavCyber } from "../bottom-nav/BottomNavCyber";
import { BottomNavDock } from "../bottom-nav/BottomNavDock";
import { BottomNavExpand } from "../bottom-nav/BottomNavExpand";
import { BottomNavFloating } from "../bottom-nav/BottomNavFloating";
import { BottomNavFluid } from "../bottom-nav/BottomNavFluid";
import { BottomNavGlass } from "../bottom-nav/BottomNavGlass";
import { BottomNavIndicator } from "../bottom-nav/BottomNavIndicator";
import { BottomNavIsland } from "../bottom-nav/BottomNavIsland";
import { BottomNavMinimal } from "../bottom-nav/BottomNavMinimal";
import { BottomNavOrbit } from "../bottom-nav/BottomNavOrbit";
import { BottomNavPill } from "../bottom-nav/BottomNavPill";
import { BottomNavTactile } from "../bottom-nav/BottomNavTactile";
import bottomNavFloatingSource from "../../packages/registry/components/BottomNavFloating.jsx?raw";
import bottomNavMinimalSource from "../../packages/registry/components/BottomNavMinimal.jsx?raw";
import bottomNavPillSource from "../../packages/registry/components/BottomNavPill.jsx?raw";
import bottomNavIndicatorSource from "../../packages/registry/components/BottomNavIndicator.jsx?raw";
import bottomNavGlassSource from "../../packages/registry/components/BottomNavGlass.jsx?raw";
import bottomNavIslandSource from "../../packages/registry/components/BottomNavIsland.jsx?raw";
import bottomNavLiquidSource from "../../packages/registry/components/BottomNavLiquid.jsx?raw";
import bottomNavDockSource from "../../packages/registry/components/BottomNavDock.jsx?raw";
import bottomNavCyberSource from "../../packages/registry/components/BottomNavCyber.jsx?raw";
import bottomNavOrbitSource from "../../packages/registry/components/BottomNavOrbit.jsx?raw";
import bottomNavActionSource from "../../packages/registry/components/BottomNavAction.jsx?raw";
import bottomNavAuraSource from "../../packages/registry/components/BottomNavAura.jsx?raw";
import bottomNavExpandSource from "../../packages/registry/components/BottomNavExpand.jsx?raw";
import bottomNavFluidSource from "../../packages/registry/components/BottomNavFluid.jsx?raw";
import bottomNavTactileSource from "../../packages/registry/components/BottomNavTactile.jsx?raw";

import { type VariantId } from "./metadata";

export * from "./metadata";

export const navRenderers: Record<VariantId, (props: any) => ReactElement> = {
  minimal: BottomNavMinimal,
  floating: BottomNavFloating,
  pill: BottomNavPill,
  indicator: BottomNavIndicator,
  glass: BottomNavGlass,
  island: BottomNavIsland,
  liquid: BottomNavLiquid,
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
  liquid: bottomNavLiquidSource,
  dock: bottomNavDockSource,
  cyber: bottomNavCyberSource,
  orbit: bottomNavOrbitSource,
  action: bottomNavActionSource,
  aura: bottomNavAuraSource,
  expand: bottomNavExpandSource,
  fluid: bottomNavFluidSource,
  tactile: bottomNavTactileSource
};
