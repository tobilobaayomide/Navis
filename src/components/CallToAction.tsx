import { cn } from "../lib/cn";


type CallToActionProps = {
  isLight: boolean;
  onComponentsClick: () => void;
  onDocsClick: () => void;
};

export function CallToAction({ isLight, onComponentsClick, onDocsClick }: CallToActionProps) {
  return (
    <section className="relative w-full py-32 lg:py-48 overflow-hidden flex flex-col items-center justify-center">
      {/* Background Glow */}
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none",
        isLight ? "bg-indigo-200/50" : "bg-indigo-900/20"
      )} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">

        <h2 className={cn(
          "text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-tight mb-6",
          isLight ? "text-slate-950" : "text-white"
        )}>
          Ready to elevate your <br />
          <span className={cn(
            "bg-clip-text text-transparent bg-gradient-to-r",
            isLight ? "from-indigo-600 to-violet-500" : "from-indigo-400 to-violet-400"
          )}>
            development experience?
          </span>
        </h2>
        
        <p className={cn(
          "text-lg sm:text-xl font-light mb-10 max-w-2xl",
          isLight ? "text-slate-600" : "text-slate-400"
        )}>
          Stop fighting defaults. Start building with a foundation that bends to your will. Copy, paste, and ship faster.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onComponentsClick}
            className={cn(
              "group relative flex h-14 w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full px-8 text-sm font-medium",
              isLight
                ? "bg-slate-950 text-white hover:bg-slate-800 hover:shadow-[0_0_40px_-10px_rgba(15,23,42,0.4)]"
                : "bg-white text-slate-950 hover:bg-slate-200 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              Browse Components
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>

          <button
            onClick={onDocsClick}
            className={cn(
              "group relative flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border px-8 text-sm font-medium",
              isLight
                ? "border-slate-200 bg-white/50 backdrop-blur-sm text-slate-900 hover:bg-slate-50"
                : "border-white/10 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10"
            )}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 17L3 12L8 7M16 17L21 12L16 7M14 3L10 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Read Documentation
          </button>
        </div>
      </div>
    </section>
  );
}
