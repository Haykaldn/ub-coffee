"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ambientPhotos } from "@/data/heroPhotos";

const PHOTOS = ambientPhotos;
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

  // Sama seperti PhotoSlideshow: semua foto dirender bertumpuk agar pergantian tidak berkedip.
  return (
    <div className="hub__bg" aria-hidden="true">
      {PHOTOS.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className={`hub__bg-img ${i === index ? "is-active" : ""}`}
        />
      ))}
      <div className="hub__bg-shade" />
    </div>
  );
}
