import { cn } from "../lib/cn";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AtomIcon, SunIcon, MoonIcon, GitIcon } from "../icons/dashboard-icons";


export function Navbar({
  isLight,
  onThemeToggle
}: {
  isLight: boolean;
  onThemeToggle: () => void;
}) {
  const location = useLocation();
  const path = location.pathname;
  const isDocs = path.startsWith("/docs");
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

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 mx-auto w-full max-w-[1600px] px-4 animate-fade-in">
      <div
        className={cn(
          "flex h-16 items-center justify-between rounded-full px-8 py-2.5 backdrop-blur-xl transition-colors duration-300",
          isLight
            ? "border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.78)]"
            : "border border-white/[0.08] bg-[rgba(10,13,19,0.76)]"
        )}
      >
        
        {/* Brand Logo & Name */}
        <Link
          to="/"
          className="flex cursor-pointer items-center gap-3 transition-transform active:scale-[0.98]"
        >
          <div
            className={cn(
                )}
          >
            <AtomIcon className={cn("h-7 w-7", isLight ? "text-slate-900" : "text-white")} />
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className={cn("text-lg font-semibold tracking-tight font-sans", isLight ? "text-slate-950" : "text-white")}>Navis</span>
              {isDocs && (
                <span className={cn("text-lg font-normal tracking-tight font-sans", isLight ? "text-slate-600" : "text-slate-400")}>Docs</span>
              )}
            </span>
      
          </div>
        </Link>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-16">
          <NavLink className={navLinkClassName} end to="/">
            Overview
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              navLinkClassName({ isActive: isActive || isDocs })
            }
            to="/docs/introduction"
          >
            Documentation
          </NavLink>
          <NavLink className={navLinkClassName} to="/playground">
            Playground
          </NavLink>
        </div>

        {/* Action Button: Button-in-Button pattern */}
        <div className="hidden items-center gap-2 sm:flex">
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
            {isLight ? (
              <SunIcon className={cn("h-5 w-5", isLight ? "text-slate-900" : "text-white")} />
            ) : (
              <MoonIcon className={cn("h-5 w-5", isLight ? "text-slate-900" : "text-white")} />
            )}
          </button>

          <a
            href="https://github.com/HunkyManie/Navis"
            rel="noreferrer"
            target="_blank"
            className={cn(
              "group relative flex items-center justify-between gap-3.5 rounded-full border pl-5 pr-5 py-2.5 text-[16px] font-normal transition-all active:scale-[0.98]",
              isLight
                ? "border-[rgba(15,23,42,0.08)] bg-white text-slate-900 shadow-[0_18px_34px_-24px_rgba(15,23,42,0.2)] hover:bg-[rgba(15,23,42,0.05)]"
                : "border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.035)_100%)] text-white shadow-[0_20px_38px_-24px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.05)_100%)]"
            )}
          >
            <GitIcon className={cn("h-3.5 w-3.5", isLight ? "text-slate-900" : "text-white")} />
            Star on Github
          </a>
        </div>
      </div>
    </nav>
  );
}
