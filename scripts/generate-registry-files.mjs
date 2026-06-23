import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VARIANTS = [
  ["BottomNavIndicator.tsx", "BottomNavIndicator.jsx"],
  ["BottomNavFloating.tsx", "BottomNavFloating.jsx"],
  ["BottomNavPill.tsx", "BottomNavPill.jsx"],
  ["BottomNavGlass.tsx", "BottomNavGlass.jsx"],
  ["BottomNavCyber.tsx", "BottomNavCyber.jsx"],
  ["BottomNavOrbit.tsx", "BottomNavOrbit.jsx"],
  ["BottomNavAction.tsx", "BottomNavAction.jsx"],
  ["BottomNavDock.tsx", "BottomNavDock.jsx"],
  ["BottomNavAura.tsx", "BottomNavAura.jsx"],
  ["BottomNavExpand.tsx", "BottomNavExpand.jsx"],
  ["BottomNavFluid.tsx", "BottomNavFluid.jsx"],
  ["BottomNavTactile.tsx", "BottomNavTactile.jsx"],
  ["BottomNavLiquid.tsx", "BottomNavLiquid.jsx"],
  ["BottomNavIsland.tsx", "BottomNavIsland.jsx"],
  ["BottomNavMinimal.tsx", "BottomNavMinimal.jsx"]
];

function publicize(source) {
  const reactImports = new Set();
  const allowedReactImports = new Set(["useEffect", "useLayoutEffect", "useMemo", "useRef", "useState"]);
  let needsCn = false;
  let needsInset = false;

  for (const line of source.split("\n")) {
    if (!line.startsWith("import ")) continue;
    if (line.includes('from "react"')) {
      const spec = line.match(/\{([^}]*)\}/)?.[1] ?? "";
      for (const part of spec.split(",")) {
        const cleaned = part.trim().replace(/^type\s+/, "");
        if (cleaned && allowedReactImports.has(cleaned)) reactImports.add(cleaned);
      }
    }
    if (line.includes('from "../lib/cn"')) needsCn = true;
    if (line.includes('from "./shared"')) needsInset = true;
  }

  let body = source
    .replace(/^import .*\n/gm, "")
    .replace(/^"use client";\n\n?/, "")
    .replace(/^\s*\/\*\*[\s\S]*?\*\/\n/m, "")
    .replace(/^type [\s\S]*?^};\n\n/gm, "")
    .replace(/export function (\w+)\(/, "export default function $1(")
    .replace(/: BottomNavProps(?: & \{ style\?: CSSProperties \})?/g, "")
    .replace(/: [A-Za-z0-9_]+Props/g, "")
    .replace(/: CSSProperties/g, "")
    .replace(/: React\.SVGProps<SVGSVGElement>/g, "")
    .replace(/: HTMLButtonElement \| null/g, "")
    .replace(/: HTMLLIElement \| null/g, "")
    .replace(/: CapsuleMetrics/g, "")
    .replace(/: \{ left: number; width: number \}/g, "")
    .replace(/\s+as\s+[A-Za-z0-9_]+(?:\s*\|\s*null)?/g, "")
    .replace(/: MouseEvent/g, "")
    .replace(/useRef<[^>]+>>\(/g, "useRef(")
    .replace(/useRef<[^>]+>\(/g, "useRef(")
    .replace(/useState<[^>]+>\(/g, "useState(")
    .replace(/useMemo<[^>]+>\(/g, "useMemo(")
    .replace(/resolvedActiveId/g, "resolvedActivePath")
    .replace(/activeId/g, "activePath")
    .replace(/items\[0\]\?\.id/g, "items[0]?.path")
    .replace(/item\.id === activePath/g, "item.path === activePath")
    .replace(/item\.id === resolvedActivePath/g, "item.path === resolvedActivePath")
    .replace(/items\.findIndex\(\(item\) => item\.path === activePath\)/g, "items.findIndex((item) => item.path === activePath)")
    .replace(/items\.findIndex\(\(item\) => item\.id === activePath\)/g, "items.findIndex((item) => item.path === activePath)")
    .replace(/items\.findIndex\(\(item\) => item\.id === resolvedActivePath\)/g, "items.findIndex((item) => item.path === resolvedActivePath)")
    .replace(/items\.map\(\(item\) => \(item\.id === activePath \?/g, "items.map((item) => (item.path === activePath ?")
    .replace(/items\.map\(\(item\) => \(item\.id === resolvedActivePath \?/g, "items.map((item) => (item.path === resolvedActivePath ?")
    .replace(/key=\{item\.id\}/g, "key={item.path}")
    .replace(/onItemClick\?\.\(item\)/g, "onItemClick?.(item.path)")
    .replace(/onItemClick\?\.\(lastItem\)/g, "onItemClick?.(lastItem.path)")
    .replace(/onClick=\{\(\) => onItemClick\?\.\(item\)\}/g, "onClick={() => onItemClick?.(item.path)}")
    .replace(/onClick=\{\(\) => \{\n\s*onItemClick\?\.\(item\);/g, "onClick={() => {\n                  onItemClick?.(item.path);")
    .replace(/item\.id === activePath\)/g, "item.path === activePath)")
    .replace(/item\.id === resolvedActivePath\)/g, "item.path === resolvedActivePath)")
    .replace(/item\.id === activePath/g, "item.path === activePath")
    .replace(/item\.id === resolvedActivePath/g, "item.path === resolvedActivePath")
    .replace(/lastItem\.id/g, "lastItem.path")
    .trim();

  const imports = [];
  if (reactImports.size) imports.push(`import { ${Array.from(reactImports).join(", ")} } from "react";`);
  const helpers = [];
  if (needsCn) {
    helpers.push("function cn(...classes) {", '  return classes.filter(Boolean).join(" ");', "}");
  }
  if (needsInset) {
    helpers.push(
      "function insetBottomStyle(extraPadding = 12) {",
      "  return {",
      "    paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + ${extraPadding}px)`",
      "  };",
      "}"
    );
  }

  return [
    '"use client";',
    "",
    ...imports,
    ...(imports.length && helpers.length ? [""] : []),
    ...helpers,
    ...(helpers.length ? [""] : []),
    body
  ].join("\n");
}

for (const [srcName, outName] of VARIANTS) {
  const sourcePath = path.join(ROOT, "src/bottom-nav", srcName);
  const outPath = path.join(ROOT, "packages/registry/components", outName);
  const source = fs.readFileSync(sourcePath, "utf8");
  const out = publicize(source);
  fs.writeFileSync(outPath, `${out}\n`);
}

console.log(`Wrote ${VARIANTS.length} registry files.`);
