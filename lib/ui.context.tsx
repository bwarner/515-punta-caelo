"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type MetadataType = {
  title?: string;
  locale?: string;
  darkBackground?: boolean;
};

type UIContextType = {
  metadata?: MetadataType;
  setMetadata: (metadata: MetadataType) => void;
};

export const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [metadata, setMetadata] = useState<MetadataType>();
  const value = { metadata, setMetadata };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
