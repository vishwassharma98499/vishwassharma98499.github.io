import { useState } from "react";
import { StatusDot } from "@/components/atoms";
import type { PersonalInfo } from "@/types";

interface AvatarPillProps {
  info: PersonalInfo;
}

export function AvatarPill({ info }: AvatarPillProps) {
  const [showLarge, setShowLarge] = useState(false);

  return (
    <div
      className="hover-accent inline-flex items-center gap-3 rounded-full px-4 py-1.5 pl-1.5 backdrop-blur-md border transition-all duration-400 cursor-pointer hover:-translate-y-0.5"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
      onMouseEnter={() => setShowLarge(true)}
      onMouseLeave={() => setShowLarge(false)}
    >
      {/* Avatar thumbnail */}
      <div className="relative">
        <div
          className="w-[42px] h-[42px] rounded-full overflow-hidden flex-shrink-0 relative border-2 transition-transform duration-300"
          style={{
            background: "var(--bg-elevated)",
            borderColor: "var(--accent)",
            boxShadow: "0 0 12px var(--accent-glow)",
          }}
        >
          <img
            src={info.avatarUrl}
            alt={info.name}
            className="w-full h-full object-cover block"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const fallback = img.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <div
            className="w-full h-full items-center justify-center text-[0.85rem] font-semibold text-white hidden absolute inset-0"
            style={{
              background: "var(--gradient-warm)",
              fontFamily: "var(--font-display)",
            }}
          >
            {info.initials}
          </div>
        </div>

        {/* Enlarged image on hover */}
        <div
          className="absolute left-0 top-full mt-3 z-50 rounded-2xl overflow-hidden border-2 pointer-events-none"
          style={{
            width: 180,
            height: 180,
            borderColor: "var(--accent)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.4), 0 0 30px var(--accent-glow)",
            opacity: showLarge ? 1 : 0,
            transform: showLarge
              ? "scale(1) translateY(0)"
              : "scale(0.8) translateY(-10px)",
            transition:
              "opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transformOrigin: "top left",
          }}
        >
          <img
            src={info.avatarUrl}
            alt={`${info.name} — full photo`}
            className="w-full h-full object-cover block"
          />
        </div>
      </div>

      {/* Location only — name is already in navbar + h1 */}
      <span
        className="text-[0.68rem] tracking-[0.04em] flex items-center gap-1.5"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--accent-secondary)",
        }}
      >
        <StatusDot />
        {info.location}
      </span>
    </div>
  );
}
