import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { useNavigate } from "react-router-dom";
import { useClipboardState } from "../hooks/useClipboardState";
import { useSiteTheme } from "../hooks/useSiteTheme";
import type { BottomNavProps } from "../nav/nav.types";
import {
  getItemsForVariant,
  VARIANTS,
  type NavVariant,
  type VariantId
} from "../variants/metadata";

export type { NavVariant, VariantId } from "../variants/metadata";

export type SiteTheme = "dark" | "light";

type PlaygroundContextValue = {
  isLight: boolean;
  theme: SiteTheme;
  toggleTheme: () => void;
  selectedVariant: VariantId;
  activeVariant: NavVariant;
  setSelectedVariant: (v: VariantId) => void;
  activeId: string;
  setActiveId: (id: string) => void;
  visibleItems: BottomNavProps["items"];
  installCommand: string;
  copiedState: string | null;
  copiedNonce: number;
  copyToClipboard: (text: string, id: string) => void;
  goToComponents: () => void;
  goToPlayground: () => void;
  goToDocs: () => void;
};

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export function usePlayground() {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error("usePlayground must be used within <PlaygroundProvider>");
  return ctx;
}

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { isLight, theme, toggleTheme } = useSiteTheme();
  const { copiedState, copiedNonce, copyToClipboard } = useClipboardState();

  const [selectedVariant, setSelectedVariant] = useState<VariantId>("liquid");
  const activeVariant = VARIANTS.find((v) => v.id === selectedVariant) ?? VARIANTS[0];

  const [activeId, setActiveId] = useState("home");

  const defaultItems = useMemo(
    () => getItemsForVariant(selectedVariant),
    [selectedVariant]
  );

  const visibleItems = useMemo(() => {
    return defaultItems.map((item) => {
      const { badge, ...rest } = item;
      return rest;
    });
  }, [defaultItems]);

  useEffect(() => {
    if (!visibleItems.some((item) => item.id === activeId)) {
      setActiveId(visibleItems[0]?.id ?? "home");
    }
  }, [activeId, visibleItems]);

  const installCommand = `npx navisinit add ${activeVariant.fileName}`;

  const goToPlayground = () => navigate("/Playground");
  const goToComponents = () => navigate("/components");
  const goToDocs = () => navigate("/docs/introduction");

  const value: PlaygroundContextValue = {
    isLight,
    theme,
    toggleTheme,
    selectedVariant,
    activeVariant,
    setSelectedVariant,
    activeId,
    setActiveId,
    visibleItems,
    installCommand,
    copiedState,
    copiedNonce,
    copyToClipboard,
    goToComponents,
    goToPlayground,
    goToDocs
  };

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}
