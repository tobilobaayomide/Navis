import type { ComponentType, SVGProps, CSSProperties } from "react";

export type NavIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavItem = {
  id: string;
  label: string;
  path: string;
  icon: NavIcon;
  badge?: number | string;
  disabled?: boolean;
};

export type BottomNavProps = {
  items: NavItem[];
  activeId?: string;
  onItemClick?: (item: NavItem) => void;
  className?: string;
  style?: CSSProperties;
};
