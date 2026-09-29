import PhotoSlideshow from "../PhotoSlideshow";
import { Calendar, Check, Users, WhatsApp } from "../Icons";
import { site, waLink } from "@/data/site";
import { photo } from "@/data/heroPhotos";

const PRICES = [
  { label: "Internal UB", price: "IDR 100K" },
  { label: "Eksternal", price: "IDR 150K" },
];

const FACILITIES = ["Air mineral 600ml per orang", "LCD proyektor", "Set audio"];

const ROOM_PHOTOS = [
  { src: photo("DFTA0048"), alt: "Meeting room UB Coffee dengan layar proyektor" },
  { src: photo("DFTA0081"), alt: "Ruang meeting dengan meja coffee break dan sofa" },
  { src: photo("DFTA0045"), alt: "Ruangan kaca semi outdoor UB Coffee" },
  { src: photo("DFTA0069"), alt: "Sajian coffee break untuk meeting" },
  { src: photo("DSC02120"), alt: "Meja panjang di area indoor" },
  { src: photo("DFTA0041"), alt: "Ruangan kaca menghadap taman" },
  { src: photo("DSC02111"), alt: "Area duduk indoor UB Coffee" },
];

const PACKAGES = [
  {
    name: "Mini Coffee Break & 2 Snack",
    desc: "Cocok untuk pertemuan dengan santai dan ngemil ringan.",
    price: "IDR 400K",
    extra: "IDR 40K",
  },
  {
    name: "Mini Coffee Break & 3 Snack",
    desc: "Pilihan ekstra snack untuk memenuhi selera peserta meeting Anda.",
    price: "IDR 450K",
    extra: "IDR 45K",
  },
  {
    name: "Mini Coffee Break Only",
    desc: "Pilihan praktis bagi Anda yang hanya ingin menikmati kopi berkualitas selama meeting.",
    price: "IDR 250K",
    extra: "IDR 25K",
  },
];

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
          <PhotoSlideshow photos={ROOM_PHOTOS} sizes="(max-width: 1023px) 100vw, 50vw" />
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

      <div className="panel-card packages">
        <span className="eyebrow">Paket meeting</span>
        <h4 className="display packages__title">
          Pilihan <em>paket.</em>
        </h4>
        <p className="muted">
          Seluruh paket sudah termasuk biaya sewa ruangan dan air mineral gratis untuk minimal 10
          orang.
        </p>

        <div className="package-grid">
          {PACKAGES.map((pkg) => (
            <article key={pkg.name} className="package">
              <h5 className="package__name">{pkg.name}</h5>
              <p className="muted small">{pkg.desc}</p>
              <p className="package__price">
                <strong>{pkg.price}</strong> <span>/ 10 orang</span>
              </p>
              <p className="package__extra">Tambahan per orang: {pkg.extra}</p>
              <a
                className="btn btn--navy btn--sm"
                href={waLink(`Halo UB Coffee, saya ingin memesan paket "${pkg.name}".`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp size={16} /> Pesan paket
              </a>
            </article>
          ))}
        </div>

        <div className="package-info">
          <div>
            <h5 className="sub-label">Pilihan snack favorit</h5>
            <p className="muted small">
              Kami menyediakan berbagai pilihan snack tradisional yang lezat, mulai dari donat
              manis, lapis, dadar gulung, hingga pizza mini. Semua bisa disesuaikan dengan selera
              peserta meeting Anda untuk pengalaman yang lebih personal.
            </p>
          </div>
          <div>
            <h5 className="sub-label">Cara pemesanan</h5>
            <p className="package-info__note">
              <Calendar size={18} />
              <span>
                Untuk memastikan ketersediaan dan kualitas terbaik, pemesanan paket dengan snack
                harus dikonfirmasi <strong>maksimal H-1</strong> sebelum acara. Jangan lewatkan
                kesempatan ini dan buat pertemuan Anda lebih berkesan dengan UB Coffee!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
