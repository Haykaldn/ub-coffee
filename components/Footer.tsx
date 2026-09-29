import Image from "next/image";
import { Instagram, MapPin, WhatsApp } from "./Icons";
import { formatTime, site, waLink } from "@/data/site";
import logo from "@/public/images/Logo UB COFFEE.webp";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Image src={logo} alt={site.name} className="footer__brand" />
            <p className="footer__tagline">{site.tagline}</p>
            <p className="footer__note">Unit usaha di bawah {site.company}.</p>
          </div>

          <div>
            <h2 className="footer__label">Jam Buka</h2>
            <dl className="footer__hours">
              {site.hours.map((row) => (
                <div key={row.day}>
                  <dt>{row.day}</dt>
                  <dd>
                    {formatTime(row.open)} – {formatTime(row.close)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="footer__label">Kontak</h2>
            <ul className="footer__contact">
              <li>
                <WhatsApp size={18} />
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
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
                <span>{site.address}</span>
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
