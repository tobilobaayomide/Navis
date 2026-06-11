import {
  createContext,
  type ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { useNavigate } from "react-router-dom";
import { buildPublicComponentSource } from "../codegen/build-public-component-source";
import type { CodeArtifact } from "../components/code-artifact-viewer";
import { useClipboardState } from "../hooks/useClipboardState";
import { useSiteTheme } from "../hooks/useSiteTheme";
import type { BottomNavProps } from "../nav/nav.types";
import {
  componentSourceByVariant,
  getItemsForVariant,
  navRenderers,
  VARIANTS,
  type NavVariant,
  type VariantId
} from "../variants/registry";

export type { NavVariant, VariantId } from "../variants/registry";

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
  previewNav: ReactElement;
  installCommand: string;
  implementationArtifacts: CodeArtifact[];
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

  const [selectedVariant, setSelectedVariant] = useState<VariantId>("minimal");
  const activeVariant = VARIANTS.find((v) => v.id === selectedVariant) ?? VARIANTS[0];
  const SelectedBottomNav = navRenderers[selectedVariant];

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

  const previewNav = useMemo(
    () => (
      <SelectedBottomNav
        activeId={activeId}
        items={visibleItems}
        onItemClick={(item: { id: string }) => setActiveId(item.id)}
      />
    ),
    [SelectedBottomNav, activeId, visibleItems]
  );

  const installCommand = `npx navisinit add ${activeVariant.fileName}`;

  const publicComponentSource = useMemo(
    () => buildPublicComponentSource(selectedVariant, componentSourceByVariant[selectedVariant]),
    [selectedVariant]
  );

  const implementationArtifacts = useMemo<CodeArtifact[]>(
    () => [
      {
        id: "component",
        label: "Component",
        fileName: `${activeVariant.fileName}.jsx`,
        code: publicComponentSource,
        description: "The CLI installs only this component source. Navigation data and parent-layout usage stay as docs examples for your app to wire."
      }
    ],
    [activeVariant.fileName, publicComponentSource]
  );

  const goToPlayground = () => navigate("/playground");
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
    previewNav,
    installCommand,
    implementationArtifacts,
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
