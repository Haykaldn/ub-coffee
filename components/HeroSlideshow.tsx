"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { heroPhotos } from "@/data/heroPhotos";

const PHOTOS = heroPhotos;
const INTERVAL = 6000;

export default function HeroSlideshow() {
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
    <div className="hero-slideshow" aria-hidden="true">
      {PHOTOS.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          quality={70}
          priority={i === 0}
          className={`hero-slideshow__img ${i === index ? "is-active" : ""}`}
        />
      ))}
    </div>
  );
}
