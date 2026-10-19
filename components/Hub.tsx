"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import MenuPanel from "./panels/MenuPanel";
import ReservationPanel from "./panels/ReservationPanel";
import LocationPanel from "./panels/LocationPanel";
import NewsPanel from "./panels/NewsPanel";
import {
  hubTabs,
  NAV_EVENT,
  navigate,
  replaceLegacyHash,
  tabFromHash,
  type HubTabKey,
} from "@/lib/hubNav";
import type { MenuItem } from "@/types/content";

/** Data semua panel, dari app/page.tsx. Tambah field di sini saat panel lain butuh data. */
export type HubProps = {
  menu: MenuItem[];
};

function renderPanel(key: HubTabKey, data: HubProps) {
  switch (key) {
    case "menu":
      return <MenuPanel items={data.menu} />;
    case "reservasi":
      return <ReservationPanel />;
    case "lokasi":
      return <LocationPanel />;
    case "berita":
      return <NewsPanel />;
  }
}

const panelVariants = {
  hidden: { opacity: 0, y: 28.8 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 14.4 },
};

const DEFAULT_PANEL: HubTabKey = "menu";

// URL (#menu, #reservasi, …) menjadi sumber kebenaran panel aktif, bukan state React, agar
// tombol back/forward browser dan tautan yang dibagikan (mis. /#lokasi) langsung membuka panel
// yang benar. Tanpa hash, panel Menu yang tampil.

function subscribeHash(onChange: () => void) {
  // Hash key lama yang diketik saat halaman terbuka (mis. #event) diganti dulu
  const handle = () => {
    replaceLegacyHash();
    onChange();
  };
  window.addEventListener("popstate", handle);
  window.addEventListener("hashchange", handle);
  window.addEventListener(NAV_EVENT, handle);
  return () => {
    window.removeEventListener("popstate", handle);
    window.removeEventListener("hashchange", handle);
    window.removeEventListener(NAV_EVENT, handle);
  };
}

export default function Hub(props: HubProps) {
  // Snapshot server = null (tidak ada window); di klien hash dibaca setelah hydration.
  const active = useSyncExternalStore(subscribeHash, tabFromHash, () => null) ?? DEFAULT_PANEL;
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const focusOnEnter = useRef(false);
  const reduceMotion = useReducedMotion();

  const scrollToTop = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  // Tautan langsung (mis. /#lokasi): gulir ke section 2 saat halaman dibuka.
  // Tautan lama (/#event) diganti dulu menjadi key sekarang.
  useEffect(() => {
    replaceLegacyHash();
    if (tabFromHash()) sectionRef.current?.scrollIntoView();
  }, []);

  const open = (key: HubTabKey) => {
    if (key === active) return;
    focusOnEnter.current = true;
    navigate(`#${key}`);
    scrollToTop();
  };

  // Setelah tab diklik, fokus dipindah ke judul panel baru agar pengguna keyboard dan pembaca
  // layar langsung berada di konten yang berganti. Tidak dilakukan saat halaman pertama dibuka.
  const onPanelEntered = () => {
    if (!focusOnEnter.current) return;
    focusOnEnter.current = false;
    panelRef.current?.querySelector<HTMLElement>("[data-panel-heading]")?.focus({
      preventScroll: true,
    });
  };

  return (
    <section id="jelajahi" ref={sectionRef} className="hub" aria-labelledby="hub-title">
      <div className="container">
        <h2 id="hub-title" className="sr-only">
          Jelajahi UB Coffee
        </h2>
        <div className="hub__bar">
          <div className="hub__tabs" role="tablist" aria-label="Pilih konten">
            {hubTabs.map((card) => (
              <button
                key={card.key}
                type="button"
                role="tab"
                id={`tab-${card.key}`}
                aria-selected={active === card.key}
                aria-controls={`panel-${card.key}`}
                className={`hub-tab ${active === card.key ? "is-active" : ""}`}
                onClick={() => open(card.key)}
              >
                {active === card.key && (
                  <motion.span
                    layoutId="hub-tab-pill"
                    className="hub-tab__pill"
                    aria-hidden="true"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 34 }
                    }
                  />
                )}
                <span className="hub-tab__label">{card.title}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            ref={panelRef}
            id={`panel-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            className="hub__panel"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={(def) => def === "show" && onPanelEntered()}
          >
            {renderPanel(active, props)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
