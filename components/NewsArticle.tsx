import Image from "next/image";
import { ArrowLeft, Calendar } from "./Icons";
import { formatDate, newsByType, newsLabel, type NewsItem } from "@/data/news";

const MORE_COUNT = 3;

/** Teks lengkap satu berita/artikel, menggantikan isi panel Berita & Artikel. */
export default function NewsArticle({
  item,
  onBack,
  onOpen,
}: {
  item: NewsItem;
  onBack: () => void;
  onOpen: (item: NewsItem) => void;
}) {
  const more = newsByType(item.type)
    .filter((n) => n.id !== item.id)
    .slice(0, MORE_COUNT);

  return (
    <div className="news-article-layout">
      <article className="news-article">
        <div className="news-article__top">
          <button type="button" className="news-back" onClick={onBack}>
            <ArrowLeft size={18} /> Kembali
          </button>
          <div className="news-article__meta">
            <span className="news-tag">{newsLabel[item.category]}</span>
            <span className="news-article__date">
              <Calendar size={14} /> <time dateTime={item.date}>{formatDate(item.date)}</time>
            </span>
          </div>
        </div>

        <div className="news-article__photo">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 920px) 100vw, 800px"
            quality={75}
          />
        </div>

        <h3 className="news-article__title" tabIndex={-1} data-panel-heading>
          {item.title}
        </h3>

        <div className="news-article__body">
          {item.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      {more.length > 0 && (
        <aside className="news-side" aria-labelledby="news-more-title">
          <h4 id="news-more-title" className="news-side__title">
            {item.type === "artikel" ? "Artikel terbaru" : "Berita terbaru"}
          </h4>
          <ul className="news-side__list">
            {more.map((n) => (
              <li key={n.id}>
                <button type="button" className="news-side__item" onClick={() => onOpen(n)}>
                  <span className="news-side__thumb">
                    <Image src={n.image} alt="" fill sizes="(max-width: 920px) 100vw, 340px" />
                  </span>
                  <span className="news-side__date">{formatDate(n.date)}</span>
                  <strong>{n.title}</strong>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
