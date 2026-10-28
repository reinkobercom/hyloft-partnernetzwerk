"use client";

import dynamic from "next/dynamic";
import type { MapPunkt } from "./PartnerMap";

const PartnerMap = dynamic(() => import("./PartnerMap"), {
  ssr: false,
  loading: () => <div className="h-[560px] w-full animate-pulse rounded-3xl bg-stone" />,
});

export default function PartnerMapLazy(props: { punkte: MapPunkt[]; zentrum?: { lat: number; lng: number; name: string } }) {
  return <PartnerMap {...props} />;
}
