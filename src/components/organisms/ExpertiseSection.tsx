import { motion } from "framer-motion";
import { SectionLabel } from "@/components/atoms";
import { ExpertiseCard } from "@/components/molecules";
import { skills } from "@/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function ExpertiseSection() {
  return (
    <section id="expertise" className="py-28 px-8 relative z-[1] max-md:py-16 max-md:px-5">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>What I Do</SectionLabel>
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
          Technical Expertise
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
          className="max-w-[550px] mb-12"
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            fontWeight: 300,
          }}
        >
          End-to-end ownership from architecture through deployment, monitoring, and operations.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {skills.map((skill, i) => (
            <motion.div key={skill.id} variants={fadeUp} custom={i}>
              <ExpertiseCard skill={skill} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
