import { Menu } from "./menu";

export default function Menubar({
  locale,
  title,
}: {
  locale: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Menu locale={locale} title={title} />
    </div>
  );
}
