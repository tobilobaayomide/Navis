import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { CopyToast } from "./components/CopyToast";
import { PlaygroundProvider, usePlayground } from "./context/PlaygroundContext";
import { DocsPage } from "./pages/DocsPage";
import { HomePage } from "./pages/HomePage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { ComponentsPage } from "./pages/ComponentsPage";

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

      <main className={isPlayground ? "w-full h-screen overflow-hidden" : "mx-auto max-w-[1600px] px-4 pt-24 sm:px-10"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/Playground" element={<PlaygroundPage />} />
          <Route path="/Docs" element={<Navigate replace to="/docs/introduction" />} />
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
