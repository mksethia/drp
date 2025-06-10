'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Club } from '@/lib/prisma'; // adjust import

interface Props { clubs: Club[] }

export default function ClubMap({ clubs }: Props) {
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
        <Marker key={c.id} position={[c.latitude, c.longitude]}>
          <Popup>
            <strong>{c.name}</strong><br />
            {c.sport} — {c.level}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
