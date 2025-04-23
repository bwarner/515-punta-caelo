// components/gradient-section.tsx
import { ReactNode } from "react";

export function GradientBackground({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-sand px-6 py-12">
      <div className="max-w-3xl mx-auto bg-sand">{children}</div>
    </div>
  );
}

export default GradientBackground;
