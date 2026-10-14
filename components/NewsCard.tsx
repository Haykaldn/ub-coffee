import Image from "next/image";
import { ArrowRight, Calendar } from "./Icons";
import { formatDate, newsLabel, type NewsItem } from "@/data/news";

export default function NewsCard({ item, onOpen }: { item: NewsItem; onOpen: () => void }) {
  return (
    <article className="news-card">
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
        <h4>
          {/* Tombol membentang menutupi seluruh kartu (lihat .news-card__link::after) */}
          <button type="button" className="news-card__link" onClick={onOpen}>
            {item.title}
          </button>
        </h4>
        <p className="news-card__excerpt muted small">{item.excerpt}</p>
        <span className="news-card__more" aria-hidden="true">
          Baca selengkapnya <ArrowRight size={14} />
        </span>
      </div>
    </article>
  );
}
