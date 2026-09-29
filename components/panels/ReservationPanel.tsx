import Image from "next/image";
import { Check, Users, WhatsApp } from "../Icons";
import { site, waLink } from "@/data/site";
import { unsplash } from "@/lib/unsplash";

const PRICES = [
  { label: "Internal UB", price: "IDR 100K" },
  { label: "Eksternal", price: "IDR 150K" },
];

const FACILITIES = ["Air mineral 600ml per orang", "LCD proyektor", "Set audio"];

export default function ReservationPanel() {
  return (
    <div className="panel-grid">
      <div className="panel-card">
        <span className="eyebrow">Reservasi</span>
        <h3 className="display panel-title" tabIndex={-1} data-panel-heading>
          Ruang meeting yang <em>nyaman.</em>
        </h3>
        <p className="muted">
          Cari ruang meeting yang nyaman, fasilitas lengkap, dan suasana inspiratif? Meeting Room
          UB Coffee siap mendukung kesuksesan setiap acara Anda! Dengan kapasitas hingga 15 orang,
          ruangan kami adalah pilihan tepat untuk pertemuan bisnis, pelatihan, hingga workshop
          eksklusif.
        </p>

        <h4 className="sub-label">Harga sewa</h4>
        <div className="price-grid">
          {PRICES.map((p) => (
            <div key={p.label} className="price-box">
              <span>{p.label}</span>
              <strong>{p.price}</strong>
            </div>
          ))}
        </div>

        <h4 className="sub-label">Fasilitas gratis</h4>
        <ul className="check-list">
          {FACILITIES.map((f) => (
            <li key={f}>
              <span className="check-list__icon">
                <Check size={14} />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="stack">
        <div className="photo-card">
          <Image
            src={unsplash("1431540015161-0bf868a2d407")}
            alt="Meeting room UB Coffee dengan meja panjang dan kursi"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            quality={75}
          />
          <span className="photo-card__badge">
            <Users size={16} /> Hingga 15 orang
          </span>
        </div>

        <div className="cta-block">
          <h4 className="display">Siap untuk memulai?</h4>
          <p>
            Hubungi kami untuk reservasi meeting room, peluang kerjasama, atau penyelenggaraan
            event khusus di UB Coffee.
          </p>
          <a
            className="btn btn--white"
            href={waLink("Halo UB Coffee, saya ingin reservasi meeting room.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp size={18} /> {site.whatsappDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
