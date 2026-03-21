import { useTiltCard } from "@/hooks";
import type { Certification } from "@/types";

interface CertCardProps {
  cert: Certification;
}

export function CertCard({ cert }: CertCardProps) {
  const { onMouseMove, onMouseLeave, ref } = useTiltCard();

  const Wrapper = cert.verifyUrl ? "a" : "div";
  const linkProps = cert.verifyUrl
    ? { href: cert.verifyUrl, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...linkProps}
      ref={ref as React.RefObject<HTMLAnchorElement & HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tilt-card hover-bg flex items-start gap-4 rounded-xl border p-5 backdrop-blur-[12px] transition-all duration-400"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
        textDecoration: "none",
        color: "inherit",
        cursor: cert.verifyUrl ? "pointer" : "default",
      }}
    >
      <div
        className="w-11 h-11 min-w-[44px] flex items-center justify-center rounded-[10px] border text-xl transition-all duration-300"
        style={{
          background: "var(--accent-subtle)",
          borderColor: "var(--border)",
        }}
      >
        {cert.emoji}
      </div>
      <div>
        <h4 className="text-[0.88rem] font-semibold leading-snug">{cert.title}</h4>
        <p className="text-[0.75rem] mt-1" style={{ color: "var(--text-muted)" }}>
          {cert.issuer}
        </p>
        {cert.verifyUrl && (
          <span
            className="text-[0.62rem] tracking-[0.04em] mt-1.5 inline-block opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--accent)",
            }}
          >
            Verify on Credly ↗
          </span>
        )}
      </div>
    </Wrapper>
  );
}
