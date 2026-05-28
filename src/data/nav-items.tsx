import {
  BellIcon,
  ChartIcon,
  CourseNavIcon,
  DashboardIcon,
  DiscoverIcon,
  HomeAltIcon,
  HomeIcon,
  InboxIcon,
  LibraryIcon,
  ProfileIcon,
  SavedIcon,
  SettingsIcon,
  UpdatesIcon,
  WalletIcon
} from "../icons/dashboard-icons";
import type { NavItem } from "../nav/nav.types";

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "/home", icon: HomeIcon },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: ChartIcon },
  { id: "wallet", label: "Wallet", href: "/wallet", icon: WalletIcon },
  { id: "alerts", label: "Alerts", href: "/alerts", icon: BellIcon, badge: 8 },
  { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon }
];

export const PILL_NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", href: "/overview", icon: DashboardIcon },
  { id: "courses", label: "Courses", href: "/courses", icon: CourseNavIcon },
  { id: "library", label: "Library", href: "/library", icon: LibraryIcon },
  { id: "updates", label: "Updates", href: "/updates", icon: UpdatesIcon, badge: 8 },
  { id: "profile", label: "Profile", href: "/profile", icon: ProfileIcon }
];

export const FLOATING_NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "/home", icon: HomeAltIcon },
  { id: "discover", label: "Discover", href: "/discover", icon: DiscoverIcon },
  { id: "inbox", label: "Inbox", href: "/inbox", icon: InboxIcon, badge: 3 },
  { id: "saved", label: "Saved", href: "/saved", icon: SavedIcon },
  { id: "profile", label: "Profile", href: "/profile", icon: ProfileIcon }
];
