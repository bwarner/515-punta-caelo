"use client";

import { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import posthog from "posthog-js";

interface WiFiQRCodeProps {
  ssid: string;
  password: string;
  security?: "WPA" | "WEP" | "nopass";
  hidden?: boolean;
}

export default function WiFiQRCode({
  ssid,
  password,
  security = "WPA",
  hidden = false,
}: WiFiQRCodeProps) {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const generateQRCode = async () => {
      // WiFi QR code format: WIFI:T:WPA;S:ssid;P:password;H:false;;
      const wifiString = `WIFI:T:${security};S:${ssid};P:${password};H:${hidden};;`;

      try {
        const url = await QRCode.toDataURL(wifiString, {
          width: 200,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        setQrCodeDataURL(url);
      } catch (error) {
        console.error("Failed to generate QR code:", error);
      }
    };

    generateQRCode();
  }, [ssid, password, security, hidden]);

  if (!qrCodeDataURL) {
    return (
      <div className="w-48 h-48 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Loading QR Code...</span>
      </div>
    );
  }

  const handleQRCodeInteraction = () => {
    if (!hasTrackedView.current) {
      hasTrackedView.current = true;
      posthog.capture("wifi_qr_code_viewed", {
        wifi_network: ssid,
        security_type: security,
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={qrCodeDataURL}
        alt={`WiFi QR Code for ${ssid}`}
        className="w-48 h-48 rounded-lg shadow-lg bg-white p-4 cursor-pointer"
        onClick={handleQRCodeInteraction}
        onTouchStart={handleQRCodeInteraction}
      />
      <p className="text-sm text-gray-600 text-center max-w-48">
        Scan with your phone's camera to connect automatically
      </p>
    </div>
  );
}
