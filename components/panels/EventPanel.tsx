import Image from "next/image";
import { ArrowUpRight, Calendar, Instagram } from "../Icons";
import { formatDate, news, newsLabel } from "@/data/news";
import { site } from "@/data/site";

export default function EventPanel() {
  const featured = news.find((n) => n.featured) ?? news[0];
  const latest = news.filter((n) => n.id !== featured.id).slice(0, 3);

  return (
    <div className="panel-grid">
      <article className="panel-card event-featured">
        <div className="event-featured__photo">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            quality={75}
          />
          <span className="badge">{newsLabel[featured.category]}</span>
        </div>
        <p className="event-date">
          <Calendar size={16} /> {formatDate(featured.date)}
        </p>
        <h3 className="display panel-title" tabIndex={-1} data-panel-heading>
          {featured.title}
        </h3>
        <p className="muted">{featured.excerpt}</p>
        <a
          className="btn btn--navy"
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={18} /> Selengkapnya di Instagram
        </a>
      </article>

      <div className="event-list">
        <div className="event-list__head">
          <h3 className="display">
            Kabar <em>terbaru</em>
          </h3>
          <a className="link-btn" href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
            <Instagram size={18} /> {site.instagram} <ArrowUpRight size={14} />
          </a>
        </div>

        {latest.map((item) => (
          <article key={item.id} className="news-card">
            <div className="news-card__photo">
              <Image src={item.image} alt={item.title} fill sizes="140px" quality={60} />
            </div>
            <div>
              <div className="news-card__meta">
                <span className={`badge badge--${item.category}`}>{newsLabel[item.category]}</span>
                <time dateTime={item.date}>{formatDate(item.date)}</time>
              </div>
              <h4>{item.title}</h4>
              <p className="muted small">{item.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
