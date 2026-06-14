import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FlexRowProps {
  /** Justify content */
  justify?: "start" | "center" | "end" | "between" | "around";
  /** Align items */
  align?: "start" | "center" | "end" | "stretch";
  /** Gap between items */
  gap?: "sm" | "md" | "lg";
  /** Row content */
  children: ReactNode;
}

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const gapClasses = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

/**
 * Horizontal flex layout for inline content.
 * Replaces raw div elements with flex styling.
 */
export function FlexRow({
  justify = "start",
  align = "center",
  gap = "md",
  children,
}: FlexRowProps) {
  return (
    <div
      className={cn(
        "flex flex-row",
        justifyClasses[justify],
        alignClasses[align],
        gapClasses[gap],
      )}
    >
      {children}
    </div>
  );
}
