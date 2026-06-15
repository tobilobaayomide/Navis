# Contributing to Navis UI

First off, thank you for considering contributing to Navis UI! It's people like you that make open source libraries great.

## How to add a new Navigation Variant

We are always looking for premium, highly-animated navigation components. To add a new variant, follow these steps:

1. **Create the Component**: 
   Create your component in the `src/bottom-nav/` folder. Use the naming convention `BottomNav[Name].tsx`.
   Keep your component self-contained. If it needs Framer Motion or specific Icons, that's fine, but keep it cleanly abstracted.

2. **Register the Variant**:
   Open `src/variants/registry.ts`.
   - Import your component.
   - Add a new entry to the `VariantId` type.
   - Add the definition object to the `VARIANTS` array (make sure you provide a `label`, `blurb`, `useFor`, and `note`).
   - Add your component to the `navRenderers` record.

3. **Generate the Registry**:
   Once your component is ready and registered, run the registry generator script so that it can be imported into Vite raw and used in the playground:
   ```bash
   npm run generate:registry
   ```

4. **Test it**:
   Run `npm run dev` and navigate to the **Playground** to see your component in action! Ensure it looks good in both Light and Dark modes.

## Found a Bug or have a Feature Request?

If you find a bug or have an idea for a feature, please [open an issue](https://github.com/tobilobaayomide/Navis/issues/new/choose). We have templates set up to help you provide the right information.

## Submitting a Pull Request

1. Fork the repo and create your branch from `main`.
2. Make sure your code is formatted properly and runs without errors.
3. If you've added a new variant, include a screenshot or GIF in your PR description!
4. Issue that pull request!

Thank you!
