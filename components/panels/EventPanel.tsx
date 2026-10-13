import Image from "next/image";
import { ArrowUpRight, Calendar, Instagram } from "../Icons";
import { formatDate, news, newsLabel } from "@/data/news";
import { site } from "@/data/site";

// Terbaru di depan; tanggal ISO bisa dibandingkan sebagai teks
const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));

export default function EventPanel() {
  return (
    <div className="event-panel">
      <div className="event-list__head">
        <h3 className="display panel-title" tabIndex={-1} data-panel-heading>
          Kabar <em>terbaru</em>
        </h3>
        <a className="link-btn" href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
          <Instagram size={18} /> {site.instagram} <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Grid kartu seragam: berapa pun jumlah item, otomatis turun ke baris berikutnya */}
      <div className="news-grid">
        {sorted.map((item) => (
          <article key={item.id} className="news-card">
            <div className="news-card__photo">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 690px) 100vw, (max-width: 920px) 50vw, 380px"
                quality={70}
              />
              <span className="badge">{newsLabel[item.category]}</span>
            </div>
            <div className="news-card__body">
              <p className="event-date">
                <Calendar size={14} /> <time dateTime={item.date}>{formatDate(item.date)}</time>
              </p>
              <h4>{item.title}</h4>
              <p className="muted small">{item.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
