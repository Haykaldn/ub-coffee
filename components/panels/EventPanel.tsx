"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "../Icons";
import NewsCard from "../NewsCard";
import NewsArticle from "../NewsArticle";
import { newsByType, newsLabel, newsTypes, type NewsItem, type NewsType } from "@/data/news";

// Tampilan awal hanya yang terbaru; "Lihat Semua" mengganti isi panel dengan semua kabar
const PREVIEW_COUNT = 3;
const PAGE_SIZE = 9;

export default function EventPanel() {
  const [type, setType] = useState<NewsType>("berita");
  const [showAll, setShowAll] = useState(false);
  const [kategori, setKategori] = useState<NewsItem["category"] | null>(null);
  const [page, setPage] = useState(1);
  const [reading, setReading] = useState<NewsItem | null>(null);
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Saat membuka/menutup artikel: gulir ke atas panel dan fokus ke judul baru
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const root = rootRef.current;
    root?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    root?.querySelector<HTMLElement>("[data-panel-heading]")?.focus({ preventScroll: true });
  }, [reading, reduceMotion]);

  const all = newsByType(type);
  // Kategori hanya yang benar-benar dipakai item jenis ini
  const categories = [...new Set(all.map((n) => n.category))];
  const filtered = kategori ? all.filter((n) => n.category === kategori) : all;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const items = showAll
    ? filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : all.slice(0, PREVIEW_COUNT);

  const chooseType = (t: NewsType) => {
    setType(t);
    setKategori(null);
    setPage(1);
  };

  const chooseKategori = (c: NewsItem["category"] | null) => {
    setKategori(c);
    setPage(1);
  };

  const toggleAll = () => {
    setShowAll(!showAll);
    setKategori(null);
    setPage(1);
  };

  if (reading) {
    return (
      <div ref={rootRef} className="news-panel">
        <NewsArticle item={reading} onBack={() => setReading(null)} onOpen={setReading} />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="news-panel">
      <div className="event-panel">
        <div className="event-list__head">
          <h3 className="display panel-title" tabIndex={-1} data-panel-heading>
            {showAll ? (
              <>
                Semua <em>kabar</em>
              </>
            ) : (
              <>
                Kabar <em>terbaru</em>
              </>
            )}
          </h3>
        </div>

        {/* Pilihan Berita/Artikel di kiri, tombol Lihat Semua sejajar di kanan */}
        <div className="news-toolbar">
          <div className="loc-switch news-switch" role="group" aria-label="Pilih jenis kabar">
            {newsTypes.map((t) => (
              <button
                key={t.key}
                type="button"
                className={`loc-switch__btn ${t.key === type ? "is-active" : ""}`}
                aria-pressed={t.key === type}
                onClick={() => chooseType(t.key)}
              >
                {t.key === type && (
                  <motion.span
                    layoutId="news-switch-pill"
                    className="loc-switch__pill"
                    aria-hidden="true"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 34 }
                    }
                  />
                )}
                <span className="loc-switch__label">{t.title}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`more-btn ${showAll ? "more-btn--back" : ""}`}
            onClick={toggleAll}
          >
            {showAll ? (
              <>
                <span className="more-btn__icon">
                  <ArrowLeft size={16} />
                </span>
                Kembali
              </>
            ) : (
              <>
                Lihat Semua
                <span className="more-btn__icon">
                  <ArrowUpRight size={16} />
                </span>
              </>
            )}
          </button>
        </div>

        {showAll && categories.length > 1 && (
          <div className="chips" role="group" aria-label="Filter kategori">
            <button
              type="button"
              className={`chip ${!kategori ? "is-active" : ""}`}
              aria-pressed={!kategori}
              onClick={() => chooseKategori(null)}
            >
              Semua
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip ${c === kategori ? "is-active" : ""}`}
                aria-pressed={c === kategori}
                onClick={() => chooseKategori(c)}
              >
                {newsLabel[c]}
              </button>
            ))}
          </div>
        )}

        {/* Grid kartu seragam: berapa pun jumlah item, otomatis turun ke baris berikutnya */}
        <div className="news-grid">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} onOpen={() => setReading(item)} />
          ))}
        </div>

        {showAll && pageCount > 1 && (
          <nav className="pagination" aria-label="Halaman">
            {page > 1 && (
              <button type="button" className="chip" onClick={() => setPage(page - 1)}>
                Sebelumnya
              </button>
            )}
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={`chip ${n === page ? "is-active" : ""}`}
                aria-current={n === page ? "page" : undefined}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            {page < pageCount && (
              <button type="button" className="chip" onClick={() => setPage(page + 1)}>
                Berikutnya
              </button>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
