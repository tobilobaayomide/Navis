import { tokenizeSnippet } from "../components/syntax-snippet";

export const quickStart = `import { useLocation, useNavigate } from "react-router-dom";
import BottomNavMinimal from "@/components/ui/bottom-nav-minimal";

export default function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen pb-20">
      {children}

      <BottomNavMinimal
        activePath={location.pathname}
        onItemClick={(path) => navigate(path)}
      />

      <div className="md:hidden h-24" aria-hidden="true" />
    </div>
  );
}
`;

export const installLayout = `// src/constants/navigation.js
import { HomeIcon, DiscoverIcon, BellIcon, ProfileIcon } from "@/components/icons/dashboard-icons";

export const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/home", icon: HomeIcon },
  { id: "discover", label: "Discover", path: "/discover", icon: DiscoverIcon },
  { id: "alerts", label: "Alerts", path: "/alerts", icon: BellIcon, badge: 3 },
  { id: "profile", label: "Profile", path: "/profile", icon: ProfileIcon },
];
`;

export const routing = `const activePath =
  NAV_ITEMS.find((item) => {
    if (item.path === "/") return location.pathname === "/";
    return location.pathname === item.path || location.pathname.startsWith(\"\${item.path}/\");
  })?.path ?? NAV_ITEMS[0].path;

// Example usage (JSX shown as string)
// <BottomNavMinimal activePath={activePath} onItemClick={(path) => navigate(path)} />
`;

export const usage = `import { NAV_ITEMS } from "@/constants/navigation";

export function Sidebar() {
  return (
    <aside className="hidden md:block">
      {NAV_ITEMS.map((item) => (
        <a key={item.id} href={item.path}>
          {item.label}
        </a>
      ))}
    </aside>
  );
}
`;

export const badge = `export const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/home", icon: HomeIcon },
  { id: "updates", label: "Updates", path: "/updates", icon: BellIcon, badge: 3 },
  { id: "billing", label: "Billing", path: "/billing", icon: WalletIcon, disabled: true },
];
`;

export const accent = `// Indicator and Cyber expose a small accent hook.
// Most other variants are edited directly in the copied source.

"--indicator-nav-accent-rgb": "14, 165, 233"
"--indicator-nav-bg": "rgba(12, 74, 110, 0.12)"
"--cyber-accent": "0, 255, 255"
`;

export const sidebar = `import { NAV_ITEMS } from "@/constants/navigation";

export default function Sidebar({ pathname }) {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.path || pathname.startsWith(item.path + "/");

        return (
          <button
            key={item.id}
            className={isActive ? "text-slate-950" : "text-slate-500"}
            type="button"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}
`;

export const nextRouter = `import { usePathname, useRouter } from "next/navigation";
import BottomNavPill from "@/components/ui/bottom-nav-pill";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="relative min-h-screen pb-20">
      {children}

      <BottomNavPill
        activePath={pathname}
        onItemClick={(path) => router.push(path)}
      />

      <div className="md:hidden h-24" aria-hidden="true" />
    </div>
  );
}
`;

export const localState = `import { useState } from "react";
import BottomNavIndicator from "@/components/ui/bottom-nav-indicator";

export default function DemoShell() {
  const [activePath, setActivePath] = useState("/home");

  return (
    <BottomNavIndicator
      activePath={activePath}
      onItemClick={(path) => setActivePath(path)}
    />
  );
}
`;

export const height = `// bottom-nav-minimal.jsx

"min-h-[64px]" -> "min-h-[72px]"
"h-10 w-10"    -> "h-11 w-11"
"text-[11px]"  -> "text-[12px]"

// If the bar becomes taller, also increase the spacer in your layout:
// <div className="md:hidden h-28" aria-hidden="true" />
`;

export const icon = `// navigation.js
import { HomeIcon, WalletIcon, BellIcon } from "@/components/icons/dashboard-icons";

export const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/home", icon: HomeIcon },
  { id: "wallet", label: "Wallet", path: "/wallet", icon: WalletIcon },
  { id: "alerts", label: "Alerts", path: "/alerts", icon: BellIcon, badge: 2 },
];
`;

export const background = `// bottom-nav-floating.jsx

"bg-[rgba(255,255,255,0.22)]"
-> "bg-[rgba(15,23,42,0.22)]"

"border-white/35"
-> "border-white/12"

"text-slate-400 hover:text-slate-700"
-> "text-slate-300 hover:text-white"
`;

export const styling = `// Typical edits happen directly in the copied component source.
// Change the rail height, icon size, label size, and shell tone together.

// Example: bottom-nav-minimal.jsx
"min-h-[64px]" -> "min-h-[72px]"
"h-10 w-10"    -> "h-11 w-11"
"text-[11px]"  -> "text-[12px]"

// For accent-heavy variants, keep the runtime hooks in place:
"--indicator-nav-accent-rgb": "79, 70, 229"
"--cyber-accent": "79, 70, 229"
`;

export function tokenize(source: string) {
  return tokenizeSnippet(source);
}

export default {
  quickStart,
  installLayout,
  routing,
  tokenize
};
