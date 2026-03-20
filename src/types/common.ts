export type ThemeMode = "dark" | "light";

export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

export interface Metric {
  value: string | number;
  suffix?: string;
  label: string;
  isAnimated?: boolean;
  target?: number;
}
