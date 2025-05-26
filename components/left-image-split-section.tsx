// type LeftImageSplitSectionProps = {
//   children: React.ReactNode;
//   renderImage: () => React.ReactNode;
// };

// export default function LeftImageSplitSection({
//   children,
//   renderImage,
// }: LeftImageSplitSectionProps) {
//   return (
//     <div className="flex flex-col md:flex-row">
//       <div className="md:grow-1 order-1 md:order-2">{renderImage()}</div>
//       <div className="md:grow-3 order-2 md:order-1 text-center md:text-left">
//         {children}
//       </div>
//     </div>
//   );
// }

import { ReactNode } from "react";

interface Props {
  renderImage: () => ReactNode;
  children: ReactNode;
}

export default function LeftImageSplitSection({
  renderImage,
  children,
}: Props) {
  return (
    <section className="flex flex-col md:flex-row">
      {/* image column */}
      <div className="relative h-64 md:h-auto md:w-2/5">{renderImage()}</div>

      {/* content column */}
      <div className="md:w-3/5 flex flex-col">{children}</div>
    </section>
  );
}
