"use client";

/* global setTimeout, clearTimeout */
import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useState } from "react";
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

  // The server captures the click via /go/airbnb. It can only attribute the
  // click to the same person as the browser's autocapture events if it has
  // the PostHog distinct_id. The server's cookie fallback is unreliable
  // (Next 15's request-cookie auto-decoding plus posthog-js's persistence
  // format make cross-version parsing brittle), so we pass the distinct_id
  // directly via the URL as `did`. Server prefers `did` over the cookie.
  //
  // We populate `did` once posthog-js is ready, BEFORE the user can click —
  // an onClick-time mutation of `e.currentTarget.href` is timing-sensitive
  // with `target="_blank"` and gets skipped entirely if posthog hasn't
  // finished loading when the click happens. Polling here is cheap and
  // self-stopping; in practice posthog is ready on the first tick.
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
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button className={className}>{children ?? buttonText}</Button>
    </a>
  );
}
