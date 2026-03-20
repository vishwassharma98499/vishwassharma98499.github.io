import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks";

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const particleCount = 50;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }

    let particles: Particle[] = [];

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    }

    function getColor() {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue("--particle-color").trim() || "124, 108, 240";
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const color = getColor();

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx!.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          if (!other) continue;
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(other.x, other.y);
            ctx!.strokeStyle = `rgba(${color}, ${0.06 * (1 - dist / 150)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    const handleResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: "var(--particle-opacity)" }}
      aria-hidden="true"
    />
  );
}
