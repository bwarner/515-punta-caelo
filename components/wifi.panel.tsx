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
      <div className="flex flex-col items-center w-full">
        {/* White card with rounded bottom */}
        <div className="flex flex-col p-8 pt-12 pb-16 bg-white w-full max-w-md items-center justify-center rounded-b-[3rem] mx-4">
          <Wifi className="w-[120px] h-[120px]" strokeWidth={1} />
          <div className="text-lg uppercase tracking-[0.3em] mt-6">Loading</div>
          <div className="text-5xl font-light tracking-wide mt-2">
            WiFi Info...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center w-full">
        {/* White card with rounded bottom */}
        <div className="flex flex-col p-8 pt-12 pb-16 bg-red-50 border border-red-200 w-full max-w-md items-center justify-center rounded-b-[3rem] mx-4">
          <Wifi className="w-[120px] h-[120px] text-red-500" strokeWidth={1} />
          <div className="text-lg uppercase tracking-[0.3em] mt-6 text-red-700">
            WiFi Error
          </div>
          <div className="text-xl mt-2 text-red-600">{error}</div>
          <div className="text-sm text-red-500 mt-4">
            Please contact your host for WiFi information
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* White card with rounded bottom - WiFi header */}
      <div className="flex flex-col p-8 pt-12 pb-16 bg-white w-full max-w-md items-center justify-center rounded-b-[3rem] mx-4">
        <Wifi className="w-[120px] h-[120px]" strokeWidth={1} />
        <div className="text-lg uppercase tracking-[0.3em] mt-6">Enjoy Our</div>
        <div className="text-5xl font-light tracking-wide mt-2">FREE WIFI</div>
      </div>

      {/* Credentials section with rounded top */}
      {ssid && password && (
        <div className="flex flex-col w-full max-w-md items-center mt-8 mx-4">
          <div className="flex flex-col w-full items-center bg-white rounded-t-[3rem] pt-12 pb-8 px-8">
            <dl className="flex flex-col gap-6 w-full items-center">
              <div className="flex flex-col items-center w-full">
                <dt className="text-lg uppercase tracking-[0.3em] mb-3">
                  Network
                </dt>
                <dd className="font-sans text-lg select-all bg-secondary rounded-full px-8 py-3 text-center w-full max-w-xs">
                  {ssid}
                </dd>
              </div>
              <div className="flex flex-col items-center w-full">
                <dt className="text-lg uppercase tracking-[0.3em] mb-3">
                  Password
                </dt>
                <dd className="font-sans text-lg select-all bg-secondary rounded-full px-8 py-3 text-center w-full max-w-xs">
                  {password}
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <WiFiQRCode ssid={ssid} password={password} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
