import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLocale, locales } from "@/i18n";

type Supported = (typeof locales)[number];

function pickFromAcceptLanguage(header: string): Supported {
  const candidates = header
    .toLowerCase()
    .split(",")
    .map((part) => part.trim().split(";")[0].split("-")[0]);
  for (const code of candidates) {
    if ((locales as readonly string[]).includes(code)) {
      return code as Supported;
    }
  }
  return defaultLocale;
}

export default async function Home() {
  const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    redirect(`/${cookieLocale}`);
  }

  const accept = (await headers()).get("accept-language") || "";
  redirect(`/${pickFromAcceptLanguage(accept)}`);
}
