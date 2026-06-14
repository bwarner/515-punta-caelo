import type { ReactNode } from "react";

export interface CalloutBoxProps {
  /** Visual variant */
  variant?: "default" | "info" | "success" | "warning";
  /** Content of the callout */
  children: ReactNode;
  /** Center the text */
  centered?: boolean;
}

const variantStyles = {
  default: "bg-secondary/30",
  info: "bg-primary/10",
  success: "bg-green-100",
  warning: "bg-amber-100",
};

/**
 * Styled callout box for notices, tips, or CTAs.
 */
export function CalloutBox({
  variant = "default",
  children,
  centered = true,
}: CalloutBoxProps) {
  return (
    <div
      className={`p-4 rounded-lg mt-6 mx-4 font-medium ${variantStyles[variant]} ${
        centered ? "text-center" : ""
      }`}
    >
      {children}
    </div>
  );
}
