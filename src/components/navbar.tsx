import { useState, useEffect } from "react";
import { cn } from "../lib/cn";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  LuAccessibility,
  LuAtom,
  LuBookOpenText,
  LuCode,
  LuGithub,
  LuLayoutDashboard,
  LuMenu,
  LuMoon,
  LuPackagePlus,
  LuPalette,
  LuPanelLeftOpen,
  LuPanelsTopLeft,
  LuRocket,
  LuRoute,
  LuSun,
  LuWrench,
  LuX,
  LuZap
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { DOC_GROUPS } from "../data/docsContent";

const DOC_DRAWER_ICONS: Record<string, IconType> = {
  introduction: LuBookOpenText,
  installation: LuPackagePlus,
  "quick-start": LuRocket,
  variants: LuPanelsTopLeft,
  usage: LuLayoutDashboard,
  routing: LuRoute,
  styling: LuPalette,
  troubleshooting: LuWrench,
  accessibility: LuAccessibility,
  api: LuCode
};

export function Navbar({
  isLight,
  onThemeToggle
}: {
  isLight: boolean;
  onThemeToggle: () => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDocsDrawerOpen, setIsDocsDrawerOpen] = useState(false);
  const [isDocsDrawerVisible, setIsDocsDrawerVisible] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const isDocs = path.startsWith("/Docs");
  const currentDocSlug = isDocs ? path.split("/")[2] ?? "introduction" : "";

  // Close menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      closeMenu();
    }
    if (isDocsDrawerOpen) {
      closeDocsDrawer();
    }
  }, [location.pathname]);

  // Prevent body scroll when an overlay is open
  useEffect(() => {
    if (isMobileMenuOpen || isDocsDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isDocsDrawerOpen]);

  function openMenu() {
    if (isDocsDrawerOpen) {
      closeDocsDrawer();
    }
    setIsMobileMenuOpen(true);
    // Trigger animation on next frame so the element is mounted first
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsMenuVisible(true));
    });
  }

  function closeMenu() {
    setIsMenuVisible(false);
    // Wait for animation to finish before unmounting
    setTimeout(() => setIsMobileMenuOpen(false), 300);
  }

  function toggleMenu() {
    if (isMobileMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openDocsDrawer() {
    if (isMobileMenuOpen) {
      closeMenu();
    }
    setIsDocsDrawerOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsDocsDrawerVisible(true));
    });
  }

  function closeDocsDrawer() {
    setIsDocsDrawerVisible(false);
    setTimeout(() => setIsDocsDrawerOpen(false), 250);
  }

  function toggleDocsDrawer() {
    if (isDocsDrawerOpen) {
      closeDocsDrawer();
    } else {
      openDocsDrawer();
    }
  }

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center text-[16px] font-normal tracking-wide transition-all",
      isActive
        ? isLight
          ? "text-slate-900"
          : "text-white"
        : isLight
          ? "text-slate-500 hover:text-slate-950"
          : "text-slate-400 hover:text-slate-100"
    );

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center text-[22px] font-medium tracking-tight transition-all py-1",
      isActive
        ? isLight
          ? "text-slate-900"
          : "text-white"
        : isLight
          ? "text-slate-400 hover:text-slate-900"
          : "text-slate-500 hover:text-white"
    );

  const mobileIconButtonClass = cn(
    "flex h-9 w-9 items-center justify-center transition-all active:scale-[0.98]",
    isLight ? "text-slate-900 hover:text-slate-700" : "text-white hover:text-slate-200"
  );

  return (
    <>
      {/* ─── Desktop navbar (pill) ─── */}
      <nav className="fixed top-5 left-0 right-0 z-50 mx-auto w-full max-w-[1600px] px-4 animate-fade-in hidden lg:block">
        <div
          className={cn(
            "flex h-16 items-center justify-between rounded-full px-5 sm:px-8 py-2.5 transition-colors duration-300",
            isLight
              ? "border border-[rgba(15,23,42,0.08)] bg-white shadow-sm"
              : "border border-white/[0.08] bg-[#0a0d13] shadow-md"
          )}
        >
          {/* Brand */}
          <Link
            to="/"
            className="flex cursor-pointer items-center gap-2 sm:gap-3 transition-transform active:scale-[0.98]"
          >
            <LuAtom className="h-6 w-6 sm:h-7 sm:w-7 text-blue-500" strokeWidth={1.8} />
            <span className="flex items-center gap-1">
              <span className={cn("text-base sm:text-lg font-semibold tracking-tight font-sans", isLight ? "text-slate-950" : "text-white")}>Navis UI</span>
              <span className={cn("ml-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", isLight ? "bg-slate-100 text-slate-600" : "bg-white/10 text-white/70")}>v1.0</span>
              {isDocs && (
                <span className={cn("ml-1 text-base sm:text-lg font-normal tracking-tight font-sans", isLight ? "text-slate-600" : "text-slate-400")}>Docs</span>
              )}
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-10 xl:gap-16">
            <NavLink className={navLinkClassName} end to="/">Overview</NavLink>
            <NavLink
              className={({ isActive }) => navLinkClassName({ isActive: isActive || isDocs })}
              to="/docs/introduction"
            >
              Documentation
            </NavLink>
            <NavLink className={navLinkClassName} to="/components">Components</NavLink>
            <NavLink className={navLinkClassName} to="/Playground">Playground</NavLink>
            
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all active:scale-[0.98]",
                isLight
                  ? "border-[rgba(15,23,42,0.08)] bg-white text-slate-900 shadow-[0_18px_34px_-24px_rgba(15,23,42,0.2)] hover:bg-[rgba(15,23,42,0.05)]"
                  : "border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.035)_100%)] text-white shadow-[0_20px_38px_-24px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.05)_100%)]"
              )}
              onClick={onThemeToggle}
              type="button"
            >
              {isLight ? <LuSun className="h-5 w-5 text-slate-900" strokeWidth={1.8} /> : <LuMoon className="h-5 w-5 text-white" strokeWidth={1.8} />}
            </button>

            <a
              href="https://github.com/tobilobaayomide/Navis"
              rel="noreferrer"
              target="_blank"
              className={cn(
                "group relative flex items-center justify-between gap-3.5 rounded-full border pl-5 pr-5 py-2.5 text-[16px] font-normal transition-all active:scale-[0.98]",
                 isLight
                  ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20"
                  : "border-white bg-white text-slate-950 hover:bg-slate-100 shadow-xl shadow-white/10"
             )}
            >
              <LuGithub className={cn("h-3.5 w-3.5", isLight ? "text-white" : "text-slate-900")} strokeWidth={1.8} />
              Star on Github
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Mobile navbar (flat, full-width) ─── */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-5 lg:hidden transition-colors duration-300",
          isLight
            ? "bg-white border-b border-[rgba(15,23,42,0.06)]"
            : "bg-[#0a0d13] border-b border-white/[0.08]"
        )}
      >
        {/* Brand */}
        <Link
          to="/"
          className="flex cursor-pointer items-center gap-2.5 transition-transform active:scale-[0.98]"
        >
          <LuAtom className="h-6 w-6 text-blue-500" strokeWidth={1.8} />
          <span className="flex items-center gap-1">
            <span className={cn("text-base font-semibold tracking-tight font-sans", isLight ? "text-slate-950" : "text-white")}>Navis UI</span>
            <span className={cn("ml-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", isLight ? "bg-slate-100 text-slate-600" : "bg-white/10 text-white/70")}>v1.0</span>
            {isDocs && (
              <span className={cn("ml-1 text-base font-normal tracking-tight font-sans", isLight ? "text-slate-600" : "text-slate-400")}>Docs</span>
            )}
          </span>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {isDocs && (
            <button
              aria-label={isDocsDrawerOpen ? "Close documentation navigation" : "Open documentation navigation"}
              aria-expanded={isDocsDrawerOpen}
              onClick={toggleDocsDrawer}
              className={cn(
                mobileIconButtonClass,
                isLight ? "text-black" : "text-white"
              )}
              type="button"
            >
              {isDocsDrawerOpen ? <LuX className="h-4.5 w-4.5" strokeWidth={2} /> : <LuPanelLeftOpen className="h-4.5 w-4.5" strokeWidth={1.9} />}
            </button>
          )}

          {isDocs && (
            <span
              aria-hidden="true"
              className={cn("h-5 w-px", isLight ? "bg-slate-200" : "bg-white/10")}
            />
          )}

          <button
            aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
            className={mobileIconButtonClass}
            onClick={onThemeToggle}
            type="button"
          >
            {isLight ? <LuSun className="h-4.5 w-4.5" strokeWidth={1.9} /> : <LuMoon className="h-4.5 w-4.5" strokeWidth={1.9} />}
          </button>

          <span
            aria-hidden="true"
            className={cn("h-5 w-px", isLight ? "bg-slate-200" : "bg-white/10")}
          />

          <button
            onClick={toggleMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={mobileIconButtonClass}
            type="button"
          >
            {isMobileMenuOpen ? <LuX className="h-5 w-5" strokeWidth={2} /> : <LuMenu className="h-5 w-5" strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {/* ─── Full-page mobile menu overlay ─── */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "fixed inset-0 z-40 lg:hidden flex flex-col transition-all duration-300",
            isLight ? "bg-slate-50" : "bg-[#0a0d13]"
          )}
          style={{
            opacity: isMenuVisible ? 1 : 0,
            transform: isMenuVisible ? "translateY(0)" : "translateY(-12px)",
          }}
        >
          {/* Spacer to push content below the navbar bar */}
          <div className="h-16 shrink-0" />

          {/* Nav links */}
          <div className="flex flex-col flex-1 px-6 pt-8 pb-10 gap-1">
            <NavLink
              onClick={closeMenu}
              className={mobileLinkClassName}
              end
              to="/"
            >
              Overview
            </NavLink>
               <NavLink
              onClick={closeMenu}
              className={({ isActive }) => mobileLinkClassName({ isActive: isActive || isDocs })}
              to="/docs/introduction"
            >
              Documentation
            </NavLink>
            <NavLink
              onClick={closeMenu}
              className={mobileLinkClassName}
              to="/components"
            >
              Components
            </NavLink>
            <NavLink
              onClick={closeMenu}
              className={mobileLinkClassName}
              to="/Playground"
            >
              Playground
            </NavLink>

            {/* Divider */}
            <div
              className={cn("my-6 h-px w-full", isLight ? "bg-slate-100" : "bg-white/10")}
            />

            <div
              className={cn("my-6 h-px w-full", isLight ? "bg-slate-100" : "bg-white/10")}
            />

            {/* GitHub CTA */}
            <a
              href="https://github.com/HunkyManie/Navis"
              rel="noreferrer"
              target="_blank"
              onClick={closeMenu}
              className={cn(
                "flex items-center justify-center gap-2.5 rounded-full border py-3 text-[15px] font-medium transition-all active:scale-[0.98]",
                isLight
                  ? "border-[rgba(15,23,42,0.1)] bg-slate-50 text-slate-900 hover:bg-slate-100"
                  : "border-white/[0.08] bg-white/5 text-white hover:bg-white/10"
              )}
            >
              <LuGithub className={cn("h-4 w-4", isLight ? "text-slate-900" : "text-white")} strokeWidth={1.8} />
              Star on Github
            </a>
          </div>
        </div>
      )}

      {/* ─── Documentation mobile drawer ─── */}
      {isDocsDrawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close documentation navigation"
            className={cn(
              "absolute inset-0 transition-opacity duration-200",
              isDocsDrawerVisible ? "opacity-100" : "opacity-0",
              isLight ? "bg-slate-950/18" : "bg-black/45"
            )}
            onClick={closeDocsDrawer}
            type="button"
          />

          <aside
            aria-label="Documentation navigation"
            className={cn(
              "absolute left-0 top-0 flex h-full w-[min(21rem,86vw)] flex-col border-r px-5 pb-6 pt-20 shadow-[24px_0_70px_-44px_rgba(15,23,42,0.55)] transition-transform duration-200 ease-out",
              isDocsDrawerVisible ? "translate-x-0" : "-translate-x-full",
              isLight
                ? "border-[rgba(15,23,42,0.08)] bg-white text-slate-950"
                : "border-white/[0.08] bg-[#0a0d13] text-white"
            )}
          >
            <div className="mb-6">
              <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", isLight ? "text-slate-500" : "text-slate-400")}>
                Documentation
              </p>
              <p className={cn("mt-2 text-sm leading-6", isLight ? "text-slate-600" : "text-slate-300")}>
                Jump to a guide or reference page.
              </p>
            </div>

            <nav className="min-h-0 flex-1 space-y-7 overflow-y-auto" aria-label="Documentation sections">
              {DOC_GROUPS.map((group) => (
                <div key={group.title}>
                  <p className={cn("text-[10px] font-bold uppercase tracking-[0.18em]", isLight ? "text-slate-400" : "text-slate-500")}>
                    {group.title}
                  </p>
                  <div className="mt-3 space-y-1">
                    {group.items.map((item: any) => {
                      const ItemIcon = DOC_DRAWER_ICONS[item.slug] ?? LuZap;
                      const isCurrent = item.slug === currentDocSlug;

                      return (
                        <NavLink
                          className={({ isActive }) =>
                            cn(
                              "flex min-h-11 items-center gap-3 rounded-xl border px-3 text-sm font-medium transition-colors",
                              isActive || isCurrent
                                ? isLight
                            ? "border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.04)] text-slate-950"
                            : "border-white/[0.1] bg-[rgba(255,255,255,0.05)] text-white"
                                : isLight
                                  ? "border-transparent text-slate-600 hover:border-[rgba(15,23,42,0.06)] hover:bg-slate-50 hover:text-slate-950"
                                  : "border-transparent text-slate-300 hover:border-white/[0.08] hover:bg-white/[0.05] hover:text-white"
                            )
                          }
                          key={item.slug}
                          onClick={closeDocsDrawer}
                          to={`/docs/${item.slug}`}
                        >
                          <ItemIcon className="h-4 w-4 shrink-0" />
                          <span>{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
