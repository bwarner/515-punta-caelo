"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { usePosthogDidHref } from "@/lib/use-posthog-did-href";

interface TrackedAirbnbButtonProps {
  source: string;
  locale: string;
  buttonText: string;
  label?: string;
  className?: string;
  children?: ReactNode;
}

export default function TrackedAirbnbButton({
  source,
  locale,
  buttonText,
  label,
  className = "",
  children,
}: TrackedAirbnbButtonProps) {
  const baseParams = new URLSearchParams({
    source,
    locale,
    variant: "button",
    label: label ?? buttonText,
  });
  const href = usePosthogDidHref(`/go/airbnb?${baseParams.toString()}`);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button className={className}>{children ?? buttonText}</Button>
    </a>
  );
}
