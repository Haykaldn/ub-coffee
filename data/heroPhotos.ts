import type { Photo } from "@/types/content";

// Foto asli UB Coffee (public/images/WEBP). Foto potret sudah dipotong jadi landscape 3:2.
export const photo = (file: string) => `/images/WEBP/${file}.webp`;

// Dinding foto hero: 4 baris × 8 kotak dari 18 foto pilihan. Foto yang sama
// muncul lagi di baris lain; urutan dicampur (eksterior, interior, orang) agar bervariasi.
export const heroPhotos: Photo[] = [
  { src: photo("DSC01991"), alt: "Tampak depan UB Coffee" },
  { src: photo("DSC01690-2"), alt: "Pelayan mencatat pesanan" },
  { src: photo("DFTA0020"), alt: "Meja bernomor di area indoor" },
  { src: photo("DFTA0004"), alt: "Papan nama UB Coffee" },
  { src: photo("DSC02083"), alt: "Koki memasak di dapur" },
  { src: photo("3"), alt: "Sudut meja kafe" },
  { src: photo("DFTA0029"), alt: "Gazebo beratap genteng" },
  { src: photo("DSC01881"), alt: "Pengunjung bekerja di kafe" },
  { src: photo("DFTA0071"), alt: "Teko dan cangkir di meja saji" },
  { src: photo("DSC01993"), alt: "Bangunan bata UB Coffee" },
  { src: photo("DSC02019"), alt: "Pengunjung berbincang di meja" },
  { src: photo("DFTA0001"), alt: "Kursi di area taman" },
  { src: photo("DSC02120"), alt: "Meja panjang di area indoor" },
  { src: photo("DSCF0517"), alt: "Ruang kaca dilihat dari luar" },
  { src: photo("DFTA0067"), alt: "Bangunan UB Coffee dari halaman" },
  { src: photo("DSCF0391"), alt: "Pengunjung di area dalam" },
  { src: photo("DFTA0045"), alt: "Area semi outdoor" },
  { src: photo("DSC01965"), alt: "Papan nama UB Coffee di tepi jalan" },
];

// Latar slideshow section 2: foto suasana yang tetap enak dilihat saat digelapkan.
export const ambientPhotos: Photo[] = [
  "DSC01991",
  "DSCF0395",
  "DSC02111",
  "DFTA0041",
  "DSC01690-2",
  "DSC01881",
  "DSC01964",
  "DSC02120",
].map((f) => ({ src: photo(f), alt: "" }));
