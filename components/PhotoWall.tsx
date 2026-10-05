import Image from "next/image";
import { heroPhotos } from "@/data/heroPhotos";

const ROWS = 4;
const PER_ROW = 8;

// Tiap baris mengambil potongan foto yang berbeda agar dinding tidak terlihat berulang.
function photosForRow(row: number) {
  const offset = Math.round((row * heroPhotos.length) / ROWS);
  return Array.from({ length: PER_ROW }, (_, i) => heroPhotos[(offset + i) % heroPhotos.length]);
}

export default function PhotoWall() {
  return (
    <div className="photo-wall" aria-hidden="true">
      <div className="photo-wall__tilt">
        {Array.from({ length: ROWS }, (_, row) => {
          const photos = photosForRow(row);
          return (
            <div
              key={row}
              className={`photo-wall__row ${row % 2 === 0 ? "is-left" : "is-right"}`}
              style={{ animationDuration: `${220 + row * 15}s` }}
            >
              {/* Isi baris diduplikasi 2× agar translateX(-50%) berulang mulus */}
              {[...photos, ...photos].map((photo, i) => (
                <div key={i} className="photo-wall__item">
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="360px"
                    quality={60}
                    loading={row < 2 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
