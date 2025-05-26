type SplitSectionProps = {
  children: React.ReactNode;
  renderImage: () => React.ReactNode;
};

export default function SplitSection({
  children,
  renderImage,
}: SplitSectionProps) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:grow-1 order-2 md:order-1">{renderImage()}</div>
      <div className="md:grow-3 order-1 md:order-2 text-center md:text-left">
        {children}
      </div>
    </div>
  );
}
