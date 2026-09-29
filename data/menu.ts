import { unsplash } from "@/lib/unsplash";

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

const u = (id: string) => unsplash(id, 900);

// Contoh data — ganti dengan menu, harga, dan foto resmi.
export const menu: MenuItem[] = [
  {
    id: "kopi-susu-ub",
    name: "Kopi Susu UB",
    category: "Kopi",
    type: "drink",
    description: "Espresso, susu segar, dan gula aren. Favorit untuk menemani jam kerja.",
    price: 20000,
    image: u("1461023058943-07fcbe16d735"),
    taste: { pahit: 3, manis: 4, asam: 1 },
  },
  {
    id: "americano",
    name: "Americano",
    category: "Kopi",
    type: "drink",
    description: "Espresso dengan air panas. Ringan, bersih, dan tetap berkarakter.",
    price: 18000,
    image: u("1511920170033-f8396924c348"),
    taste: { pahit: 4, manis: 0, asam: 2 },
  },
  {
    id: "cafe-latte",
    name: "Café Latte",
    category: "Kopi",
    type: "drink",
    description: "Espresso lembut dengan susu steamed dan lapisan foam tipis.",
    price: 22000,
    image: u("1498804103079-a6351b050096"),
    taste: { pahit: 2, manis: 2, asam: 1 },
  },
  {
    id: "v60",
    name: "V60 Manual Brew",
    category: "Kopi",
    type: "drink",
    description: "Biji kopi pilihan diseduh manual. Tanyakan beans yang tersedia hari ini.",
    price: 25000,
    image: u("1517701604599-bb29b565090c"),
    taste: { pahit: 2, manis: 1, asam: 4 },
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    category: "Non-Kopi",
    type: "drink",
    description: "Matcha Jepang dengan susu segar, creamy dan tidak terlalu manis.",
    price: 24000,
    image: u("1515823064-d6e0c04616a7"),
    taste: { pahit: 2, manis: 3, asam: 0 },
  },
  {
    id: "chocolate",
    name: "Signature Chocolate",
    category: "Non-Kopi",
    type: "drink",
    description: "Cokelat pekat dengan susu, disajikan panas atau dingin.",
    price: 22000,
    image: u("1525193612562-0ec53b0e5d7c"),
    taste: { pahit: 1, manis: 5, asam: 0 },
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    category: "Makanan",
    type: "food",
    description: "Croissant renyah berlapis mentega. Pas dengan secangkir kopi.",
    price: 18000,
    image: u("1555507036-ab1f4038808a"),
  },
  {
    id: "toast",
    name: "Toast & Egg",
    category: "Makanan",
    type: "food",
    description: "Roti panggang dengan telur dan sayuran segar untuk sarapan.",
    price: 25000,
    image: u("1484723091739-30a097e8f929"),
  },
  {
    id: "rice-bowl",
    name: "Rice Bowl Ayam",
    category: "Makanan",
    type: "food",
    description: "Nasi hangat, ayam berbumbu, dan sayuran. Mengenyangkan untuk makan siang.",
    price: 28000,
    image: u("1512621776951-a57141f2eefd"),
  },
];

export function formatPrice(price: number) {
  return `IDR ${Math.round(price / 1000)}K`;
}
