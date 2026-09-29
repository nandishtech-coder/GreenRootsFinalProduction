import {
  Building2,
  FlaskConical,
  Flower2,
  GraduationCap,
  Home,
  Leaf,
  MessageCircle,
  Scissors,
  Sprout,
  Sun,
  Trees,
  Users,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Building2,
  FlaskConical,
  Flower2,
  GraduationCap,
  Home,
  Leaf,
  MessageCircle,
  Scissors,
  Sprout,
  Sun,
  Trees,
  Users,
};

export const SERVICE_ICON_NAMES = Object.keys(SERVICE_ICONS);

export function serviceIcon(name: string): LucideIcon {
  return SERVICE_ICONS[name] ?? Leaf;
}
