import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks";

export function ScrollBackground() {
  const reducedMotion = useReducedMotion();
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = Math.min(scrollY / docHeight, 1);
        const isDark = document.documentElement.getAttribute("data-theme") !== "light";
        const maxOp = isDark ? 0.07 : 0.045;

        const fadeStart = 0.05;
        const fadeFull = 0.2;
        const orbFade = Math.max(0, Math.min((pct - fadeStart) / (fadeFull - fadeStart), 1));

        if (orb1Ref.current) {
          orb1Ref.current.style.opacity = String(orbFade * maxOp);
          orb1Ref.current.style.transform = `translate(${pct * 120}px, ${Math.sin(pct * Math.PI * 2) * 40}px)`;
        }

        const o2 = Math.max(0, Math.min((pct - 0.1) / 0.15, 1));
        if (orb2Ref.current) {
          orb2Ref.current.style.opacity = String(o2 * maxOp);
          orb2Ref.current.style.transform = `translate(${-pct * 80}px, ${Math.cos(pct * Math.PI * 1.5) * 60}px)`;
        }

        const o3 = Math.max(0, Math.min((pct - 0.25) / 0.2, 1));
        if (orb3Ref.current) {
          orb3Ref.current.style.opacity = String(o3 * maxOp * 0.7);
          orb3Ref.current.style.transform = `translate(${Math.sin(pct * Math.PI * 3) * 50}px, ${-pct * 60}px)`;
        }

        const gPhase = Math.max(0, Math.min((pct - 0.08) / 0.12, 1));
        const gFade = Math.max(0, 1 - Math.max(0, (pct - 0.7) / 0.3));
        if (gridRef.current) {
          gridRef.current.style.opacity = String(gPhase * gFade * 0.35);
          gridRef.current.style.transform = `translateY(${-pct * 30}px)`;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        ref={orb1Ref}
        className="absolute rounded-full opacity-0 will-change-transform"
        style={{
          width: 600, height: 600,
          background: "var(--accent)",
          filter: "blur(100px)",
          top: "20%", left: "-15%",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute rounded-full opacity-0 will-change-transform"
        style={{
          width: 500, height: 500,
          background: "var(--accent-secondary)",
          filter: "blur(100px)",
          top: "50%", right: "-12%",
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute rounded-full opacity-0 will-change-transform"
        style={{
          width: 400, height: 400,
          background: "var(--accent)",
          filter: "blur(100px)",
          bottom: "10%", left: "30%",
        }}
      />
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)",
        }}
      />
    </div>
  );
}
