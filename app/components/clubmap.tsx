'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; 
import type { Club } from '@prisma/client';

interface Props { clubs: Club[] }

export default function ClubMap({ clubs }: Props) {
  const center: [number, number] = clubs.length
    ? [clubs[0].latitude, clubs[0].longitude]
    : [0, 0];

  const defaultImageUrl = 'https://media.craiyon.com/2025-04-04/a88FQuWLSgK0scUlj2aYVw.webp';

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

      {clubs.map((c) => {

        const clubIcon = new L.Icon({
          defaultImageUrl,
          iconSize: [32, 32],    // size of the icon
          iconAnchor: [16, 16],  // where the icon should be anchored
          popupAnchor: [0, -16], // where the popup should appear
          className: 'rounded-sm border', // optional styling
        });

        return (
          <Marker
            key={c.id}
            position={[c.latitude, c.longitude]}
            icon={clubIcon}
          >
            <Popup>
              <strong>{c.name}</strong><br />
              {c.sport} — {c.level}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

