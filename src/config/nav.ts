import {
  LayoutDashboard,
  User,
  GraduationCap,
  School,
  BookOpen,
  FileText,
  Heart,
  Settings,
  Users,
  Building2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  titleMm?: string;
  href: string;
  icon?: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  badge?: string;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  titleMm?: string;
  items: NavItem[];
}

/**
 * Main navigation items for authenticated users
 */
export const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    titleMm: "ဒတ်ရှ်ဘုတ်",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    titleMm: "ပရိုဖိုင်",
    href: "/profile",
    icon: User,
  },
  {
    title: "Matriculation",
    titleMm: "တက္ကသိုလ်ဝင်ခွင့်",
    href: "/matriculation",
    icon: GraduationCap,
  },
  {
    title: "Interests",
    titleMm: "စိတ်ဝင်စားမှုများ",
    href: "/interests",
    icon: Heart,
  },
  {
    title: "Universities",
    titleMm: "တက္ကသိုလ်များ",
    href: "/universities",
    icon: Building2,
  },
  {
    title: "Programs",
    titleMm: "ဘာသာရပ်များ",
    href: "/programs",
    icon: BookOpen,
  },
  {
    title: "Recommendations",
    titleMm: "အကြံပြုချက်များ",
    href: "/programs/recommendations",
    icon: Sparkles,
  },
  {
    title: "Applications",
    titleMm: "လျှောက်လွှာများ",
    href: "/applications",
    icon: FileText,
  },
  {
    title: "Settings",
    titleMm: "ဆက်တင်များ",
    href: "/settings",
    icon: Settings,
  },
];

/**
 * Admin navigation items
 */
export const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Universities",
    href: "/admin/universities",
    icon: Building2,
  },
  {
    title: "Programs",
    href: "/admin/programs",
    icon: BookOpen,
  },
  {
    title: "Applications",
    href: "/admin/applications",
    icon: FileText,
  },
  {
    title: "Interests",
    href: "/admin/interests",
    icon: Heart,
  },
];

/**
 * Public navigation items (header)
 */
export const publicNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Universities",
    href: "/universities",
  },
  {
    title: "Programs",
    href: "/programs",
  },
];
