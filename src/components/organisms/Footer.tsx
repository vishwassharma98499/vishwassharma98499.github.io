export function Footer() {
  return (
    <footer
      className="py-8 px-8 text-center relative z-[1]"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <p
        className="text-[0.75rem] tracking-[0.05em]"
        style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        &copy; {new Date().getFullYear()} Vishwas Sharma. Crafted in Munich.
      </p>
    </footer>
  );
}
