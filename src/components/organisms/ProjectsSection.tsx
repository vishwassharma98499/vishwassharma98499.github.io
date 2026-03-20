import { motion } from "framer-motion";
import { SectionLabel } from "@/components/atoms";
import { ProjectCard, ProjectCardPlaceholder } from "@/components/molecules";
import { projects } from "@/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-28 px-8 relative z-[1] max-md:py-16 max-md:px-5">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>Open Source</SectionLabel>
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
          Projects
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
          Side projects exploring AI agents, local LLMs, and full-stack RAG systems.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-5 max-md:grid-cols-1"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          {projects.map((project, i) => (
            <motion.div key={project.id} variants={fadeUp} custom={i}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
          <motion.div variants={fadeUp} custom={projects.length}>
            <ProjectCardPlaceholder />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
