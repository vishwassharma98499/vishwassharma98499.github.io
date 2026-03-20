import { motion } from "framer-motion";
import { SectionLabel, Badge } from "@/components/atoms";
import { TimelineProjectBlock } from "@/components/molecules";
import { useTiltCard } from "@/hooks";
import { experience } from "@/data";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { MapPin, Calendar } from "lucide-react";
import type { TimelineEntry } from "@/types";

function TimelineCard({ entry, isFirst }: { entry: TimelineEntry; isFirst: boolean }) {
  const { onMouseMove, onMouseLeave, ref } = useTiltCard();

  return (
    <div className="relative mb-12 last:mb-0">
      {/* Dot */}
      <div
        className="absolute -left-12 top-8 w-[15px] h-[15px] rounded-full z-[1] max-md:-left-10"
        style={{
          background: isFirst ? "var(--accent)" : "var(--bg)",
          border: "2px solid var(--accent)",
          boxShadow: isFirst ? "0 0 16px var(--accent-glow)" : "none",
        }}
      >
        {isFirst && (
          <span
            className="absolute -inset-1.5 rounded-full opacity-30"
            style={{
              border: "1px solid var(--accent)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
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
        className="tilt-card rounded-[14px] border p-8 backdrop-blur-[12px] transition-all duration-400"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start flex-wrap mb-3 gap-2">
          <h3 className="text-[1.2rem] font-semibold">{entry.company}</h3>
          <Badge variant="role">{entry.role}</Badge>
        </div>

        {/* Meta */}
        <div
          className="flex gap-6 flex-wrap mb-5 text-[0.82rem]"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={14} style={{ color: "var(--accent)" }} />
            {entry.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} style={{ color: "var(--accent)" }} />
            {entry.dateRange}
          </span>
        </div>

        {/* Projects */}
        {entry.projects.map((project) => (
          <TimelineProjectBlock key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-8 relative z-[1] max-md:py-16 max-md:px-5">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>Career</SectionLabel>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.15,
            fontWeight: 600,
          }}
        >
          Experience
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
          className="max-w-[550px] mb-12"
          style={{ color: "var(--text-secondary)", fontSize: "1.05rem", fontWeight: 300 }}
        >
          Building mission-critical software across automotive, aerospace, semiconductor, and AI domains.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="relative pl-12 max-md:pl-10"
        >
          {/* Timeline line */}
          <div
            className="absolute left-[7px] top-0 w-px h-full max-md:left-[7px]"
            style={{
              background: "linear-gradient(to bottom, var(--accent), var(--border), transparent)",
            }}
            aria-hidden="true"
          />

          {experience.map((entry, i) => (
            <motion.div key={entry.company} variants={fadeUp} custom={i}>
              <TimelineCard entry={entry} isFirst={i === 0} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
