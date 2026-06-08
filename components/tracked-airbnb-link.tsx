"use client";

import { ReactNode } from "react";
import { usePosthogDidHref } from "@/lib/use-posthog-did-href";

interface TrackedAirbnbLinkProps {
  source: string;
  locale: string;
  label?: string;
  className?: string;
  children: ReactNode;
}

export default function TrackedAirbnbLink({
  source,
  locale,
  label,
  className,
  children,
}: TrackedAirbnbLinkProps) {
  const baseParams = new URLSearchParams({
    source,
    locale,
    variant: "link",
    ...(label ? { label } : {}),
  });
  const href = usePosthogDidHref(`/go/airbnb?${baseParams.toString()}`);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
