import Link from "next/link";
import {
  KeyRound,
  Wifi,
  Armchair,
  MapPin,
  Info,
  CarTaxiFront,
  Bell,
  Compass,
  UtensilsCrossed,
  Martini,
  ListChecks,
  HelpCircle,
  Luggage,
  Star,
  PhoneCall,
} from "lucide-react";

function GridItem({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center justify-center">
        {children}
        <div>{title}</div>
      </div>
    </Link>
  );
}
const iconClass =
  "text-primary border-primary border-2 bg-secondary rounded-lg p-4 h-24 w-24 hover:bg-gradient-to-br hover:from-primary/80 hover:to-primary/60 hover:text-secondary transition-all duration-200";

export default function GuideGrid({ locale = "en" }: { locale: string }) {
  const items = [
    {
      title: "Check-in/out",
      icon: <KeyRound className={iconClass} />,
      href: `/${locale}/check-in-out`,
    },
    {
      title: "WiFi",
      icon: <Wifi className={iconClass} />,
      href: `/${locale}/wifi`,
    },
    {
      title: "Amenities",
      icon: <Armchair className={iconClass} />,
      href: `/${locale}/amenities`,
    },
    {
      title: "Location",
      icon: <MapPin className={iconClass} />,
      href: `/${locale}/location`,
    },
    {
      title: "Transport",
      icon: <CarTaxiFront className={iconClass} />,
      href: `/${locale}/transport`,
    },
    {
      title: "Things to know",
      icon: <Info className={iconClass} />,
      href: `/${locale}/things-to-know`,
    },
    {
      title: "Thinks to do",
      icon: <Compass className={iconClass} />,
      href: `/${locale}/thinks-to-do`,
    },
    {
      title: "Places to eat",
      icon: <UtensilsCrossed className={iconClass} />,
      href: `/${locale}/places-to-eat`,
    },
    {
      title: "Places to drink",
      icon: <Martini className={iconClass} />,
      href: `/${locale}/places-to-drink`,
    },
    {
      title: "Rules",
      icon: <ListChecks className={iconClass} />,
      href: `/${locale}/rules`,
    },
    {
      title: "FAQ",
      icon: <HelpCircle className={iconClass} />,
      href: `/${locale}/faq`,
    },
    {
      title: "Emergency",
      icon: <Bell className={iconClass} />,
      href: `/${locale}/emergency`,
    },
    {
      title: "Before you go",
      icon: <Luggage className={iconClass} />,
      href: `/${locale}/before-you-go`,
    },
    {
      title: "Review",
      icon: <Star className={iconClass} />,
      href: `/${locale}/review`,
    },
    {
      title: "Contact",
      icon: <PhoneCall className={iconClass} />,
      href: `/${locale}/contact`,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-10 px-4 pb-4">
      {items.map((item) => (
        <GridItem title={item.title} href={item.href} key={item.title}>
          {item.icon}
        </GridItem>
      ))}
    </div>
  );
}
