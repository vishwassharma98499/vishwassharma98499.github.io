import { Badge, Icon } from "@/components/atoms";
import { useTiltCard } from "@/hooks";
import type { SkillCategory } from "@/types";

interface ExpertiseCardProps {
  skill: SkillCategory;
}

export function ExpertiseCard({ skill }: ExpertiseCardProps) {
  const { onMouseMove, onMouseLeave, ref } = useTiltCard();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tilt-card group relative overflow-hidden rounded-[14px] border p-8 backdrop-blur-[12px] transition-all duration-400"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 w-full h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{
          background: "var(--gradient-warm)",
          transitionTimingFunction: "var(--ease-out)",
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[14px]"
        style={{ background: "var(--gradient-card)" }}
      />

      <div
        className="w-12 h-12 flex items-center justify-center rounded-xl border mb-5 transition-all duration-300 relative z-[1] group-hover:text-white group-hover:shadow-[0_4px_20px_var(--accent-glow)]"
        style={{
          background: "var(--accent-subtle)",
          borderColor: "var(--border)",
          color: "var(--accent)",
        }}
      >
        <Icon name={skill.iconName} size={24} strokeWidth={1.5} />
      </div>

      <h3 className="text-base font-semibold mb-2 relative z-[1]">{skill.title}</h3>
      <p
        className="text-[0.88rem] leading-relaxed font-light relative z-[1]"
        style={{ color: "var(--text-secondary)" }}
      >
        {skill.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-5 relative z-[1]">
        {skill.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </div>
  );
}
