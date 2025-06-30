import type { ReactNode, ButtonHTMLAttributes } from "react";
import "./styles/Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "default" | "lg" | "icon";
  children: ReactNode;
}

export function Button({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variantClass = `button-${variant}`;
  const sizeClass = `button-${size === "default" ? "default-size" : size}`;

  const buttonClasses = `button ${variantClass} ${sizeClass} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
