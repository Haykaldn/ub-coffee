"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, MapPin } from "../Icons";
import { formatTime, locations } from "@/data/site";
import { useOpenState } from "@/lib/hours";

const fade = {
  hidden: { opacity: 0, y: 7.2 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -7.2 },
};

export default function LocationPanel() {
  const [locKey, setLocKey] = useState(locations[0].key);
  const loc = locations.find((l) => l.key === locKey) ?? locations[0];
  const open = useOpenState(loc.hours);
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="panel-grid">
      <div className="panel-card">
        <div className="loc-switch" role="group" aria-label="Pilih lokasi">
          {locations.map((l) => (
            <button
              key={l.key}
              type="button"
              className={`loc-switch__btn ${l.key === locKey ? "is-active" : ""}`}
              aria-pressed={l.key === locKey}
              onClick={() => setLocKey(l.key)}
            >
              {l.key === locKey && (
                <motion.span
                  layoutId="loc-switch-pill"
                  className="loc-switch__pill"
                  aria-hidden="true"
                  transition={
                    reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }
                  }
                />
              )}
              <span className="loc-switch__label">{l.name}</span>
            </button>
          ))}
        </div>

        <span className="eyebrow">Temui kami</span>
        <h3 className="display panel-title" tabIndex={-1} data-panel-heading>
          Di mana jeda <em>bermula.</em>
        </h3>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={loc.key}
            className="loc-details"
            variants={fade}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={transition}
          >
            <address className="address">
              <MapPin size={20} />
              <span>
                {loc.address}
                <small>{loc.landmark}</small>
              </span>
            </address>

            <a className="btn btn--navy" href={loc.mapsUrl} target="_blank" rel="noopener noreferrer">
              Buka di Google Maps <ArrowUpRight size={18} />
            </a>

            <h4 className="sub-label">Jam buka {loc.name}</h4>
            <table className="hours-table">
              <tbody>
                {loc.hours.map((row) => {
                  const isToday = open?.today === row;
                  return (
                    <tr key={row.day} className={isToday ? "is-today" : ""}>
                      <th scope="row">{row.day}</th>
                      <td>
                        {formatTime(row.open)} – {formatTime(row.close)}
                      </td>
                      <td className="hours-table__status">
                        {isToday && (
                          <span className={`mini-badge ${open.isOpen ? "is-open" : ""}`}>
                            {open.isOpen ? "Buka" : "Tutup"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </AnimatePresence>
        <p className="muted small">Waktu Indonesia Barat (WIB)</p>
      </div>

      <div className="map-stage">
        <div className="map-card">
          {/* key memaksa iframe dimuat ulang saat lokasi berganti */}
          <iframe
            key={loc.key}
            title={`Peta lokasi ${loc.name}`}
            src={loc.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <span className="map-card__tag">
            <MapPin size={14} /> {loc.name}
          </span>
        </div>

        <div className="map-address">
          <div>
            <strong>{loc.name}</strong>
            <span>{loc.addressShort}</span>
          </div>
          <a
            className="btn btn--navy btn--sm"
            href={loc.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Rute <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
