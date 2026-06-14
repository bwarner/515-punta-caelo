import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps {
  /** Layout type */
  layout?: "stack" | "flex-row" | "grid-2" | "grid-3" | "centered";
  /** Vertical spacing between children */
  spacing?: "none" | "sm" | "md" | "lg";
  /** Padding around the section */
  padding?: "none" | "sm" | "md" | "lg";
  /** Custom CSS class */
  className?: string;
  /** Section content */
  children: ReactNode;
}

const layoutClasses = {
  stack: "flex flex-col",
  "flex-row": "flex flex-row flex-wrap",
  "grid-2": "grid grid-cols-2",
  "grid-3": "grid grid-cols-3",
  centered: "flex flex-col items-center justify-center text-center",
};

const spacingClasses = {
  none: "",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

const paddingClasses = {
  none: "",
  sm: "p-2",
  md: "px-6 py-4",
  lg: "px-8 py-6",
};

/**
 * Flexible layout section for grouping content.
 * Replaces raw div elements for TinaCMS compatibility.
 */
export function Section({
  layout = "stack",
  spacing = "md",
  padding = "md",
  className,
  children,
}: SectionProps) {
  return (
    <div
      className={cn(
        layoutClasses[layout],
        spacingClasses[spacing],
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
