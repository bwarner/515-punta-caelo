"use client";

import { useEffect } from "react";
import { useUI } from "@/lib/ui.context";
import { MetadataType } from "@/lib/ui.context";

export default function AltBackground({
  metadata: metadataProp,
  title,
  description,
  darkBackground,
  locale,
  children,
}: {
  metadata?: MetadataType;
  title?: string;
  description?: string;
  darkBackground?: boolean;
  locale?: string;
  children: React.ReactNode;
}) {
  const { setMetadata } = useUI();

  // Support both metadata object prop and individual props
  const resolvedMetadata: MetadataType = metadataProp ?? {
    title,
    locale,
    darkBackground,
  };

  useEffect(() => {
    setMetadata(resolvedMetadata);
  }, [metadataProp, title, description, darkBackground, locale]);
  return <>{children}</>;
}
