# Navis UI

Navis UI is a Vite + React + TypeScript playground for exploring polished bottom navigation patterns, a component gallery, and a docs experience wrapped in a clean product shell.

## What’s Inside

- A landing page with a strong hero, feature showcase, and footer
- A component gallery for browsing bottom navigation variants
- A docs section with a sidebar, article pages, and on-page navigation
- An immersive playground with live previews, code artifacts, and theme switching
- Shared navigation data so the site, docs, and playground stay in sync

## Getting Started

```bash
npm install
npm run dev
```

Open the local Vite URL printed in your terminal.

## Available Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run typecheck` - run TypeScript without emitting files
- `npm run check` - run typecheck and then build

## CLI

- `npx navisui add bottom-nav-minimal` - copy the minimal bottom navigation source file into `src/components/ui/bottom-nav-minimal.jsx`
- `npx navisui add bottom-nav-floating` - copy the floating bottom navigation source file into `src/components/ui/bottom-nav-floating.jsx`

The copied components accept an `items` prop, so your nav data can live anywhere in your app. If you use Next.js App Router, the installed files already include `"use client"`.

## Routes

- `/` - landing page
- `/components` - bottom navigation gallery
- `/docs/:docSlug` - documentation pages
- `/playground` - immersive playground

## Project Structure

```txt
src/
  bottom-nav/
  components/
  context/
  data/
  hooks/
  icons/
  nav/
  pages/
  variants/
```

## Notes

- The app supports light and dark themes.
- The playground hides the global navbar so the preview area stays immersive.
- The docs and landing experience share the same design language for a consistent feel.
