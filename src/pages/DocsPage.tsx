import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Docs from "../components/docs";
import { usePlayground } from "../context/PlaygroundContext";

export function DocsPage() {
  const location = useLocation();
  const { copyToClipboard, installCommand, isLight } = usePlayground();

  useEffect(() => {
    if (location.hash) {
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [location.hash, location.pathname]);

  return (
    <Docs
      copyToClipboard={copyToClipboard}
      installCommand={installCommand}
      isLight={isLight}
    />
  );
}
