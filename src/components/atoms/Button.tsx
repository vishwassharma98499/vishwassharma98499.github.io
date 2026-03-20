import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "ghost";
  icon?: string;
  download?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const base =
  "inline-flex items-center gap-2 rounded-lg font-semibold text-[0.85rem] uppercase tracking-[0.06em] transition-all duration-300 cursor-pointer";

const variants = {
  primary:
    "text-white px-8 py-[0.9rem] relative overflow-hidden hover:-translate-y-0.5",
  ghost:
    "px-8 py-[0.9rem] border backdrop-blur-sm hover:-translate-y-0.5",
};

export function Button({
  href,
  variant = "primary",
  icon,
  download,
  onClick,
  children,
  className,
  target,
  rel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  const style: React.CSSProperties =
    variant === "primary"
      ? { background: "var(--gradient-warm)" }
      : {
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          borderColor: "var(--border)",
        };

  const content = (
    <>
      {icon && <span className="text-base leading-none">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        download={download || undefined}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} style={style} onClick={onClick}>
      {content}
    </button>
  );
}
