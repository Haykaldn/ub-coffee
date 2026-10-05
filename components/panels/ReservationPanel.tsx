import PhotoSlideshow from "../PhotoSlideshow";
import { Calendar, Check, Users, WhatsApp } from "../Icons";
import { site, waLink } from "@/data/site";
import {
  meetingPackages,
  reservationText,
  roomFacilities,
  roomPhotos,
  roomPrices,
} from "@/data/reservation";

export default function ReservationPanel() {
  return (
    <div className="panel-grid">
      <div className="panel-card">
        <h3 className="display panel-title" tabIndex={-1} data-panel-heading>
          Ruang meeting yang <em>nyaman</em>
        </h3>
        <p className="muted">{reservationText.intro}</p>

        <h4 className="sub-label">Harga sewa</h4>
        <div className="price-grid">
          {roomPrices.map((p) => (
            <div key={p.label} className="price-box">
              <span>{p.label}</span>
              <strong>{p.price}</strong>
            </div>
          ))}
        </div>

        <h4 className="sub-label">Fasilitas gratis</h4>
        <ul className="check-list">
          {roomFacilities.map((f) => (
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
          <PhotoSlideshow
            photos={roomPhotos}
            sizes="(max-width: 920px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
          <span className="photo-card__badge">
            <Users size={16} /> Hingga 15 orang
          </span>
        </div>

        <div className="cta-block">
          <h4 className="display">Siap untuk memulai?</h4>
          <p>{reservationText.cta}</p>
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
        <p className="muted">{reservationText.packagesNote}</p>

        <div className="package-grid">
          {meetingPackages.map((pkg) => (
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
            <p className="muted small">{reservationText.snacks}</p>
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
