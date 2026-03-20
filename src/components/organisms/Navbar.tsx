import { useState, useEffect, useCallback } from "react";
import { ThemeToggle } from "@/components/molecules";
import { useScrollSpy } from "@/hooks";
import { smoothScrollTo, cn } from "@/lib/utils";
import { navItems, personalInfo } from "@/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = navItems.map((n) => n.href.replace("#", "")).filter(Boolean);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      smoothScrollTo(href);
    },
    []
  );

  const [showPhoto, setShowPhoto] = useState(false);

  return (
    <nav
      id="navbar"
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] px-8 transition-all duration-400",
        scrolled ? "py-3" : "py-5"
      )}
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(24px) saturate(1.5)",
        WebkitBackdropFilter: "blur(24px) saturate(1.5)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#")}
          className="flex items-center gap-2.5 no-underline text-[0.95rem] font-semibold tracking-[0.02em] transition-colors duration-300 group relative"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-body)" }}
          onMouseEnter={() => setShowPhoto(true)}
          onMouseLeave={() => setShowPhoto(false)}
        >
          <div
            className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 transition-all duration-300 group-hover:shadow-[0_0_12px_var(--accent-glow)]"
            style={{
              borderColor: "var(--accent)",
            }}
          >
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.name}
              className="w-full h-full object-cover block"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const fallback = img.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <span
              className="w-full h-full items-center justify-center text-[0.6rem] font-bold text-white hidden"
              style={{ background: "var(--gradient-warm)" }}
            >
              {personalInfo.initials}
            </span>
          </div>
          {personalInfo.name}

          {/* Enlarged photo on hover */}
          <div
            className="absolute left-0 top-full mt-2 z-50 rounded-2xl overflow-hidden border-2 pointer-events-none"
            style={{
              width: 160,
              height: 160,
              borderColor: "var(--accent)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.4), 0 0 30px var(--accent-glow)",
              opacity: showPhoto ? 1 : 0,
              transform: showPhoto
                ? "scale(1) translateY(0)"
                : "scale(0.8) translateY(-10px)",
              transition:
                "opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transformOrigin: "top left",
            }}
          >
            <img
              src={personalInfo.avatarUrl}
              alt={`${personalInfo.name} — photo`}
              className="w-full h-full object-cover block"
            />
          </div>
        </a>

        {/* Mobile right side */}
        <div className="flex items-center gap-4 order-3 md:hidden">
          <button
            className="bg-transparent border-none cursor-pointer w-7 h-5 relative z-[110] md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className="block w-full h-0.5 absolute left-0 rounded-sm transition-all duration-300"
              style={{
                background: "var(--text-primary)",
                top: menuOpen ? 9 : 0,
                transform: menuOpen ? "rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-full h-0.5 absolute left-0 top-[9px] rounded-sm transition-all duration-300"
              style={{
                background: "var(--text-primary)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-full h-0.5 absolute left-0 rounded-sm transition-all duration-300"
              style={{
                background: "var(--text-primary)",
                top: menuOpen ? 9 : 18,
                transform: menuOpen ? "rotate(-45deg)" : "none",
              }}
            />
          </button>
          <ThemeToggle className="md:hidden" />
        </div>

        {/* Nav links */}
        <div
          className={cn(
            "flex gap-8 items-center",
            "max-md:fixed max-md:top-0 max-md:h-screen max-md:w-3/4 max-md:max-w-[320px] max-md:flex-col max-md:justify-center max-md:p-8 max-md:gap-6 max-md:border-l max-md:backdrop-blur-3xl max-md:transition-[right] max-md:duration-400",
            menuOpen ? "max-md:right-0" : "max-md:right-[-100%]"
          )}
          style={{
            // Mobile overlay background
            ...(typeof window !== "undefined" && window.innerWidth < 768
              ? {
                  background: "var(--bg-elevated)",
                  borderColor: "var(--border)",
                }
              : {}),
          }}
        >
          {navItems.map((item) => {
            const isActive = activeId === item.href.replace("#", "");

            if (item.isCta) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-white px-5 py-2 rounded-md font-semibold text-[0.75rem] tracking-[0.1em] uppercase no-underline transition-all duration-300 hover:-translate-y-px"
                  style={{
                    background: "var(--gradient-warm)",
                  }}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-[0.78rem] font-medium tracking-[0.08em] uppercase no-underline transition-colors duration-300 hover:text-[var(--text-primary)]"
                style={{
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 rounded-sm transition-[width] duration-300"
                  style={{
                    background: "var(--gradient-warm)",
                    width: isActive ? "100%" : "0%",
                    transitionTimingFunction: "var(--ease-out)",
                  }}
                />
              </a>
            );
          })}
          <ThemeToggle className="max-md:hidden" />
        </div>
      </div>
    </nav>
  );
}
