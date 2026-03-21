import { useTiltCard } from "@/hooks";
import type { Education } from "@/types";

interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  const { onMouseMove, onMouseLeave, ref } = useTiltCard();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tilt-card hover-bg flex items-start gap-6 max-w-[600px] rounded-[14px] border p-8 backdrop-blur-[12px] transition-all duration-400 max-md:flex-col max-md:gap-4"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="w-[52px] h-[52px] min-w-[52px] flex items-center justify-center rounded-xl border text-2xl"
        style={{
          background: "var(--accent-subtle)",
          borderColor: "var(--border)",
        }}
      >
        🎓
      </div>
      <div>
        <h3 className="text-[1.1rem] font-semibold mb-1">{education.degree}</h3>
        <p className="text-[0.92rem]" style={{ color: "var(--text-secondary)" }}>
          {education.school}, {education.location}
        </p>
        <div className="flex gap-6 flex-wrap mt-2">
          <span
            className="text-[0.78rem] flex items-center gap-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            {education.dateRange}
          </span>
        </div>
      </div>
    </div>
  );
}
