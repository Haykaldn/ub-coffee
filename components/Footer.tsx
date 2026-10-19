import Image from "next/image";
import { Instagram, MapPin, WhatsApp } from "./Icons";
import { formatHours, waLink } from "@/lib/format";
import logo from "@/public/images/Logo UB COFFEE.webp";
import type { Location, SiteInfo } from "@/types/content";

export default function Footer({
  site,
  address,
  locations,
}: {
  site: SiteInfo;
  address: string; // alamat lokasi utama
  locations: Location[];
}) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Image src={logo} alt={site.name} className="footer__brand" />
            <p className="footer__tagline">{site.tagline}</p>
            <p className="footer__note">
              {site.name} merupakan salah satu unit bisnis yang berada di bawah Cluster BFB (Food
              and Beverage) {site.company}, yang bergerak di bidang layanan makanan dan minuman.
            </p>
          </div>

          <div>
            <h2 className="footer__label">Jam Buka</h2>
            {locations.map((loc) => (
              <section key={loc.id} className="footer__loc">
                <h3 className="footer__loc-name">{loc.name}</h3>
                <dl className="footer__hours">
                  {loc.hours.map((row) => (
                    <div key={row.id}>
                      <dt>{row.day}</dt>
                      <dd>{formatHours(row)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <div>
            <h2 className="footer__label">Kontak</h2>
            <ul className="footer__contact">
              <li>
                <WhatsApp size={18} />
                <a href={waLink(site.whatsapp)} target="_blank" rel="noopener noreferrer">
                  {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <Instagram size={18} />
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                  {site.instagram}
                </a>
              </li>
              <li>
                <MapPin size={18} />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 UB Coffee · All Rights Reserved</span>
          <a href={site.companyUrl} target="_blank" rel="noopener noreferrer">
            brawijayamultiusaha.co.id
          </a>
        </div>
      </div>
    </footer>
  );
}
