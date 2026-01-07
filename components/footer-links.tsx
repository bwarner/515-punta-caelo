export default function FooterLinks({
  children,
  _className,
}: {
  children: React.ReactNode;
  _className?: string;
}) {
  return (
    <div className="wrapper" data-width="narrow" data-align="center">
      <ul className="footer_links">{children}</ul>
    </div>
  );
}
