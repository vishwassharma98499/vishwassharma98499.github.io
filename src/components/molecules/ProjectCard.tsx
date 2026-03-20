import { Badge } from "@/components/atoms";
import { useTiltCard } from "@/hooks";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { onMouseMove, onMouseLeave, ref } = useTiltCard();

  return (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref as React.RefObject<HTMLAnchorElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={(e) => {
        onMouseLeave();
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
      }}
      className="tilt-card group relative overflow-hidden rounded-[14px] border p-8 backdrop-blur-[12px] transition-all duration-400 flex flex-col no-underline"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: "var(--gradient-card)" }}
      />

      <div className="flex justify-between items-start mb-4 relative z-[1]">
        <span className="text-[1.8rem] leading-none">{project.emoji}</span>
        <span
          className="text-[0.78rem] transition-colors duration-300"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
          }}
        >
          <span className="group-hover:text-[var(--accent)]">GitHub ↗</span>
        </span>
      </div>

      <h3 className="text-[1.15rem] font-semibold mb-2 relative z-[1]">
        {project.title}
      </h3>
      <p
        className="text-[0.88rem] leading-[1.7] font-light flex-1 relative z-[1]"
        style={{ color: "var(--text-secondary)" }}
      >
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-5 relative z-[1]">
        {project.techStack.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </a>
  );
}

export function ProjectCardPlaceholder() {
  return (
    <div
      className="rounded-[14px] border-dashed border p-8 flex flex-col items-center justify-center text-center min-h-[240px] transition-all duration-300 hover:border-[var(--accent)]"
      style={{
        borderColor: "var(--border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent-subtle)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <div
        className="text-[2.5rem] leading-none mb-3 transition-colors duration-300"
        style={{ color: "var(--text-muted)" }}
      >
        +
      </div>
      <p className="text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
        More projects coming soon
      </p>
    </div>
  );
}
