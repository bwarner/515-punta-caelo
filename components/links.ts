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

export const items = (locale: string) => {
  const t = labels[locale as keyof typeof labels] || labels.en;

  return [
    {
      title: t.checkInOut,
      href: `/${locale}/check-in-out`,
    },
    {
      title: t.wifi,
      href: `/${locale}/wifi`,
    },
    {
      title: t.amenities,
      href: `/${locale}/amenities`,
    },
    {
      title: t.location,
      href: `/${locale}/location`,
    },
    {
      title: t.transport,
      href: `/${locale}/transport`,
    },
    {
      title: t.thingsToKnow,
      href: `/${locale}/things-to-know`,
    },
    {
      title: t.thingsToDo,
      href: `/${locale}/things-to-do`,
    },
    {
      title: t.placesToEat,
      href: `/${locale}/places-to-eat`,
    },
    {
      title: t.placesToDrink,
      href: `/${locale}/places-to-drink`,
    },
    {
      title: t.rules,
      href: `/${locale}/rules`,
    },
    {
      title: t.faq,
      href: `/${locale}/faq`,
    },
    {
      title: t.emergency,
      href: `/${locale}/emergency`,
    },
    {
      title: t.beforeYouGo,
      href: `/${locale}/before-you-go`,
    },
    {
      title: t.review,
      href: `/${locale}/review`,
    },
    {
      title: t.contact,
      href: `/${locale}/contact`,
    },
  ];
};
