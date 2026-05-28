export const DOC_GROUPS = [
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
        icon: null,
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
        icon: null,
        sections: [
          { id: "requirements", label: "Requirements" },
          { id: "add-a-variant", label: "Add a variant" },
          { id: "wire-the-layout", label: "Wire the layout" },
          { id: "verification", label: "Verification" }
        ]
      }
    ]
  }
];

export const apiRows = [
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
  }
];

export const customVarsRows = [
  {
    variable: "--indicator-nav-accent-rgb",
    component: "Indicator",
    usage: "Comma-separated RGB values used for the active underline, ambient glow, and emphasis color."
  }
];

export default {
  DOC_GROUPS,
  apiRows,
  navItemRows,
  customVarsRows
};
