import { Menu } from "./menu";

export default function Menubar({
  locale,
  title,
  darkBackground = false,
}: {
  locale: string;
  title: string;
  darkBackground?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <Menu locale={locale} title={title} darkBackground={darkBackground} />
    </div>
  );
}
