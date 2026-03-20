import { useTheme } from "@/hooks";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`relative w-[52px] h-7 rounded-[14px] border cursor-pointer flex items-center px-[3px] flex-shrink-0 transition-all duration-300 ${className}`}
      style={{
        background: "var(--toggle-bg)",
        borderColor: "var(--border)",
      }}
      role="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleTheme();
        }
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.boxShadow = "0 0 20px var(--accent-glow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span
        className="absolute left-[7px] text-[0.7rem] transition-opacity duration-300"
        style={{ opacity: theme === "dark" ? 0 : 0.4 }}
      >
        🌙
      </span>
      <div
        className="w-5 h-5 rounded-full relative transition-transform duration-350"
        style={{
          background: "var(--toggle-knob)",
          transform: theme === "light" ? "translateX(24px)" : "translateX(0)",
          transitionTimingFunction: "var(--ease-spring)",
          boxShadow: "0 1px 8px rgba(0,0,0,0.2), 0 0 12px var(--accent-glow)",
        }}
      />
      <span
        className="absolute right-[7px] text-[0.7rem] transition-opacity duration-300"
        style={{ opacity: theme === "dark" ? 0.4 : 0 }}
      >
        ☀️
      </span>
    </div>
  );
}
