import { cn } from "../lib/cn";

const comparisonRows = [
  {
    density: "Low",
    fit: "Dashboards and admin tools",
    motion: "Quiet transforms and subtle label lift",
    signature: "Content-first, low-noise baseline",
    variant: "Minimal"
  },
  {
    density: "Medium",
    fit: "Consumer feeds and inbox-first products",
    motion: "Sliding capsule with directional settle",
    signature: "Detached rail that feels fast and breathable",
    variant: "Floating"
  },
  {
    density: "Medium",
    fit: "Profile, community, and education apps",
    motion: "Weighty capsule press with polished rebound",
    signature: "Dark tactile centerpiece with premium depth",
    variant: "Pill"
  },
  {
    density: "High",
    fit: "Developer surfaces and utility tooling",
    motion: "Sharp active bar and fast contrast handoff",
    signature: "Clear state visibility with technical edge",
    variant: "Indicator"
  },
  {
    density: "Medium",
    fit: "Brand-led products and discovery flows",
    motion: "Raised center action with layered glass shifts",
    signature: "Most expressive and signature-heavy option",
    variant: "Glass"
  }
];

export function BentoFeatures({ isLight }: { isLight: boolean }) {
  return (
    <section id="features-section" className="py-20 md:py-24 scroll-mt-20">
      <div className="space-y-6">
        <div className="max-w-4xl space-y-3 text-left">
          <span
            className={cn(
              "inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
              isLight
                ? "border-[rgba(15,23,42,0.08)] bg-[rgba(237,243,236,0.9)] text-[#346538]"
                : "border-white/[0.08] bg-[rgba(255,255,255,0.04)] text-slate-300"
            )}
          >
            Variant matrix
          </span>
          <h2
            className={cn(
              "max-w-[15ch] text-4xl font-semibold tracking-[0.03em] leading-[0.98] sm:text-5xl md:text-6xl",
              isLight ? "text-[#171717]" : "text-white"
            )}
          >
            Choose the rail by behavior.
          </h2>
          <p className={cn("max-w-[90ch] text-[20px] font-light leading-8", isLight ? "text-[#787774]" : "text-slate-300")}>
            Each variant solves a different product mood. Use the matrix to decide quickly, then fine-tune the choice in the playground.
          </p>
        </div>

        <div
          className={cn(
            "overflow-hidden rounded-[12px] border",
            isLight
              ? "border-[rgba(15,23,42,0.08)] bg-white"
              : "border-white/[0.08] bg-[rgba(16,20,28,0.92)]"
          )}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead
                className={cn(
                  "text-[15px] uppercase tracking-[0.16em]",
                  isLight
                    ? "bg-[rgba(247,246,243,0.95)] text-[#787774]"
                    : "bg-[rgba(255,255,255,0.03)] text-slate-400"
                )}
              >
                <tr>
                  <th className="px-5 py-4 font-semibold">Variant</th>
                  <th className="px-5 py-4 font-semibold">Density</th>
                  <th className="px-5 py-4 font-semibold">Motion</th>
                  <th className="px-5 py-4 font-semibold">Best fit</th>
                  <th className="px-5 py-4 font-semibold">Signature feel</th>
                </tr>
              </thead>
              <tbody className={cn(isLight ? "divide-y divide-[rgba(15,23,42,0.06)]" : "divide-y divide-white/[0.08]")}>
                {comparisonRows.map((row, index) => (
                  <tr
                    className={cn(
                      "transition-colors",
                      isLight ? "hover:bg-[rgba(251,251,250,0.96)]" : "hover:bg-[rgba(255,255,255,0.02)]"
                    )}
                    key={row.variant}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <td className="px-5 py-4 align-top">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
                          isLight
                            ? "bg-[rgba(225,243,254,0.9)] text-[#1f6c9f]"
                            : "bg-[rgba(255,255,255,0.05)] text-slate-200"
                        )}
                      >
                        {row.variant}
                      </span>
                    </td>
                    <td className={cn("px-5 py-4 text-sm font-medium align-top", isLight ? "text-[#171717]" : "text-slate-100")}>
                      {row.density}
                    </td>
                    <td className={cn("px-5 py-4 text-[15px] font-light align-top", isLight ? "text-[#787774]" : "text-slate-300")}>
                      {row.motion}
                    </td>
                    <td className={cn("px-5 py-4 text-[15px] font-light align-top", isLight ? "text-[#787774]" : "text-slate-300")}>
                      {row.fit}
                    </td>
                    <td className={cn("px-5 py-4 text-[15px] font-light align-top", isLight ? "text-[#171717]" : "text-slate-200")}>
                      {row.signature}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
