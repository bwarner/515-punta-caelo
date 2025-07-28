"use client";

import { useEffect } from "react";
import { useUI } from "@/lib/ui.context";
import { MetadataType } from "@/lib/ui.context";

export default function AltBackground({
  metadata: metadataProp,
  children,
}: {
  metadata: MetadataType;
  children: React.ReactNode;
}) {
  const { setMetadata } = useUI();
  useEffect(() => {
    console.log("metadata", metadataProp);
    setMetadata(metadataProp);
  }, [metadataProp]);
  return <>{children}</>;
}
