import { encode } from "entities";
import { Wifi } from "lucide-react";
import WiFiQRCode from "./wifi-qr-code";

const ssid = process.env.NEXT_PUBLIC_WIFI_SSID1 || "Chapel Hill";
const password = encode(process.env.NEXT_PUBLIC_WIFI_PASSWORD1 || "");

export default function WiFiPanel() {
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
      {process.env.NEXT_PUBLIC_WIFI_SSID1 && process.env.NEXT_PUBLIC_WIFI_PASSWORD1 && (
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
