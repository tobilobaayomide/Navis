import type { VariantId } from "../variants/registry";

export function buildPublicComponentSource(variantId: VariantId, source: string) {
  void variantId;
  return source.trim();
}
