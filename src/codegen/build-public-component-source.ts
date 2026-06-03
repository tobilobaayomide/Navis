import { publicReactImports, type VariantId } from "../variants/registry";

const PUBLIC_BASE_HELPERS = `/**
 * Each item describes one tab in the bottom navigation.
 * Keep it simple: id, label, path, icon, and optional badge/disabled.
 */

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function insetBottomStyle(extraPadding = 12) {
  return {
    paddingBottom: \`calc(env(safe-area-inset-bottom, 0px) + \${extraPadding}px)\`
  };
}`;

function buildPublicHelpers() {
  return PUBLIC_BASE_HELPERS;
}

export function buildPublicComponentSource(variantId: VariantId, source: string) {
  const cleanedSource = source
    .replace(/^import .* from "react";\n/m, "")
    .replace(/^import { cn } from "\.\.\/lib\/cn";\n/m, "")
    .replace(/^import type { BottomNavProps } from "\.\.\/nav\/nav\.types";\n/m, "")
    .replace(/^import { insetBottomStyle } from "\.\/shared";\n/m, "")
    .replace(/^\/\*\*[\s\S]*?\*\/\n/m, "")
    .replace(/^type [\s\S]*?^};\n\n/gm, "")
    .replace(/function cn\(...classes: Array<string \| false \| null \| undefined>\)/g, "function cn(...classes)")
    .replace(/type \w+ = ComponentType<SVGProps<SVGSVGElement>>;\n\n/g, "")
    .replace(/export type [\s\S]*?^};\n\n/gm, "")
    .replace(/function (\w+)\(([^)]*?): [^)]+\)/g, "function $1($2)")
    .replace(/export function (\w+)\(\{([\s\S]*?)\}: BottomNavProps(?: & \{ style\?: CSSProperties \})?\)/g, "export function $1({$2})")
    .replace(/export function (\w+)\(/g, "export default function $1(")
    .replace(/useRef<Array<[^>]+>>\(/g, "useRef(")
    .replace(/useRef<[^>]+>\(/g, "useRef(")
    .replace(/useState<[^>]+>\(/g, "useState(")
    .replace(/\)\s+as\s+CSSProperties/g, ")")
    .replace(/\s+as\s+CSSProperties/g, "")
    .replace(/\s+as\s+any/g, "")
    .replace(/\s+as\s+Node/g, "")
    .replace(/: CSSProperties/g, "")
    .replace(/: BottomNavProps/g, "")
    .replace(/: ComponentType<SVGProps<SVGSVGElement>>/g, "")
    .replace(/: NavItem\[]/g, "")
    .replace(/: string/g, "")
    .replace(/: number/g, "")
    .replace(/: boolean/g, "")
    .trim();

  const importBlock = publicReactImports[variantId] ? `${publicReactImports[variantId]}\n` : "";
  const navImport = 'import { NAV_ITEMS } from "../../constants/navigation";\n';
  const simpleSource = cleanedSource
    .replace(
      /export default function (\w+)\(\{[\s\S]*?\}\) \{/,
      `export default function $1({ activePath, onItemClick, className, style }) {`
    )
    .replace(/const activeItem = items\.find\(\(item\) => item\.id === activeId\) \?\? items\[0\];/g, 'const activeItem = NAV_ITEMS.find((item) => item.path === activePath) ?? NAV_ITEMS[0];')
    .replace(/const resolvedActiveId = activeId \?\? items\[0\]\?\.id;/g, 'const resolvedActivePath = activePath ?? NAV_ITEMS[0]?.path;')
    .replace(/items\.findIndex\(\(item\) => item\.id === activeId\)/g, 'NAV_ITEMS.findIndex((item) => item.path === activePath)')
    .replace(/items\.findIndex\(\(item\) => item\.id === resolvedActiveId\)/g, 'NAV_ITEMS.findIndex((item) => item.path === resolvedActivePath)')
    .replace(/item\.id === activeId/g, "item.path === activePath")
    .replace(/item\.id === resolvedActiveId/g, "item.path === resolvedActivePath")
    .replace(/item\.path === activeId/g, "item.path === activePath")
    .replace(/activeItem\?\.id/g, "activeItem?.path")
    .replace(/items\.length/g, "NAV_ITEMS.length")
    .replace(/items\.map\(/g, "NAV_ITEMS.map(")
    .replace(/items\.forEach\(/g, "NAV_ITEMS.forEach(")
    .replace(/lastItem\.id === activeId/g, "lastItem.path === activePath")
    .replace(/onItemClick\?\.\(lastItem\)/g, "onItemClick?.(lastItem.path)")
    .replace(/items\.slice\(/g, "NAV_ITEMS.slice(")
    .replace(/items\[/g, "NAV_ITEMS[")
    .replace(/\[items\]/g, "[]")
    .replace(/\[resolvedActiveId,\s*items,\s*trackColumns\]/g, "[activePath, trackColumns]")
    .replace(/\[resolvedActiveId,\s*items\]/g, "[resolvedActivePath]")
    .replace(/\[activeId,\s*items,\s*trackColumns\]/g, "[activePath, trackColumns]")
    .replace(/\[activeId,\s*items\]/g, "[activePath]")
    .replace(/\[items\.length\]/g, "[]")
    .replace(/items=\{[^}]+\}\n/g, "")
    .replace(/activeId=\{[^}]+\}\n/g, "")
    .replace(/onItemClick=\{\(item\) => [^}]+\}/g, "")
    .replace(/\n\s*\.\.\.style,?\n/g, "\n")
    .replace(/className=\{cn\(\s*("[\s\S]*?"),\s*className\s*\)\}/g, 'className={cn($1)}')
    .replace(/style=\{\{\s*maxWidth: `\$\{maxWidth\}px`, width: "100%", \.\.\.style\s*\}\}/g, 'style={{ maxWidth: `${maxWidth}px`, width: "100%" }}')
    .replace(/style=\{\{\s*\.\.\.insetBottomStyle\((\d+)\),\s*\.\.\.style\s*\}\}/g, 'style={insetBottomStyle($1)}')
    .replace(/onClick=\{\(\) => onItemClick\?\.\(item\)\}/g, "onClick={() => onItemClick?.(item.path)}")
    .replace(/onItemClick\?\.\(item\)/g, "onItemClick?.(item.path)")
    .replace(/key=\{item\.id\}/g, "key={item.path}")
    .replace(/const maxWidth = useMemo\(\(\) => \{\s*return NAV_ITEMS\.length === 3 \? 320 : NAV_ITEMS\.length === 4 \? 385 : 440;\s*\}, \[NAV_ITEMS\.length\]\);/g, 'const maxWidth = useMemo(() => {\n    return NAV_ITEMS.length === 3 ? 320 : NAV_ITEMS.length === 4 ? 385 : 440;\n  }, []);')
    .replace(/const maxWidth = NAV_ITEMS\.length === 3 \? 320 : NAV_ITEMS\.length === 4 \? 385 : 440;/g, 'const maxWidth = NAV_ITEMS.length === 3 ? 320 : NAV_ITEMS.length === 4 ? 385 : 440;');

  let wrappedSource = simpleSource;
  if (variantId === "minimal") {
    wrappedSource = wrappedSource.replace(/className=\{cn\("/, 'className={cn("md:hidden ');
  } else if (variantId === "glass") {
    wrappedSource = wrappedSource.replace(/className=\{cn\("glass-nav-container /, 'className={cn("md:hidden glass-nav-container ');
  } else if (variantId === "cyber") {
    wrappedSource = wrappedSource.replace(/className=\{cn\("cyber-nav-shell relative /, 'className={cn("md:hidden fixed inset-x-0 bottom-0 z-30 cyber-nav-shell ');
  } else {
    wrappedSource = wrapFloatingShell(variantId, wrappedSource);
  }

  return `${importBlock}${navImport}\n${buildPublicHelpers()}\n\n${wrappedSource}`.trim();
}

function wrapFloatingShell(variantId: VariantId, source: string) {
  const baseClass = `${variantId}-nav-shell`;
  const wrapperClass =
    variantId === "expand"
      ? "md:hidden fixed inset-x-0 bottom-4 z-30 w-full flex pointer-events-none"
      : "md:hidden fixed inset-x-0 bottom-4 z-30 px-4 w-full flex justify-center pointer-events-none";

  return source
    .replace(new RegExp(`className=\\{cn\\("${baseClass} `), `className={cn("${baseClass} pointer-events-auto `)
    .replace(/return \(\n\s*<nav/, `return (\n    <div className="${wrapperClass}">\n      <nav`)
    .replace(/\n\s*<\/nav>\n\s*\);\n\}/, "\n      </nav>\n    </div>\n  );\n}");
}
