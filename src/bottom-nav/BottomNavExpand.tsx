import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import type { BottomNavProps } from "../nav/nav.types";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

export function BottomNavExpand({ items, activeId, onItemClick, className, style }: BottomNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeItem = items.find((item) => item.id === activeId) ?? items[0];
  const ActiveIcon = activeItem.icon;

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
    <nav
      aria-label="Mobile primary navigation"
      className={cn(
        "relative flex items-center justify-end mr-4 w-full max-w-[calc(100%-2rem)] ml-auto",
        className
      )}
      style={style}
    >
      {/* Expandable capsule — customize: h, rounded, bg, border, shadow, backdrop-blur */}
      <div
        ref={navRef}
        className={cn(
          "relative flex flex-row-reverse items-center h-14 rounded-full bg-white/90 dark:bg-[#111]/90 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] border border-slate-200/60 dark:border-white/10 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isExpanded ? "w-[320px] px-2" : "w-14 px-0 justify-center cursor-pointer hover:scale-105"
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "relative z-20 flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isExpanded
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20 rotate-90"
              : "bg-blue-700 text-white shadow-md hover:bg-blue-600 rotate-0"
          )}
          aria-label={isExpanded ? "Close menu" : "Open menu"}
          type="button"
        >
          {isExpanded ? <XIcon className="h-5 w-5" /> : <ActiveIcon className="h-[22px] w-[22px]" />}
        </button>

        {/* Expanded Items */}
        <div
          className={cn(
            "flex items-center justify-around overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isExpanded ? "opacity-100 w-full mr-1 translate-x-0" : "opacity-0 w-0 translate-x-8 pointer-events-none"
          )}
        >
          {items.map((item, index) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={cn(
                  "relative flex h-10 flex-1 items-center justify-center rounded-full transition-all duration-300",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-black hover:text-slate-900 dark:text-white dark:hover:text-white"
                )}
                disabled={item.disabled}
                onClick={() => {
                  onItemClick?.(item);
                  setIsExpanded(false);
                }}
                style={{
                  // Reverse delay so items closer to the button appear first
                  transitionDelay: isExpanded ? `${(items.length - 1 - index) * 40}ms` : "0ms",
                }}
                type="button"
              >
                <Icon className={cn("h-[22px] w-[22px] transition-transform duration-300", isActive && "scale-110 drop-shadow-sm")} />
                {isActive && (
                  <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
    </div>
  );
}
