"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";

export type MapPunkt = {
  slug: string;
  firma: string;
  gewerk: string;
  ort: string;
  lat: number;
  lng: number;
  initialen: string;
  distanz?: number;
};

function icon(text: string) {
  return L.divIcon({
    className: "",
    html: `<div style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:14px;background:#213a34;color:#e4efe7;font:600 12px/1 var(--font-montserrat),sans-serif;letter-spacing:.05em;box-shadow:0 6px 16px rgba(24,43,38,.35);border:2px solid #fff">${text}</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20],
  });
}

export default function PartnerMap({
  punkte,
  zentrum,
}: {
  punkte: MapPunkt[];
  zentrum?: { lat: number; lng: number; name: string };
}) {
  // Partner am gleichen Ort leicht versetzen, damit sie nicht übereinanderliegen
  const versetzt = punkte.map((p, i) => {
    const gleiche = punkte.slice(0, i).filter((q) => q.ort === p.ort).length;
    return { ...p, lat: p.lat + gleiche * 0.012, lng: p.lng + gleiche * 0.018 };
  });
  const center: [number, number] = zentrum ? [zentrum.lat, zentrum.lng] : [51.7, 7.4];

  return (
    <div className="relative z-0 overflow-hidden rounded-3xl border border-line">
      <MapContainer center={center} zoom={zentrum ? 10 : 9} scrollWheelZoom={false} className="h-[560px] w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {zentrum && (
          <Circle center={[zentrum.lat, zentrum.lng]} radius={25000} pathOptions={{ color: "#213a34", weight: 1, fillColor: "#c9ddcf", fillOpacity: 0.25 }} />
        )}
        {versetzt.map((p) => (
          <Marker key={p.slug} position={[p.lat, p.lng]} icon={icon(p.initialen)}>
            <Popup>
              <div style={{ fontFamily: "var(--font-montserrat), sans-serif", minWidth: 180 }}>
                <p style={{ margin: 0, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#5e6b66" }}>{p.gewerk}</p>
                <p style={{ margin: "4px 0 2px", fontWeight: 600, fontSize: 14, color: "#1b2421" }}>{p.firma}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#5e6b66" }}>
                  {p.ort}
                  {p.distanz !== undefined ? ` · ca. ${p.distanz} km` : ""}
                </p>
                <Link href={`/partner/${p.slug}`} style={{ display: "inline-block", marginTop: 10, fontSize: 12, fontWeight: 600, color: "#213a34" }}>
                  Profil ansehen →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
