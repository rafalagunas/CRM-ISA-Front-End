import type { ReactNode } from "react";
import "./styles/Container.css";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

interface GridContainerProps extends ContainerProps {
  variant?: "2-1" | "equal" | "4-cols";
}

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`container ${className}`}>{children}</div>;
}

export function GridContainer({
  children,
  variant = "equal",
  className = "",
}: GridContainerProps) {
  const gridClass = {
    "2-1": "grid-2-1",
    equal: "grid-equal",
    "4-cols": "grid-4-cols",
  }[variant];

  return (
    <div className={`container-grid ${gridClass} ${className}`}>{children}</div>
  );
}
