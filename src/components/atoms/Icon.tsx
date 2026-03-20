import {
  Code,
  Cloud,
  Brain,
  Database,
  Wrench,
  MapPin,
  Calendar,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

const iconMap: Record<string, React.FC<LucideProps>> = {
  code: Code,
  cloud: Cloud,
  brain: Brain,
  database: Database,
  wrench: Wrench,
  "map-pin": MapPin,
  calendar: Calendar,
};

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component {...props} />;
}
