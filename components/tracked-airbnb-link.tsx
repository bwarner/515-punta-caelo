import { ReactNode } from "react";

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
  const params = new URLSearchParams({
    source,
    locale,
    variant: "link",
    ...(label ? { label } : {}),
  });

  return (
    <a
      href={`/go/airbnb?${params.toString()}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
