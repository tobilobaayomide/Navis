import React, { useEffect, useMemo } from "react";
import { Playground } from "../components/Playground";
import { usePlayground } from "../context/PlaygroundContext";
import {
  componentSourceByVariant,
  navRenderers
} from "../variants/registry";
import { buildPublicComponentSource } from "../codegen/build-public-component-source";
import type { CodeArtifact } from "../components/CodeArtifactViewer";

export function PlaygroundPage() {
  const {
    selectedVariant,
    activeVariant,
    copiedState,
    copyToClipboard,
    installCommand,
    isLight,
    toggleTheme,
    activeId,
    setActiveId,
    visibleItems
  } = usePlayground();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const SelectedBottomNav = navRenderers[selectedVariant];

  const previewNav = useMemo(
    () => (
      <SelectedBottomNav
        activeId={activeId}
        items={visibleItems}
        onItemClick={(item: { id: string }) => setActiveId(item.id)}
      />
    ),
    [SelectedBottomNav, activeId, visibleItems, setActiveId]
  );

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

  return (
    <Playground
      activeVariant={activeVariant}
      copiedState={copiedState}
      copyToClipboard={copyToClipboard}
      implementationArtifacts={implementationArtifacts}
      installCommand={installCommand}
      isLight={isLight}
      toggleTheme={toggleTheme}
      previewNav={previewNav}
    />
  );
}
export default PlaygroundPage;
