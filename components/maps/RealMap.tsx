'use client'

import { MapContainer, TileLayer, WMSTileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const INITIAL_CENTER: [number, number] = [-10.1843, -48.3336];

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom(), { duration: 1.5 });
  }, [center, map]);

  return null;
}

export default function RealMap({
  kind,
  center = INITIAL_CENTER
}: {
  kind: "degradacao" | "fogo";
  center?: [number, number];
}) {
  const isDegradacao = kind === "degradacao";

  const customIcon = L.divIcon({
    className: 'bg-transparent',
    html: `
      <div class="relative flex items-center justify-center w-12 h-12">
        <div class="absolute w-full h-full ${isDegradacao ? 'bg-amber-400' : 'bg-amber-600'} opacity-20 rounded-full animate-ping"></div>
        <div class="relative w-7 h-7 ${isDegradacao ? 'bg-amber-500' : 'bg-amber-900'} rounded-full border-4 border-white shadow-[0_4px_20px_rgba(225,29,72,0.6)] flex items-center justify-center transition-transform hover:scale-110">
          <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
        </div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

  return (
    <div style={{ width: '100%', height: '100%', zIndex: 0, position: 'relative' }}>
      <MapContainer
        center={center}
        zoom={7}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <MapUpdater center={center} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />

        {isDegradacao ? (
          <TileLayer
            url="https://storage.googleapis.com/earthenginepartners-hansen/tiles/gfc_v1.9/loss/{z}/{x}/{y}.png"
            opacity={0.8}
          />
        ) : (
          <WMSTileLayer
            url="https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/3c6bb7f2a258632542577993f631d387"
            layers="fires_viirs_snpp_24"
            format="image/png"
            transparent={true}
            opacity={0.7}
          />
        )}

        <Marker position={center} icon={customIcon}>
          <Popup>
            <div className="font-sans text-sm p-1">
              <strong className="text-[var(--color-ink)] block mb-1">
                {isDegradacao ? "Área Degradada" : "Foco de Queimada"}
              </strong>
              <span className="text-muted-foreground">Monitoramento ativo.</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}