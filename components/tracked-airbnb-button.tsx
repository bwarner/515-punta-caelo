"use client";

import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface TrackedAirbnbButtonProps {
  href: string;
  eventName: string;
  buttonText: string;
  className?: string;
  children?: ReactNode;
}

export default function TrackedAirbnbButton({
  href,
  eventName,
  buttonText,
  className = "",
  children,
}: TrackedAirbnbButtonProps) {
  const handleClick = () => {
    posthog.capture(eventName, {
      destination_url: href,
      button_text: buttonText,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <Button className={className}>{children || buttonText}</Button>
    </a>
  );
}
