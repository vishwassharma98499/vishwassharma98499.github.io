import { motion } from "framer-motion";
import { SectionLabel, StatusDot } from "@/components/atoms";
import { ContactLinkItem } from "@/components/molecules";
import { useTiltCard } from "@/hooks";
import { contactLinks, availability } from "@/data";
import { fadeUp } from "@/lib/animations";

function AvailabilityCard() {
  const { onMouseMove, onMouseLeave, ref } = useTiltCard();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tilt-card rounded-[14px] border p-8 backdrop-blur-[12px] relative overflow-hidden"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 w-full h-[3px]"
        style={{ background: "var(--gradient-warm)" }}
      />

      <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
        <StatusDot size="md" />
        Current Status
      </h3>
      <p
        className="text-[0.88rem] font-light mb-6 leading-[1.7]"
        style={{ color: "var(--text-secondary)" }}
      >
        {availability.description}
      </p>

      <div className="flex flex-col gap-2">
        {availability.details.map((detail) => (
          <div
            key={detail.label}
            className="flex justify-between text-[0.82rem] py-2"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <span style={{ color: "var(--text-muted)" }}>{detail.label}</span>
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-28 px-8 relative z-[1] max-md:py-16 max-md:px-5"
      style={{
        background: "var(--bg-elevated)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 gap-16 items-start max-md:grid-cols-1 max-md:gap-8">
          {/* Left — info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel>Contact</SectionLabel>
            <h2
              className="mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.15,
                fontWeight: 600,
              }}
            >
              Let&apos;s build
              <br />
              something{" "}
              <em className="gradient-text" style={{ fontStyle: "italic" }}>
                great
              </em>
            </h2>
            <p
              className="mb-8"
              style={{ color: "var(--text-secondary)", fontSize: "1rem", fontWeight: 300 }}
            >
              Currently based in Munich, Germany. Open to full-time senior roles, contract work, and
              interesting collaborations across the DACH region and beyond.
            </p>

            <div className="flex flex-col gap-3">
              {contactLinks.map((link) => (
                <ContactLinkItem key={link.platform} link={link} />
              ))}
            </div>
          </motion.div>

          {/* Right — availability */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            <AvailabilityCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
