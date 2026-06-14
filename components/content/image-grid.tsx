import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ImageGridProps {
  /** Number of columns */
  columns: number;
  /** Gap between items */
  gap?: "sm" | "md" | "lg";
  /** Grid items (images) */
  children: ReactNode;
}

const gapClasses = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-4",
};

const columnClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

/**
 * Grid layout for images.
 * Provides structured grid for photo galleries.
 */
export function ImageGrid({ columns, gap = "md", children }: ImageGridProps) {
  const colClass = columnClasses[columns] || `grid-cols-${columns}`;

  return (
    <div className={cn("grid my-4", colClass, gapClasses[gap])}>{children}</div>
  );
}
