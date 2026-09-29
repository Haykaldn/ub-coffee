// Foto sementara (Unsplash). Ganti dengan 12–24 foto asli UB Coffee:
// suasana dalam, barista, kopi, meeting room, live akustik, tampak depan.
import { unsplash } from "@/lib/unsplash";

const u = (id: string) => unsplash(id, 720);

export const heroPhotos: { src: string; alt: string }[] = [
  { src: u("1501339847302-ac426a4a7cbb"), alt: "Suasana dalam kafe" },
  { src: u("1509042239860-f550ce710b93"), alt: "Latte di atas meja" },
  { src: u("1600093463592-8e36ae95ef56"), alt: "Barista menyiapkan kopi" },
  { src: u("1431540015161-0bf868a2d407"), alt: "Meeting room" },
  { src: u("1510915361894-db8b60106cb1"), alt: "Live akustik" },
  { src: u("1554118811-1e0d58224f24"), alt: "Area duduk kafe" },
  { src: u("1495474472287-4d71bcdd2085"), alt: "Secangkir kopi" },
  { src: u("1559925393-8be0ec4767c8"), alt: "Barista di bar kopi" },
  { src: u("1521017432531-fbd92d768814"), alt: "Pengunjung kafe" },
  { src: u("1498804103079-a6351b050096"), alt: "Latte art" },
  { src: u("1517048676732-d65bc937f952"), alt: "Rapat di ruang meeting" },
  { src: u("1453614512568-c4024d13c247"), alt: "Sudut kafe" },
  { src: u("1511920170033-f8396924c348"), alt: "Kopi hitam" },
  { src: u("1511671782779-c97d3d27a1d4"), alt: "Mikrofon panggung" },
  { src: u("1445116572660-236099ec97a0"), alt: "Tampak depan kafe" },
  { src: u("1517701604599-bb29b565090c"), alt: "Seduh manual" },
  { src: u("1559305616-3f99cd43e353"), alt: "Interior kafe" },
  { src: u("1447933601403-0c6688de566e"), alt: "Biji kopi dan cangkir" },
  { src: u("1528605248644-14dd04022da1"), alt: "Pengunjung berbincang" },
  { src: u("1461023058943-07fcbe16d735"), alt: "Kopi susu" },
];
