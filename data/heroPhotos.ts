// Foto asli UB Coffee (public/images/WEBP). Foto potret sudah dipotong jadi landscape 3:2.
export const photo = (file: string) => `/images/WEBP/${file}.webp`;

// Dinding foto hero: 4 baris × 8 foto, semuanya berbeda.
export const heroPhotos: { src: string; alt: string }[] = [
  { src: photo("DSC01991"), alt: "Tampak depan UB Coffee" },
  { src: photo("Iced_UB_Coffee_1"), alt: "Es kopi susu UB Coffee" },
  { src: photo("DSCF0390"), alt: "Pengunjung di area dalam" },
  { src: photo("DFTA0004"), alt: "Papan nama UB Coffee" },
  { src: photo("DSC01872"), alt: "Barista membuat latte art" },
  { src: photo("DFTA0041"), alt: "Area taman dan gazebo" },
  { src: photo("2"), alt: "Merchandise UB Coffee" },
  { src: photo("DSC02111"), alt: "Meja panjang di area indoor" },
  { src: photo("DSC01690-2"), alt: "Pelayan mencatat pesanan" },
  { src: photo("DFTA0061"), alt: "Bangunan UB Coffee" },
  { src: photo("DSC01924"), alt: "Hidangan nasi UB Coffee" },
  { src: photo("DSCF0395"), alt: "Suasana ruang kaca" },
  { src: photo("DSCF0454"), alt: "Biji kopi kemasan UB Coffee" },
  { src: photo("3"), alt: "Sudut meja kafe" },
  { src: photo("DSCF0477"), alt: "Es kopi di atas nampan" },
  { src: photo("DFTA0008"), alt: "Kucing di halaman kafe" },
  { src: photo("DSC01964"), alt: "Pintu masuk UB Coffee" },
  { src: photo("DSC01795"), alt: "Minuman botol UB Coffee" },
  { src: photo("DFTA0029"), alt: "Gazebo beratap genteng" },
  { src: photo("DSC02083"), alt: "Koki memasak di dapur" },
  { src: photo("DSCF0394"), alt: "Pengunjung di balik jendela kaca" },
  { src: photo("DSCF0523"), alt: "Drip bag kopi UB Coffee" },
  { src: photo("DFTA0062"), alt: "Dinding bata dengan logo UB Coffee" },
  { src: photo("Iced_UB_Coffee_11"), alt: "Es kopi menemani kerja" },
  { src: photo("DSC01881"), alt: "Pengunjung bekerja di kafe" },
  { src: photo("DSC01936"), alt: "Salad UB Coffee" },
  { src: photo("DFTA0045"), alt: "Area semi outdoor" },
  { src: photo("4"), alt: "Pengunjung di area merch" },
  { src: photo("DSCF0516"), alt: "Kopi kemasan dan tumbler" },
  { src: photo("DSC01993"), alt: "Bangunan bata UB Coffee" },
  { src: photo("DSC01821"), alt: "Pelayan menyapa pengunjung" },
  { src: photo("Iced_UB_Coffee_3"), alt: "Es kopi di meja kayu" },
];

// Latar slideshow section 2: foto suasana yang tetap enak dilihat saat digelapkan.
export const ambientPhotos = [
  "DSC01991",
  "DSCF0395",
  "DSC02111",
  "DFTA0041",
  "DSC01690-2",
  "DSCF0390",
  "DSC01964",
  "DSC02120",
].map((f) => ({ src: photo(f), alt: "" }));
