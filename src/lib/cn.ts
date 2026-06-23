import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cache = new Map<string, string>();

export function cn(...inputs: ClassValue[]) {
  const resolved = clsx(inputs);
  if (!resolved) return "";

  let cached = cache.get(resolved);
  if (cached !== undefined) {
    return cached;
  }

  const merged = twMerge(resolved);
  // Cap the cache to prevent potential memory leaks in long-running sessions
  if (cache.size > 2000) {
    cache.clear();
  }
  cache.set(resolved, merged);
  return merged;
}
