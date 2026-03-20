export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-0 z-[200] -translate-y-full px-6 py-3 text-sm font-semibold text-white focus:translate-y-0 transition-transform"
      style={{ background: "var(--accent)" }}
    >
      Skip to content
    </a>
  );
}
