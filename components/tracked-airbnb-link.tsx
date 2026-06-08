"use client";

/* global setTimeout, clearTimeout */
import { ReactNode, useEffect, useState } from "react";
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

  // See TrackedAirbnbButton for the full rationale — populate `did` once
  // posthog-js is ready, before the user can click, so target="_blank"
  // navigation always carries the visitor's distinct_id.
  const [href, setHref] = useState(baseHref);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const attach = () => {
      if (cancelled) return;
      const did = posthog?.get_distinct_id?.();
      if (did) {
        setHref(`${baseHref}&did=${encodeURIComponent(did)}`);
        return;
      }
      timer = setTimeout(attach, 100);
    };
    attach();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [baseHref]);

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
