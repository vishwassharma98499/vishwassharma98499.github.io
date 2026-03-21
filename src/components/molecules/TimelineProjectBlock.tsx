import { Badge } from "@/components/atoms";
import type { TimelineProject } from "@/types";

interface TimelineProjectBlockProps {
  project: TimelineProject;
}

export function TimelineProjectBlock({ project }: TimelineProjectBlockProps) {
  return (
    <div
      className="hover-card hover-bg rounded-xl border p-6 mb-4 last:mb-0 transition-all duration-300"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <h4 className="text-[0.95rem] font-semibold mb-2">{project.title}</h4>
      <ul className="list-none p-0">
        {project.bullets.map((bullet, i) => (
          <li
            key={i}
            className="text-[0.85rem] leading-relaxed font-light py-1 pl-5 relative"
            style={{ color: "var(--text-secondary)" }}
          >
            <span
              className="absolute left-0 top-[0.65rem] w-1.5 h-1.5 rounded-full opacity-50"
              style={{ background: "var(--accent)" }}
              aria-hidden="true"
            />
            {bullet}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1 mt-3">
        {project.techStack.map((tech) => (
          <Badge key={tech} variant="tech">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}
