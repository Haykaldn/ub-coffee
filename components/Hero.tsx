"use client";

import Image from "next/image";
import BlurText from "./BlurText";
import OpenStatus from "./OpenStatus";
import PhotoWall from "./PhotoWall";
import { ArrowDown, WhatsApp } from "./Icons";
import { formatTime, site, waLink } from "@/data/site";
import { useOpenState } from "@/lib/hours";
import logo from "@/public/images/Logo UB COFFEE.webp";

export default function Hero() {
  const open = useOpenState();

  const scrollToHub = () => {
    document.getElementById("jelajahi")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" aria-label="UB Coffee">
      <PhotoWall />
      <div className="hero__overlay" />

      <header className="hero__top">
        <Image src={logo} alt="UB Coffee" className="hero__brand" priority />
        <a
          className="btn btn--white"
          href={waLink("Halo UB Coffee, saya ingin melakukan reservasi.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsApp size={18} /> Reservasi
        </a>
      </header>

      <div className="hero__center">
        <BlurText as="h1" text={site.name} className="hero__title" />

        <dl className="hero__hours">
          {site.hours.map((row) => {
            const isToday = open?.today === row;
            return (
              <div key={row.day} className={`hero__hours-col ${isToday ? "is-today" : ""}`}>
                <dt>
                  {row.day}
                  {isToday && <span className="sr-only"> (hari ini)</span>}
                </dt>
                <dd>
                  {formatTime(row.open)} – {formatTime(row.close)}
                </dd>
                {isToday && <OpenStatus state={open} className="status-pill--inline" />}
              </div>
            );
          })}
        </dl>
      </div>

      <button type="button" className="hero__scroll" onClick={scrollToHub}>
        <span>GULIR</span>
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
