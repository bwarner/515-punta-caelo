"use client";

import { ReactNode } from "react";
import { usePosthogDidHref } from "@/lib/use-posthog-did-href";

interface TrackedWhatsappLinkProps {
  venue: string;
  phone: string;
  locale: string;
  source: string;
  /** Optional prefilled WhatsApp message; forwarded to wa.me as `?text=`. */
  message?: string;
  /** Open in a new tab (also sets rel="noopener noreferrer"). */
  newTab?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Outbound WhatsApp link that routes through `/go/whatsapp` for server-side
 * tracking. Mirrors {@link "./tracked-airbnb-link"}: it appends the visitor's
 * PostHog `distinct_id` as `&did=<id>` (via {@link usePosthogDidHref}) so the
 * route can attribute the click to the same person as their web events
 * instead of falling back to an unattributable anonymous id.
 */
export default function TrackedWhatsappLink({
  venue,
  phone,
  locale,
  source,
  message,
  newTab,
  className,
  children,
}: TrackedWhatsappLinkProps) {
  const baseParams = new URLSearchParams({
    venue,
    phone,
    locale,
    source,
  });
  if (message) baseParams.set("message", message);
  const href = usePosthogDidHref(`/go/whatsapp?${baseParams.toString()}`);

  return (
    <a
      href={href}
      className={className}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
