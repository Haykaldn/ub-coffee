import { photo } from "@/data/paths";
import type { HeroPhoto } from "@/types/content";

// Slideshow hero layar penuh: foto berganti bergiliran; urutan dicampur
// (eksterior, interior, orang) agar bervariasi.
export const heroPhotos: HeroPhoto[] = [
  { id: "hero-dsc01991", src: photo("DSC01991"), alt: "Tampak depan UB Coffee" },
  { id: "hero-dsc01690-2", src: photo("DSC01690-2"), alt: "Pelayan mencatat pesanan" },
  { id: "hero-dfta0020", src: photo("DFTA0020"), alt: "Meja bernomor di area indoor" },
  { id: "hero-dsc02083", src: photo("DSC02083"), alt: "Koki memasak di dapur" },
  { id: "hero-3", src: photo("3"), alt: "Sudut meja kafe" },
  { id: "hero-dfta0029", src: photo("DFTA0029"), alt: "Gazebo beratap genteng" },
  { id: "hero-dsc01881", src: photo("DSC01881"), alt: "Pengunjung bekerja di kafe" },
  { id: "hero-dfta0071", src: photo("DFTA0071"), alt: "Teko dan cangkir di meja saji" },
  { id: "hero-dsc01993", src: photo("DSC01993"), alt: "Bangunan bata UB Coffee" },
  { id: "hero-dsc02019", src: photo("DSC02019"), alt: "Pengunjung berbincang di meja" },
  { id: "hero-dfta0001", src: photo("DFTA0001"), alt: "Kursi di area taman" },
  { id: "hero-dsc02120", src: photo("DSC02120"), alt: "Meja panjang di area indoor" },
  { id: "hero-dscf0517", src: photo("DSCF0517"), alt: "Ruang kaca dilihat dari luar" },
  { id: "hero-dfta0067", src: photo("DFTA0067"), alt: "Bangunan UB Coffee dari halaman" },
  { id: "hero-dscf0391", src: photo("DSCF0391"), alt: "Pengunjung di area dalam" },
  { id: "hero-dfta0045", src: photo("DFTA0045"), alt: "Area semi outdoor" },
  { id: "hero-dsc01965", src: photo("DSC01965"), alt: "Papan nama UB Coffee di tepi jalan" },
];
