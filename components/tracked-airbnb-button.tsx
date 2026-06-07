"use client";

import { Button } from "@/components/ui/button";
import { ReactNode, MouseEvent } from "react";
import posthog from "posthog-js";

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
  const baseHref = `/go/airbnb?${baseParams.toString()}`;

  // The server captures the click via /go/airbnb, but it can only attribute
  // it to the same person as the browser's autocapture events if it has the
  // PostHog distinct_id. The persistence cookie isn't always parseable
  // server-side (format varies across posthog-js versions), so we pass the
  // distinct_id directly via the URL on click. Server prefers `did` over the
  // cookie. See app/go/airbnb/route.ts.
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
      onClick={handleClick}
    >
      <Button className={className}>{children ?? buttonText}</Button>
    </a>
  );
}
