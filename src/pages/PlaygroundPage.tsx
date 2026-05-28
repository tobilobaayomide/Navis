import { useEffect } from "react";
import { Playground } from "../components/playground";
import { usePlayground } from "../context/PlaygroundContext";

export function PlaygroundPage() {
  const {
    activeVariant,
    badgesEnabled,
    copiedState,
    copyToClipboard,
    customAccent,
    implementationArtifacts,
    implementationBundleString,
    installCommand,
    isLight,
    itemsCount,
    previewNav,
    selectedVariant,
    setBadgesEnabled,
    setCustomAccent,
    setItemsCount,
    setSelectedVariant
  } = usePlayground();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <Playground
      activeVariant={activeVariant}
      badgesEnabled={badgesEnabled}
      copiedState={copiedState}
      copyToClipboard={copyToClipboard}
      customAccent={customAccent}
      implementationArtifacts={implementationArtifacts}
      implementationBundleString={implementationBundleString}
      installCommand={installCommand}
      isLight={isLight}
      itemsCount={itemsCount}
      onAccentChange={setCustomAccent}
      onBadgesEnabledChange={setBadgesEnabled}
      onItemsCountChange={setItemsCount}
      onVariantChange={setSelectedVariant}
      previewNav={previewNav}
      selectedVariant={selectedVariant}
    />
  );
}
