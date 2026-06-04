import {
  HomeIcon,
  SettingsIcon,
  AtomIcon,
  CardsIcon,
  PreferencesIcon,
  CourseNavIcon,
  InsightsIcon,
  AlertsIcon,
  ProfileIcon,
  LibraryIcon
} from "../icons/dashboard-icons";
import type { DocGroup } from "../components/docs/types";

export const apiRows = [
  {
    property: "items",
    type: "NavItem[]",
    required: "Yes",
    description: "The navigation items the rail should render. Keep this array in your app and pass it in from the parent."
  },
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

export const navItemRows = [
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
    type: "number | string",
    required: "No",
    description: "Optional badge value used for inbox counts, short labels, or attention-demanding routes."
  },
  {
    property: "disabled",
    type: "boolean",
    required: "No",
    description: "Marks the item as unavailable without removing it from the route model."
  }
];

export const customVarsRows = [
  {
    variable: "--indicator-nav-accent-rgb",
    component: "Indicator",
    usage: "Comma-separated RGB values used for the active line, glow, and text emphasis in the Indicator rail."
  },
  {
    variable: "--indicator-nav-bg",
    component: "Indicator",
    usage: "Background fill behind the Indicator rail when you need a different mood or shell tone."
  },
  {
    variable: "--cyber-accent",
    component: "Cyber",
    usage: "Accent color used for the neon line and glow in the Cyber rail. It defaults to the indicator accent value."
  }
];

export const DOC_GROUPS: DocGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        slug: "introduction",
        label: "Introduction",
        title: "Introduction",
        description:
          "Understand the Navis UI docs model, the open-code distribution approach, and the navigation principles the components are built around.",
        groupTitle: "Getting Started",
        icon: HomeIcon,
        sections: [
          {
            id: "overview",
            label: "Overview",
            summary: "Navis UI is a source-first collection of mobile bottom navigation rails. The docs are written to help you copy the code into a real project, wire it to your router, and edit it confidently.",
            elements: [
              {
                type: "infoCards",
                cards: [
                  { title: "Own the source", body: "Every rail is delivered as editable component source you can paste into your project and change directly." },
                  { title: "Keep one route model", body: "The same items array should power desktop and mobile navigation, while the parent owns activePath and onItemClick." },
                  { title: "Fifteen variants", body: "The catalog now spans 15 rails, from quiet baselines like Minimal to more expressive options like Aura, Cyber, Expand, and Tactile." }
                ]
              }
            ]
          },
          {
            id: "principles",
            label: "Principles",
            summary: "The components are designed around a few practical rules that matter when a navigation surface has to survive customization.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Keep navigation data in one place. The same `items` array should power your sidebar and your mobile bottom nav.",
                  "Let the parent own routing. The public rail receives the current route as `activePath` and sends back the clicked path through `onItemClick(path)`.",
                  "Prefer source edits over override hacks. If you want a taller bar, different spacing, new colors, or different icon sizing, edit the copied component directly.",
                  "Treat safe-area spacing, touch targets, reduced motion, and route matching as real product behavior, not visual extras."
                ]
              }
            ]
          },
          {
            id: "structure",
            label: "Project structure",
            summary: "A typical integration keeps the visual component, shared types, icons, and route metadata close enough to evolve together.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "suggestedStructure",
                title: "Suggested structure",
                hint: "A common organization pattern"
              },
              {
                type: "noteCard",
                noteTitle: "Why this matters",
                noteText: "Keep the public files close to the layout that owns navigation. Your users should only have to think about the component file, the shared navigation array, and where they render it."
              }
            ]
          }
        ]
      },
      {
        slug: "installation",
        label: "Installation",
        title: "Installation",
        description:
          "Copy the component source, keep navigation data in one place, and wire the rail into your app layout without extra stylesheet setup.",
        groupTitle: "Getting Started",
        icon: SettingsIcon,
        sections: [
          {
            id: "requirements",
            label: "Requirements",
            summary: "Navis UI components are intentionally lightweight. The main requirement is a React app shell where you control routing and component source.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "React 18 or newer with a modern bundler such as Vite, Next.js, or a comparable React toolchain.",
                  "A router layer you control, such as `react-router-dom`, so the parent layout can pass `location.pathname` into `activePath`.",
                  "Tailwind CSS, because the copied component source uses Tailwind utility classes directly.",
                  "TypeScript is optional, but the shipped source and docs are written so JavaScript and TypeScript apps can both adapt them cleanly."
                ]
              }
            ]
          },
          {
            id: "add-a-variant",
            label: "Add a variant",
            summary: "Pick a rail in the playground, then install that exact source into your project so the code and docs stay aligned.",
            elements: [
              { type: "installButton" },
              {
                type: "noteCard",
                noteTitle: "Install intent",
                noteText: "The CLI installs the selected component source only. It does not generate your navigation config or parent layout, because those belong to your app's routing model."
              }
            ]
          },
          {
            id: "wire-the-layout",
            label: "Wire the layout",
            summary: "Once the files land in your app, place the rail inside the layout that owns your mobile viewport and route transitions.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "quickStart",
                title: "mobile-layout.jsx",
                hint: "The parent only passes the current path and a click handler"
              },
              {
                type: "noteCard",
                noteTitle: "What this code means",
                noteText: "This is an integration example, not a required file name. Render the copied component wherever your app owns routing.\n\n`activePath={location.pathname}` tells the nav which tab should look active.\n\n`onItemClick={(path) => navigate(path)}` tells your router where to go when a user taps a tab."
              }
            ]
          },
          {
            id: "verification",
            label: "Verification",
            summary: "Before you call the integration done, verify it behaves correctly across real content lengths and navigation states.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Confirm the rail stays visually pinned at the bottom without hiding important page content.",
                  "Check that active state updates when the route changes through both tapping the nav and other navigation flows.",
                  "Verify badges, disabled items, longer labels, and custom icons do not break spacing.",
                  "Test on a device or simulator with a bottom safe area so the bar feels intentionally placed."
                ]
              }
            ]
          }
        ]
      },
      {
        slug: "quick-start",
        label: "Quick Start",
        title: "Quick Start",
        description:
          "Start by defining one shared navigation array, then mount a rail variant in your app shell.",
        groupTitle: "Getting Started",
        icon: AtomIcon,
        sections: [
          {
            id: "create-items",
            label: "Create nav data",
            summary: "Start with a nav-data file. This file is the one place where you define labels, icons, paths, badges, and disabled states.",
            elements: [
              {
                type: "noteCard",
                noteTitle: "You own this file",
                noteText: "Navis UI does not install a nav-data file for you. Keep your route data in one shared place, then import that same array into sidebars, top navs, and the copied bottom navigation component."
              },
              {
                type: "syntaxSnippet",
                snippetKey: "installLayout",
                title: "navigation-data.js",
                hint: "One shared array for every navigation surface"
              }
            ]
          },
          {
            id: "mount-the-rail",
            label: "Mount the component",
            summary: "Render the copied component inside your layout and let it handle the mobile UI. The parent only needs to provide the current path and a click handler.",
            elements: [
              {
                type: "noteCard",
                noteTitle: "Example only",
                noteText: "This layout is just one possible integration. You can render the component in App.jsx, a route layout, or any shell that can pass the active path and call your router."
              },
              {
                type: "syntaxSnippet",
                snippetKey: "quickStart",
                title: "src/layouts/mobile-layout.jsx",
                hint: "This can live in App.jsx or any existing layout file"
              }
            ]
          },
          {
            id: "sync-active-route",
            label: "Derive activePath when needed",
            summary: "If your nav items map directly to top-level routes, passing location.pathname is enough. If you need a parent tab to stay active for nested routes, derive an activePath first and pass that instead.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "routing",
                title: "layout.jsx",
                hint: "Use this when nested pages should keep the parent tab active"
              }
            ]
          },
          {
            id: "ship-checklist",
            label: "Ship checklist",
            summary: "A quick-start integration is only complete once the shell survives real navigation patterns and device constraints.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Reserve enough bottom padding or a spacer so the rail never hides the end of a scroll view.",
                  "Keep icon imports next to your nav-data file so the same array can also power a sidebar.",
                  "Prefer route-derived activePath over local state whenever the tabs represent real destinations.",
                  "Leave the component source unchanged first, then edit only what your product actually needs."
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Core Concepts",
    items: [
      {
        slug: "variants",
        label: "Variants",
        title: "Variants",
        description:
          "Choose the navigation tone and ergonomic variant that best fits your product context.",
        groupTitle: "Core Concepts",
        icon: CardsIcon,
        sections: [
          {
            id: "variant-overview",
            label: "Variant overview",
            summary: "The variants share the same integration pattern. The real choice is the interaction tone you want your app to communicate.",
            elements: [
              {
                type: "infoCards",
                cards: [
                  { title: "Foundation", body: "Minimal and Indicator give you the cleanest starting points when content, clarity, and easy customization matter most." },
                  { title: "Airy", body: "Floating, Glass, and Aura lean premium and motion-led, with softer surfaces and more personality." },
                  { title: "Tactile", body: "Pill, Island, and Tactile feel more physical and present, which works well for consumer and identity-heavy apps." },
                  { title: "Specialist", body: "Dock, Orbit, Expand, Action, Cyber, Brutalist, and Fluid are stronger character pieces when you want the nav itself to do more of the product storytelling." }
                ]
              }
            ]
          },
          {
            id: "full-catalog",
            label: "Full catalog",
            summary: "Every rail uses the same public contract, so the names below are mood choices rather than different APIs.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Minimal - the quiet baseline for dashboards, admin panels, and lightweight tools.",
                  "Floating - a detached rail with a more premium capsule feel.",
                  "Pill - a warmer segmented rail for learning, community, and profile-led products.",
                  "Indicator - a direct, utility-first rail with a clear active line.",
                  "Glass - a signature center-action layout with stronger brand presence.",
                  "Island - a floating pill where only the active item expands to show text.",
                  "Brutalist - a stark, hard-edged rail for technical or high-contrast products.",
                  "Dock - a Mac-like shelf for desktop-style or productivity-heavy surfaces.",
                  "Cyber - a neon, glow-heavy rail for gaming and dark-mode-first tools.",
                  "Orbit - a split rail that separates out the detached action item.",
                  "Action - a prominent center button layout for create-first flows.",
                  "Aura - a gradient-led rail with more ambient motion and presence.",
                  "Expand - a compact control that opens into a full navigation pill.",
                  "Fluid - an elastic, bouncy option for playful consumer experiences.",
                  "Tactile - an inset, skeuomorphic rail for premium control-center vibes."
                ]
              }
            ]
          },
          {
            id: "product-fit",
            label: "Product fit",
            summary: "Pick the variant that matches your product mood before you start styling. That usually saves more time than over-customizing the wrong base rail.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Choose Minimal or Indicator when you want a fast baseline or a very clear utility surface.",
                  "Choose Floating, Glass, or Aura when the nav should feel lighter, more premium, or more brand-led.",
                  "Choose Pill, Island, or Tactile when you want the selected state to feel physical and tactile.",
                  "Choose Dock, Orbit, Expand, Action, Cyber, Brutalist, or Fluid when the nav itself should carry distinct personality or interaction behavior.",
                  "Treat Glass and Action as intentional choices. Their center-weighted layouts should solve a real product need, not just add novelty."
                ]
              }
            ]
          },
          {
            id: "selection-rules",
            label: "Selection rules",
            summary: "A few simple rules help avoid mismatched choices.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Do not choose Glass or Action unless the center action really matters. Otherwise the added emphasis becomes noise.",
                  "Do not choose Floating, Aura, or Fluid if your overall product language is rigid, dense, or strongly enterprise.",
                  "Choose Minimal if you expect the heaviest customization, because it is the cleanest base to edit.",
                  "Choose Indicator if you mainly need route clarity and product utility, and choose Cyber or Brutalist only when the visual language already supports it."
                ]
              }
            ]
          },
          {
            id: "switching-later",
            label: "Switching later",
            summary: "The integration model is intentionally stable, so switching later should mostly be a file swap.",
            elements: [
              {
                type: "noteCard",
                noteTitle: "Low-risk swap",
                noteText: "If you keep your route data in one shared nav-data file and keep your parent layout on the `activePath / onItemClick(path)` pattern, changing variants later should mostly mean replacing the component file and preserving everything else."
              }
            ]
          }
        ]
      },
      {
        slug: "usage",
        label: "Usage",
        title: "Usage",
        description:
          "Integrate the navigation model into your parent application layout under a controlled contract.",
        groupTitle: "Core Concepts",
        icon: PreferencesIcon,
        sections: [
          {
            id: "shared-contract",
            label: "Shared navigation model",
            summary: "The shared contract lives in your nav-data file, not in a separate framework abstraction. Keep the object shape stable and the variants stay easy to swap.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "navContract",
                title: "navigation-data.js",
                hint: "The same array can power your sidebar and bottom nav"
              }
            ]
          },
          {
            id: "controlled-state",
            label: "Controlled routing",
            summary: "The bottom nav does not decide routing. The host application decides which path is active and where a click should navigate.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Pass location.pathname directly when each tab maps to one route.",
                  "Derive a custom activePath in the parent if nested routes should keep a parent tab active.",
                  "Keep onItemClick small. In most production apps it should only call your router."
                ]
              },
              {
                type: "syntaxSnippet",
                snippetKey: "localState",
                title: "demo-shell.jsx",
                hint: "For demos and prototypes without a router, local state is fine"
              }
            ]
          },
          {
            id: "sidebar-sharing",
            label: "Share the same data with the sidebar",
            summary: "The same items array should power your sidebar too. That keeps labels, paths, icons, badges, and disabled states consistent across desktop and mobile.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "sidebar",
                title: "sidebar.jsx",
                hint: "Your desktop nav should import the same array"
              },
              {
                type: "noteCard",
                noteTitle: "Why this matters",
                noteText: "Do not maintain one nav array for the sidebar and another for the bottom nav. That almost always creates drift in labels, routes, badges, and future edits."
              }
            ]
          },
          {
            id: "swapping-variants",
            label: "Swap variants safely",
            summary: "Swapping from minimal to floating, pill, indicator, glass, island, brutalist, dock, cyber, orbit, action, aura, expand, fluid, or tactile should mostly be a file replacement, not a data rewrite.",
            elements: [
              {
                type: "infoCards",
                cards: [
                  { title: "Keep data separate", body: "Keep your items array outside the component so every variant can consume the same route data." },
                  { title: "Keep activePath and onItemClick(path)", body: "Preserve the usage pattern so switching variants stays low-risk." }
                ]
              }
            ]
          },
          {
            id: "item-modeling",
            label: "Badges, disabled items, and labels",
            summary: "Badges and disabled states are optional. Add them in your nav-data file only when the product needs them.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "badge",
                title: "navigation-data.js",
                hint: "Badges and disabled items are just extra fields"
              },
              {
                type: "noteCard",
                noteTitle: "Practical guidance",
                noteText: "Use `badge` for short-lived counts such as unread items or pending updates. Use `disabled` when a tab should stay visible but not be clickable yet. Keep labels short so the nav stays scannable."
              }
            ]
          }
        ]
      },
      {
        slug: "routing",
        label: "Routing",
        title: "Routing",
        description:
          "Learn how the navigation components wire into modern React routing setups.",
        groupTitle: "Core Concepts",
        icon: CourseNavIcon,
        sections: [
          {
            id: "router-integration",
            label: "Router integration",
            summary: "The recommended integration is simple: pass the current pathname into activePath, pass your items array into the rail, and call your router inside onItemClick(path).",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "quickStart",
                title: "App.jsx",
                hint: "This is the default integration pattern"
              }
            ]
          },
          {
            id: "next-router",
            label: "Next.js App Router",
            summary: "If you are using Next.js App Router, the integration pattern stays the same. Only the routing hooks change.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "nextRouter",
                title: "app-shell.jsx",
                hint: "Use usePathname and router.push"
              }
            ]
          },
          {
            id: "matching-strategy",
            label: "Matching strategy",
            summary: "Some apps need exact route matching. Others need a parent tab to stay active for nested screens. Handle that in the parent by deciding which activePath to pass.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "routing",
                title: "active-item.ts",
                hint: "Normalize activePath before you render the nav"
              },
              {
                type: "bulletList",
                items: [
                  "Treat the root route as a special case so it does not accidentally match everything.",
                  "Use pathname.startsWith when nested pages should keep a parent tab active.",
                  "Keep this matching logic in one place instead of re-implementing it in several layouts."
                ]
              }
            ]
          },
          {
            id: "special-navigation",
            label: "Where this code can live",
            summary: "The usage example is not a required file. It is only an example place to render the nav.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Render it directly in App.jsx if your app shell already lives there.",
                  "Render it in a route layout if you already have an authenticated or dashboard shell.",
                  "Keep the nav data in a separate file either way, so your layout file does not become your source of truth."
                ]
              }
            ]
          },
          {
            id: "deep-links",
            label: "Deep links",
            summary: "A route-aware rail should survive direct entry, refresh, and browser navigation without losing the active destination.",
            elements: [
              {
                type: "noteCard",
                noteTitle: "Deep-link rule",
                noteText: "If the user lands directly on a nested URL, the parent layout should still derive the same activePath the user would have seen after tapping the tab normally."
              }
            ]
          }
        ]
      },
      {
        slug: "styling",
        label: "Styling",
        title: "Styling",
        description:
          "Customize heights, spacing, theme backgrounds, and custom CSS variables directly inside the component.",
        groupTitle: "Core Concepts",
        icon: InsightsIcon,
        sections: [
          {
            id: "surface-overrides",
            label: "Edit the copied component",
            summary: "Every variant is now self-contained, so the main customization layer is the copied component source itself.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "styling",
                title: "styling.notes",
                hint: "Typical size edits happen directly in the Tailwind classes"
              },
              {
                type: "bulletList",
                items: [
                  "Change min-height, icon size, padding, and label size directly in the JSX classes.",
                  "Change shell background, border, blur, and shadow directly in the root nav classes.",
                  "Prefer editing the copied component over stacking fragile override selectors on top of it."
                ]
              }
            ]
          },
          {
            id: "height-and-spacing",
            label: "Height and spacing",
            summary: "Height changes are one of the most common edits. Change the bar, icon, and label sizing together so the nav does not become visually top-heavy.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "height",
                title: "bottom-nav-minimal.jsx",
                hint: "Make proportional edits instead of changing one class in isolation"
              }
            ]
          },
          {
            id: "icons-and-labels",
            label: "Icons and labels",
            summary: "Icons and labels live in your nav-data file. That means most teams can change them without touching the component source.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "icon",
                title: "navigation-data.js",
                hint: "Edit imports and fields in your nav-data file"
              },
              {
                type: "bulletList",
                items: [
                  "Change icons by changing the imported icon components in your nav-data file.",
                  "Change labels by editing the label field in your nav-data file.",
                  "Keep labels short. Longer labels can work, but you should visually test them on a real mobile width."
                ]
              }
            ]
          },
          {
            id: "backgrounds-and-colors",
            label: "Backgrounds and colors",
            summary: "Color and background changes usually belong in the component source, because that is where the shell, active state, and blurred surfaces are defined.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "background",
                title: "bottom-nav-floating.jsx",
                hint: "Edit the shell and text classes directly in the copied source"
              }
            ]
          },
          {
            id: "css-variables",
            label: "Accent variables",
            summary: "Indicator and Cyber expose the main runtime accent hooks. Most other variants are edited directly in the copied source when you want to change color or motion.",
            elements: [
              {
                type: "syntaxSnippet",
                snippetKey: "accent",
                title: "component-notes.txt",
                hint: "Edit these directly inside the copied component if needed"
              }
            ]
          },
          {
            id: "theme-strategy",
            label: "Common visual edits",
            summary: "Most visual changes are simple source edits: background tone, active colors, label color, icon opacity, and the raised action button gradient.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Change icons by editing the imports and icon references in your nav-data file.",
                  "Change labels by editing the label field in your nav-data file.",
                  "Change height by editing min-height, icon size, and text size classes together so the proportions stay balanced.",
                  "Change background and tone by editing the root shell classes in the component source.",
                  "Use the CSS variable hooks for Indicator and Cyber when you want a quick accent retune without rewriting the whole rail."
                ]
              }
            ]
          },
          {
            id: "motion-and-safe-area",
            label: "Motion and safe area",
            summary: "When you customize a variant, keep the mobile ergonomics intact.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Leave insetBottomStyle in place for variants that use it so the bar still respects device safe areas.",
                  "Keep reduced-motion classes when you edit transitions or hover states.",
                  "If you make the bar taller, also re-check the bottom spacer in the layout so content still clears the nav."
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Reference",
    items: [
      {
        slug: "troubleshooting",
        label: "Troubleshooting",
        title: "Troubleshooting",
        description:
          "Fix common integration layout offsets, active state mismatches, or viewport coverage issues.",
        groupTitle: "Reference",
        icon: AlertsIcon,
        sections: [
          {
            id: "desktop-visibility",
            label: "Nav shows on desktop",
            summary: "The generated components already hide themselves on desktop. If you still see the nav on large screens, the usual cause is an edited root class or a duplicated wrapper.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Check that you did not remove the root mobile-only class from the copied component.",
                  "Do not wrap the component in another always-visible container that reintroduces it on desktop.",
                  "If you forked the component heavily, make sure the root shell still preserves the mobile-only behavior."
                ]
              }
            ]
          },
          {
            id: "active-state",
            label: "Active tab is wrong",
            summary: "Wrong active state almost always comes from the parent, not the component.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Pass the current route into activePath, not an arbitrary tab id.",
                  "If nested routes should keep a parent tab active, derive a custom activePath before rendering the component.",
                  "Make sure the path values in your nav-data file match the real routes in your app."
                ]
              }
            ]
          },
          {
            id: "routing-errors",
            label: "Routing and imports",
            summary: "Import and router issues usually come from adapting the generated example to a different stack.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "If your project does not support the @ alias, replace those imports with relative paths.",
                  "If you are not using React Router, replace navigate(path) with your router's equivalent.",
                  "If you render the nav in App.jsx directly, that is fine. mobile-layout.jsx is only an example usage file."
                ]
              }
            ]
          },
          {
            id: "content-overlap",
            label: "Content is hidden",
            summary: "Content hidden behind the nav means the layout does not leave enough bottom room for the fixed bar.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Keep the bottom spacer from the usage example so the end of a scroll view stays visible.",
                  "If you made the bar taller, also increase the spacer height in the parent layout.",
                  "On devices with a home indicator, keep the safe-area padding helpers in place."
                ]
              }
            ]
          }
        ]
      },
      {
        slug: "accessibility",
        label: "Accessibility",
        title: "Accessibility",
        description:
          "Provide semantic structure, focus visibility, keyboard navigation, and reduced motion fallback.",
        groupTitle: "Reference",
        icon: ProfileIcon,
        sections: [
          {
            id: "semantics",
            label: "Semantics",
            summary: "Bottom navigation is a primary wayfinding surface, so semantics should communicate that clearly to assistive technology.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Wrap the rail in a navigation landmark and provide a useful aria-label when multiple nav regions exist on the same page.",
                  "Keep labels visible or reliably announced so icon-only treatments do not become ambiguous.",
                  "Use aria-current or an equivalent active-state signal when the current destination represents the active page."
                ]
              }
            ]
          },
          {
            id: "focus-behavior",
            label: "Focus behavior",
            summary: "Focus should remain visible and predictable even when the visual design leans heavily on glass, glow, or ambient surfaces.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Ensure focus rings are not swallowed by strong shadows, blurred layers, or low-contrast glass surfaces.",
                  "Do not remove native focus indications without replacing them with something equally visible.",
                  "If you customize active animations, verify they do not interfere with keyboard focus clarity."
                ]
              }
            ]
          },
          {
            id: "touch-targets",
            label: "Touch targets",
            summary: "The rails are mobile-first, so target sizing and spacing should be validated with a thumb-driven interaction model.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Keep targets large enough to feel safe on device, not just in a desktop browser preview.",
                  "Avoid stacking auxiliary actions so close to the primary tabs that users can mis-tap during one-handed use.",
                  "If you introduce badges or longer labels, confirm they do not shrink tap areas."
                ]
              }
            ]
          },
          {
            id: "reduced-motion",
            label: "Reduced motion",
            summary: "Animation should add clarity and delight, but it must degrade gracefully for users who prefer less motion.",
            elements: [
              {
                type: "noteCard",
                noteTitle: "Implementation note",
                noteText: "The existing rails already account for reduced-motion preferences. If you add new transforms, springs, or delayed reveals, make sure the reduced-motion path remains first-class."
              }
            ]
          }
        ]
      },
      {
        slug: "api",
        label: "API Reference",
        title: "API Reference",
        description:
          "Full property contract references, custom accent CSS variables, and navigation schema fields.",
        groupTitle: "Reference",
        icon: LibraryIcon,
        sections: [
          {
            id: "component-props",
            label: "Component props",
            summary: "The generated public component surface is intentionally small. The parent gives the nav its items, tells it what path is active, and decides what happens when a tab is clicked.",
            elements: [
              {
                type: "docsTable",
                tableType: "api"
              }
            ]
          },
          {
            id: "nav-item-shape",
            label: "NavItem shape",
            summary: "Your nav-data file is the real source of truth for labels, icons, paths, badges, and disabled states.",
            elements: [
              {
                type: "docsTable",
                tableType: "navItem"
              }
            ]
          },
          {
            id: "css-variable-reference",
            label: "Customization hooks",
            summary: "Most visual changes happen by editing classes in the copied component. Indicator and Cyber expose the main useful variables.",
            elements: [
              {
                type: "docsTable",
                tableType: "customVars"
              }
            ]
          },
          {
            id: "implementation-notes",
            label: "Implementation notes",
            summary: "The host app owns routing truth, and the copied component is expected to be edited when your product needs it.",
            elements: [
              {
                type: "bulletList",
                items: [
                  "Treat the rail as copied application code, not untouchable vendor UI.",
                  "Route state belongs to the host app, so the parent provides activePath rather than letting the nav guess.",
                  "Variant switching is intentionally cheap because the public integration pattern stays the same across the rails."
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export default {
  DOC_GROUPS,
  apiRows,
  navItemRows,
  customVarsRows
};
