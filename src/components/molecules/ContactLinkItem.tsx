import type { ContactLink } from "@/types";

interface ContactLinkItemProps {
  link: ContactLink;
}

export function ContactLinkItem({ link }: ContactLinkItemProps) {
  return (
    <a
      href={link.href}
      target={link.platform !== "Email" ? "_blank" : undefined}
      rel={link.platform !== "Email" ? "noopener noreferrer" : undefined}
      className="hover-slide flex items-center gap-4 no-underline rounded-xl p-3.5 px-[1.15rem] border backdrop-blur-[12px] transition-all duration-300"
      style={{
        color: "var(--text-secondary)",
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="w-[38px] h-[38px] flex items-center justify-center text-base rounded-[10px]"
        style={{ background: "var(--accent-subtle)" }}
      >
        {link.emoji}
      </div>
      <div>
        <span
          className="text-[0.7rem] uppercase tracking-[0.1em] block"
          style={{ color: "var(--text-muted)" }}
        >
          {link.label}
        </span>
        <strong className="font-medium text-[0.9rem]">{link.value}</strong>
      </div>
    </a>
  );
}
