"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, FileText } from "../Icons";
import { formatPrice, menu } from "@/data/menu";
import { site } from "@/data/site";

// Filter tanpa isi (mis. Makanan sebelum datanya ada) tidak ditampilkan
const FILTERS = [
  { key: "all", label: "Semua" },
  { key: "Kopi", label: "Kopi" },
  { key: "Non-Kopi", label: "Non-Kopi" },
  { key: "Makanan", label: "Makanan" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

const visibleFilters = FILTERS.filter(
  (f) => f.key === "all" || menu.some((m) => m.category === f.key),
);

const fade = {
  initial: { opacity: 0, y: 9 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -9 },
  transition: { duration: 0.3 },
};

// Jeda sebelum menu berganti otomatis
const AUTOPLAY_MS = 3000;
// Setelah klik Sebelumnya/Berikutnya, autoplay menunggu selama ini tanpa interaksi
const RESUME_AFTER_MS = 10000;

export default function MenuPanel() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [index, setIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const reduceMotion = useReducedMotion();

  const items = filter === "all" ? menu : menu.filter((m) => m.category === filter);
  const item = items[index] ?? items[0];

  const changeFilter = (key: FilterKey) => {
    setFilter(key);
    setIndex(0);
    setManual(false);
  };
  const step = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + items.length) % items.length);
    setManual(true);
  };

  // Ganti menu tiap 3 detik. Klik Sebelumnya/Berikutnya menjeda autoplay; setiap klik
  // mengulang timer, dan autoplay lanjut setelah 10 detik tanpa klik.
  // Dimatikan bila pengguna memilih gerakan minimal.
  const autoplay = !reduceMotion && items.length > 1;
  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(
      () => {
        setIndex((i) => (i + 1) % items.length);
        setManual(false);
      },
      manual ? RESUME_AFTER_MS : AUTOPLAY_MS,
    );
    return () => clearTimeout(id);
  }, [autoplay, manual, index, filter, items.length]);

  return (
    <div className="panel-grid menu-panel">
      <div className="panel-card menu-panel__info">
        <span className="eyebrow">Menu</span>
        <h3 className="display panel-title" tabIndex={-1} data-panel-heading>
          Temani setiap <em>jeda harimu.</em>
        </h3>

        <div className="chips" role="group" aria-label="Filter menu">
          {visibleFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`chip ${filter === f.key ? "is-active" : ""}`}
              aria-pressed={filter === f.key}
              onClick={() => changeFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="menu-panel__item" aria-live={autoplay && !manual ? "off" : "polite"}>
          <AnimatePresence mode="wait">
            <motion.div key={item.id} {...fade}>
              <span className="menu-panel__cat">{item.category}</span>
              <h4 className="menu-panel__name">{item.name}</h4>
              <p className="muted">{item.description}</p>
              {item.price !== undefined && (
                <p className="menu-panel__price">{formatPrice(item.price)}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <a
          className="btn btn--navy"
          href={site.menuPdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText size={18} /> Lihat Menu Lengkap
        </a>
      </div>

      <div className="menu-panel__visual">
        <span className="menu-visual__dots" aria-hidden="true" />

        <div className="menu-circle">
          <span className="menu-circle__orbit" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              className={`menu-circle__photo ${item.category === "Makanan" ? "" : "is-drink"}`}
              initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="menu-circle__float">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 767px) 70vw, 380px"
                  quality={75}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {item.price !== undefined && (
            <AnimatePresence mode="wait">
              <motion.span
                key={item.id}
                className="menu-circle__price"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.35, delay: 0.15 }}
              >
                <small>IDR</small>
                {Math.round(item.price / 1000)}K
              </motion.span>
            </AnimatePresence>
          )}
        </div>

        <nav className="menu-panel__nav" aria-label="Navigasi menu">
          <button type="button" className="link-btn" onClick={() => step(-1)}>
            <ArrowLeft size={16} /> Sebelumnya
          </button>
          <span className="muted">
            Menu {index + 1} dari {items.length}
          </span>
          <button type="button" className="link-btn" onClick={() => step(1)}>
            Berikutnya <ArrowRight size={16} />
          </button>
        </nav>
      </div>
    </div>
  );
}
