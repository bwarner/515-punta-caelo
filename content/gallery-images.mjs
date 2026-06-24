export const galleryImages = [
  { src: "/images/515-punta-caelo/kitchen_view1.jpg", alt: "Kitchen" },
  { src: "/images/515-punta-caelo/kitchen_view2.jpg", alt: "Kitchen" },
  {
    src: "/images/515-punta-caelo/kitchen_view3.jpg",
    alt: "Kitchen and Breakfast Bar",
  },

  {
    src: "/images/515-punta-caelo/livingroom_view1.jpg",
    alt: "Living Room with TV",
  },
  {
    src: "/images/515-punta-caelo/livingroom_view2.jpg",
    alt: "Open Living Space",
  },
  {
    src: "/images/515-punta-caelo/livingroom_view3.jpg",
    alt: "Living Room Seating Area",
  },
  {
    src: "/images/515-punta-caelo/livingroom_inside.jpg",
    alt: "Interior Lounge Area",
  },

  {
    src: "/images/515-punta-caelo/balcony_view1.jpg",
    alt: "Oceanview Balcony",
  },
  {
    src: "/images/515-punta-caelo/balcony_view2.jpg",
    alt: "Balcony with Lounge Chairs",
  },
  {
    src: "/images/515-punta-caelo/balcony_view3.jpg",
    alt: "Balcony Dining Area",
  },

  { src: "/images/515-punta-caelo/pool1_view1.jpg", alt: "Main Pool Area" },
  {
    src: "/images/515-punta-caelo/pool1_view2.jpg",
    alt: "Pool and Lounge Chairs",
  },
  {
    src: "/images/515-punta-caelo/pool3_view1.jpg",
    alt: "Lower Level Pool Area",
  },
  {
    src: "/images/515-punta-caelo/pool3_view2.jpg",
    alt: "Quiet Pool with Palm Trees",
  },

  { src: "/images/515-punta-caelo/skate_view1.jpg", alt: "Skating Ramps" },
  {
    src: "/images/515-punta-caelo/skate_view2.jpg",
    alt: "Skatepark at Sunset",
  },

  { src: "/images/515-punta-caelo/soccer_view1.jpg", alt: "Mini Soccer Field" },

  { src: "/images/515-punta-caelo/paddle_ball.jpg", alt: "Paddle Ball Court" },
  { src: "/images/515-punta-caelo/pingpong_view1.jpg", alt: "Ping Pong Table" },

  {
    src: "/images/515-punta-caelo/gym_view1.jpg",
    alt: "Gym with Cardio Equipment",
  },
  {
    src: "/images/515-punta-caelo/gym_view2.jpg",
    alt: "Free Weights and Machines",
  },

  { src: "/images/515-punta-caelo/bedroom1_view1.jpg", alt: "Master Bedroom" },
  {
    src: "/images/515-punta-caelo/bedroom2_view1.jpg",
    alt: "Guest Bedroom with Double Bed",
  },
  {
    src: "/images/515-punta-caelo/bedroom3_view1.jpg",
    alt: "Guest Bedroom with Twin Beds",
  },
  { src: "/images/515-punta-caelo/bedroom4_view1.jpg", alt: "Fourth Bedroom" },

  {
    src: "/images/515-punta-caelo/billiards_view1.jpg",
    alt: "Billiards Table",
  },

  {
    src: "/images/515-punta-caelo/grounds_view1.jpg",
    alt: "Punta Caelo Grounds",
  },
  {
    src: "/images/515-punta-caelo/grounds_view2.jpg",
    alt: "Lush Tropical Garden",
  },
  {
    src: "/images/515-punta-caelo/grounds_view3.jpg",
    alt: "Pathway Through Grounds",
  },

  {
    src: "/images/515-punta-caelo/dining_view1-2.jpg",
    alt: "Dining Area with 6 Chairs",
  },
  {
    src: "/images/515-punta-caelo/dining_view2.jpg",
    alt: "Indoor Dining Table",
  },

  { src: "/images/515-punta-caelo/laundry_view1.jpg", alt: "Washer and Dryer" },
  {
    src: "/images/515-punta-caelo/bathroom1_view1.jpg",
    alt: "Bathroom with Shower",
  },
  {
    src: "/images/515-punta-caelo/bathroom2_view1.jpg",
    alt: "Second Bathroom",
  },
  { src: "/images/515-punta-caelo/bathroom3_view1.jpg", alt: "Third Bathroom" },
];

/**
 * Curated, captioned sections used by the <GalleryShowcase /> component.
 * Titles and captions are bilingual (en/es); the flat `galleryImages` export
 * above is kept for the legacy <AllImages /> grid.
 */
export const gallerySections = [
  {
    id: "living",
    title: { en: "Living Spaces", es: "Espacios de Estar" },
    images: [
      {
        src: "/images/515-punta-caelo/livingroom_view1.jpg",
        alt: "Living Room",
        caption: {
          en: "Living room with ocean view",
          es: "Sala con vista al mar",
        },
      },
      {
        src: "/images/515-punta-caelo/livingroom_view2.jpg",
        alt: "Open Living Space",
        caption: {
          en: "Open-plan living space",
          es: "Espacio de estar abierto",
        },
      },
      {
        src: "/images/515-punta-caelo/dining_view1-2.jpg",
        alt: "Dining Area",
        caption: { en: "Dining area seats six", es: "Comedor para seis" },
      },
      {
        src: "/images/515-punta-caelo/kitchen_view1.jpg",
        alt: "Kitchen",
        caption: {
          en: "Fully equipped kitchen",
          es: "Cocina totalmente equipada",
        },
      },
    ],
  },
  {
    id: "ocean",
    title: { en: "Ocean Views & Balcony", es: "Vistas al Mar y Balcón" },
    images: [
      {
        src: "/images/515-punta-caelo/balcony_view1.jpg",
        alt: "Oceanfront Balcony",
        caption: { en: "Oceanfront balcony", es: "Balcón frente al mar" },
      },
      {
        src: "/images/515-punta-caelo/balcony_view2.jpg",
        alt: "Balcony Lounge",
        caption: { en: "Balcony lounge chairs", es: "Tumbonas en el balcón" },
      },
      {
        src: "/images/515-punta-caelo/balcony_view3.jpg",
        alt: "Balcony Dining",
        caption: {
          en: "Al fresco balcony dining",
          es: "Comedor al aire libre",
        },
      },
      {
        src: "/images/515-punta-caelo/livingroom_view3.jpg",
        alt: "View from Living Room",
        caption: {
          en: "Ocean view from the living room",
          es: "Vista al mar desde la sala",
        },
      },
    ],
  },
  {
    id: "bedrooms",
    title: { en: "Bedrooms", es: "Habitaciones" },
    images: [
      {
        src: "/images/515-punta-caelo/bedroom1_view1.jpg",
        alt: "Master Bedroom",
        caption: { en: "Master bedroom", es: "Habitación principal" },
      },
      {
        src: "/images/515-punta-caelo/bedroom2_view1.jpg",
        alt: "Guest Bedroom",
        caption: { en: "Guest bedroom", es: "Habitación de huéspedes" },
      },
      {
        src: "/images/515-punta-caelo/bedroom3_view1.jpg",
        alt: "Twin Bedroom",
        caption: { en: "Twin bedroom", es: "Habitación con camas gemelas" },
      },
      {
        src: "/images/515-punta-caelo/bedroom4_view1.jpg",
        alt: "Fourth Bedroom",
        caption: { en: "Fourth bedroom", es: "Cuarta habitación" },
      },
    ],
  },
  {
    id: "pools",
    title: { en: "Pools & Recreation", es: "Piscinas y Recreación" },
    images: [
      {
        src: "/images/515-punta-caelo/pool1_view1.jpg",
        alt: "Main Pool",
        caption: { en: "Main pool", es: "Piscina principal" },
      },
      {
        src: "/images/515-punta-caelo/pool3_view1.jpg",
        alt: "Lower Pool",
        caption: { en: "Lower-level pool", es: "Piscina del nivel inferior" },
      },
      {
        src: "/images/515-punta-caelo/gym_view1.jpg",
        alt: "Fitness Center",
        caption: { en: "Fitness center", es: "Gimnasio" },
      },
      {
        src: "/images/515-punta-caelo/paddle_ball.jpg",
        alt: "Paddle Court",
        caption: { en: "Paddle ball court", es: "Cancha de paddle" },
      },
    ],
  },
  {
    id: "grounds",
    title: { en: "Grounds & Community", es: "Jardines y Comunidad" },
    images: [
      {
        src: "/images/515-punta-caelo/grounds_view1.jpg",
        alt: "Community Grounds",
        caption: { en: "Community grounds", es: "Jardines de la comunidad" },
      },
      {
        src: "/images/515-punta-caelo/grounds_view2.jpg",
        alt: "Tropical Gardens",
        caption: { en: "Tropical gardens", es: "Jardines tropicales" },
      },
      {
        src: "/images/515-punta-caelo/skate_view1.jpg",
        alt: "Skate Park",
        caption: { en: "Skate park", es: "Pista de skate" },
      },
      {
        src: "/images/515-punta-caelo/soccer_view1.jpg",
        alt: "Mini Soccer Field",
        caption: { en: "Mini soccer field", es: "Cancha de fútbol" },
      },
    ],
  },
];
