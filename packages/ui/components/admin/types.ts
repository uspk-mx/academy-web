import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: Omit<NavItem, "icon">[];
  action?: () => void;
}

export interface UserNav {
  name: string;
  email: string;
  avatar: string;
  navItems: NavItem[];
  logoutLabel?: string;
  logoutAction?: () => void;
}

export interface SidebarConfig {
  navMain: {
    title: string;
    items: NavItem[];
  };
  navSecondary: NavItem[];
  tools: { title: string; items: NavItem[] };
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  businessNav?: {
    title: string;
    items: NavItem[];
  }
}
