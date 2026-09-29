import { photo } from "@/data/heroPhotos";

export type MenuItem = {
  id: string;
  name: string;
  category: "Kopi" | "Non-Kopi" | "Makanan";
  type: "drink" | "food";
  description: string;
  price: number;
  image: string;
  taste?: { pahit: number; manis: number; asam: number }; // 0–5, khusus minuman
};

// Contoh data — ganti dengan menu dan harga resmi. Foto memakai foto UB Coffee terdekat.
export const menu: MenuItem[] = [
  {
    id: "kopi-susu-ub",
    name: "Kopi Susu UB",
    category: "Kopi",
    type: "drink",
    description: "Espresso, susu segar, dan gula aren. Favorit untuk menemani jam kerja.",
    price: 20000,
    image: photo("Iced_UB_Coffee_1"),
    taste: { pahit: 3, manis: 4, asam: 1 },
  },
  {
    id: "americano",
    name: "Americano",
    category: "Kopi",
    type: "drink",
    description: "Espresso dengan air panas. Ringan, bersih, dan tetap berkarakter.",
    price: 18000,
    image: photo("DSCF0477"),
    taste: { pahit: 4, manis: 0, asam: 2 },
  },
  {
    id: "cafe-latte",
    name: "Café Latte",
    category: "Kopi",
    type: "drink",
    description: "Espresso lembut dengan susu steamed dan lapisan foam tipis.",
    price: 22000,
    image: photo("DSC01872"),
    taste: { pahit: 2, manis: 2, asam: 1 },
  },
  {
    id: "v60",
    name: "V60 Manual Brew",
    category: "Kopi",
    type: "drink",
    description: "Biji kopi pilihan diseduh manual. Tanyakan beans yang tersedia hari ini.",
    price: 25000,
    image: photo("DSCF0454"),
    taste: { pahit: 2, manis: 1, asam: 4 },
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    category: "Non-Kopi",
    type: "drink",
    description: "Matcha Jepang dengan susu segar, creamy dan tidak terlalu manis.",
    price: 24000,
    image: photo("DSC01795"),
    taste: { pahit: 2, manis: 3, asam: 0 },
  },
  {
    id: "chocolate",
    name: "Signature Chocolate",
    category: "Non-Kopi",
    type: "drink",
    description: "Cokelat pekat dengan susu, disajikan panas atau dingin.",
    price: 22000,
    image: photo("Iced_UB_Coffee_6"),
    taste: { pahit: 1, manis: 5, asam: 0 },
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    category: "Makanan",
    type: "food",
    description: "Croissant renyah berlapis mentega. Pas dengan secangkir kopi.",
    price: 18000,
    image: photo("DSC01936"),
  },
  {
    id: "toast",
    name: "Toast & Egg",
    category: "Makanan",
    type: "food",
    description: "Roti panggang dengan telur dan sayuran segar untuk sarapan.",
    price: 25000,
    image: photo("DSC02083"),
  },
  {
    id: "rice-bowl",
    name: "Rice Bowl Ayam",
    category: "Makanan",
    type: "food",
    description: "Nasi hangat, ayam berbumbu, dan sayuran. Mengenyangkan untuk makan siang.",
    price: 28000,
    image: photo("DSC01924"),
  },
];

export function formatPrice(price: number) {
  return `IDR ${Math.round(price / 1000)}K`;
}
