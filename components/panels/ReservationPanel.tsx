"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import PhotoSlideshow from "../PhotoSlideshow";
import ReservationDialog from "../ReservationDialog";
import { Calendar, Check, Users } from "../Icons";
import { meetingPackages, reservationText, roomPrices, rooms } from "@/data/reservation";
import { NAV_EVENT, takeNavTarget } from "@/lib/hubNav";

const priceModes = [
  { key: "sewa", title: "Sewa ruangan" },
  { key: "paket", title: "Paket + konsumsi" },
] as const;

type PriceMode = (typeof priceModes)[number]["key"];

export default function ReservationPanel() {
  const [priceMode, setPriceMode] = useState<PriceMode>("sewa");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [roomKey, setRoomKey] = useState<string>();
  const priceRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [highlightCta, setHighlightCta] = useState(false);
  const reduceMotion = useReducedMotion();

  // Klik kartu ruangan: tandai ruangan itu lalu gulir ke kartu Harga; form reservasi
  // nanti langsung memakai ruangan yang dipilih.
  const chooseRoom = (key: string) => {
    setRoomKey(key);
    priceRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  // Dari tombol Reservasi di hero: gulir ke tombol "Reservasi sekarang" dan sorot sebentar.
  // Dicek saat panel muncul dan saat navigasi terjadi ketika panel ini sudah terbuka.
  useEffect(() => {
    let timer: number | undefined;
    const goToCta = () => {
      if (takeNavTarget() !== "booking") return;
      const cta = ctaRef.current;
      cta?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      cta?.focus({ preventScroll: true });
      setHighlightCta(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setHighlightCta(false), 2400);
    };
    goToCta();
    window.addEventListener(NAV_EVENT, goToCta);
    return () => {
      window.removeEventListener(NAV_EVENT, goToCta);
      window.clearTimeout(timer);
    };
  }, [reduceMotion]);

  const selectedRoom = rooms.find((r) => r.key === roomKey);

  return (
    <div className="resv">
      <div className="resv__head">
        <span className="eyebrow">Reservasi</span>
        <h3 className="display panel-title" tabIndex={-1} data-panel-heading>
          Ruang meeting yang <em>nyaman.</em>
        </h3>
        <p className="muted">{reservationText.intro}</p>
      </div>

      <div className="room-grid">
        {rooms.map((room) => (
          <article key={room.key} className={`room ${room.key === roomKey ? "is-active" : ""}`}>
            <div className="room__photo">
              <PhotoSlideshow
                photos={room.photos}
                sizes="(max-width: 920px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
              <span className="room__badge">
                <Users size={16} /> Hingga {room.capacity} orang
              </span>
            </div>
            <div className="room__body">
              <span className="eyebrow">{room.tagline}</span>
              <h4 className="room__name">
                {/* Tombol membentang menutupi seluruh kartu (lihat .room__link::after) */}
                <button
                  type="button"
                  className="room__link"
                  aria-pressed={room.key === roomKey}
                  onClick={() => chooseRoom(room.key)}
                >
                  {room.name}
                </button>
              </h4>
              <p className="muted">{room.desc}</p>

              <h5 className="room__label">Cocok untuk</h5>
              <p className="room__suitable">{room.suitable}</p>

              <h5 className="room__label">Fasilitas</h5>
              <ul className="room__facilities">
                {room.facilities.map((f) => (
                  <li key={f}>
                    <Check size={16} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="price-card" ref={priceRef}>
        <div className="price-card__head">
          <h4 className="price-card__title">Harga</h4>
          <div className="loc-switch price-switch" role="group" aria-label="Pilih jenis harga">
            {priceModes.map((m) => (
              <button
                key={m.key}
                type="button"
                className={`loc-switch__btn ${m.key === priceMode ? "is-active" : ""}`}
                aria-pressed={m.key === priceMode}
                onClick={() => setPriceMode(m.key)}
              >
                {m.key === priceMode && (
                  <motion.span
                    layoutId="price-switch-pill"
                    className="loc-switch__pill"
                    aria-hidden="true"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 34 }
                    }
                  />
                )}
                <span className="loc-switch__label">{m.title}</span>
              </button>
            ))}
          </div>
        </div>

        <ul className="price-list">
          {priceMode === "sewa"
            ? roomPrices.map((p) => (
                <li key={p.label}>
                  <span className="price-list__name">{p.label}</span>
                  <span className="price-list__price">
                    <strong>{p.price}</strong>
                  </span>
                </li>
              ))
            : meetingPackages.map((pkg) => (
                <li key={pkg.name}>
                  <span className="price-list__name">{pkg.name}</span>
                  <span className="price-list__price">
                    <strong>{pkg.price}</strong> / 10 orang
                    <span className="price-list__extra">+{pkg.extra} per orang</span>
                  </span>
                </li>
              ))}
        </ul>
        <p className="price-card__note muted small">
          {priceMode === "sewa" ? reservationText.rentNote : reservationText.packagesNote}
        </p>

        <div className="price-card__cta">
          <p>
            {selectedRoom && (
              <strong className="price-card__room">Ruang {selectedRoom.name} dipilih · </strong>
            )}
            {reservationText.cta}
          </p>
          <button
            ref={ctaRef}
            type="button"
            className={`btn btn--white ${highlightCta ? "is-highlight" : ""}`}
            onClick={() => setBookingOpen(true)}
          >
            <Calendar size={18} /> Reservasi sekarang
          </button>
        </div>
      </div>

      <ReservationDialog open={bookingOpen} room={roomKey} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
