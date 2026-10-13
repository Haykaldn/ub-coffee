export type MenuItem = {
  id: string;
  name: string;
  category: "Kopi" | "Non-Kopi" | "Makanan";
  description: string;
  price?: number; // kosongkan bila harga belum ada; harga tidak ditampilkan
  image: string;
};

// Tombol filter di panel Menu, sesuai urutan tampil. "all" = semua kategori.
export const menuFilters = [
  { key: "all", label: "Semua" },
  { key: "Kopi", label: "Kopi" },
  { key: "Non-Kopi", label: "Non-Kopi" },
  { key: "Makanan", label: "Makanan" },
] as const;

export type MenuFilterKey = (typeof menuFilters)[number]["key"];

// Foto menu (public/images/menu), nama file = id menu.
const menuPhoto = (id: string) => `/images/menu/${id}.webp`;

export const menu: MenuItem[] = [
  {
    id: "hot-cappucino",
    name: "Hot Cappucino",
    category: "Kopi",
    description: "Espresso, susu steamed, dan foam lembut dengan latte art khas UB Coffee.",
    price: 25000,
    image: menuPhoto("hot-cappucino"),
  },
  {
    id: "ice-ub-coffee",
    name: "Ice UB Coffee",
    category: "Kopi",
    description: "Kopi susu dingin khas UB Coffee dengan espresso, susu segar, dan es batu.",
    image: menuPhoto("ice-ub-coffee"),
  },
  {
    id: "milkshake-vanilla",
    name: "Milkshake Vanilla",
    category: "Non-Kopi",
    description:
      "Milkshake vanila yang lembut dengan whipped cream, saus karamel, remahan biskuit, dan wafer roll.",
    image: menuPhoto("milkshake-vanilla"),
  },
  {
    id: "ubee-breakfast",
    name: "Ubee Breakfast",
    category: "Makanan",
    description:
      "Sarapan lengkap dengan telur orak-arik, sosis panggang, kentang panggang, dan saus.",
    price: 30000,
    image: menuPhoto("ubee-breakfast"),
  },
  {
    id: "nasi-goreng-kampung",
    name: "Nasi Goreng Kampung",
    category: "Makanan",
    description:
      "Nasi goreng rempah Nusantara dengan ayam dan sayuran, bercita rasa legit, gurih, asin, dan sedikit pedas. Disajikan bersama acar, kerupuk, ikan asin, dan telur.",
    price: 40000,
    image: menuPhoto("nasi-goreng-kampung"),
  },
  {
    id: "chicken-rice-steak",
    name: "Chicken Rice Steak",
    category: "Makanan",
    description:
      "Ayam panggang dengan nasi hangat, sayuran campur, dan saus steak, disajikan dalam satu piring.",
    image: menuPhoto("chicken-rice-steak"),
  },
  {
    id: "nusantara-fries",
    name: "Nusantara Fries",
    category: "Makanan",
    description:
      "Tempe mendoan, pisang goreng, tahu sutra, menjes goreng, dan tape goreng disajikan dengan saus petis dan cabai rawit.",
    price: 37000,
    image: menuPhoto("nusantara-fries"),
  },
  {
    id: "cookie-bomb",
    name: "Cookie Bomb",
    category: "Makanan",
    description:
      "Cookie cokelat tebal yang lembut di dalam, disajikan dengan whipped cream dan daun mint.",
    price: 35000,
    image: menuPhoto("cookie-bomb"),
  },
];
