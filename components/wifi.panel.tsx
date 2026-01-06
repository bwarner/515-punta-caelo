"use client";

import { Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import WiFiQRCode from "./wifi-qr-code";

interface WiFiPanelProps {
  encodedSsid: string;
  encodedPassword: string;
}

export default function WiFiPanel({
  encodedSsid,
  encodedPassword,
}: WiFiPanelProps) {
  const [ssid, setSsid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string>("");

  // Decode credentials only on client-side after hydration
  useEffect(() => {
    if (!encodedSsid || !encodedPassword) {
      setError("WiFi credentials not configured");
      setMounted(true);
      return;
    }

    try {
      setSsid(atob(encodedSsid));
      setPassword(atob(encodedPassword));
    } catch (error) {
      console.error("Failed to decode WiFi credentials:", error);
      setError("Failed to decode WiFi credentials");
    }
    setMounted(true);
  }, [encodedSsid, encodedPassword]);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center w-full px-6 py-8 md:px-8 md:py-12">
        <div className="flex flex-col p-4 pt-6 pb-4 bg-white w-full max-w-lg items-center justify-center">
          <Wifi className="w-32 h-32 mb-8" strokeWidth={1.5} />
          <div className="text-sm uppercase tracking-[0.4em] font-medium">
            LOADING
          </div>
          <div className="text-3xl font-light tracking-wider mt-1 whitespace-nowrap">
            WIFI INFO...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center w-full px-6 py-8 md:px-8 md:py-12">
        <div className="flex flex-col p-4 pt-6 pb-4 bg-red-50 border border-red-200 w-full max-w-lg items-center justify-center">
          <Wifi className="w-32 h-32 mb-8 text-red-500" strokeWidth={1.5} />
          <div className="text-sm uppercase tracking-[0.4em] font-medium text-red-700">
            WIFI ERROR
          </div>
          <div className="text-2xl font-light mt-4 text-red-600">{error}</div>
          <div className="text-lg text-red-500 mt-6 text-center">
            Please contact your host for WiFi information
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full gap-8 px-6 py-8 md:px-8 md:py-12">
      {/* Top white card with WiFi icon and text - SQUARE */}
      <div className="flex flex-col p-4 pt-6 pb-4 bg-white w-full max-w-lg items-center justify-center">
        <Wifi className="w-32 h-32 mb-8" strokeWidth={1.5} />
        <div className="text-sm uppercase tracking-[0.4em] font-medium">
          ENJOY OUR
        </div>
        <div className="text-4xl font-light tracking-wider mt-1 whitespace-nowrap">
          FREE WIFI
        </div>
      </div>

      {/* Bottom credentials section - ROUNDED BOTTOM ONLY */}
      {ssid && password && (
        <div className="flex flex-col w-full max-w-lg items-center">
          <div className="flex flex-col w-full items-center bg-white rounded-b-[4rem] pt-8 pb-12 px-8">
            {/* QR Code at the top */}
            <div className="mb-12">
              <WiFiQRCode ssid={ssid} password={password} />
            </div>

            {/* Network section */}
            <div className="flex flex-col items-center w-full mb-8">
              <div className="text-xl uppercase tracking-[0.4em] font-medium mb-4">
                NETWORK
              </div>
              <div className="font-sans text-xl font-medium select-all bg-[#D4B5A0] text-black rounded-full px-12 py-4 text-center w-full max-w-sm">
                {ssid}
              </div>
            </div>

            {/* Password section */}
            <div className="flex flex-col items-center w-full">
              <div className="text-xl uppercase tracking-[0.4em] font-medium mb-4">
                PASSWORD
              </div>
              <div className="font-sans text-xl font-medium select-all bg-[#D4B5A0] text-black rounded-full px-12 py-4 text-center w-full max-w-sm">
                {password}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
