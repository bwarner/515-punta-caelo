"use client";

import { useEffect, type ReactNode } from "react";
import { useUI } from "@/lib/ui.context";

export interface PageMetadataProviderProps {
  title?: string;
  locale?: string;
  darkBackground?: boolean;
  children: ReactNode;
}

/**
 * Sets page metadata in UI context based on frontmatter props.
 * Used by page components to pass frontmatter to the layout.
 */
export function PageMetadataProvider({
  title,
  locale,
  darkBackground,
  children,
}: PageMetadataProviderProps) {
  const { setMetadata } = useUI();

  useEffect(() => {
    setMetadata({ title, locale, darkBackground });
  }, [title, locale, darkBackground, setMetadata]);

  return <>{children}</>;
}
