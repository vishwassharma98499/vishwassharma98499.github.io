import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "tag" | "role" | "tech";
  className?: string;
}

const styles = {
  tag: "font-mono text-[0.66rem] px-[0.65rem] py-[0.3rem] rounded border tracking-[0.03em]",
  role: "font-mono text-[0.7rem] px-[0.85rem] py-[0.35rem] rounded-full border tracking-[0.05em]",
  tech: "font-mono text-[0.63rem] px-[0.55rem] py-[0.2rem] rounded border",
};

export function Badge({ children, variant = "tag", className }: BadgeProps) {
  return (
    <span
      className={cn(styles[variant], className)}
      style={{
        background: "var(--accent-subtle)",
        color: variant === "tech" ? "var(--text-muted)" : "var(--accent)",
        borderColor: "var(--border)",
        fontFamily: "var(--font-mono)",
      }}
    >
      {children}
    </span>
  );
}
