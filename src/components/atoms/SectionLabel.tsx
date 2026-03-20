interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div
      className="flex items-center gap-3 mb-3 text-[0.7rem] uppercase tracking-[0.2em]"
      style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
    >
      <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
      {children}
    </div>
  );
}
