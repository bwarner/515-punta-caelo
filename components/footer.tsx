"use client";

import posthog from "posthog-js";

function FooterLink({
  href,
  children,
  section,
}: {
  href: string;
  children: React.ReactNode;
  section: string;
}) {
  const handleClick = () => {
    posthog.capture("footer_link_clicked", {
      link_text: children,
      destination_href: href,
      footer_section: section,
    });
  };

  return (
    <a
      href={href}
      className="text-gray-300 hover:text-white transition-colors"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrapper bg-driftwood w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="font-heading text-2xl font-bold text-white">
              Punta Caelo
            </h3>
            <p className="text-gray-200 text-center md:text-left">
              Your seaside retreat in San Carlos, Panama
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <h4 className="font-heading font-semibold text-white">
                Quick Links
              </h4>
              <div className="flex flex-col gap-1 text-sm">
                <FooterLink href="/en/rules" section="Quick Links">
                  House Rules
                </FooterLink>
                <FooterLink href="/en/wifi" section="Quick Links">
                  Wi-Fi Info
                </FooterLink>
                <FooterLink href="/en/faqs" section="Quick Links">
                  FAQs
                </FooterLink>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-heading font-semibold text-white">Explore</h4>
              <div className="flex flex-col gap-1 text-sm">
                <FooterLink href="/en/tips" section="Explore">
                  Local Tips
                </FooterLink>
                <FooterLink href="/en/todo" section="Explore">
                  Things To Do
                </FooterLink>
                <FooterLink href="/en/checkout" section="Explore">
                  Check Out
                </FooterLink>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 pt-4 mt-4 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 Punta Caelo Vacation Rental • San Carlos, Panama
          </p>
        </div>
      </div>
    </footer>
  );
}
