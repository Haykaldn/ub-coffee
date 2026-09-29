"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { heroPhotos } from "@/data/heroPhotos";

// Cukup beberapa foto agar tidak memuat semua gambar hero sebagai latar layar penuh.
// Foto hero diminta 720px (Unsplash); untuk latar layar penuh minta versi 1600px.
const PHOTOS = heroPhotos
  .slice(0, 8)
  .map((p) => ({ ...p, src: p.src.replace("w=720", "w=1600") }));
const INTERVAL = 5000;

export default function HubBackground() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      // Jangan berganti saat tab tidak terlihat
      if (!document.hidden) setIndex((i) => (i + 1) % PHOTOS.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="hub__bg" aria-hidden="true">
      {PHOTOS.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          quality={55}
          className={`hub__bg-img ${i === index ? "is-active" : ""}`}
        />
      ))}
      <div className="hub__bg-shade" />
    </div>
  );
}
