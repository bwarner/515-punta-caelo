// Shared config for physical QR codes placed inside the unit.
//
// Each code drives two routes:
//   /qr/<code>          → server-side tracker + UTM redirect (see app/qr/[code]/route.ts)
//   /print/qr/<code>    → printable letter-size page (see app/print/qr/[code]/page.tsx)
//
// Codes describe the *destination experience* (e.g. "guidebook") rather than
// where the sticker is physically mounted, so the same printed sign can be
// moved between the fridge, the welcome binder, the key drop, etc. without
// invalidating PostHog history. If you want per-location attribution later,
// add another key here (e.g. "guidebook-bedroom") and reprint that one.

export const QR_CODES = {
  guidebook: {
    destination: "/guide",
    campaign: "in_unit_guidebook",
    headline: {
      en: "Welcome — Your Guidebook",
      es: "Bienvenido — Tu Guía",
    },
    subhead: {
      en: "WiFi, check-out, things to do — all in one place.",
      es: "WiFi, salida, qué hacer — todo en un solo lugar.",
    },
    instruction: {
      en: "Point your phone camera at the code below.",
      es: "Apunta la cámara de tu teléfono al código.",
    },
  },
} as const;

export type QrCode = keyof typeof QR_CODES;

export function isValidQrCode(code: string): code is QrCode {
  return code in QR_CODES;
}
