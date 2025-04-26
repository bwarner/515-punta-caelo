export default function FooterLinks({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="wrapper" data-width="narrow" data-align="center">
      <ul className="footer_links">{children}</ul>
    </div>
  );
}
