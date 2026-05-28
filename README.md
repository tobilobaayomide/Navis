# Navis

Small frontend project scaffolded with Vite + TypeScript. This README contains minimal quickstart, safety notes, and where to run common tasks.

Quickstart

1. Install dependencies

```bash
npm ci
```

2. Run dev server

```bash
npm run dev
```

3. Build

```bash
npm run build
```

4. Tests (if present)

```bash
npm test
```

Security & repo hygiene

- Do not commit secrets or `.env` files. Use GitHub Secrets for CI.
- `node_modules/`, `dist/`, `.agent/`, and `.agents/` are ignored via `.gitignore`.
- If you find large files committed historically, use `git filter-repo` or BFG to remove them before making the repo public.

Contributing

Create issues/PRs. Add tests for new features. If you'd like, open a PR and I can help review.
# Navis Bottom Navigation Playground

A React + Tailwind playground for exploring reusable mobile bottom navigation patterns for responsive dashboard web apps.

## What is inside

- A responsive dashboard shell with a desktop sidebar
- Five mobile-first bottom navigation variants
- A shared navigation schema so desktop and mobile stay in sync
- A white and royal-blue visual system

## Variants

- Minimal
- Floating
- Pill
- Indicator
- Glass

## Development

```bash
npm install
npm run dev
```

## Project shape

```txt
src/
  bottom-nav/
  components/
  data/
  icons/
  lib/
  nav/
```

