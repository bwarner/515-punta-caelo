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
      <div className="flex flex-col gap-4 items-center">
        <div
          className="flex flex-col p-8 bg-white wrapper min-w-80 items-center justify-center"
          data-width="wide"
        >
          <Wifi className="w-[128px] h-[128px]" />
          <div className="text-2xl">Loading WiFi</div>
          <div className="text-4xl py-2">Information...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <div
          className="flex flex-col p-8 bg-red-50 border border-red-200 wrapper min-w-80 items-center justify-center"
          data-width="wide"
        >
          <Wifi className="w-[128px] h-[128px] text-red-500" />
          <div className="text-2xl text-red-700">WiFi Error</div>
          <div className="text-lg py-2 text-red-600">{error}</div>
          <div className="text-sm text-red-500 mt-2">
            Please contact your host for WiFi information
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className="flex flex-col p-8 bg-white wrapper min-w-80 items-center justify-center"
        data-width="wide"
      >
        <Wifi className="w-[128px] h-[128px]" />
        <div className="text-2xl">Enjoy Our</div>
        <div className="text-4xl py-2">Free WiFi</div>
      </div>
      {ssid && password && (
        <div className="flex flex-col">
          <div className="flex flex-col gap-1 min-w-80 items-center justify-center py-5 bg-white">
            <div className="flex flex-col min-w-80 items-center justify-center">
              <dl className="grid grid-cols-1 gap-1">
                <dt className="font-heading font-black uppercase text-md md:text-xl px-8">
                  Network
                </dt>
                <dd className="font-sans text-md md:text-lg select-all bg-secondary rounded-full px-8 py-2 text-center">
                  {ssid}
                </dd>
                <dt className="font-heading font-black uppercase text-md md:text-xl px-8">
                  Password
                </dt>
                <dd className="font-sans text-md md:text-lg select-all bg-secondary rounded-full px-8 py-2 text-center">
                  {password}
                </dd>
              </dl>
            </div>
            <WiFiQRCode ssid={ssid} password={password} />
          </div>
        </div>
      )}
    </div>
  );
}
