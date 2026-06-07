"use client";

import { ReactNode, MouseEvent } from "react";
import posthog from "posthog-js";

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
  const baseHref = `/go/airbnb?${baseParams.toString()}`;

  // See TrackedAirbnbButton for why we pass did via URL — server uses this
  // to stitch the click onto the same PostHog person as the autocapture
  // events from this browser session.
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const did = posthog?.get_distinct_id?.();
    if (did) {
      e.currentTarget.href = `${baseHref}&did=${encodeURIComponent(did)}`;
    }
  };

  return (
    <a
      href={baseHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
