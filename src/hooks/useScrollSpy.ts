import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[], offset = 120): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        if (!id) continue;
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - offset) {
          setActiveId(id);
          return;
        }
      }
      setActiveId(null);
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [sectionIds, offset]);

  return activeId;
}
