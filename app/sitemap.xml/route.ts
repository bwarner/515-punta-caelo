// app/sitemap.xml/route.ts
export async function GET() {
  const baseUrl = "https://puntacaelo.com";

  const pages = ["rules", "tips", "todo", "faqs", "checkout"];
  const locales = ["en", "es"];

  const urls = locales.flatMap((locale) => {
    return [
      { loc: `${baseUrl}/${locale}` },
      ...pages.map((slug) => ({
        loc: `${baseUrl}/${locale}/${slug}`,
      })),
    ];
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) =>
        `<url><loc>${
          url.loc
        }</loc><lastmod>${new Date().toISOString()}</lastmod></url>`
    )
    .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
