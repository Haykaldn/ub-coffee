"use client";

import Image from "next/image";
import { motion } from "motion/react";
import OpenStatus from "./OpenStatus";
import PhotoWall from "./PhotoWall";
import { ArrowDown, WhatsApp } from "./Icons";
import { formatHours, site, waLink } from "@/data/site";
import { useOpenState } from "@/lib/hours";
import logo from "@/public/images/Logo UB COFFEE.webp";
import wordmark from "@/public/images/WEBP/UB Coffee_Asset 4@3x.webp";

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
        <motion.h1
          className="hero__title"
          initial={{ filter: "blur(10.8px)", opacity: 0, y: -36 }}
          animate={{
            filter: ["blur(10.8px)", "blur(4.5px)", "blur(0px)"],
            opacity: [0, 0.5, 1],
            y: [-36, 5.4, 0],
          }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        >
          <Image src={wordmark} alt={site.name} priority sizes="(max-width: 767px) 85vw, 560px" />
        </motion.h1>

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
                  {formatHours(row)}
                </dd>
                {isToday && <OpenStatus state={open} className="status-pill--inline" />}
              </div>
            );
          })}
        </dl>
      </div>

      <button type="button" className="hero__scroll" onClick={scrollToHub}>
        <span>SELENGKAPNYA</span>
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
