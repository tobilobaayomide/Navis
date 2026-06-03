import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { CopyToast } from "./components/copy-toast";
import { PlaygroundProvider, usePlayground } from "./context/PlaygroundContext";
import { DocsPage } from "./pages/DocsPage";
import { HomePage } from "./pages/HomePage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { ComponentsPage } from "./pages/ComponentsPage";

function AppShell() {
  const { copiedState, copiedNonce, isLight, toggleTheme } = usePlayground();
  const location = useLocation();
  const isPlayground = location.pathname.startsWith("/playground");

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden ${!isPlayground ? "pb-16" : ""} font-sans transition-colors duration-300 ${
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

      {!isPlayground && <Navbar isLight={isLight} onThemeToggle={toggleTheme} />}

      <main className={isPlayground ? "w-full h-screen overflow-hidden" : "mx-auto max-w-[1600px] px-4 pt-24 sm:px-10"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/docs" element={<Navigate replace to="/docs/introduction" />} />
          <Route path="/docs/:docSlug" element={<DocsPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>

      <CopyToast copiedState={copiedState} copiedNonce={copiedNonce} isLight={isLight} />
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
