import { motion } from "framer-motion";
import { SectionLabel } from "@/components/atoms";
import { CertCard } from "@/components/molecules";
import { certifications } from "@/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-28 px-8 relative z-[1] max-md:py-16 max-md:px-5">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>Credentials</SectionLabel>
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
          Certifications
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
          Industry-recognised certifications across cloud, infrastructure, and AI — all verifiable.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
        >
          {certifications.map((cert, i) => (
            <motion.div key={cert.id} variants={fadeUp} custom={i}>
              <CertCard cert={cert} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
