import { useCallback, useRef } from "react";

const IS_TOUCH = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

interface TiltHandlers {
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
  ref: React.RefObject<HTMLElement | null>;
}

export function useTiltCard(maxDeg = 6): TiltHandlers {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (IS_TOUCH || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -maxDeg;
      const rotateY = ((x - cx) / cx) * maxDeg;
      ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    },
    [maxDeg]
  );

  const onMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    }
  }, []);

  return { onMouseMove, onMouseLeave, ref };
}
