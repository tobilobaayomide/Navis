import { useEffect } from "react";
import { usePlayground } from "../context/PlaygroundContext";
import { LandingHero } from "../components/LandingHero";
import { BentoGallery } from "../components/BentoGallery";
import { LandingFeatures } from "../components/LandingFeatures";
import { LandingFooter } from "../components/LandingFooter";

export function HomePage() {
  const { isLight, goToComponents, goToDocs, installCommand, copyToClipboard, copiedState } =
    usePlayground();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="space-y-0 mx-auto w-full max-w-max ">
      <LandingHero
        isLight={isLight}
        onComponentsClick={goToComponents}
        onDocsClick={goToDocs}
        installCommand={installCommand}
        copyToClipboard={copyToClipboard}
        copiedState={copiedState}
      />
      <BentoGallery isLight={isLight} />
      <LandingFeatures isLight={isLight} />
      <LandingFooter isLight={isLight} />
    </div>
  );
}
