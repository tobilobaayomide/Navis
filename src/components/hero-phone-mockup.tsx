import { useEffect, useState, type ReactNode } from "react";
import {
  CheckmarkCircle02Icon,
  MessageNotification01Icon,
  Notification01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { SiFigma, SiNotion, SiStripe } from "react-icons/si";
import { BottomNavFloating } from "../bottom-nav/bottom-nav-floating";
import { NAV_ITEMS } from "../data/nav-items";
import { cn } from "../lib/cn";

type HeroPhoneMockupProps = {
  isLight: boolean;
  activeId: string;
  onNavItemClick: (id: string) => void;
};

type ScreenTone = {
  accent: string;
  accentSoft: string;
  accentText: string;
  accentBorder: string;
};

type TransitionPhase = "idle" | "exiting";

const DARK_SURFACE = "bg-[#1C1C1E]";
const DARK_SURFACE_SOFT = "bg-[rgba(0,0,0,0.92)]";
const DARK_BORDER = "border-[rgba(58,58,60,1)]";

const screenTones: Record<string, ScreenTone> = {
  home: {
    accent: "from-blue-500 via-indigo-500 to-cyan-400",
    accentSoft: "bg-blue-500/10",
    accentText: "text-blue-600",
    accentBorder: "border-blue-500/20"
  },
  analytics: {
    accent: "from-emerald-500 via-teal-500 to-cyan-400",
    accentSoft: "bg-emerald-500/10",
    accentText: "text-emerald-600",
    accentBorder: "border-emerald-500/20"
  },
  wallet: {
    accent: "from-amber-500 via-orange-500 to-rose-400",
    accentSoft: "bg-amber-500/10",
    accentText: "text-amber-600",
    accentBorder: "border-amber-500/20"
  },
  alerts: {
    accent: "from-fuchsia-500 via-pink-500 to-rose-400",
    accentSoft: "bg-fuchsia-500/10",
    accentText: "text-fuchsia-600",
    accentBorder: "border-fuchsia-500/20"
  },
  settings: {
    accent: "from-slate-600 via-slate-500 to-slate-400",
    accentSoft: "bg-slate-500/10",
    accentText: "text-slate-700",
    accentBorder: "border-slate-500/20"
  }
};

function ScreenHeader({
  title,
  subtitle,
  isLight,
  activeId
}: {
  title: string;
  subtitle: string;
  isLight: boolean;
  activeId: string;
}) {
  const tone = screenTones[activeId] ?? screenTones.home;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-[0.95rem] border shadow-[0_10px_18px_-16px_rgba(15,23,42,0.35)]",
              isLight ? "border-slate-200 bg-slate-950 text-white" : `${DARK_BORDER} ${DARK_SURFACE} text-white`
            )}
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
              <path d="M6.5 17V7.1l11 9.8V7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="leading-none">
            <div className={cn("text-[0.78rem] font-semibold tracking-[0.08em]", isLight ? "text-slate-950" : "text-white")}>Navis UI</div>
            <div className={cn("text-[0.56rem] font-medium uppercase tracking-[0.24em]", isLight ? "text-slate-500" : "text-slate-400")}>Mobile</div>
          </div>
        </div>
        <div className={cn("text-[0.66rem] font-semibold uppercase tracking-[0.24em]", isLight ? "text-slate-500" : "text-slate-400")}>
          {subtitle}
        </div>
        <h2 className={cn("text-[1.15rem] font-semibold tracking-[-0.05em] leading-none", isLight ? "text-slate-950" : "text-white")}>{title}</h2>
      </div>
      <div
          className={cn(
            "flex h-9 shrink-0 items-center justify-center rounded-xl border px-2.5 backdrop-blur-sm",
            tone.accentSoft,
            tone.accentBorder,
            isLight ? "shadow-[0_12px_24px_-18px_rgba(15,23,42,0.32)]" : `${DARK_BORDER} ${DARK_SURFACE_SOFT} shadow-[0_12px_24px_-18px_rgba(0,0,0,0.58)]`
          )}
        >
        <span className={cn("text-[0.62rem] font-semibold uppercase tracking-[0.18em]", tone.accentText)}>Live</span>
      </div>
    </div>
  );
}

function MetricChip({
  label,
  value,
  isLight,
  tone,
  subtle = false
}: {
  label: string;
  value: string;
  isLight: boolean;
  tone: ScreenTone;
  subtle?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[1rem] border px-3 py-2 backdrop-blur-sm",
        subtle
          ? isLight
            ? "border-slate-200 bg-slate-50"
            : `${DARK_BORDER} ${DARK_SURFACE_SOFT}`
          : isLight
            ? "border-slate-200 bg-white shadow-[0_12px_22px_-20px_rgba(15,23,42,0.25)]"
            : `${DARK_BORDER} ${DARK_SURFACE} shadow-[0_12px_22px_-20px_rgba(0,0,0,0.38)]`
      )}
    >
      <div className={cn("text-[0.64rem] font-medium uppercase tracking-[0.18em]", isLight ? "text-slate-500" : "text-slate-400")}>
        {label}
      </div>
      <div className="mt-1 flex items-end justify-between gap-2">
        <div className={cn("text-[0.95rem] font-semibold tracking-[-0.04em]", isLight ? "text-slate-950" : "text-white")}>{value}</div>
        <div className={cn("rounded-full px-2 py-0.5 text-[0.67rem] font-semibold", tone.accentSoft, tone.accentText)}>
          {subtle ? "Live" : "Up"}
        </div>
      </div>
    </div>
  );
}

function ContentBlock({
  children,
  isLight,
  className
}: {
  children: ReactNode;
  isLight: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.35rem] border p-3 backdrop-blur-sm",
        isLight ? "border-slate-200 bg-white shadow-[0_18px_34px_-28px_rgba(15,23,42,0.28)]" : `${DARK_BORDER} ${DARK_SURFACE} shadow-[0_20px_30px_-28px_rgba(0,0,0,0.7)]`,
        className
      )}
    >
      {children}
    </div>
  );
}

function PhoneStatusBar({ isLight }: { isLight: boolean }) {
  return (
    <div className={cn("flex items-center justify-between px-1 text-[0.62rem] font-medium tracking-[0.03em]", isLight ? "text-slate-500" : "text-slate-400")}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <span className={cn("h-1.5 w-1.5 rounded-full", isLight ? "bg-slate-400" : "bg-slate-300")} />
        <span className={cn("h-1 w-4 rounded-full", isLight ? "bg-slate-400" : "bg-slate-300")} />
        <span className={cn("h-2.5 w-4 rounded-[0.2rem] border", isLight ? "border-slate-300" : "border-slate-500")} />
      </div>
    </div>
  );
}

function AvatarBadge({
  initials,
  accent,
  isLight
}: {
  initials: string;
  accent: string;
  isLight: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border text-[0.72rem] font-semibold",
        accent,
        isLight ? "border-white/80 text-white shadow-[0_10px_18px_-16px_rgba(15,23,42,0.35)]" : `${DARK_BORDER} text-white shadow-[0_10px_18px_-16px_rgba(0,0,0,0.6)]`
      )}
    >
      {initials}
    </div>
  );
}

function HomeScreen({ isLight, activeId }: { isLight: boolean; activeId: string }) {
  const tone = screenTones.home;

  return (
    <div className="space-y-3">
      <PhoneStatusBar isLight={isLight} />
      <ScreenHeader title="Workspace" subtitle="Good morning" isLight={isLight} activeId={activeId} />

      <ContentBlock isLight={isLight} className="overflow-hidden">
        <div
          className={cn(
            "rounded-[1.05rem] p-3",
            isLight
              ? "border border-slate-200 bg-white text-slate-950 shadow-[0_14px_24px_-22px_rgba(15,23,42,0.28)]"
              : `${DARK_SURFACE} text-white`
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className={cn("text-[0.66rem] font-medium uppercase tracking-[0.18em]", isLight ? "text-slate-500" : "text-white/55")}>Next up</div>
              <div className={cn("mt-1 text-[1.1rem] font-semibold tracking-[-0.05em]", isLight ? "text-slate-950" : "text-white")}>
                Design review with the team
              </div>
              <div className={cn("mt-1 text-[0.74rem]", isLight ? "text-slate-500" : "text-white/68")}>10:30 AM · Meeting room B</div>
            </div>
            <div className={cn("rounded-full px-2.5 py-1 text-[0.68rem] font-medium", isLight ? "bg-slate-100 text-slate-700" : "bg-white/10 text-white/80")}>3 people</div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex -space-x-2">
              <AvatarBadge initials="MJ" accent="bg-blue-500" isLight={isLight} />
              <AvatarBadge initials="AL" accent="bg-emerald-500" isLight={isLight} />
              <AvatarBadge initials="DP" accent="bg-amber-500" isLight={isLight} />
            </div>
            <div className={cn("rounded-full px-2.5 py-1 text-[0.68rem] font-medium", isLight ? "bg-slate-100 text-slate-700" : "bg-white/10 text-white/80")}>
              On time
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <MetricChip label="Open tasks" value="12" isLight={isLight} tone={tone} />
            <MetricChip label="Unread" value="4" isLight={isLight} tone={tone} />
          </div>
        </div>
      </ContentBlock>

      <div className="space-y-2.5">
        {[
          ["Release checklist", "7 done · 2 left", "blue"],
          ["Messages", "12 unread", "emerald"]
        ].map(([title, meta], index) => (
          <div
            key={title}
            className={cn(
              "flex items-center justify-between rounded-[1rem] border px-3 py-2.5",
              isLight ? "border-slate-200 bg-slate-50" : `${DARK_BORDER} ${DARK_SURFACE}`
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-[0.85rem] border",
                  isLight ? "border-slate-200 bg-white" : `${DARK_BORDER} ${DARK_SURFACE}`,
                  index === 0 ? (isLight ? "text-blue-600" : "text-blue-300") : isLight ? "text-emerald-600" : "text-emerald-300"
                )}
              >
                <HugeiconsIcon
                  icon={index === 0 ? CheckmarkCircle02Icon : MessageNotification01Icon}
                  size={16}
                  strokeWidth={1.8}
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-0.5">
                <div className={cn("text-[0.84rem] font-medium tracking-[-0.02em]", isLight ? "text-slate-950" : "text-white")}>{title}</div>
                <div className={cn("text-[0.74rem]", isLight ? "text-slate-500" : "text-slate-400")}>{meta}</div>
              </div>
            </div>
            <div className={cn("h-2 w-2 rounded-full", index === 0 ? "bg-blue-500" : "bg-emerald-500")} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsScreen({ isLight, activeId }: { isLight: boolean; activeId: string }) {
  const tone = screenTones.analytics;

  return (
    <div className="space-y-3">
      <PhoneStatusBar isLight={isLight} />
      <ScreenHeader title="Revenue" subtitle="This week" isLight={isLight} activeId={activeId} />

      <ContentBlock isLight={isLight}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className={cn("text-[0.66rem] font-medium uppercase tracking-[0.18em]", isLight ? "text-slate-500" : "text-slate-400")}>Net growth</div>
            <div className={cn("mt-1 text-[1.15rem] font-semibold tracking-[-0.06em]", isLight ? "text-slate-950" : "text-white")}>$84.2k</div>
          </div>
          <div className={cn("rounded-full px-2.5 py-1 text-[0.68rem] font-semibold", tone.accentSoft, tone.accentText)}>+12.4%</div>
        </div>

        <div className="mt-3 flex h-20 items-end gap-2">
          {[34, 58, 44, 72, 66, 92].map((value, index) => (
            <div key={value} className="flex-1">
              <div
                className={cn("mx-auto w-full rounded-t-[0.85rem] bg-gradient-to-t", tone.accent)}
                style={{ height: `${value}%`, opacity: 0.2 + index * 0.12 }}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <MetricChip label="Retention" value="91%" isLight={isLight} tone={tone} />
          <MetricChip label="ARPU" value="$24.8" isLight={isLight} tone={tone} />
          <MetricChip label="Churn" value="3.2%" isLight={isLight} tone={tone} />
         </div>
      </ContentBlock>
    </div>
  );
}

function WalletScreen({ isLight, activeId }: { isLight: boolean; activeId: string }) {
  const tone = screenTones.wallet;

  return (
    <div className="space-y-3">
      <PhoneStatusBar isLight={isLight} />
      <ScreenHeader title="Billing" subtitle="Payouts" isLight={isLight} activeId={activeId} />

      <ContentBlock isLight={isLight}>
        <div className={cn("rounded-[1.1rem] p-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]", "bg-gradient-to-br", tone.accent)}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[0.66rem] font-medium uppercase tracking-[0.18em] text-white/70">Operating balance</div>
              <div className="mt-1 text-[1.25rem] font-semibold tracking-[-0.06em]">$38,420.00</div>
            </div>
            <div className="rounded-[0.7rem] border border-white/20 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/80">
              Visa
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 text-[0.72rem] text-white/75">
            <span>•••• 2048</span>
            <span>Auto-renew on</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <MetricChip label="Incoming" value="+$11.2k" isLight={isLight} tone={tone} />
          <MetricChip label="Outgoing" value="-$3.8k" isLight={isLight} tone={tone} />
        </div>
        <div className="mt-3 space-y-2">
          {[
            ["Stripe payout", "+$980.00", "Today, 08:14"],
            ["Figma", "-$19.00", "Yesterday"],
            ["Notion", "-$12.00", "Mon"]
          ].map(([label, amount, meta], index) => (
            <div
              key={label}
              className={cn(
                "flex items-center justify-between rounded-[1rem] border px-3 py-2.5",
                isLight ? "border-slate-200 bg-slate-50 shadow-[0_10px_18px_-18px_rgba(15,23,42,0.26)]" : `${DARK_BORDER} ${DARK_SURFACE}`
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-[0.85rem] border",
                    index === 0
                      ? isLight
                        ? "border-indigo-500/20 bg-indigo-500/10 text-indigo-600"
                        : "border-indigo-400/20 bg-indigo-400/10 text-indigo-300"
                      : index === 1
                        ? isLight
                          ? "border-violet-500/20 bg-violet-500/10 text-violet-600"
                          : "border-violet-400/20 bg-violet-400/10 text-violet-300"
                        : isLight
                          ? "border-slate-200 bg-white text-slate-950"
                          : `${DARK_BORDER} bg-slate-100 text-slate-950`
                  )}
                >
                  {index === 0 ? (
                    <SiStripe className="h-4 w-4" aria-hidden="true" />
                  ) : index === 1 ? (
                    <SiFigma className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <SiNotion className="h-4 w-4" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <div className={cn("text-[0.82rem] font-medium", isLight ? "text-slate-950" : "text-white")}>{label}</div>
                  <div className={cn("text-[0.74rem]", isLight ? "text-slate-500" : "text-slate-400")}>{meta}</div>
                </div>
              </div>
              <div className={cn("text-[0.82rem] font-semibold", amount.startsWith("+") ? "text-emerald-500" : "text-rose-500")}>{amount}</div>
            </div>
          ))}
        </div>
      </ContentBlock>
    </div>
  );
}

function AlertsScreen({ isLight, activeId }: { isLight: boolean; activeId: string }) {
  const tone = screenTones.alerts;

  return (
    <div className="space-y-3">
      <PhoneStatusBar isLight={isLight} />
      <ScreenHeader title="Alerts" subtitle="Inbox" isLight={isLight} activeId={activeId} />

      <ContentBlock isLight={isLight}>
        {[
          {
            title: "Payment failed for Andrew K.",
            meta: "2m",
            icon: Notification01Icon,
            tone: "rose"
          },
          {
            title: "Deploy completed successfully",
            meta: "18m",
            icon: CheckmarkCircle02Icon,
            tone: "emerald"
          },
          {
            title: "New mention in #sales",
            meta: "1h",
            icon: MessageNotification01Icon,
            tone: "blue"
          }
        ].map((item, index) => (
          <div
            key={item.title}
              className={cn(
                "flex items-center justify-between rounded-[1rem] px-2 py-2.5",
                isLight
                  ? index !== 2
                    ? "border-b border-slate-200"
                    : ""
                  : index !== 2
                    ? `border-b ${DARK_BORDER}`
                    : ""
              )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-[0.85rem] border",
                  isLight ? "border-slate-200 bg-white" : DARK_BORDER,
                  item.tone === "rose"
                    ? isLight
                      ? "bg-rose-500/10 text-rose-600"
                      : "bg-rose-500/10 text-rose-300"
                    : item.tone === "emerald"
                      ? isLight
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-emerald-500/10 text-emerald-300"
                      : isLight
                        ? "bg-blue-500/10 text-blue-600"
                        : "bg-blue-500/10 text-blue-300"
                )}
              >
                <HugeiconsIcon icon={item.icon} size={16} strokeWidth={1.8} className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <div className={cn("text-[0.82rem] font-medium", isLight ? "text-slate-950" : "text-white")}>{item.title}</div>
                <div className={cn("text-[0.74rem]", isLight ? "text-slate-500" : "text-slate-400")}>
                  {index === 0 ? "Visa ending 2048 was declined" : index === 1 ? "Web app v2.4 deployed" : "2 new replies"}
                </div>
              </div>
            </div>
            <div className={cn("rounded-full px-2 py-1 text-[0.68rem] font-semibold", tone.accentSoft, tone.accentText)}>{item.meta}</div>
          </div>
        ))}
      </ContentBlock>
    </div>
  );
}

function SettingsScreen({ isLight, activeId }: { isLight: boolean; activeId: string }) {
  const tone = screenTones.settings;

  return (
    <div className="space-y-3">
      <PhoneStatusBar isLight={isLight} />
      <ScreenHeader title="Account" subtitle="Workspace" isLight={isLight} activeId={activeId} />

      <ContentBlock isLight={isLight}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] bg-gradient-to-br from-slate-700 to-slate-400 text-sm font-semibold text-white">
            M
          </div>
          <div>
            <div className={cn("text-[0.85rem] font-semibold", isLight ? "text-slate-950" : "text-white")}>Maya Johnson</div>
            <div className="text-[0.74rem] text-slate-500">Product lead</div>
          </div>
          <div
            className={cn(
              "ml-auto rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold",
              isLight ? "border-slate-200 bg-slate-100 text-slate-700" : `${DARK_BORDER} ${DARK_SURFACE} text-slate-300`
            )}
          >
            Pro
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {[
            ["Notifications", "Enabled"],
            ["Appearance", "Auto"],
            ["Privacy", "Protected"]
          ].map(([label, value]) => (
            <div
              key={label}
              className={cn(
                "flex items-center justify-between rounded-[0.95rem] border px-3 py-2.5",
                isLight ? "border-slate-200 bg-slate-50 shadow-[0_10px_18px_-18px_rgba(15,23,42,0.28)]" : `${DARK_BORDER} ${DARK_SURFACE}`
              )}
            >
              <div className={cn("text-[0.82rem] font-medium", isLight ? "text-slate-950" : "text-white")}>{label}</div>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-4 w-7 rounded-full p-[2px]",
                    value === "Enabled"
                      ? isLight
                        ? "bg-emerald-500/18"
                        : "bg-emerald-500/20"
                      : isLight
                        ? "bg-slate-200"
                        : "bg-slate-500/15"
                  )}
                >
                  <div
                    className={cn(
                      "h-3 w-3 rounded-full shadow-sm transition-transform",
                      isLight ? "bg-white" : "bg-slate-100",
                      value === "Enabled" ? "translate-x-3" : "translate-x-0"
                    )}
                  />
                </div>
                <div className={cn("text-[0.74rem]", isLight ? "text-slate-500" : "text-slate-400")}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={cn("mt-3 rounded-[1rem] border px-3 py-2.5", tone.accentBorder, tone.accentSoft)}>
          <div className={cn("text-[0.72rem] font-semibold uppercase tracking-[0.16em]", tone.accentText)}>Subscription</div>
          <p className="mt-1.5 text-[0.74rem] leading-relaxed text-slate-500">Pro plan renews on June 28 with 8 seats active.</p>
        </div>
      </ContentBlock>
    </div>
  );
}

function PhoneScreen({ isLight, activeId }: { isLight: boolean; activeId: string }) {
  const key = activeId in screenTones ? activeId : "home";

  return (
    <div key={key} className="relative">
      {key === "home" ? <HomeScreen isLight={isLight} activeId={key} /> : null}
      {key === "analytics" ? <AnalyticsScreen isLight={isLight} activeId={key} /> : null}
      {key === "wallet" ? <WalletScreen isLight={isLight} activeId={key} /> : null}
      {key === "alerts" ? <AlertsScreen isLight={isLight} activeId={key} /> : null}
      {key === "settings" ? <SettingsScreen isLight={isLight} activeId={key} /> : null}
    </div>
  );
}

function PhoneScreenTransition({ isLight, activeId }: { isLight: boolean; activeId: string }) {
  const [displayId, setDisplayId] = useState(activeId);
  const [phase, setPhase] = useState<TransitionPhase>("idle");

  useEffect(() => {
    if (activeId === displayId) return;

    setPhase("exiting");

    const timeoutId = window.setTimeout(() => {
      setDisplayId(activeId);
      setPhase("idle");
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [activeId, displayId]);

  return (
    <div
      className={cn(
        "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        phase === "idle" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
      )}
    >
      <PhoneScreen isLight={isLight} activeId={displayId} />
    </div>
  );
}

export function HeroPhoneMockup({ isLight, activeId, onNavItemClick }: HeroPhoneMockupProps) {
  const shellHeight = "h-[680px]";
  const deviceHeight = "h-[860px]";
  const deviceWidth = "w-[424px]";
  const deviceBottom = "bottom-[15rem]";
  const deviceTransform = "translate3d(-50%, 0, 0) perspective(1600px) rotateY(-14deg) rotateZ(8deg) scale(1.16)";

  return (
    <div className={cn("relative mx-auto w-[760px] border rounded-[1.5rem] dark:border-white/10 max-w-full flex-none overflow-hidden", shellHeight)}>
      {isLight ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 bottom-2 h-[18rem] rounded-full bg-[rgba(79,70,229,0.16)] blur-[120px]"
        />
      ) :  <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 bottom-2 h-[18rem] rounded-full bg-[rgba(79,70,229,0.16)] blur-[120px]"
        />
        }

      <div
        className={cn("absolute left-1/2 origin-bottom", deviceHeight, deviceWidth, deviceBottom)}
        style={{ transform: deviceTransform, transformOrigin: "50% 100%" }}
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute rounded-[3.75rem]",
            isLight
              ? "inset-0 translate-x-4 translate-y-5 blur-3xl bg-black/20"
              : "inset-2 translate-x-1 translate-y-1 blur-xl bg-black/35 opacity-25"
          )}
        />

        <div
          className={cn(
            "absolute inset-0 rounded-[4.4rem] border p-[12px]",
            isLight
              ? "border-white/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_0%,rgba(240,245,250,0.98)_42%,rgba(220,228,239,0.98)_100%)] shadow-[0_55px_120px_-52px_rgba(15,23,42,0.55),inset_0_1px_0_rgba(255,255,255,0.92)]"
              : `${DARK_BORDER} bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.98)_42%,rgba(0,0,0,1)_100%)] shadow-[0_55px_120px_-62px_rgba(0,0,0,0.92),inset_0_1px_0_rgba(255,255,255,0.04)]`
          )}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-[1px] rounded-[4.15rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.05)_18%,rgba(255,255,255,0.02)_44%,rgba(0,0,0,0.18)_100%)]",
              isLight ? "opacity-70" : "opacity-45"
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-x-[24px] top-[8px] h-[3px] rounded-full blur-[1px]",
              isLight ? "bg-white/35" : "bg-[rgba(58,58,60,0.6)]"
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-y-[12px] left-[-2px] bottom-[-2px] w-[380px] rounded-l-[4.5rem] bg-gradient-to-r",
              isLight ? "from-white/42 via-white/14 to-transparent" : "from-[rgba(58,58,60,0.24)] via-[rgba(58,58,60,0.1)] to-transparent"
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-y-[12px] right-[-2px] bottom-[-2px] w-[380px] rounded-r-[4.5rem] bg-gradient-to-l",
              isLight ? "from-white/42 via-white/14 to-transparent" : "from-[rgba(58,58,60,0.24)] via-[rgba(58,58,60,0.1)] to-transparent"
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "absolute left-1/2 top-[10px] h-[4px] w-[58px] -translate-x-1/2 rounded-full",
              isLight ? "bg-black/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" : "bg-[rgba(233,233,235,0.88)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            )}
          />

          <div className="absolute inset-[12px] rounded-[3.15rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-18px_40px_-28px_rgba(0,0,0,0.24),0_18px_34px_-24px_rgba(0,0,0,0.42)]">
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 rounded-[3.25rem]",
              isLight
                ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_1px_0_0_rgba(255,255,255,0.05),inset_-1px_0_0_rgba(15,23,42,0.04)]"
                : "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_1px_0_0_rgba(255,255,255,0.03),inset_-1px_0_0_rgba(0,0,0,0.28)]"
            )}
          />
          <div
            className={cn(
              "absolute inset-0 overflow-hidden rounded-[3.25rem]",
              isLight ? "bg-white" : DARK_SURFACE
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0",
                isLight
                  ? "bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.995)_28%,rgba(247,249,252,1)_100%)]"
                  : "bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_28%,rgba(0,0,0,1)_100%)]"
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 top-0 h-20",
                isLight ? "bg-gradient-to-b from-white/95 to-transparent" : "bg-gradient-to-b from-[rgba(0,0,0,0.9)] to-transparent"
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 bottom-0 h-24",
                isLight ? "bg-gradient-to-t from-black/5 to-transparent" : "bg-gradient-to-t from-black/55 to-transparent"
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-[1px] rounded-[3rem] ring-1 ring-inset",
                isLight ? "ring-slate-200/55" : "ring-[rgba(58,58,60,1)]"
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-[1px] rounded-[3rem]",
                isLight
                  ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.72)]"
                  : "shadow-[inset_0_0_0_1px_rgba(15,23,42,0.65)]"
              )}
            />

            <div className="absolute inset-0 z-0 flex items-end overflow-hidden rounded-[3.25rem] px-5 pb-32 pt-16">
              <div className="w-full">
                <PhoneScreenTransition isLight={isLight} activeId={activeId} />
              </div>
            </div>

            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 z-10 opacity-70",
                isLight
                  ? "bg-[linear-gradient(140deg,transparent_0%,rgba(255,255,255,0.18)_22%,transparent_40%)]"
                  : "bg-[linear-gradient(140deg,transparent_0%,rgba(148,163,184,0.08)_22%,transparent_40%)]"
              )}
            />

            <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-5">
              <BottomNavFloating
                items={NAV_ITEMS}
                activeId={activeId}
                className="mx-auto shadow-[0_18px_55px_-26px_rgba(15,23,42,0.42)]"
                onItemClick={(item) => onNavItemClick(item.id)}
              />
            </div>

            <div className={cn("absolute bottom-1.5 left-1/2 z-20 h-1 w-28 -translate-x-1/2 rounded-full", isLight ? "bg-black/60" : "bg-[rgba(233,233,235,0.25)]")} />
          </div>
        </div>
        </div>

        <div
          aria-hidden="true"
          className={cn(
            "absolute left-[-1px] top-[9rem] h-24 w-1.5 rounded-r-full shadow-none",
            isLight
              ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.48)_0%,rgba(255,255,255,0.22)_38%,rgba(255,255,255,0.08)_72%,rgba(148,163,184,0.14)_100%)]"
              : DARK_SURFACE
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "absolute left-[-1px] top-[13rem] h-16 w-1.5 rounded-r-full shadow-none",
            isLight
              ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.20)_40%,rgba(255,255,255,0.08)_76%,rgba(148,163,184,0.12)_100%)]"
              : DARK_SURFACE
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "absolute right-[-1px] top-[10rem] h-28 w-1.5 rounded-l-full shadow-none",
            isLight
              ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.14)_40%,rgba(255,255,255,0.05)_76%,rgba(148,163,184,0.12)_100%)]"
              : DARK_SURFACE
          )}
        />
      </div>
    </div>
  );
}
