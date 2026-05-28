import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import { cn } from "../lib/cn";
import { navContractSnippet } from "../data/snippets";
import {
  BellIcon,
  CardsIcon,
  CourseNavIcon,
  DashboardIcon,
  DiscoverIcon,
  HomeIcon,
  LibraryIcon,
  PreferencesIcon
} from "../icons/dashboard-icons";
import { SyntaxSnippet, tokenizeSnippet } from "./syntax-snippet";

type DocsProps = {
  isLight: boolean;
  installCommand: string;
  copyToClipboard: (text: string) => void;
};

type TocItem = {
  id: string;
  label: string;
};

type DocPage = {
  slug: string;
  label: string;
  title: string;
  description: string;
  groupTitle: string;
  icon: ComponentType<{ className?: string }>;
  sections: TocItem[];
};

type DocGroup = {
  title: string;
  items: DocPage[];
};

function toSnippet(source: string) {
  return tokenizeSnippet(source);
}

const quickStartSnippet = toSnippet(`
import { useLocation, useNavigate } from "react-router-dom";
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
`);

const installLayoutSnippet = toSnippet(`
// src/constants/navigation.js
import { HomeIcon, DiscoverIcon, BellIcon, ProfileIcon } from "@/components/icons/dashboard-icons";

export const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/home", icon: HomeIcon },
  { id: "discover", label: "Discover", path: "/discover", icon: DiscoverIcon },
  { id: "alerts", label: "Alerts", path: "/alerts", icon: BellIcon, badge: 3 },
  { id: "profile", label: "Profile", path: "/profile", icon: ProfileIcon },
];
`);

const routingSnippet = toSnippet(`
const activePath =
  NAV_ITEMS.find((item) => {
    if (item.path === "/") return location.pathname === "/";
    return location.pathname === item.path || location.pathname.startsWith(\`\${item.path}/\`);
  })?.path ?? NAV_ITEMS[0].path;

<BottomNavMinimal
  activePath={activePath}
  onItemClick={(path) => navigate(path)}
/>
`);

const stylingSnippet = toSnippet(`
// Edit the copied component source directly.
// Example: make the bar taller in bottom-nav-minimal.jsx

"min-h-[64px]"  ->  "min-h-[72px]"
"h-10 w-10"     ->  "h-11 w-11"
"text-[11px]"   ->  "text-[12px]"

// Example: change the shell background

"bg-[rgba(255,255,255,0.48)]"
-> "bg-[rgba(15,23,42,0.88)]"
`);

const usageSnippet = toSnippet(`
import { NAV_ITEMS } from "@/constants/navigation";

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
`);

const badgeSnippet = toSnippet(`
export const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/home", icon: HomeIcon },
  { id: "updates", label: "Updates", path: "/updates", icon: BellIcon, badge: 3 },
  { id: "billing", label: "Billing", path: "/billing", icon: WalletIcon, disabled: true },
];
`);

const accentSnippet = toSnippet(`
// Indicator and Glass expose a few CSS variables inside the copied source.
// You can change them directly in the component.

"--indicator-nav-accent-rgb": "14, 165, 233"
"--indicator-nav-bg": "rgba(12, 74, 110, 0.12)"
"--glass-nav-center-bg-start": "#0f172a"
"--glass-nav-center-bg-end": "#1e293b"
`);

const sidebarSnippet = toSnippet(`
import { NAV_ITEMS } from "@/constants/navigation";

export default function Sidebar({ pathname }) {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.path || pathname.startsWith(\`\${item.path}/\`);

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
`);

const nextRouterSnippet = toSnippet(`
import { usePathname, useRouter } from "next/navigation";
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
`);

const localStateSnippet = toSnippet(`
import { useState } from "react";
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
`);

const heightSnippet = toSnippet(`
// bottom-nav-minimal.jsx

"min-h-[64px]" -> "min-h-[72px]"
"h-10 w-10"    -> "h-11 w-11"
"text-[11px]"  -> "text-[12px]"

// If the bar becomes taller, also increase the spacer in your layout:
// <div className="md:hidden h-28" aria-hidden="true" />
`);

const iconSnippet = toSnippet(`
// navigation.js
import { HomeIcon, WalletIcon, BellIcon } from "@/components/icons/dashboard-icons";

export const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/home", icon: HomeIcon },
  { id: "wallet", label: "Wallet", path: "/wallet", icon: WalletIcon },
  { id: "alerts", label: "Alerts", path: "/alerts", icon: BellIcon, badge: 2 },
];
`);

const backgroundSnippet = toSnippet(`
// bottom-nav-floating.jsx

"bg-[rgba(255,255,255,0.22)]"
-> "bg-[rgba(15,23,42,0.22)]"

"border-white/35"
-> "border-white/12"

"text-slate-400 hover:text-slate-700"
-> "text-slate-300 hover:text-white"
`);

const DOC_GROUPS: DocGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        slug: "introduction",
        label: "Introduction",
        title: "Introduction",
        description:
          "Understand the Navis docs model, the open-code distribution approach, and the navigation principles the components are built around.",
        groupTitle: "Getting Started",
        icon: LibraryIcon,
        sections: [
          { id: "overview", label: "Overview" },
          { id: "principles", label: "Principles" },
          { id: "structure", label: "Project structure" },
          { id: "documentation-model", label: "Docs model" }
        ]
      },
      {
        slug: "installation",
        label: "Installation",
        title: "Installation",
        description:
          "Copy the generated files, put navigation data in one place, and wire the rail into your app layout without extra stylesheet setup.",
        groupTitle: "Getting Started",
        icon: HomeIcon,
        sections: [
          { id: "requirements", label: "Requirements" },
          { id: "add-a-variant", label: "Add a variant" },
          { id: "wire-the-layout", label: "Wire the layout" },
          { id: "verification", label: "Verification" }
        ]
      },
      {
        slug: "quick-start",
        label: "Quick Start",
        title: "Quick Start",
        description:
          "Go from copied source to a route-aware mobile navigation shell in a few clear steps.",
        groupTitle: "Getting Started",
        icon: CourseNavIcon,
        sections: [
          { id: "create-items", label: "Create navigation.js" },
          { id: "mount-the-rail", label: "Mount the component" },
          { id: "sync-active-route", label: "Derive activePath" },
          { id: "ship-checklist", label: "Ship checklist" }
        ]
      },
      {
        slug: "variants",
        label: "Choosing a Variant",
        title: "Choosing a Variant",
        description:
          "Pick the right rail for your product, understand the tradeoffs between variants, and know when to swap to another style later.",
        groupTitle: "Getting Started",
        icon: DiscoverIcon,
        sections: [
          { id: "variant-overview", label: "Variant overview" },
          { id: "product-fit", label: "Product fit" },
          { id: "selection-rules", label: "Selection rules" },
          { id: "switching-later", label: "Switching later" }
        ]
      }
    ]
  },
  {
    title: "Guides",
    items: [
      {
        slug: "usage",
        label: "Usage",
        title: "Usage",
        description:
          "Model navigation data cleanly, share it with your sidebar, and add badges, disabled items, icons, and labels without confusion.",
        groupTitle: "Guides",
        icon: DashboardIcon,
        sections: [
          { id: "shared-contract", label: "Shared model" },
          { id: "controlled-state", label: "Controlled routing" },
          { id: "sidebar-sharing", label: "Share with sidebar" },
          { id: "swapping-variants", label: "Swap variants" },
          { id: "item-modeling", label: "Badges and labels" }
        ]
      },
      {
        slug: "routing",
        label: "Routing",
        title: "Routing",
        description:
          "Connect the rail to your router, support nested paths when needed, and understand where the layout code should live.",
        groupTitle: "Guides",
        icon: DiscoverIcon,
        sections: [
          { id: "router-integration", label: "React Router" },
          { id: "next-router", label: "Next.js App Router" },
          { id: "matching-strategy", label: "Matching strategy" },
          { id: "special-navigation", label: "Where code lives" },
          { id: "deep-links", label: "Deep links" }
        ]
      },
      {
        slug: "styling",
        label: "Styling & Themes",
        title: "Styling & Themes",
        description:
          "Edit the copied component source to change height, spacing, colors, backgrounds, icon sizing, and accent variables.",
        groupTitle: "Guides",
        icon: PreferencesIcon,
        sections: [
          { id: "surface-overrides", label: "Edit the source" },
          { id: "height-and-spacing", label: "Height and spacing" },
          { id: "icons-and-labels", label: "Icons and labels" },
          { id: "backgrounds-and-colors", label: "Backgrounds and colors" },
          { id: "css-variables", label: "Accent variables" },
          { id: "theme-strategy", label: "Common visual edits" },
          { id: "motion-and-safe-area", label: "Motion and safe area" }
        ]
      },
      {
        slug: "troubleshooting",
        label: "Troubleshooting",
        title: "Troubleshooting",
        description:
          "Solve the common integration mistakes quickly: desktop visibility, wrong active tab, router issues, hidden content, and badge confusion.",
        groupTitle: "Guides",
        icon: BellIcon,
        sections: [
          { id: "desktop-visibility", label: "Nav shows on desktop" },
          { id: "active-state", label: "Active tab is wrong" },
          { id: "routing-errors", label: "Routing and imports" },
          { id: "content-overlap", label: "Content is hidden" }
        ]
      },
      {
        slug: "accessibility",
        label: "Accessibility",
        title: "Accessibility",
        description:
          "Follow touch-target, semantics, focus, and reduced-motion expectations so the navigation remains usable across real devices.",
        groupTitle: "Guides",
        icon: BellIcon,
        sections: [
          { id: "semantics", label: "Semantics" },
          { id: "focus-behavior", label: "Focus behavior" },
          { id: "touch-targets", label: "Touch targets" },
          { id: "reduced-motion", label: "Reduced motion" }
        ]
      }
    ]
  },
  {
    title: "Reference",
    items: [
      {
        slug: "api",
        label: "API Reference",
        title: "API Reference",
        description:
          "Review the public integration surface: component props, navigation item shape, customization hooks, and implementation notes.",
        groupTitle: "Reference",
        icon: CardsIcon,
        sections: [
          { id: "component-props", label: "Component props" },
          { id: "nav-item-shape", label: "NavItem shape" },
          { id: "css-variable-reference", label: "Customization hooks" },
          { id: "implementation-notes", label: "Implementation notes" }
        ]
      }
    ]
  }
];

const DOC_PAGES = DOC_GROUPS.flatMap((group) => group.items);

const apiRows = [
  {
    property: "activePath",
    type: "string",
    required: "Yes",
    description: "The current pathname or the parent route you want the nav to render as active."
  },
  {
    property: "onItemClick",
    type: "(path: string) => void",
    required: "Usually",
    description: "Called when a user taps a tab. In most apps this just calls your router, for example navigate(path)."
  }
];

const navItemRows = [
  {
    property: "id",
    type: "string",
    required: "Yes",
    description: "Stable identifier used for active state matching and click handling."
  },
  {
    property: "label",
    type: "string",
    required: "Yes",
    description: "Human-readable label shown inside the navigation item or active capsule."
  },
  {
    property: "path",
    type: "string",
    required: "Yes",
    description: "Destination pathname used by both the bottom nav and any sidebar or desktop navigation."
  },
  {
    property: "icon",
    type: "React icon component",
    required: "Yes",
    description: "Icon component rendered in the navigation slot."
  },
  {
    property: "badge",
    type: "number",
    required: "No",
    description: "Optional badge count used for inbox, updates, or attention-demanding routes."
  },
  {
    property: "disabled",
    type: "boolean",
    required: "No",
    description: "Marks the item as unavailable without removing it from the route model."
  }
];

const customVarsRows = [
  {
    variable: "--indicator-nav-accent-rgb",
    component: "Indicator",
    usage: "Comma-separated RGB values used for the active underline, ambient glow, and emphasis color."
  },
  {
    variable: "--indicator-nav-bg",
    component: "Indicator",
    usage: "Background fill behind the indicator rail when you need a different mood or shell tone."
  },
  {
    variable: "--glass-nav-bg",
    component: "Glass",
    usage: "Sheet background behind the glass rail container."
  },
  {
    variable: "--glass-nav-center-bg-start",
    component: "Glass",
    usage: "Start color of the raised center button gradient."
  },
  {
    variable: "--glass-nav-center-bg-end",
    component: "Glass",
    usage: "End color of the raised center button gradient."
  }
];

function DocsSection({
  id,
  title,
  summary,
  isLight,
  children
}: {
  id: string;
  title: string;
  summary: string;
  isLight: boolean;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-32 space-y-5" id={id}>
      <div className="space-y-3">
        <h2 className={cn("text-2xl font-semibold tracking-[0.02em]", isLight ? "text-slate-950" : "text-white")}>
          {title}
        </h2>
        <p className={cn("max-w-[72ch] text-[18px] font-light leading-8", isLight ? "text-slate-600" : "text-slate-300")}>
          {summary}
        </p>
      </div>
      {children}
    </section>
  );
}

function InfoCard({
  title,
  body,
  isLight
}: {
  title: string;
  body: string;
  isLight: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.86)]" : "border-white/[0.08] bg-[rgba(255,255,255,0.03)]"
      )}
    >
      <h3 className={cn("text-base font-semibold", isLight ? "text-slate-950" : "text-white")}>{title}</h3>
      <p className={cn("mt-2 text-sm leading-7", isLight ? "text-slate-600" : "text-slate-300")}>{body}</p>
    </div>
  );
}

function NoteCard({
  title,
  children,
  isLight
}: {
  title: string;
  children: ReactNode;
  isLight: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(248,250,252,0.9)]" : "border-white/[0.08] bg-[rgba(255,255,255,0.04)]"
      )}
    >
      <p className={cn("text-[11px] font-semibold uppercase tracking-[0.18em]", isLight ? "text-slate-500" : "text-slate-400")}>
        {title}
      </p>
      <div className={cn("mt-3 text-[16px] leading-7", isLight ? "text-slate-600" : "text-slate-300")}>{children}</div>
    </div>
  );
}

function BulletList({
  items,
  isLight
}: {
  items: string[];
  isLight: boolean;
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li className="flex items-start gap-3" key={item}>
          <span
            className={cn(
              "mt-2 h-1.5 w-1.5 rounded-full",
              isLight ? "bg-slate-400" : "bg-slate-500"
            )}
          />
          <span className={cn("text-[18px] font-light text-justify leading-7", isLight ? "text-slate-600" : "text-slate-300")}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DocsTable({
  headers,
  rows,
  isLight
}: {
  headers: string[];
  rows: ReactNode[][];
  isLight: boolean;
}) {
  const tableShell = isLight
    ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.82)] shadow-[0_20px_38px_-28px_rgba(15,23,42,0.16)]"
    : "border-white/[0.08] bg-[rgba(14,18,26,0.88)] shadow-[0_18px_34px_-20px_rgba(0,0,0,0.68)]";
  const tableHead = isLight
    ? "bg-[rgba(15,23,42,0.03)] text-slate-500 border-b border-[rgba(15,23,42,0.08)]"
    : "bg-[rgba(255,255,255,0.04)] text-slate-300 border-b border-white/[0.08]";
  const tableBody = isLight ? "divide-y divide-[rgba(15,23,42,0.05)]" : "divide-y divide-white/[0.06]";

  return (
    <div className={cn("overflow-hidden rounded-2xl border", tableShell)}>
      <table className="w-full border-collapse text-left text-xs sm:text-sm">
        <thead className={tableHead}>
          <tr>
            {headers.map((header) => (
              <th className="px-4 py-3 font-semibold" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={tableBody}>
          {rows.map((row, rowIndex) => (
            <tr
              className={cn(
                "transition-colors",
                isLight ? "hover:bg-[rgba(15,23,42,0.025)]" : "hover:bg-[rgba(255,255,255,0.035)]"
              )}
              key={`row-${rowIndex}`}
            >
              {row.map((cell, cellIndex) => (
                <td className="px-4 py-4 align-top" key={`cell-${rowIndex}-${cellIndex}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocsSidebar({
  currentPage,
  isLight,
  mobile = false
}: {
  currentPage: DocPage;
  isLight: boolean;
  mobile?: boolean;
}) {
  return (
    <nav
      aria-label="Documentation navigation"
      className={cn(
        mobile
          ? "space-y-4"
          : "fixed top-28 left-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))] z-20 w-[260px] space-y-8 border-r pr-6",
        !mobile && (isLight ? "border-[rgba(15,23,42,0.06)]" : "border-white/[0.06]")
      )}
    >
      {DOC_GROUPS.map((group) => (
        <div key={group.title}>
          <h4
            className={cn(
              "text-[10px] font-bold uppercase tracking-[0.2em]",
              isLight ? "text-slate-500" : "text-slate-400"
            )}
          >
            {group.title}
          </h4>
          <div className={cn(mobile ? "mt-3 flex gap-2 overflow-x-auto pb-2" : "mt-4 space-y-1")}>
            {group.items.map((item) => {
              const ItemIcon = item.icon;

              return (
                <div className={cn(mobile ? "contents" : "space-y-1")} key={item.slug}>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "transition-colors",
                        mobile
                          ? "inline-flex whitespace-nowrap rounded-full border px-3 py-2 text-sm font-medium"
                          : "flex items-center rounded-lg border px-3 py-2.5 text-sm font-medium",
                        isActive
                          ? isLight
                            ? "border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.04)] text-slate-950"
                            : "border-white/[0.1] bg-[rgba(255,255,255,0.05)] text-white"
                          : isLight
                            ? "border-transparent text-slate-500 hover:border-[rgba(15,23,42,0.06)] hover:bg-[rgba(15,23,42,0.025)] hover:text-slate-950"
                            : "border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-[rgba(255,255,255,0.03)] hover:text-slate-100"
                      )
                    }
                    to={`/docs/${item.slug}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <ItemIcon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          item.slug === currentPage.slug
                            ? isLight
                              ? "text-slate-900"
                              : "text-slate-100"
                            : isLight
                              ? "text-slate-400"
                              : "text-slate-500"
                        )}
                      />
                      <span>{item.label}</span>
                    </span>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

function DocsOnThisPage({
  currentPage,
  activeSection,
  isLight
}: {
  currentPage: DocPage;
  activeSection: string;
  isLight: boolean;
}) {
  return (
    <aside
      className={cn(
        "fixed top-28 right-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))] z-20 hidden w-[220px] pl-6 xl:block",
        isLight ? "border-l border-[rgba(15,23,42,0.06)]" : "border-l border-white/[0.06]"
      )}
    >
      <div className="space-y-5">
        <div>
          <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", isLight ? "text-slate-500" : "text-slate-400")}>
            On This Page
          </p>
          <div className="mt-4 space-y-1">
            {currentPage.sections.map((section) => (
              <a
                className={cn(
                  "block rounded-md py-1 text-[13px] transition-colors",
                  activeSection === section.id
                    ? isLight
                      ? "text-slate-950"
                      : "text-white"
                    : isLight
                      ? "text-slate-500 hover:text-slate-900"
                      : "text-slate-400 hover:text-slate-100"
                )}
                href={`#${section.id}`}
                key={section.id}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "rounded-2xl border p-4",
            isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(248,250,252,0.84)]" : "border-white/[0.08] bg-[rgba(255,255,255,0.03)]"
          )}
        >
          <p className={cn("text-[11px] font-semibold uppercase tracking-[0.18em]", isLight ? "text-slate-500" : "text-slate-400")}>
            Layout note
          </p>
          <p className={cn("mt-2 text-sm leading-7", isLight ? "text-slate-600" : "text-slate-300")}>
            Both desktop rails are intentionally fixed to the docs viewport so long pages preserve local navigation.
          </p>
        </div>
      </div>
    </aside>
  );
}

function DocsPager({
  isLight,
  href,
  label,
  title,
  align
}: {
  isLight: boolean;
  href?: string;
  label: string;
  title: string;
  align: "left" | "right";
}) {
  if (!href) {
    return <div className="hidden md:block" />;
  }

  return (
    <NavLink
      className={cn(
        "rounded-2xl border p-4 transition-colors",
        align === "right" ? "md:text-right" : "md:text-left",
        isLight
          ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.82)] hover:bg-white"
          : "border-white/[0.08] bg-[rgba(14,18,26,0.82)] hover:bg-[rgba(18,24,35,0.94)]"
      )}
      to={href}
    >
      <p className={cn("text-[11px] font-semibold uppercase tracking-[0.18em]", isLight ? "text-slate-500" : "text-slate-400")}>
        {label}
      </p>
      <p className={cn("mt-2 text-base font-semibold", isLight ? "text-slate-950" : "text-white")}>{title}</p>
    </NavLink>
  );
}

function DocsArticle({
  currentPage,
  isLight,
  installCommand,
  copyToClipboard
}: {
  currentPage: DocPage;
  isLight: boolean;
  installCommand: string;
  copyToClipboard: (text: string) => void;
}) {
  const headingClass = isLight ? "text-slate-950" : "text-white";
  const bodyClass = isLight ? "text-slate-600" : "text-slate-300";
  const mutedClass = isLight ? "text-slate-500" : "text-slate-400";

  switch (currentPage.slug) {
    case "introduction":
      return (
        <div className="space-y-12">
          <DocsSection
            id="overview"
            isLight={isLight}
            summary="Navis is a source-first collection of mobile bottom navigation rails. The docs are written to help you copy the code into a real project, wire it to your router, and edit it confidently."
            title="Overview"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard
                body="Every variant is delivered as editable source you can paste into your project and change directly."
                isLight={isLight}
                title="Own the code"
              />
              <InfoCard
                body="All five variants now carry their own styling, so there is no separate CSS file to install."
                isLight={isLight}
                title="Self-contained variants"
              />
              <InfoCard
                body="The public integration surface is intentionally small: a component file, a shared navigation.js file, and one layout example."
                isLight={isLight}
                title="Small install surface"
              />
            </div>
          </DocsSection>

          <DocsSection
            id="principles"
            isLight={isLight}
            summary="The components are designed around a few practical rules that matter when a navigation surface has to survive customization."
            title="Principles"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Keep navigation data in one place. The same NAV_ITEMS array should power your sidebar and your mobile bottom nav.",
                "Let the parent own routing. The component should receive the current route as activePath and send back the clicked path through onItemClick(path).",
                "Prefer source edits over override hacks. If you want a taller bar, different spacing, new colors, or different icon sizing, edit the copied component directly.",
                "Treat safe-area spacing, touch targets, and reduced motion as real product behavior, not visual extras."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="structure"
            isLight={isLight}
            summary="A typical integration keeps the visual component, shared types, icons, and route metadata close enough to evolve together."
            title="Project structure"
          >
            <SyntaxSnippet
              hint="A common organization pattern"
              isLight={isLight}
              lines={toSnippet(`
src/
  components/
    ui/
      bottom-nav-minimal.jsx
    layout/
      sidebar.jsx
  constants/
    navigation.js
  layouts/
    mobile-layout.jsx
`)}
              title="Suggested structure"
            />
            <NoteCard isLight={isLight} title="Why this matters">
              Keep the public files close to the layout that owns navigation. Your users should only have to think about the component file, the shared navigation array, and where they render it.
            </NoteCard>
          </DocsSection>

          <DocsSection
            id="documentation-model"
            isLight={isLight}
            summary="The docs page itself follows the same principles as the library: explicit routes, persistent local navigation, and section-level deep links."
            title="Docs model"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard
                body="The left navigation groups pages by purpose and keeps focus on page-level movement only."
                isLight={isLight}
                title="Page navigation"
              />
              <InfoCard
                body="The right rail exposes the current page outline and remains fixed so you can jump between sections without losing your place."
                isLight={isLight}
                title="Section navigation"
              />
            </div>
          </DocsSection>
        </div>
      );

    case "installation":
      return (
        <div className="space-y-12">
          <DocsSection
            id="requirements"
            isLight={isLight}
            summary="Navis components are intentionally lightweight. The main requirement is a React app shell where you control routing and component source."
            title="Requirements"
          >
            <BulletList
              isLight={isLight}
              items={[
                "React 18 or newer with a modern bundler such as Vite, Next.js, or a comparable React toolchain.",
                "A router layer you control, such as react-router-dom, so the parent layout can pass location.pathname into activePath.",
                "Tailwind CSS, because the copied component source uses Tailwind utility classes directly."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="add-a-variant"
            isLight={isLight}
            summary="Pick a rail in the playground, then install that exact source into your project so the code and docs stay aligned."
            title="Add a variant"
          >
            <button
              className={cn(
                "group flex w-full max-w-xl items-center justify-between rounded-2xl border px-5 py-4 text-left transition-colors",
                isLight
                  ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.88)] hover:bg-white"
                  : "border-white/[0.08] bg-[rgba(15,19,28,0.82)] hover:bg-[rgba(20,26,36,0.9)]"
              )}
              onClick={() => copyToClipboard(installCommand)}
              type="button"
            >
              <code className={cn("code-face text-sm", isLight ? "text-slate-700" : "text-slate-100")}>{installCommand}</code>
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  isLight ? "bg-[rgba(15,23,42,0.05)] text-slate-500" : "bg-[rgba(255,255,255,0.06)] text-slate-300"
                )}
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 7v12a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-8a2 2 0 00-2 2zM16 1H4a2 2 0 00-2 2v12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            <NoteCard isLight={isLight} title="Install intent">
              The CLI is meant to copy usable source into your project, not install a black-box dependency. After you add a variant, you are expected to edit the copied source when your product needs it.
            </NoteCard>
          </DocsSection>

          <DocsSection
            id="wire-the-layout"
            isLight={isLight}
            summary="Once the files land in your app, place the rail inside the layout that owns your mobile viewport and route transitions."
            title="Wire the layout"
          >
            <SyntaxSnippet
              hint="The parent only passes the current path and a click handler"
              isLight={isLight}
              lines={quickStartSnippet}
              title="mobile-layout.jsx"
            />
            <NoteCard isLight={isLight} title="What this code means">
              <code className="code-face">activePath=&#123;location.pathname&#125;</code> tells the nav which tab should look active.
              <br />
              <code className="code-face">onItemClick=&#123;(path) =&gt; navigate(path)&#125;</code> tells your router where to go when a user taps a tab.
            </NoteCard>
          </DocsSection>

          <DocsSection
            id="verification"
            isLight={isLight}
            summary="Before you call the integration done, verify it behaves correctly across real content lengths and navigation states."
            title="Verification"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Confirm the rail stays visually pinned at the bottom without hiding important page content.",
                "Check that active state updates when the route changes through both tapping the nav and other navigation flows.",
                "Verify badges, disabled items, longer labels, and custom icons do not break spacing.",
                "Test on a device or simulator with a bottom safe area so the bar feels intentionally placed."
              ]}
            />
          </DocsSection>
        </div>
      );

    case "quick-start":
      return (
        <div className="space-y-12">
          <DocsSection
            id="create-items"
            isLight={isLight}
            summary="Start with navigation.js. This file is the one place where you define labels, icons, paths, badges, and disabled states."
            title="Create navigation.js"
          >
            <SyntaxSnippet
              hint="One shared array for every navigation surface"
              isLight={isLight}
              lines={installLayoutSnippet}
              title="src/constants/navigation.js"
            />
          </DocsSection>

          <DocsSection
            id="mount-the-rail"
            isLight={isLight}
            summary="Render the copied component inside your layout and let it handle the mobile UI. The parent only needs to provide the current path and a click handler."
            title="Mount the component"
          >
            <SyntaxSnippet
              hint="This can live in App.jsx or any existing layout file"
              isLight={isLight}
              lines={quickStartSnippet}
              title="src/layouts/mobile-layout.jsx"
            />
          </DocsSection>

          <DocsSection
            id="sync-active-route"
            isLight={isLight}
            summary="If your nav items map directly to top-level routes, passing location.pathname is enough. If you need a parent tab to stay active for nested routes, derive an activePath first and pass that instead."
            title="Derive activePath when needed"
          >
            <SyntaxSnippet
              hint="Use this when nested pages should keep the parent tab active"
              isLight={isLight}
              lines={routingSnippet}
              title="layout.jsx"
            />
          </DocsSection>

          <DocsSection
            id="ship-checklist"
            isLight={isLight}
            summary="A quick-start integration is only complete once the shell survives real navigation patterns and device constraints."
            title="Ship checklist"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Reserve enough bottom padding or a spacer so the rail never hides the end of a scroll view.",
                "Keep icon imports next to navigation.js so the same array can also power a sidebar.",
                "Prefer route-derived activePath over local state whenever the tabs represent real destinations.",
                "Leave the component source unchanged first, then edit only what your product actually needs."
              ]}
            />
          </DocsSection>
        </div>
      );

    case "variants":
      return (
        <div className="space-y-12">
          <DocsSection
            id="variant-overview"
            isLight={isLight}
            summary="All five variants share the same integration pattern. The real choice is the interaction tone you want your app to communicate."
            title="Variant overview"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard body="Quiet, flat, and neutral. Best when content should stay first." isLight={isLight} title="Minimal" />
              <InfoCard body="Detached, airy, and motion-led. Best for consumer apps and feed-like surfaces." isLight={isLight} title="Floating" />
              <InfoCard body="Warm, tactile, and a bit richer. Best for learning, community, and profile-led products." isLight={isLight} title="Pill" />
              <InfoCard body="Direct, high-contrast, and utility-first. Best for operations and tool-heavy interfaces." isLight={isLight} title="Indicator" />
              <InfoCard body="Signature center action with stronger personality. Best for brand-led products and discovery-heavy flows." isLight={isLight} title="Glass" />
            </div>
          </DocsSection>

          <DocsSection
            id="product-fit"
            isLight={isLight}
            summary="Pick the variant that matches your product mood before you start styling. That usually saves more time than over-customizing the wrong base rail."
            title="Product fit"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Choose Minimal when you want the easiest baseline to adapt to an existing product shell.",
                "Choose Floating when the nav should feel lighter and more premium without becoming visually loud.",
                "Choose Pill when you want a more tactile, expressive active state and stronger emphasis on the selected tab.",
                "Choose Indicator when clarity and speed matter more than decorative surface treatment.",
                "Choose Glass when the center action is genuinely important and you want the navigation to act as a brand signal."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="selection-rules"
            isLight={isLight}
            summary="A few simple rules help avoid mismatched choices."
            title="Selection rules"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Do not choose Glass unless the center action really matters. Otherwise it adds visual weight without solving a product need.",
                "Do not choose Floating if your overall product language is rigid, dense, or strongly enterprise.",
                "If you expect heavy customization, Minimal is the fastest base to edit.",
                "If you mainly need route clarity and product utility, Indicator is usually the safest non-minimal choice."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="switching-later"
            isLight={isLight}
            summary="The integration model is intentionally stable, so switching later should mostly be a file swap."
            title="Switching later"
          >
            <NoteCard isLight={isLight} title="Low-risk swap">
              If you keep your route data in <code className="code-face">navigation.js</code> and keep your parent layout on the
              <code className="code-face"> activePath / onItemClick(path)</code> pattern, changing variants later should mostly mean replacing the component file and preserving everything else.
            </NoteCard>
          </DocsSection>
        </div>
      );

    case "usage":
      return (
        <div className="space-y-12">
          <DocsSection
            id="shared-contract"
            isLight={isLight}
            summary="The shared contract lives in navigation.js, not in a separate framework abstraction. Keep the object shape stable and the variants stay easy to swap."
            title="Shared navigation model"
          >
            <SyntaxSnippet
              hint="The same array can power your sidebar and bottom nav"
              isLight={isLight}
              lines={navContractSnippet}
              title="navigation.js"
            />
          </DocsSection>

          <DocsSection
            id="controlled-state"
            isLight={isLight}
            summary="The bottom nav does not decide routing. The host application decides which path is active and where a click should navigate."
            title="Controlled routing"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Pass location.pathname directly when each tab maps to one route.",
                "Derive a custom activePath in the parent if nested routes should keep a parent tab active.",
                "Keep onItemClick small. In most production apps it should only call your router."
              ]}
            />
            <SyntaxSnippet
              hint="For demos and prototypes without a router, local state is fine"
              isLight={isLight}
              lines={localStateSnippet}
              title="demo-shell.jsx"
            />
          </DocsSection>

          <DocsSection
            id="sidebar-sharing"
            isLight={isLight}
            summary="The same NAV_ITEMS array should power your sidebar too. That keeps labels, paths, icons, badges, and disabled states consistent across desktop and mobile."
            title="Share the same data with the sidebar"
          >
            <SyntaxSnippet hint="Your desktop nav should import the same array" isLight={isLight} lines={sidebarSnippet} title="sidebar.jsx" />
            <NoteCard isLight={isLight} title="Why this matters">
              Do not maintain one nav array for the sidebar and another for the bottom nav. That almost always creates drift in labels, routes, badges, and future edits.
            </NoteCard>
          </DocsSection>

          <DocsSection
            id="swapping-variants"
            isLight={isLight}
            summary="Swapping from minimal to floating, pill, indicator, or glass should mostly be a file replacement, not a data rewrite."
            title="Swap variants safely"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard
                body="Keep NAV_ITEMS outside the component so every variant can consume the same route data."
                isLight={isLight}
                title="Keep data separate"
              />
              <InfoCard
                body="Preserve the same activePath and onItemClick(path) pattern so switching variants stays low-risk."
                isLight={isLight}
                title="Preserve the usage pattern"
              />
            </div>
          </DocsSection>

          <DocsSection
            id="item-modeling"
            isLight={isLight}
            summary="Badges and disabled states are optional. Add them in navigation.js only when the product needs them."
            title="Badges, disabled items, and labels"
          >
            <SyntaxSnippet hint="Badges and disabled items are just extra fields" isLight={isLight} lines={badgeSnippet} title="navigation.js" />
            <NoteCard isLight={isLight} title="Practical guidance">
              Use <code className="code-face">badge</code> for short-lived counts such as unread items or pending updates. Use <code className="code-face">disabled</code> when a tab should stay visible but not be clickable yet. Keep labels short so the nav stays scannable.
            </NoteCard>
          </DocsSection>
        </div>
      );

    case "routing":
      return (
        <div className="space-y-12">
          <DocsSection
            id="router-integration"
            isLight={isLight}
            summary="The recommended integration is simple: pass the current pathname into activePath and call your router inside onItemClick(path)."
            title="Router integration"
          >
            <SyntaxSnippet
              hint="This is the default integration pattern"
              isLight={isLight}
              lines={quickStartSnippet}
              title="App.jsx"
            />
          </DocsSection>

          <DocsSection
            id="next-router"
            isLight={isLight}
            summary="If you are using Next.js App Router, the integration pattern stays the same. Only the routing hooks change."
            title="Next.js App Router"
          >
            <SyntaxSnippet hint="Use usePathname and router.push" isLight={isLight} lines={nextRouterSnippet} title="app-shell.jsx" />
          </DocsSection>

          <DocsSection
            id="matching-strategy"
            isLight={isLight}
            summary="Some apps need exact route matching. Others need a parent tab to stay active for nested screens. Handle that in the parent by deciding which activePath to pass."
            title="Matching strategy"
          >
            <SyntaxSnippet
              hint="Normalize activePath before you render the nav"
              isLight={isLight}
              lines={routingSnippet}
              title="active-item.ts"
            />
            <BulletList
              isLight={isLight}
              items={[
                "Treat the root route as a special case so it does not accidentally match everything.",
                "Use pathname.startsWith when nested pages should keep a parent tab active.",
                "Keep this matching logic in one place instead of re-implementing it in several layouts."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="special-navigation"
            isLight={isLight}
            summary="The usage example is not a required file. It is only an example place to render the nav."
            title="Where this code can live"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Render it directly in App.jsx if your app shell already lives there.",
                "Render it in a route layout if you already have an authenticated or dashboard shell.",
                "Keep navigation.js separate either way, so your layout file does not become your source of truth."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="deep-links"
            isLight={isLight}
            summary="A route-aware rail should survive direct entry, refresh, and browser navigation without losing the active destination."
            title="Deep links"
          >
            <NoteCard isLight={isLight} title="Deep-link rule">
              If the user lands directly on a nested URL, the parent layout should still derive the same activePath the user would have seen after tapping the tab normally.
            </NoteCard>
          </DocsSection>
        </div>
      );

    case "styling":
      return (
        <div className="space-y-12">
          <DocsSection
            id="surface-overrides"
            isLight={isLight}
            summary="Every variant is now self-contained, so the main customization layer is the copied component source itself."
            title="Edit the copied component"
          >
            <SyntaxSnippet
              hint="Typical size edits happen directly in the Tailwind classes"
              isLight={isLight}
              lines={stylingSnippet}
              title={`${currentPage.slug}.notes`}
            />
            <BulletList
              isLight={isLight}
              items={[
                "Change min-height, icon size, padding, and label size directly in the JSX classes.",
                "Change shell background, border, blur, and shadow directly in the root nav classes.",
                "Prefer editing the copied component over stacking fragile override selectors on top of it."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="height-and-spacing"
            isLight={isLight}
            summary="Height changes are one of the most common edits. Change the bar, icon, and label sizing together so the nav does not become visually top-heavy."
            title="Height and spacing"
          >
            <SyntaxSnippet hint="Make proportional edits instead of changing one class in isolation" isLight={isLight} lines={heightSnippet} title="bottom-nav-minimal.jsx" />
          </DocsSection>

          <DocsSection
            id="icons-and-labels"
            isLight={isLight}
            summary="Icons and labels live in navigation.js. That means most teams can change them without touching the component source."
            title="Icons and labels"
          >
            <SyntaxSnippet hint="Edit imports and fields in navigation.js" isLight={isLight} lines={iconSnippet} title="navigation.js" />
            <BulletList
              isLight={isLight}
              items={[
                "Change icons by changing the imported icon components in navigation.js.",
                "Change labels by editing the label field in navigation.js.",
                "Keep labels short. Longer labels can work, but you should visually test them on a real mobile width."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="backgrounds-and-colors"
            isLight={isLight}
            summary="Color and background changes usually belong in the component source, because that is where the shell, active state, and blurred surfaces are defined."
            title="Backgrounds and colors"
          >
            <SyntaxSnippet hint="Edit the shell and text classes directly in the copied source" isLight={isLight} lines={backgroundSnippet} title="bottom-nav-floating.jsx" />
          </DocsSection>

          <DocsSection
            id="css-variables"
            isLight={isLight}
            summary="Indicator and glass still expose a few CSS variables for accent tuning, especially when you want to keep the structure but change the mood."
            title="Accent variables"
          >
            <SyntaxSnippet
              hint="Edit these directly inside the copied component if needed"
              isLight={isLight}
              lines={accentSnippet}
              title="component-notes.txt"
            />
          </DocsSection>

          <DocsSection
            id="theme-strategy"
            isLight={isLight}
            summary="Most visual changes are simple source edits: background tone, active colors, label color, icon opacity, and the raised action button gradient."
            title="Common visual edits"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Change icons by editing the imports and icon references in navigation.js.",
                "Change labels by editing the label field in navigation.js.",
                "Change height by editing min-height, icon size, and text size classes together so the proportions stay balanced.",
                "Change background and tone by editing the root shell classes in the component source."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="motion-and-safe-area"
            isLight={isLight}
            summary="When you customize a variant, keep the mobile ergonomics intact."
            title="Motion and safe area"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Leave insetBottomStyle in place for variants that use it so the bar still respects device safe areas.",
                "Keep reduced-motion classes when you edit transitions or hover states.",
                "If you make the bar taller, also re-check the bottom spacer in the layout so content still clears the nav."
              ]}
            />
          </DocsSection>
        </div>
      );

    case "troubleshooting":
      return (
        <div className="space-y-12">
          <DocsSection
            id="desktop-visibility"
            isLight={isLight}
            summary="The generated components already hide themselves on desktop. If you still see the nav on large screens, the usual cause is an edited root class or a duplicated wrapper."
            title="Nav shows on desktop"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Check that you did not remove the root mobile-only class from the copied component.",
                "Do not wrap the component in another always-visible container that reintroduces it on desktop.",
                "If you forked the component heavily, make sure the root shell still preserves the mobile-only behavior."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="active-state"
            isLight={isLight}
            summary="Wrong active state almost always comes from the parent, not the component."
            title="Active tab is wrong"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Pass the current route into activePath, not an arbitrary tab id.",
                "If nested routes should keep a parent tab active, derive a custom activePath before rendering the component.",
                "Make sure the path values in navigation.js match the real routes in your app."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="routing-errors"
            isLight={isLight}
            summary="Import and router issues usually come from adapting the generated example to a different stack."
            title="Routing and imports"
          >
            <BulletList
              isLight={isLight}
              items={[
                "If your project does not support the @ alias, replace those imports with relative paths.",
                "If you are not using React Router, replace navigate(path) with your router's equivalent.",
                "If you render the nav in App.jsx directly, that is fine. mobile-layout.jsx is only an example usage file."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="content-overlap"
            isLight={isLight}
            summary="Content hidden behind the nav means the layout does not leave enough bottom room for the fixed bar."
            title="Content is hidden"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Keep the bottom spacer from the usage example so the end of a scroll view stays visible.",
                "If you made the bar taller, also increase the spacer height in the parent layout.",
                "On devices with a home indicator, keep the safe-area padding helpers in place."
              ]}
            />
          </DocsSection>
        </div>
      );

    case "accessibility":
      return (
        <div className="space-y-12">
          <DocsSection
            id="semantics"
            isLight={isLight}
            summary="Bottom navigation is a primary wayfinding surface, so semantics should communicate that clearly to assistive technology."
            title="Semantics"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Wrap the rail in a navigation landmark and provide a useful aria-label when multiple nav regions exist on the same page.",
                "Keep labels visible or reliably announced so icon-only treatments do not become ambiguous.",
                "Use aria-current or an equivalent active-state signal when the current destination represents the active page."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="focus-behavior"
            isLight={isLight}
            summary="Focus should remain visible and predictable even when the visual design leans heavily on glass, glow, or ambient surfaces."
            title="Focus behavior"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Ensure focus rings are not swallowed by strong shadows, blurred layers, or low-contrast glass surfaces.",
                "Do not remove native focus indications without replacing them with something equally visible.",
                "If you customize active animations, verify they do not interfere with keyboard focus clarity."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="touch-targets"
            isLight={isLight}
            summary="The rails are mobile-first, so target sizing and spacing should be validated with a thumb-driven interaction model."
            title="Touch targets"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Keep targets large enough to feel safe on device, not just in a desktop browser preview.",
                "Avoid stacking auxiliary actions so close to the primary tabs that users can mis-tap during one-handed use.",
                "If you introduce badges or longer labels, confirm they do not shrink tap areas."
              ]}
            />
          </DocsSection>

          <DocsSection
            id="reduced-motion"
            isLight={isLight}
            summary="Animation should add clarity and delight, but it must degrade gracefully for users who prefer less motion."
            title="Reduced motion"
          >
            <NoteCard isLight={isLight} title="Implementation note">
              The existing rails already account for reduced-motion preferences. If you add new transforms, springs, or delayed reveals, make sure the reduced-motion path remains first-class.
            </NoteCard>
          </DocsSection>
        </div>
      );

    case "api":
      return (
        <div className="space-y-12">
          <DocsSection
            id="component-props"
            isLight={isLight}
            summary="The generated public component surface is intentionally small. The parent tells the nav what path is active and what to do when a tab is clicked."
            title="Component props"
          >
            <DocsTable
              headers={["Property", "Type", "Required", "Description"]}
              isLight={isLight}
              rows={apiRows.map((row) => [
                <span className={cn("font-semibold", headingClass)} key={`${row.property}-property`}>
                  {row.property}
                </span>,
                <code className="code-face text-indigo-400" key={`${row.property}-type`}>
                  {row.type}
                </code>,
                <span className={mutedClass} key={`${row.property}-required`}>
                  {row.required}
                </span>,
                <span className={bodyClass} key={`${row.property}-description`}>
                  {row.description}
                </span>
              ])}
            />
          </DocsSection>

          <DocsSection
            id="nav-item-shape"
            isLight={isLight}
            summary="navigation.js is the real source of truth for labels, icons, paths, badges, and disabled states."
            title="NavItem shape"
          >
            <DocsTable
              headers={["Property", "Type", "Required", "Description"]}
              isLight={isLight}
              rows={navItemRows.map((row) => [
                <span className={cn("font-semibold", headingClass)} key={`${row.property}-property`}>
                  {row.property}
                </span>,
                <code className="code-face text-indigo-400" key={`${row.property}-type`}>
                  {row.type}
                </code>,
                <span className={mutedClass} key={`${row.property}-required`}>
                  {row.required}
                </span>,
                <span className={bodyClass} key={`${row.property}-description`}>
                  {row.description}
                </span>
              ])}
            />
          </DocsSection>

          <DocsSection
            id="css-variable-reference"
            isLight={isLight}
            summary="Most visual changes happen by editing classes in the copied component. Indicator and glass also expose a few useful variables."
            title="Customization hooks"
          >
            <DocsTable
              headers={["Variable", "Component", "Usage"]}
              isLight={isLight}
              rows={customVarsRows.map((row) => [
                <code className="code-face font-semibold text-indigo-400" key={`${row.variable}-variable`}>
                  {row.variable}
                </code>,
                <span className={cn("font-semibold", headingClass)} key={`${row.variable}-component`}>
                  {row.component}
                </span>,
                <span className={bodyClass} key={`${row.variable}-usage`}>
                  {row.usage}
                </span>
              ])}
            />
          </DocsSection>

          <DocsSection
            id="implementation-notes"
            isLight={isLight}
            summary="The host app owns routing truth, and the copied component is expected to be edited when your product needs it."
            title="Implementation notes"
          >
            <BulletList
              isLight={isLight}
              items={[
                "Treat the rail as copied application code, not untouchable vendor UI.",
                "Route state belongs to the host app, so the parent provides activePath rather than letting the nav guess.",
                "Variant switching is intentionally cheap because the public integration pattern stays the same across all five rails."
              ]}
            />
          </DocsSection>
        </div>
      );

    default:
      return null;
  }
}

export function Docs({ isLight, installCommand, copyToClipboard }: DocsProps) {
  const { docSlug } = useParams();
  const location = useLocation();
  const currentPage = DOC_PAGES.find((page) => page.slug === docSlug);
  const [activeSection, setActiveSection] = useState(currentPage?.sections[0]?.id ?? "");

  useEffect(() => {
    if (!currentPage) {
      return;
    }

    const nextSection = location.hash.replace("#", "") || currentPage.sections[0]?.id || "";
    setActiveSection(nextSection);
  }, [currentPage, location.hash]);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const hashId = location.hash.replace("#", "");
    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(hashId)?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (!currentPage) {
      return;
    }

    const sectionElements = currentPage.sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: [0.1, 0.35, 0.6]
      }
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [currentPage]);

  if (!currentPage) {
    return <Navigate replace to="/docs/introduction" />;
  }

  const currentPageIndex = DOC_PAGES.findIndex((page) => page.slug === currentPage.slug);
  const previousPage = DOC_PAGES[currentPageIndex - 1];
  const nextPage = DOC_PAGES[currentPageIndex + 1];

  return (
    <div className="grid items-start gap-10 pb-16 pt-2 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_220px]">
      <aside className="hidden lg:block" aria-hidden="true">
        <DocsSidebar currentPage={currentPage} isLight={isLight} />
      </aside>

      <div className="min-w-0 max-w-4xl space-y-10">
        <div className="lg:hidden">
          <DocsSidebar currentPage={currentPage} isLight={isLight} mobile />
        </div>

        <header
          className={cn(
            "space-y-4 border-b pb-10",
            isLight ? "border-[rgba(15,23,42,0.06)]" : "border-white/[0.06]"
          )}
        >
          <h1 className={cn("text-[2.75rem] font-semibold tracking-[0.02em] leading-[1.02]", isLight ? "text-slate-950" : "text-white")}>
            {currentPage.title}
          </h1>
          <p className={cn("max-w-[72ch] text-[18px] leading-8", isLight ? "text-slate-600" : "text-slate-300")}>
            {currentPage.description}
          </p>
        </header>

        <article className="space-y-12">
          <DocsArticle
            copyToClipboard={copyToClipboard}
            currentPage={currentPage}
            installCommand={installCommand}
            isLight={isLight}
          />
        </article>

        <div
          className={cn(
            "grid gap-3 border-t pt-6 md:grid-cols-2",
            isLight ? "border-[rgba(15,23,42,0.06)]" : "border-white/[0.06]"
          )}
        >
          <DocsPager
            align="left"
            href={previousPage ? `/docs/${previousPage.slug}` : undefined}
            isLight={isLight}
            label="Previous"
            title={previousPage?.title ?? ""}
          />
          <DocsPager
            align="right"
            href={nextPage ? `/docs/${nextPage.slug}` : undefined}
            isLight={isLight}
            label="Next"
            title={nextPage?.title ?? ""}
          />
        </div>
      </div>

      <div className="hidden xl:block" aria-hidden="true">
        <DocsOnThisPage activeSection={activeSection} currentPage={currentPage} isLight={isLight} />
      </div>
    </div>
  );
}
