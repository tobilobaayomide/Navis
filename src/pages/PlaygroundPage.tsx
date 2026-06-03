import { useEffect } from "react";
import { Playground } from "../components/playground";
import { usePlayground } from "../context/PlaygroundContext";

export function PlaygroundPage() {
  const {
    activeVariant,
    copiedState,
    copyToClipboard,
    implementationArtifacts,
    installCommand,
    isLight,
    previewNav,
    toggleTheme
  } = usePlayground();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

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
