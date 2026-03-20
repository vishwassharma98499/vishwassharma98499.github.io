import { useCountUp } from "@/hooks";
import { GradientText } from "@/components/atoms";
import type { Metric } from "@/types";

interface MetricItemProps {
  metric: Metric;
  inView: boolean;
}

export function MetricItem({ metric, inView }: MetricItemProps) {
  const animatedValue = useCountUp(
    metric.target ?? 0,
    1500,
    inView && !!metric.isAnimated
  );

  return (
    <div className="relative">
      <h3
        className="text-[2.8rem] leading-none inline"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <GradientText>
          {metric.isAnimated ? animatedValue : metric.value}
        </GradientText>
      </h3>
      {metric.suffix && (
        <span
          className="text-[2rem] gradient-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {metric.suffix}
        </span>
      )}
      <p
        className="text-[0.72rem] uppercase tracking-[0.12em] mt-1"
        style={{ color: "var(--text-muted)" }}
      >
        {metric.label}
      </p>
    </div>
  );
}
