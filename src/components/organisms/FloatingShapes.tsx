import { useReducedMotion } from "@/hooks";

export function FloatingShapes() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden max-md:hidden" aria-hidden="true">
      <div
        className="absolute opacity-0"
        style={{
          width: 80, height: 80, top: "15%", left: "8%",
          background: "var(--shape-color-1)",
          border: "1px solid var(--shape-border)",
          borderRadius: 16,
          animation: "floatShape1 18s ease-in-out infinite, shapeFadeIn 2s 0.5s forwards",
        }}
      />
      <div
        className="absolute opacity-0"
        style={{
          width: 50, height: 50, top: "35%", right: "12%",
          background: "var(--shape-color-2)",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          animation: "floatShape2 22s ease-in-out infinite, shapeFadeIn 2s 1s forwards",
        }}
      />
      <div
        className="absolute opacity-0"
        style={{
          width: 120, height: 120, top: "60%", left: "5%",
          borderRadius: "50%",
          background: "var(--shape-color-2)",
          border: "1px solid var(--shape-border)",
          animation: "floatShape3 20s ease-in-out infinite, shapeFadeIn 2s 1.5s forwards",
        }}
      />
      <div
        className="absolute opacity-0"
        style={{
          width: 40, height: 40, top: "75%", right: "8%",
          background: "var(--shape-color-1)",
          border: "1px solid var(--shape-border)",
          borderRadius: 8,
          animation: "floatShape4 16s ease-in-out infinite, shapeFadeIn 2s 2s forwards",
        }}
      />
      <div
        className="absolute opacity-0"
        style={{
          width: 65, height: 65, top: "45%", left: "50%",
          borderRadius: "50%",
          border: "1px solid var(--shape-border)",
          background: "transparent",
          animation: "floatShape5 24s ease-in-out infinite, shapeFadeIn 2s 0.8s forwards",
        }}
      />
      <div
        className="absolute opacity-0"
        style={{
          width: 35, height: 35, top: "20%", right: "30%",
          background: "var(--shape-color-1)",
          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          animation: "floatShape6 19s ease-in-out infinite, shapeFadeIn 2s 1.2s forwards",
        }}
      />
    </div>
  );
}
