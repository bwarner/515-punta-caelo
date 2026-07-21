import Script from "next/script";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://casapuntacaelo.com/#lodging",
    name: "Punta Caelo Beach Rental",
    description:
      "Stunning 4-bedroom oceanfront condo in San Carlos, Panama. Three spacious bedrooms plus a private maid's/nanny suite with its own full bathroom (walk-in shower) and in-unit washer-dryer — ideal for families traveling with staff or anyone wanting a separate, self-contained space. Breathtaking ocean views, three pools, direct beach access, a fitness center, and full amenities, just 90 minutes from Panama City.",
    url: "https://casapuntacaelo.com",
    telephone: "+507-6310-9953",
    image: [
      "https://casapuntacaelo.com/images/515-punta-caelo/balcony_view1.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/living_room1.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/master_bedroom1.jpg",
    ],
    address: {
      "@type": "PostalAddress",
      // Panama has no door-to-door postal addressing; development + road is
      // how the property is actually addressed, so no postalCode here.
      streetAddress: "Punta Caelo, Carretera Panamericana",
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
    additionalType: "Apartment",
    name: "Punta Caelo Oceanfront Apartment",
    description:
      "Spacious 3-bedroom oceanfront condo with maid's quarters and stunning ocean views. Perfect for families seeking a peaceful beach getaway in Panama.",
    url: "https://casapuntacaelo.com",
    // Google's vacation rental listings want at least 8 images.
    image: [
      "https://casapuntacaelo.com/images/515-punta-caelo/balcony_view1.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/livingroom_view1.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/livingroom_view2.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/dining_view1-2.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/kitchen_view1.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/bedroom1_view1.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/bedroom2_view1.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/bedroom3_view1.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/pool1_view1.jpg",
      "https://casapuntacaelo.com/images/515-punta-caelo/grounds_view1.jpg",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.93",
      reviewCount: "186",
      bestRating: "5",
      worstRating: "1",
    },
    numberOfBedrooms: 4,
    numberOfBathroomsTotal: 3,
    numberOfFullBathrooms: 3,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: 6,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: 140,
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
    // Google's vacation rental schema reads containsPlace as ONE unit-level
    // Accommodation (occupancy required; additionalType, bed, room counts,
    // and amenityFeature recommended) — not a list of individual rooms.
    containsPlace: {
      "@type": "Accommodation",
      additionalType: "EntirePlace",
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: 6,
      },
      numberOfBedrooms: 4,
      numberOfBathroomsTotal: 3,
      floorSize: {
        "@type": "QuantitativeValue",
        value: 140,
        unitCode: "MTK",
      },
      bed: [
        { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "King" },
        { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Queen" },
        { "@type": "BedDetails", numberOfBeds: 2, typeOfBed: "Twin" },
        { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Single" },
      ],
      amenityFeature: [
        {
          "@type": "LocationFeatureSpecification",
          name: "Ocean View",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Balcony",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Maid's quarters with private bathroom and in-unit washer/dryer",
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
      ],
    },
    address: {
      "@type": "PostalAddress",
      // Panama has no door-to-door postal addressing; development + road is
      // how the property is actually addressed, so no postalCode here.
      streetAddress: "Punta Caelo, Carretera Panamericana",
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
