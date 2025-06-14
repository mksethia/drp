'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Club } from '@prisma/client';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useRouter } from 'next/navigation';

// @ts-expect-error: Leaflet types are not fully compatible with TypeScript
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl:       '/images/marker-icon.png',
  shadowUrl:     '/images/marker-shadow.png',
});

interface Props { clubs: Club[] }

export default function ClubMap({ clubs }: Props) {

  const router = useRouter();
  // center on first club or fallback to [0,0]
  const center: [number, number] = clubs.length
    ? [clubs[0].latitude, clubs[0].longitude]
    : [0, 0];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '70vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {clubs.map((c) => (
        <Marker 
          key={c.id} 
          position={[c.latitude, c.longitude]}
          eventHandlers={{
            mouseover: (e) => e.target.openPopup(),
            mouseout: (e) => e.target.closePopup(),
            mousedown: () => router.push(`/posts/${c.id}`) // Navigate to club details on click
          }}
        >
          <Popup>
            <strong>{c.name}</strong><br />
            {c.sport} — {c.level}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
