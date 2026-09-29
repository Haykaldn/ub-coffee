"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useSyncExternalStore, type ComponentType } from "react";
import { WhatsApp } from "./Icons";
import HubBackground from "./HubBackground";
import MenuPanel from "./panels/MenuPanel";
import ReservationPanel from "./panels/ReservationPanel";
import LocationPanel from "./panels/LocationPanel";
import EventPanel from "./panels/EventPanel";
import { waLink } from "@/data/site";

const CARDS = [
  { key: "menu", no: "01", title: "Menu" },
  { key: "reservasi", no: "02", title: "Reservasi" },
  { key: "lokasi", no: "03", title: "Lokasi" },
  { key: "event", no: "04", title: "Event & Promo" },
] as const;

type PanelKey = (typeof CARDS)[number]["key"];

const PANELS: Record<PanelKey, ComponentType> = {
  menu: MenuPanel,
  reservasi: ReservationPanel,
  lokasi: LocationPanel,
  event: EventPanel,
};

const panelVariants = {
  hidden: { opacity: 0, y: 28.8 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 14.4 },
};

function keyFromHash(): PanelKey | null {
  const hash = window.location.hash.slice(1);
  return CARDS.some((c) => c.key === hash) ? (hash as PanelKey) : null;
}

const DEFAULT_PANEL: PanelKey = "menu";

// URL (#menu, #reservasi, …) menjadi sumber kebenaran panel aktif, termasuk tombol back browser.
// Tanpa hash, panel Menu yang tampil.
const NAV_EVENT = "ubcoffee:navigate";

function subscribeHash(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("hashchange", onChange);
  window.addEventListener(NAV_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(NAV_EVENT, onChange);
  };
}

function navigate(url: string) {
  history.pushState(null, "", url);
  window.dispatchEvent(new Event(NAV_EVENT));
}

export default function Hub() {
  const active =
    useSyncExternalStore(subscribeHash, keyFromHash, () => null) ?? DEFAULT_PANEL;
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const focusOnEnter = useRef(false);
  const reduceMotion = useReducedMotion();

  const scrollToTop = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  // Tautan langsung (mis. /#lokasi): gulir ke section 2 saat halaman dibuka.
  useEffect(() => {
    if (keyFromHash()) sectionRef.current?.scrollIntoView();
  }, []);

  const open = (key: PanelKey) => {
    if (key === active) return;
    focusOnEnter.current = true;
    navigate(`#${key}`);
    scrollToTop();
  };

  const onPanelEntered = () => {
    if (!focusOnEnter.current) return;
    focusOnEnter.current = false;
    panelRef.current?.querySelector<HTMLElement>("[data-panel-heading]")?.focus({
      preventScroll: true,
    });
  };

  const Panel = PANELS[active];

  return (
    <section id="jelajahi" ref={sectionRef} className="hub" aria-labelledby="hub-title">
      <HubBackground />
      <div className="container">
        <h2 id="hub-title" className="sr-only">
          Jelajahi UB Coffee
        </h2>
        <div className="hub__bar">
          <div className="hub__tabs" role="tablist" aria-label="Pilih konten">
            {CARDS.map((card) => (
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
                <span className="hub-tab__no">{card.no}</span>
                <span className="hub-tab__label">{card.title}</span>
              </button>
            ))}
          </div>

          <a
            className="btn btn--navy hub__wa"
            href={waLink("Halo UB Coffee, saya ingin melakukan reservasi.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp size={18} /> Reservasi via WhatsApp
          </a>
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
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
