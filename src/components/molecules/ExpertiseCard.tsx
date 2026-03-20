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
      onMouseLeave={(e) => {
        onMouseLeave();
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
      className="tilt-card group relative overflow-hidden rounded-[14px] border p-8 backdrop-blur-[12px] transition-all duration-400"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
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
        className="w-12 h-12 flex items-center justify-center rounded-xl border mb-5 transition-all duration-300 group-hover:text-white relative z-[1]"
        style={{
          background: "var(--accent-subtle)",
          borderColor: "var(--border)",
          color: "var(--accent)",
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.closest(".group");
          parent?.addEventListener("mouseenter", () => {
            el.style.background = "var(--accent)";
            el.style.color = "white";
            el.style.borderColor = "var(--accent)";
            el.style.boxShadow = "0 4px 20px var(--accent-glow)";
          });
          parent?.addEventListener("mouseleave", () => {
            el.style.background = "var(--accent-subtle)";
            el.style.color = "var(--accent)";
            el.style.borderColor = "var(--border)";
            el.style.boxShadow = "none";
          });
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
