import { useEffect } from "react";
import { usePlayground } from "../context/PlaygroundContext";
import { LandingHero } from "../components/landing-hero";
import { BentoFeatures } from "../components/bento-features";

export function HomePage() {
  const { isLight, goToPlayground, goToDocs, installCommand, copyToClipboard, copiedState } =
    usePlayground();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="space-y-6">
      <LandingHero
        isLight={isLight}
        onPlaygroundClick={goToPlayground}
        onDocsClick={goToDocs}
        installCommand={installCommand}
        copyToClipboard={copyToClipboard}
        copiedState={copiedState}
      />
      <BentoFeatures isLight={isLight} />
    </div>
  );
}
