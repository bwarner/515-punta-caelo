// components/TwoToneBackground.tsx
export default function TwoToneBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* White top half */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-white" />
      {/* Sand bottom half */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-sand" />
      {/* Your content */}
      <div className="relative z-10 px-6 py-12">{children}</div>
    </div>
  );
}
