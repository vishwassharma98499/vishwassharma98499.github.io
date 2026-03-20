import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button, StatusDot } from "@/components/atoms";
import { MetricItem } from "@/components/molecules";
import { ThreeHero } from "./ThreeHero";
import { personalInfo, heroMetrics } from "@/data";
import { smoothScrollTo } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

export function HeroSection() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.5 });

  return (
    <section
      className="min-h-screen flex items-center px-8 pt-32 pb-16 relative overflow-hidden z-[1] max-md:px-5"
      id="hero"
    >
      {/* Glow orbs */}
      <div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 600, height: 600,
          background: "var(--accent)",
          filter: "blur(100px)",
          opacity: "var(--glow-1-opacity, 0.07)",
          top: "-15%", left: "-8%",
          animation: "floatGlow 10s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 500, height: 500,
          background: "var(--accent-secondary)",
          filter: "blur(100px)",
          opacity: 0.05,
          bottom: "-10%", right: "5%",
          animation: "floatGlow 12s ease-in-out infinite reverse",
        }}
        aria-hidden="true"
      />

      <ThreeHero />

      <div className="max-w-[1200px] mx-auto w-full relative z-[2]">
        <div className="flex items-center gap-20 max-md:flex-col max-md:gap-10 max-md:text-center">
          <div className="flex-1 min-w-0">
            {/* Availability tag */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-6 max-md:flex max-md:justify-center"
            >
              <div
                className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 border"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "var(--accent-subtle)",
                  borderColor: "var(--border)",
                }}
              >
                <StatusDot size="md" />
                {personalInfo.tagline}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: 1.08,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Senior Backend
              <br />
              &amp;{" "}
              <em
                className="gradient-text"
                style={{ fontStyle: "italic" }}
              >
                AI Engineer
              </em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="max-w-[560px] mb-10 max-md:mx-auto"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                fontWeight: 300,
              }}
            >
              I design and operate{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                production-grade backend systems
              </strong>
              , cloud infrastructure, and{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                AI/ML-powered platforms
              </strong>
              . Based in Munich — building reliable software for demanding industries.
            </motion.p>

            {/* Actions */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex gap-4 flex-wrap items-center max-md:justify-center"
            >
              <Button
                href="#contact"
                variant="primary"
                icon="→"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#contact");
                }}
              >
                Let&apos;s Talk
              </Button>
              <Button
                href={personalInfo.resumeUrl}
                variant="ghost"
                icon="↓"
                download
              >
                Download CV
              </Button>
              <Button
                href="#projects"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#projects");
                }}
              >
                View Projects
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Metrics */}
        <motion.div
          ref={metricsRef}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex gap-12 mt-16 pt-12 max-md:gap-6 max-md:flex-wrap max-md:justify-center"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {heroMetrics.map((metric, i) => (
            <MetricItem key={i} metric={metric} inView={metricsInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
