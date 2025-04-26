export default function FooterLinkItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return <li className="footer_link_item">{children}</li>;
}
