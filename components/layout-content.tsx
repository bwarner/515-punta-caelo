"use client";

import { UIProvider, useUI } from "@/lib/ui.context";
import { ReactNode } from "react";

function LayoutInner({ children }: { children: ReactNode }) {
  const { metadata } = useUI();
  return (
    <div className="min-h-screen flex flex-col">
      <main
        className={`flex-1 mx-auto max-w-lg w-full ${metadata?.darkBackground ? "bg-background-alt" : "bg-background"}`}
      >
        {children}
      </main>
    </div>
  );
}

export default function LayoutContent({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <LayoutInner>{children}</LayoutInner>
    </UIProvider>
  );
}
