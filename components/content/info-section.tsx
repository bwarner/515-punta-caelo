import type { ReactNode } from "react";

export interface InfoSectionProps {
  /** Section title */
  title: string;
  /** Section content */
  children: ReactNode;
}

/**
 * Information section with title and content.
 * Used for check-in instructions, property details, etc.
 */
export function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <div className="px-6 py-4 text-left">
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <div className="space-y-2">{children}</div>
      </div>
    </div>
  );
}
