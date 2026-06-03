import { useRef, useState } from "react";

export function useClipboardState(timeoutMs = 2000) {
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [copiedNonce, setCopiedNonce] = useState(0);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(id);
    setCopiedNonce((value) => value + 1);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopiedState(null), timeoutMs);
  };

  return {
    copiedState,
    copiedNonce,
    copyToClipboard
  };
}
