# Registry

Installable component sources live here.

The first shipped file is `bottom-nav-minimal.jsx`, which the `navisinit` CLI copies into a user project when someone runs:

```bash
npx navisinit add bottom-nav-minimal
```

The floating variant is also available:

```bash
npx navisinit add bottom-nav-floating
```

Both installable components accept an `items` prop, so the navigation data can live in any file or folder your app prefers. The copied files also include `"use client"` so they are safe to drop into Next.js App Router client boundaries.
