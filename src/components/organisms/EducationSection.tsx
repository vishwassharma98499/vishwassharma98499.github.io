import { motion } from "framer-motion";
import { SectionLabel } from "@/components/atoms";
import { EducationCard, LanguageChip } from "@/components/molecules";
import { education, languages } from "@/data";
import { fadeUp } from "@/lib/animations";

export function EducationSection() {
  return (
    <section id="education" className="py-28 px-8 relative z-[1] max-md:py-16 max-md:px-5">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>Background</SectionLabel>
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
          Education &amp; Languages
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
          Academic foundation and language proficiency.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={2}
        >
          <EducationCard education={education} />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={3}
          className="flex gap-4 mt-6 flex-wrap"
        >
          {languages.map((lang) => (
            <LanguageChip key={lang.name} language={lang} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
