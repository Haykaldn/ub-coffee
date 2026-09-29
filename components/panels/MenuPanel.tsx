"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, ArrowRight, FileText } from "../Icons";
import { formatPrice, menu, type MenuItem } from "@/data/menu";
import { site } from "@/data/site";

const FILTERS = [
  { key: "all", label: "Semua" },
  { key: "drink", label: "Minuman" },
  { key: "food", label: "Makanan" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};

function TasteMeter({ taste }: { taste: NonNullable<MenuItem["taste"]> }) {
  const rows = [
    { label: "Pahit", value: taste.pahit },
    { label: "Manis", value: taste.manis },
    { label: "Asam", value: taste.asam },
  ];
  return (
    <dl className="taste">
      {rows.map((row) => (
        <div key={row.label} className="taste__row">
          <dt>{row.label}</dt>
          <dd aria-label={`${row.value} dari 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`taste__dot ${i < row.value ? "is-on" : ""}`} />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function MenuPanel() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [index, setIndex] = useState(0);

  const items = filter === "all" ? menu : menu.filter((m) => m.type === filter);
  const item = items[index] ?? items[0];

  const changeFilter = (key: FilterKey) => {
    setFilter(key);
    setIndex(0);
  };
  const step = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <div className="panel-grid menu-panel">
      <div className="panel-card menu-panel__info">
        <span className="eyebrow">Menu</span>
        <h3 className="display panel-title" tabIndex={-1} data-panel-heading>
          Temani setiap <em>jeda harimu.</em>
        </h3>

        <div className="chips" role="group" aria-label="Filter menu">
          {FILTERS.map((f) => (
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

        <div className="menu-panel__item" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={item.id} {...fade}>
              <span className="menu-panel__cat">{item.category}</span>
              <h4 className="menu-panel__name">{item.name}</h4>
              <p className="muted">{item.description}</p>
              {item.taste && <TasteMeter taste={item.taste} />}
              <p className="menu-panel__price">{formatPrice(item.price)}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <a
          className="btn btn--navy"
          href={site.menuPdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText size={18} /> Lihat Menu Lengkap (PDF)
        </a>

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

      <div className="menu-panel__visual">
        <div className="menu-circle">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              className="menu-circle__photo"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 767px) 70vw, 380px"
                quality={75}
              />
            </motion.div>
          </AnimatePresence>
          <span className="menu-circle__label">{item.category}</span>
        </div>
      </div>
    </div>
  );
}
