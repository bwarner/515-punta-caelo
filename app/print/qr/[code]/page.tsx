import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { isValidQrCode, QR_CODES } from "@/lib/qr-codes";

const BASE_URL = "https://www.casapuntacaelo.com";

export const metadata: Metadata = {
  title: "Print QR",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ code: string }> };

export default async function PrintQrPage({ params }: Props) {
  const { code } = await params;
  if (!isValidQrCode(code)) notFound();
  const config = QR_CODES[code];

  const scanUrl = `${BASE_URL}/qr/${code}`;
  const qrSvg = await QRCode.toString(scanUrl, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 1,
    color: { dark: "#0a1929", light: "#ffffff" },
  });

  return (
    <>
      <style
        // letter size + print-clean styles; intentionally kept inline so the
        // print page is fully self-contained and screen preview matches print.
        dangerouslySetInnerHTML={{
          __html: `
            @page { size: letter; margin: 0.4in; }
            html, body { background: #fff; }
            body { margin: 0; }
            .print-sheet {
              width: 7.7in; min-height: 10.2in;
              margin: 0 auto; padding: 0.4in 0.6in;
              display: flex; flex-direction: column;
              align-items: center; text-align: center;
              color: #0a1929;
              font-family: var(--font-raleway), -apple-system, sans-serif;
            }
            .print-eyebrow {
              font-size: 12px; letter-spacing: 0.25em; text-transform: uppercase;
              color: #8b7355; margin-bottom: 0.2in;
            }
            .print-h1 {
              font-family: var(--font-montserrat), Georgia, serif;
              font-size: 44px; font-weight: 300; line-height: 1.1;
              margin: 0 0 0.08in;
            }
            .print-h1-es {
              font-size: 22px; font-weight: 400; color: #555;
              margin: 0 0 0.35in;
            }
            .qr-wrap {
              width: 4.3in; height: 4.3in; padding: 0.25in;
              border: 1px solid #e5dcd0; border-radius: 0.18in;
              background: #fff; margin: 0.15in 0 0.3in;
            }
            .qr-wrap svg { width: 100%; height: 100%; display: block; }
            .scan-row {
              display: flex; align-items: center; justify-content: center;
              gap: 0.18in; margin-bottom: 0.12in;
              font-size: 16px; font-weight: 600;
            }
            .scan-row-es {
              font-size: 14px; font-weight: 400; color: #555;
              margin-bottom: 0.4in;
            }
            .subhead {
              font-size: 14px; max-width: 5in; color: #444;
              margin: 0 0 0.06in;
            }
            .subhead-es { font-size: 13px; color: #666; margin: 0 0 0.35in; }
            .url-fallback {
              margin-top: auto; padding-top: 0.3in;
              font-size: 11px; color: #888;
              border-top: 1px solid #eee; width: 100%;
            }
            .url-fallback strong {
              color: #0a1929; font-weight: 600;
              font-family: ui-monospace, SFMono-Regular, Menospace, monospace;
            }
            .property {
              font-size: 11px; letter-spacing: 0.18em;
              text-transform: uppercase; color: #8b7355;
              margin-top: 0.05in;
            }
            .no-print {
              max-width: 7.7in; margin: 0.5in auto 0;
              padding: 0.2in 0.3in; background: #fff8ed;
              border: 1px solid #f0e3c8; border-radius: 6px;
              font-size: 13px; color: #6b5a2e;
            }
            .no-print code {
              background: #fff; padding: 1px 5px; border-radius: 3px;
              border: 1px solid #f0e3c8;
            }
            @media print { .no-print { display: none !important; } }
          `,
        }}
      />
      <main className="print-sheet">
        <div className="print-eyebrow">Punta Caelo</div>

        <h1 className="print-h1">{config.headline.en}</h1>
        <div className="print-h1-es">{config.headline.es}</div>

        <p className="subhead">{config.subhead.en}</p>
        <p className="subhead-es">{config.subhead.es}</p>

        <div className="qr-wrap" dangerouslySetInnerHTML={{ __html: qrSvg }} />

        <div className="scan-row">{config.instruction.en}</div>
        <div className="scan-row-es">{config.instruction.es}</div>

        <div className="url-fallback">
          Can&apos;t scan? Visit{" "}
          <strong>{scanUrl.replace("https://", "")}</strong>
          <div className="property">Casa Punta Caelo · San Carlos, Panamá</div>
        </div>
      </main>

      <div className="no-print">
        <strong>Print this page:</strong> Cmd/Ctrl + P → set margins to{" "}
        <code>Default</code>, scale to <code>100%</code>, paper{" "}
        <code>Letter</code>. The yellow banner you&apos;re reading right now
        won&apos;t print.
      </div>
    </>
  );
}
