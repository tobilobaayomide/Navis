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
  { id: "home", label: "Home", path: "/home", icon: HomeIcon },
  { id: "analytics", label: "Analytics", path: "/analytics", icon: ChartIcon },
  { id: "wallet", label: "Wallet", path: "/wallet", icon: WalletIcon },
  { id: "alerts", label: "Alerts", path: "/alerts", icon: BellIcon },
  { id: "settings", label: "Settings", path: "/settings", icon: SettingsIcon }
];

export const PILL_NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", path: "/overview", icon: DashboardIcon },
  { id: "courses", label: "Courses", path: "/courses", icon: CourseNavIcon },
  { id: "library", label: "Library", path: "/library", icon: LibraryIcon },
  { id: "updates", label: "Updates", path: "/updates", icon: UpdatesIcon },
  { id: "profile", label: "Profile", path: "/profile", icon: ProfileIcon }
];

export const FLOATING_NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", path: "/home", icon: HomeAltIcon },
  { id: "discover", label: "Discover", path: "/discover", icon: DiscoverIcon },
  { id: "inbox", label: "Inbox", path: "/inbox", icon: InboxIcon },
  { id: "saved", label: "Saved", path: "/saved", icon: SavedIcon },
  { id: "profile", label: "Profile", path: "/profile", icon: ProfileIcon }
];
