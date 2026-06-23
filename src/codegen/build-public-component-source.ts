import type { VariantId } from "../variants/metadata";

export function buildPublicComponentSource(variantId: VariantId, source: string) {
  void variantId;
  return source.trim();
}
