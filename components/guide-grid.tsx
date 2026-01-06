"use client";

import Link from "next/link";
import posthog from "posthog-js";
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
  const handleClick = () => {
    posthog.capture("guide_section_clicked", {
      section_title: title,
      destination_href: href,
    });
  };

  return (
    <Link href={href} onClick={handleClick}>
      <div className="flex flex-col items-center justify-center">
        {children}
        <div>{title}</div>
      </div>
    </Link>
  );
}
const iconClass =
  "text-primary border-primary border-2 bg-secondary rounded-lg p-4 h-24 w-24 hover:bg-gradient-to-br hover:from-primary/80 hover:to-primary/60 hover:text-secondary transition-all duration-200";

const labels = {
  en: {
    checkInOut: "Check-in/out",
    wifi: "WiFi",
    amenities: "Amenities",
    location: "Location",
    transport: "Transport",
    thingsToKnow: "Things to know",
    thingsToDo: "Things to do",
    placesToEat: "Places to eat",
    placesToDrink: "Places to drink",
    rules: "Rules",
    faq: "FAQ",
    emergency: "Emergency",
    beforeYouGo: "Before you go",
    review: "Review",
    contact: "Contact",
  },
  es: {
    checkInOut: "Entrada/Salida",
    wifi: "WiFi",
    amenities: "Comodidades",
    location: "Ubicación",
    transport: "Transporte",
    thingsToKnow: "Cosas que saber",
    thingsToDo: "Qué hacer",
    placesToEat: "Dónde comer",
    placesToDrink: "Dónde tomar",
    rules: "Reglas",
    faq: "Preguntas",
    emergency: "Emergencias",
    beforeYouGo: "Antes de irse",
    review: "Reservar",
    contact: "Contacto",
  },
};

export default function GuideGrid({ locale = "en" }: { locale?: string }) {
  const t = labels[locale as keyof typeof labels] || labels.en;

  const items = [
    {
      title: t.checkInOut,
      icon: <KeyRound className={iconClass} />,
      href: `/${locale}/check-in-out`,
    },
    {
      title: t.wifi,
      icon: <Wifi className={iconClass} />,
      href: `/${locale}/wifi`,
    },
    {
      title: t.amenities,
      icon: <Armchair className={iconClass} />,
      href: `/${locale}/amenities`,
    },
    {
      title: t.location,
      icon: <MapPin className={iconClass} />,
      href: `/${locale}/location`,
    },
    {
      title: t.transport,
      icon: <CarTaxiFront className={iconClass} />,
      href: `/${locale}/transport`,
    },
    {
      title: t.thingsToKnow,
      icon: <Info className={iconClass} />,
      href: `/${locale}/things-to-know`,
    },
    {
      title: t.thingsToDo,
      icon: <Compass className={iconClass} />,
      href: `/${locale}/things-to-do`,
    },
    {
      title: t.placesToEat,
      icon: <UtensilsCrossed className={iconClass} />,
      href: `/${locale}/places-to-eat`,
    },
    {
      title: t.placesToDrink,
      icon: <Martini className={iconClass} />,
      href: `/${locale}/places-to-drink`,
    },
    {
      title: t.rules,
      icon: <ListChecks className={iconClass} />,
      href: `/${locale}/rules`,
    },
    {
      title: t.faq,
      icon: <HelpCircle className={iconClass} />,
      href: `/${locale}/faq`,
    },
    {
      title: t.emergency,
      icon: <Bell className={iconClass} />,
      href: `/${locale}/emergency`,
    },
    {
      title: t.beforeYouGo,
      icon: <Luggage className={iconClass} />,
      href: `/${locale}/before-you-go`,
    },
    {
      title: t.review,
      icon: <Star className={iconClass} />,
      href: `/${locale}/review`,
    },
    {
      title: t.contact,
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
