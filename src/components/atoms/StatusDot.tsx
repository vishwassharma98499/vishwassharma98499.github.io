import { cn } from "@/lib/utils";

interface StatusDotProps {
  size?: "sm" | "md";
  className?: string;
}

export function StatusDot({ size = "sm", className }: StatusDotProps) {
  const sizeClass = size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2";

  return (
    <span
      className={cn(
        sizeClass,
        "rounded-full bg-green-400 inline-block",
        className
      )}
      style={{
        animation: "pulse 2s ease-in-out infinite",
        boxShadow: "0 0 6px rgba(74,222,128,0.5)",
      }}
      aria-hidden="true"
    />
  );
}
