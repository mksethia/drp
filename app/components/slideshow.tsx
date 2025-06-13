// components/Slideshow.tsx
'use client';
import { useState } from 'react';

interface SlideshowProps {
  images: string[];
}

export default function Slideshow({ images }: SlideshowProps) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="relative w-full h-64 mb-6">
      <img
        src={images[idx]}
        alt={`Slide ${idx + 1}`}
        className="w-full h-full object-cover rounded-md"
      />
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white px-2 py-1 rounded"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white px-2 py-1 rounded"
      >
        ›
      </button>
    </div>
  );
}
