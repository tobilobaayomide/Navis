import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CopyToast } from "./components/CopyToast";
import { PlaygroundProvider, usePlayground } from "./context/PlaygroundContext";
import { HomePage } from "./pages/HomePage";

// Lazy load other pages to support bundle splitting
const ComponentsPage = lazy(() => import("./pages/ComponentsPage").then(m => ({ default: m.ComponentsPage })));
const PlaygroundPage = lazy(() => import("./pages/PlaygroundPage").then(m => ({ default: m.PlaygroundPage })));
const DocsPage = lazy(() => import("./pages/DocsPage").then(m => ({ default: m.DocsPage })));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Sleek dynamic spinner */}
        <div className="h-6 w-6 animate-spin rounded-full border-[2px] border-indigo-500/20 border-t-indigo-500" />
        <span className="text-[11px] font-medium tracking-[0.24em] text-slate-500 uppercase">Loading</span>
      </div>
    </div>
  );
}

function AppShell() {
  const { copiedState, copiedNonce, isLight, toggleTheme } = usePlayground();
  const location = useLocation();
  const isPlayground = location.pathname.startsWith("/Playground");

  return (
    <div
      className={`relative min-h-screen overflow-x-clip ${!isPlayground ? "pb-16" : ""} font-sans transition-colors duration-300 ${
        isLight ? "bg-white text-slate-900" : "bg-[#080a0f] text-slate-100"
      }`}
    >
     
      {!isPlayground && <Navbar isLight={isLight} onThemeToggle={toggleTheme} />}

      <main className={isPlayground ? "w-full min-h-screen overflow-y-auto overflow-x-hidden lg:h-screen lg:overflow-hidden" : "mx-auto max-w-[1550px] pt-24 sm:px-10"}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/Playground" element={<PlaygroundPage />} />
            <Route path="/Docs" element={<Navigate replace to="/docs/introduction" />} />
            <Route path="/docs/:docSlug" element={<DocsPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
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
