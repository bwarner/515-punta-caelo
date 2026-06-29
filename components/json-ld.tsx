import Script from "next/script";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://casapuntacaelo.com/#lodging",
    name: "Punta Caelo Beach Rental",
    description:
      "Stunning 3-bedroom oceanfront condo with maid's quarters in San Carlos, Panama. Ocean views, 3 pools, beach access, fitness center, and full amenities. Just 90 minutes from Panama City.",
    url: "https://casapuntacaelo.com",
    telephone: "+507-6310-9953",
    image: [
      "https://casapuntacaelo.com/images/515-punta-caelo/balcony_view1.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/living_room1.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/master_bedroom1.jpg",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Carlos",
      addressRegion: "Panamá Oeste",
      addressCountry: "PA",
    },
    geo: {
      // Coarse to ~1km precision so we keep the "Panama beach" map signal
      // without pinpointing the building. See app/robots.ts for the matching
      // /:locale/location noindex policy — these need to stay consistent.
      "@type": "GeoCoordinates",
      latitude: 8.45,
      longitude: -79.95,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.93",
      reviewCount: "186",
      bestRating: "5",
      worstRating: "1",
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Ocean View",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Beach Access",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Swimming Pool",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Air Conditioning",
        value: true,
      },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      {
        "@type": "LocationFeatureSpecification",
        name: "Fitness Center",
        value: true,
      },
      { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
    ],
    checkinTime: "15:00",
    checkoutTime: "11:00",
    petsAllowed: true,
    priceRange: "$$",
    sameAs: ["https://www.airbnb.com/h/puntacaelopanama"],
  };

  const vacationRentalJsonLd = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": "https://casapuntacaelo.com/#vacation-rental",
    name: "Punta Caelo Oceanfront Apartment",
    description:
      "Spacious 3-bedroom oceanfront condo with maid's quarters and stunning ocean views. Perfect for families seeking a peaceful beach getaway in Panama.",
    url: "https://casapuntacaelo.com",
    image:
      "https://casapuntacaelo.com/images/515-punta-caelo/balcony_view1.jpg",
    numberOfBedrooms: 3,
    numberOfBathroomsTotal: 3,
    numberOfFullBathrooms: 3,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: 6,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: 200,
      unitCode: "MTK",
    },
    identifier: "515-punta-caelo",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Ocean View",
        value: true,
      },
      { "@type": "LocationFeatureSpecification", name: "Balcony", value: true },
      {
        "@type": "LocationFeatureSpecification",
        name: "Maid's quarters with private bathroom and in-unit washer/dryer",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "3 Swimming Pools",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Direct Beach Access",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Fitness Center",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Fully Equipped Kitchen",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Air Conditioning",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "High-Speed WiFi",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Washer/Dryer",
        value: true,
      },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
    ],
    containsPlace: [
      {
        "@type": "Room",
        name: "Master Bedroom",
        description: "King bed with ocean views and ensuite bathroom",
      },
      {
        "@type": "Room",
        name: "Second Bedroom",
        description: "Queen bed with ensuite bathroom",
      },
      {
        "@type": "Room",
        name: "Third Bedroom",
        description: "Two twin beds with ensuite bathroom",
      },
      {
        "@type": "Room",
        name: "Maid's Quarters",
        description: "Private room with bathroom and washer/dryer",
      },
      {
        "@type": "Room",
        name: "Living Room",
        description: "Open-plan living area with ocean views",
      },
      {
        "@type": "Room",
        name: "Kitchen",
        description: "Fully equipped kitchen with modern appliances",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Carlos",
      addressRegion: "Panamá Oeste",
      addressCountry: "PA",
    },
    geo: {
      // Coarse to ~1km precision so we keep the "Panama beach" map signal
      // without pinpointing the building. See app/robots.ts for the matching
      // /:locale/location noindex policy — these need to stay consistent.
      "@type": "GeoCoordinates",
      latitude: 8.45,
      longitude: -79.95,
    },
    containedInPlace: {
      "@type": "Resort",
      name: "Punta Caelo Resort",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Carlos",
        addressCountry: "PA",
      },
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://casapuntacaelo.com/#website",
    url: "https://casapuntacaelo.com",
    name: "Casa Punta Caelo",
    description: "Panama Beach Vacation Rental",
    inLanguage: ["en", "es"],
  };

  return (
    <>
      <Script
        id="json-ld-lodging"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />
      <Script
        id="json-ld-vacation-rental"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(vacationRentalJsonLd),
        }}
        strategy="afterInteractive"
      />
      <Script
        id="json-ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        strategy="afterInteractive"
      />
    </>
  );
}
