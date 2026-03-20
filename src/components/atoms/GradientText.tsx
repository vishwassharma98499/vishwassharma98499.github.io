interface GradientTextProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

export function GradientText({
  children,
  as: Tag = "span",
  className = "",
}: GradientTextProps) {
  return (
    <Tag className={`gradient-text ${className}`}>
      {children}
    </Tag>
  );
}
