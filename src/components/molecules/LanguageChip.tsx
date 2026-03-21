import type { Language } from "@/types";

interface LanguageChipProps {
  language: Language;
}

export function LanguageChip({ language }: LanguageChipProps) {
  return (
    <div
      className="hover-accent flex items-center gap-2.5 rounded-[10px] border px-5 py-2.5 backdrop-blur-[12px] transition-all duration-300"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <span className="text-[1.1rem]">{language.flag}</span>
      <span className="text-[0.85rem] font-medium" style={{ color: "var(--text-primary)" }}>
        {language.name}
      </span>
      <span
        className="text-[0.66rem] px-2 py-0.5 rounded border"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--accent)",
          background: "var(--accent-subtle)",
          borderColor: "var(--border)",
        }}
      >
        {language.level}
      </span>
    </div>
  );
}
