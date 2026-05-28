import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { PlaygroundProvider, usePlayground } from "./context/PlaygroundContext";
import { DocsPage } from "./pages/DocsPage";
import { HomePage } from "./pages/HomePage";
import { PlaygroundPage } from "./pages/PlaygroundPage";

function AppShell() {
  const { copiedState, isLight, toggleTheme } = usePlayground();

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden pb-16 font-sans transition-colors duration-300 ${
        isLight ? "bg-white text-slate-900" : "bg-[#080a0f] text-slate-100"
      }`}
    >
      <div
        className={`pointer-events-none fixed inset-0 -z-10 transition-opacity duration-300 ${
          isLight
            ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98)_0%,rgba(250,251,253,1)_38%,rgba(255,255,255,1)_100%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(108,125,194,0.18)_0%,rgba(10,14,22,0.92)_34%,rgba(8,10,15,1)_100%)]"
        }`}
      />
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 -z-10 h-[26rem] blur-3xl transition-opacity duration-300 ${
          isLight ? "bg-[rgba(148,163,184,0.14)]" : "bg-[rgba(87,111,193,0.16)]"
        }`}
      />

      <Navbar isLight={isLight} onThemeToggle={toggleTheme} />

      <main className="mx-auto max-w-[1600px] px-4 pt-24 sm:px-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/docs" element={<Navigate replace to="/docs/introduction" />} />
          <Route path="/docs/:docSlug" element={<DocsPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>

      {copiedState && (
        <div
          className={`toast-notification fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full border px-4 py-2 shadow-lg backdrop-blur-md transition-colors duration-300 ${
            isLight
              ? "border-emerald-500/18 bg-[rgba(250,253,251,0.92)] shadow-[0_18px_36px_-24px_rgba(15,23,42,0.22)]"
              : "border-emerald-500/20 bg-emerald-950/80"
          }`}
        >
          <svg
            className={`h-4.5 w-4.5 ${isLight ? "text-emerald-600" : "text-emerald-400"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`text-xs font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
            Copied successfully
          </span>
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <PlaygroundProvider>
      <AppShell />
    </PlaygroundProvider>
  );
}

export default App;
