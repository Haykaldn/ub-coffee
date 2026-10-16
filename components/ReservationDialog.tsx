"use client";

import { useState, type FormEvent } from "react";
import Modal from "./Modal";
import { ArrowRight, Check, Clock, Close, Users } from "./Icons";
import { bookableRooms, meetingPackages, roomPrices } from "@/data/reservation";
import { formatTime } from "@/data/site";
import { addDays, endTime, formatBookingDate, jakartaToday, slotsFor } from "@/lib/booking";
import { submitReservation, type ReservationPayload } from "@/lib/reservationApi";

// Batas tanggal yang bisa dipesan dari hari ini
const MAX_DAYS_AHEAD = 60;
// Jumlah hari yang tampil sebagai pilihan cepat
const DATE_STRIP_DAYS = 7;

/**
 * Form reservasi ruang meeting dalam pop-up.
 * Permintaan dikirim ke dashboard lewat submitReservation (lib/reservationApi.ts).
 */
export default function ReservationDialog({
  open,
  room,
  onClose,
}: {
  open: boolean;
  room?: string; // ruangan yang langsung terpilih
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="booking-title" className="booking">
      <BookingForm initialRoom={room} onClose={onClose} />
    </Modal>
  );
}

/** "2026-10-16" → "Jum, 16 Okt" */
const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Jakarta",
  });

type Range = { from: number; to: number }; // indeks slot, inklusif

function BookingForm({ initialRoom, onClose }: { initialRoom?: string; onClose: () => void }) {
  const today = jakartaToday();
  const [roomKey, setRoomKey] = useState(initialRoom ?? bookableRooms[0].key);
  const [date, setDate] = useState(today);
  const [range, setRange] = useState<Range | null>(null);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  // Terisi setelah dashboard menerima reservasi
  const [sent, setSent] = useState<{ code: string; payload: ReservationPayload } | null>(null);
  const [error, setError] = useState("");

  const room = bookableRooms.find((r) => r.key === roomKey) ?? bookableRooms[0];
  const slots = date ? slotsFor(room.key, date) : [];
  const days = Array.from({ length: DATE_STRIP_DAYS }, (_, i) => addDays(today, i));
  const hours = range ? range.to - range.from + 1 : 0;

  const resetTime = () => {
    setRange(null);
    setError("");
  };

  // Tiap jam diklik satu per satu dan harus berurutan: jam di sebelah pilihan menambah durasi,
  // jam di ujung pilihan dilepas, jam lain memulai pilihan baru.
  const pickSlot = (i: number) => {
    setError("");
    if (!range) return setRange({ from: i, to: i });
    const { from, to } = range;
    if (i === from && i === to) return setRange(null);
    if (i === from) return setRange({ from: from + 1, to });
    if (i === to) return setRange({ from, to: to - 1 });
    if (i === to + 1) return setRange({ from, to: i });
    if (i === from - 1) return setRange({ from: i, to });
    setRange({ from: i, to: i });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!range) {
      setError("Pilih jam reservasi yang masih kosong.");
      return;
    }
    const data = new FormData(e.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const start = slots[range.from].start;
    const payload: ReservationPayload = {
      room: room.key,
      date,
      start,
      end: endTime(start, hours),
      people: Number(field("people")),
      package: field("package") || null,
      name: field("name"),
      phone: field("phone"),
      org: field("org"),
      priceCategory: field("status"),
      notes: field("notes"),
    };

    setStatus("sending");
    setError("");
    try {
      const { code } = await submitReservation(payload);
      setSent({ code, payload });
    } catch {
      setError("Reservasi gagal dikirim. Periksa koneksi lalu coba lagi.");
    } finally {
      setStatus("idle");
    }
  };

  if (sent) {
    const { code, payload } = sent;
    return (
      <div className="booking__inner booking__done">
        <span className="booking__done-icon">
          <Check size={28} />
        </span>
        <h3 id="booking-title" className="display">
          Reservasi <em>terkirim</em>
        </h3>
        <p className="muted">
          Permintaan Anda sudah masuk dan sedang diperiksa admin. Konfirmasi akan dikirim lewat
          WhatsApp ke nomor <strong>{payload.phone}</strong>.
        </p>

        <dl className="booking__receipt">
          <div>
            <dt>Kode reservasi</dt>
            <dd className="booking__code">{code}</dd>
          </div>
          <div>
            <dt>Ruangan</dt>
            <dd>{room.name}</dd>
          </div>
          <div>
            <dt>Tanggal</dt>
            <dd>{formatBookingDate(payload.date)}</dd>
          </div>
          <div>
            <dt>Jam</dt>
            <dd>
              {formatTime(payload.start)} – {formatTime(payload.end)} WIB ({hours} jam)
            </dd>
          </div>
          <div>
            <dt>Peserta</dt>
            <dd>{payload.people} orang</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className="booking__status">Menunggu konfirmasi</span>
            </dd>
          </div>
        </dl>

        <p className="muted small">Simpan kode reservasi untuk ditanyakan ke admin bila perlu.</p>
        <button type="button" className="btn btn--navy" onClick={onClose}>
          Selesai
        </button>
      </div>
    );
  }

  return (
    <form className="booking__inner" onSubmit={onSubmit}>
      <div className="booking__head">
        <div>
          <span className="eyebrow">Reservasi ruang meeting</span>
          <h3 id="booking-title" className="display">
            Pilih <em>jadwal</em>
          </h3>
        </div>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Tutup">
          <Close size={22} />
        </button>
      </div>

      <fieldset className="booking__section">
        <legend className="sub-label">Ruangan</legend>
        <div className="room-pick">
          {bookableRooms.map((r) => (
            <label key={r.key} className={`room-pick__opt ${r.key === roomKey ? "is-active" : ""}`}>
              <input
                type="radio"
                name="room"
                value={r.key}
                checked={r.key === roomKey}
                onChange={() => {
                  setRoomKey(r.key);
                  resetTime();
                }}
                className="sr-only"
              />
              <strong>{r.name}</strong>
              {r.capacity && (
                <span>
                  <Users size={14} /> Hingga {r.capacity} orang
                </span>
              )}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="booking__section">
        <legend className="sub-label">Tanggal</legend>
        <div className="date-pick">
          {days.map((d) => {
            const closed = slotsFor(room.key, d).length === 0;
            return (
              <button
                key={d}
                type="button"
                className={`date-pick__btn ${d === date ? "is-active" : ""}`}
                aria-pressed={d === date}
                disabled={closed}
                onClick={() => {
                  setDate(d);
                  resetTime();
                }}
              >
                {shortDate(d)}
                {closed && " (tutup)"}
              </button>
            );
          })}
          <label className="date-pick__other">
            <span className="sr-only">Tanggal lain</span>
            <input
              type="date"
              className="field"
              value={date}
              min={today}
              max={addDays(today, MAX_DAYS_AHEAD)}
              onChange={(e) => {
                setDate(e.target.value);
                resetTime();
              }}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="booking__section">
        <legend className="sub-label">Jam {date && `· ${formatBookingDate(date)}`}</legend>
        <p className="booking__hint">
          Klik jam yang ingin dipesan. Boleh lebih dari satu jam, asalkan berurutan.
        </p>
        {!date ? (
          <p className="muted small">Pilih tanggal terlebih dahulu.</p>
        ) : slots.every((s) => s.status === "past") ? (
          <p className="muted small">Tidak ada jam tersedia pada tanggal ini.</p>
        ) : (
          <div className="slot-grid">
            {slots.map((s, i) =>
              // Jam yang sudah lewat tidak ditampilkan
              s.status === "past" ? null : (
                <button
                  key={s.start}
                  type="button"
                  className={`slot is-${s.status} ${
                    range && i >= range.from && i <= range.to ? "is-active" : ""
                  }`}
                  disabled={s.status === "booked"}
                  aria-pressed={!!range && i >= range.from && i <= range.to}
                  onClick={() => pickSlot(i)}
                >
                  {formatTime(s.start)} – {formatTime(endTime(s.start, 1))}
                  {s.status === "booked" && <small>Penuh</small>}
                </button>
              ),
            )}
          </div>
        )}

        {range && (
          <p className="slot-summary" aria-live="polite">
            <Clock size={18} />
            <span>
              Jam dipesan:{" "}
              <strong>
                {formatTime(slots[range.from].start)} –{" "}
                {formatTime(endTime(slots[range.from].start, hours))} WIB
              </strong>{" "}
              ({hours} jam)
            </span>
            <button type="button" className="slot-summary__reset" onClick={resetTime}>
              Hapus
            </button>
          </p>
        )}
        {error && !range && (
          <p className="booking__error" role="alert">
            {error}
          </p>
        )}
      </fieldset>

      <div className="booking__section field-grid">
        <div>
          <label className="sub-label" htmlFor="booking-name">
            Nama pemesan
          </label>
          <input id="booking-name" name="name" className="field" required autoComplete="name" />
        </div>
        <div>
          <label className="sub-label" htmlFor="booking-phone">
            No. WhatsApp
          </label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            className="field"
            required
            autoComplete="tel"
            placeholder="08xxxxxxxxxx"
          />
        </div>
        <div>
          <label className="sub-label" htmlFor="booking-org">
            Instansi / organisasi
          </label>
          <input id="booking-org" name="org" className="field" autoComplete="organization" />
        </div>
        <div>
          <label className="sub-label" htmlFor="booking-status">
            Kategori harga
          </label>
          <select id="booking-status" name="status" className="field">
            {roomPrices.map((p) => (
              <option key={p.label} value={p.label}>
                {p.label} ({p.price})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="sub-label" htmlFor="booking-people">
            Jumlah peserta
          </label>
          <input
            id="booking-people"
            name="people"
            type="number"
            className="field"
            min={1}
            max={room.capacity}
            required
          />
        </div>
        <div>
          <label className="sub-label" htmlFor="booking-package">
            Paket meeting
          </label>
          <select id="booking-package" name="package" className="field">
            <option value="">Sewa ruangan saja</option>
            {meetingPackages.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name} ({p.price})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="booking__section">
        <label className="sub-label" htmlFor="booking-notes">
          Catatan (opsional)
        </label>
        <textarea id="booking-notes" name="notes" className="field" rows={3} />
      </div>

      {error && range && (
        <p className="booking__error" role="alert">
          {error}
        </p>
      )}

      <div className="booking__actions">
        <p className="muted small">
          Reservasi diperiksa admin, lalu dikonfirmasi lewat WhatsApp. Paket dengan snack maksimal
          H-1.
        </p>
        <button type="submit" className="btn btn--navy" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <span className="spinner" aria-hidden="true" /> Mengirim…
            </>
          ) : (
            <>
              Kirim reservasi <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
