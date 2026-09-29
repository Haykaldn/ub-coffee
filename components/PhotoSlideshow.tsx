"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Photo = { src: string; alt: string };

/** Foto berganti otomatis dengan transisi memudar (dipakai di kartu foto panel). */
export default function PhotoSlideshow({
  photos,
  interval = 4000,
  sizes,
}: {
  photos: Photo[];
  interval?: number;
  sizes: string;
}) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || photos.length < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % photos.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduceMotion, photos.length, interval]);

  return (
    <>
      {photos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={i === index ? photo.alt : ""}
          aria-hidden={i !== index}
          fill
          sizes={sizes}
          quality={75}
          className={`slideshow__img ${i === index ? "is-active" : ""}`}
        />
      ))}
    </>
  );
}
