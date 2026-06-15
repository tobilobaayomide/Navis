import {
  AccountSetting03Icon,
  AnalyticsUpIcon,
  BellDotIcon,
  Bookmark01Icon,
  BookOpen02Icon,
  Cards02Icon,
  ChartLineData03Icon,
  CourseIcon,
  DashboardSquare02Icon,
  DiscoverCircleIcon,
  Home04Icon,
  Home09Icon,
  Message01Icon,
  MessageNotification01Icon,
  Moon02Icon,
  Notification01Icon,
  Settings01Icon,
  Sun03Icon,
  UserCircleIcon,
  Wallet01Icon,
  AtomicPowerIcon,
  GithubIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function HugeIcon({
  icon,
  className,
  strokeWidth = 1.7,
  ...props
}: Omit<IconProps, "strokeWidth"> & { icon: any; strokeWidth?: number | string }) {
  const numericStrokeWidth = typeof strokeWidth === "string" ? parseFloat(strokeWidth) : strokeWidth;
  return (
    <HugeiconsIcon
      absoluteStrokeWidth
      className={className}
      icon={icon}
      size={24}
      strokeWidth={numericStrokeWidth}
      {...props}
    />
  );
}

export function GitIcon(props: IconProps) {
  return <HugeIcon icon={GithubIcon} {...props} />;
}

export function AtomIcon(props: IconProps) {
  return <HugeIcon icon={AtomicPowerIcon} {...props} />;
}

export function SunIcon(props: IconProps) {
  return <HugeIcon icon={Sun03Icon} {...props} />;
}

export function MoonIcon(props: IconProps) {
  return <HugeIcon icon={Moon02Icon} {...props} />;
}

export function HomeIcon(props: IconProps) {
  return <HugeIcon icon={Home04Icon} {...props} />;
}

export function HomeAltIcon(props: IconProps) {
  return <HugeIcon icon={Home09Icon} strokeWidth={1.8} {...props} />;
}

export function DashboardIcon(props: IconProps) {
  return <HugeIcon icon={DashboardSquare02Icon} strokeWidth={1.8} {...props} />;
}

export function ChartIcon(props: IconProps) {
  return <HugeIcon icon={AnalyticsUpIcon} {...props} />;
}

export function InsightsIcon(props: IconProps) {
  return <HugeIcon icon={ChartLineData03Icon} strokeWidth={1.8} {...props} />;
}

export function WalletIcon(props: IconProps) {
  return <HugeIcon icon={Wallet01Icon} {...props} />;
}

export function CardsIcon(props: IconProps) {
  return <HugeIcon icon={Cards02Icon} strokeWidth={1.8} {...props} />;
}

export function BellIcon(props: IconProps) {
  return <HugeIcon icon={Notification01Icon} {...props} />;
}

export function AlertsIcon(props: IconProps) {
  return <HugeIcon icon={BellDotIcon} strokeWidth={1.8} {...props} />;
}

export function DiscoverIcon(props: IconProps) {
  return <HugeIcon icon={DiscoverCircleIcon} strokeWidth={1.8} {...props} />;
}

export function InboxIcon(props: IconProps) {
  return <HugeIcon icon={Message01Icon} strokeWidth={1.8} {...props} />;
}

export function SavedIcon(props: IconProps) {
  return <HugeIcon icon={Bookmark01Icon} strokeWidth={1.8} {...props} />;
}

export function ProfileIcon(props: IconProps) {
  return <HugeIcon icon={UserCircleIcon} strokeWidth={1.8} {...props} />;
}

export function SettingsIcon(props: IconProps) {
  return <HugeIcon icon={Settings01Icon} {...props} />;
}

export function PreferencesIcon(props: IconProps) {
  return <HugeIcon icon={AccountSetting03Icon} strokeWidth={1.8} {...props} />;
}

export function CourseNavIcon(props: IconProps) {
  return <HugeIcon icon={CourseIcon} strokeWidth={1.8} {...props} />;
}

export function LibraryIcon(props: IconProps) {
  return <HugeIcon icon={BookOpen02Icon} strokeWidth={1.8} {...props} />;
}

export function UpdatesIcon(props: IconProps) {
  return <HugeIcon icon={MessageNotification01Icon} strokeWidth={1.8} {...props} />;
}
