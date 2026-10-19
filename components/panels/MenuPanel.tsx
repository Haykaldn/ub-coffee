"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, FileText } from "../Icons";
import { menuFilters, type MenuFilterKey } from "@/lib/menu";
import type { MenuItem } from "@/types/content";

const fade = {
  initial: { opacity: 0, y: 9 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -9 },
  transition: { duration: 0.3 },
};

// Jeda sebelum menu berganti otomatis
const AUTOPLAY_MS = 4000;
// Setelah klik Sebelumnya/Berikutnya, autoplay menunggu selama ini tanpa interaksi
const RESUME_AFTER_MS = 10000;

export default function MenuPanel({
  items: menu,
  pdfUrl,
}: {
  items: MenuItem[];
  pdfUrl: string; // PDF menu lengkap
}) {
  const [filter, setFilter] = useState<MenuFilterKey>("all");
  const [index, setIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const reduceMotion = useReducedMotion();

  // Filter yang belum punya item tidak ditampilkan
  const visibleFilters = menuFilters.filter(
    (f) => f.key === "all" || menu.some((m) => m.category === f.key),
  );

  const items = filter === "all" ? menu : menu.filter((m) => m.category === filter);
  const item = items[index] ?? items[0];

  const changeFilter = (key: MenuFilterKey) => {
    setFilter(key);
    setIndex(0);
    setManual(false);
  };
  const step = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + items.length) % items.length);
    setManual(true);
  };

  // Ganti menu tiap 4 detik. Klik Sebelumnya/Berikutnya menjeda autoplay; setiap klik
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
        <h3 className="display panel-title" tabIndex={-1} data-panel-heading>
          Our Best Seller Menu
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
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="menu-panel__cta">
          <p>Temukan lebih banyak pilihan menu kami</p>
          <a className="btn btn--navy" href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <FileText size={18} /> Lihat Menu Lengkap
          </a>
        </div>
      </div>

      <div className="menu-panel__visual">
        <AnimatePresence>
          <motion.div
            key={item.id}
            className="menu-panel__photo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(max-width: 920px) 100vw, 50vw"
              quality={75}
            />
          </motion.div>
        </AnimatePresence>

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
