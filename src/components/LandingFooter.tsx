import { cn } from "../lib/cn";
import { Link } from "react-router-dom";
import { LuAtom, LuGithub } from "react-icons/lu";

type LandingFooterProps = {
  isLight: boolean;
};

export function LandingFooter({ isLight }: LandingFooterProps) {
  const borderClass = isLight ? "border-slate-200/80" : "border-white/10";
  const titleClass = isLight ? "text-slate-950" : "text-white";
  const textClass = isLight ? "text-slate-600" : "text-slate-400";

  return (
    <footer className={cn("mt-16 px-4 border-t", borderClass)}>
      <div className="mx-auto w-full py-0 pt-10 sm:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <span
                className={cn(
                  "flex items-center justify-center",
                )}
              >
                <LuAtom className="h-5 w-5 text-blue-500" />
              </span>
              <span className={cn("text-base font-semibold tracking-tight", titleClass)}>
                Navis UI
              </span>
            </Link>

            <p className={cn("max-w-max text-sm leading-7", textClass)}>
              High-fidelity bottom navigation rails for modern mobile-first web apps.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:gap-12">
            <div className="space-y-3">
              <p className={cn("text-[11px] font-semibold uppercase tracking-[0.2em]", isLight ? "text-black" : "text-white")}>
                Explore
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Docs", to: "/docs/introduction" },
                  { label: "Components", to: "/components" },
                  { label: "Playground", to: "/Playground" }
                ].map((item) => (
                  <Link
                    className={cn(
                      "text-sm transition-colors",
                      isLight ? "text-slate-600 hover:text-slate-950" : "text-slate-400 hover:text-white"
                    )}
                    key={item.to}
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className={cn("text-[11px] font-semibold uppercase tracking-[0.2em]", isLight ? "text-black" : "text-white")}>
                Project
              </p>
              <a
                href="https://github.com/tobilobaayomide/Navis"
                rel="noopener noreferrer"
                target="_blank"
                className={cn(
                  "inline-flex items-center gap-2 text-sm transition-colors",
                  isLight ? "text-slate-600 hover:text-slate-950" : "text-slate-400 hover:text-white"
                )}
              >
                <LuGithub className="h-4 w-4" />
                 Built by Tobiloba
              </a>
            </div>
          </div>
        </div>

        <div className={cn("mt-8 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between", isLight ? "border-slate-200/80" : "border-white/10")}>
          <p className={cn("text-sm leading-6", textClass)}>
            Designed to stay calm, readable, and responsive.
          </p>
          <p className={cn("text-sm leading-6", textClass)}>
            © 2026 Navis UI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
