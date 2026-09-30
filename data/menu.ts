export type MenuItem = {
  id: string;
  name: string;
  category: "Kopi" | "Non-Kopi" | "Makanan";
  description: string;
  price?: number; // kosongkan bila harga belum ada; harga tidak ditampilkan
  image: string;
};

// Foto menu (public/images/menu), nama file = id menu.
const menuPhoto = (id: string) => `/images/menu/${id}.webp`;

export const menu: MenuItem[] = [
  {
    id: "dampit-robusta",
    name: "Dampit Robusta",
    category: "Kopi",
    description: "Kopi robusta asal Dampit, Malang. Rasanya tebal dengan pahit yang mantap.",
    image: menuPhoto("dampit-robusta"),
  },
  {
    id: "hot-cappucino",
    name: "Hot Cappucino",
    category: "Kopi",
    description: "Espresso, susu steamed, dan foam lembut dengan latte art khas UB Coffee.",
    image: menuPhoto("hot-cappucino"),
  },
  {
    id: "ice-dolce-latte",
    name: "Ice Dolce Latte",
    category: "Kopi",
    description: "Espresso dan susu dingin dengan sentuhan manis, berlapis cantik di dalam gelas.",
    image: menuPhoto("ice-dolce-latte"),
  },
  {
    id: "ice-lychee-tea",
    name: "Ice Lychee Tea",
    category: "Non-Kopi",
    description: "Teh dingin dengan buah leci dan daun mint. Segar dengan manis yang lembut.",
    image: menuPhoto("ice-lychee-tea"),
  },
  {
    id: "mango-mojito",
    name: "Mango Mojito",
    category: "Non-Kopi",
    description: "Soda mangga dengan irisan lemon dan daun mint, pas untuk siang yang panas.",
    image: menuPhoto("mango-mojito"),
  },
  {
    id: "soda-gembira",
    name: "Soda Gembira",
    category: "Non-Kopi",
    description: "Perpaduan klasik soda, susu, dan sirup merah yang manis dan menyegarkan.",
    image: menuPhoto("soda-gembira"),
  },
  {
    id: "purple-mojito",
    name: "Purple Mojito",
    category: "Non-Kopi",
    description: "Mojito ungu dengan lemon dan daun mint. Cantik dilihat, segar diminum.",
    image: menuPhoto("purple-mojito"),
  },
  {
    id: "nagaberry-delight",
    name: "Nagaberry Delight",
    category: "Non-Kopi",
    description: "Jus buah naga dan stroberi yang kental, segar, dan kaya warna.",
    image: menuPhoto("nagaberry-delight"),
  },
  {
    id: "es-kuwud-apel",
    name: "Es Kuwud Apel",
    category: "Non-Kopi",
    description: "Es kuwud kelapa muda dengan sirup apel hijau dan daun mint.",
    price: 28000,
    image: menuPhoto("es-kuwud-apel"),
  },
  {
    id: "healthy-tropical-bit",
    name: "Healthy Tropical Bit",
    category: "Non-Kopi",
    description: "Jus buah bit dan buah tropis dengan irisan lemon. Segar dan menyehatkan.",
    image: menuPhoto("healthy-tropical-bit"),
  },
  {
    id: "wedang-jeruk-nipis",
    name: "Wedang Jeruk Nipis",
    category: "Non-Kopi",
    description: "Minuman hangat perasan jeruk nipis untuk menghangatkan badan.",
    price: 15000,
    image: menuPhoto("wedang-jeruk-nipis"),
  },
  {
    id: "korean-strawberry-milk",
    name: "Korean Strawberry Milk",
    category: "Non-Kopi",
    description: "Susu segar dingin di atas saus stroberi, manis dan creamy.",
    price: 28000,
    image: menuPhoto("korean-strawberry-milk"),
  },
  {
    id: "ubee-breakfast",
    name: "Ubee Breakfast",
    category: "Makanan",
    description: "Sarapan lengkap dengan telur orak-arik, sosis panggang, kentang panggang, dan saus.",
    price: 30000,
    image: menuPhoto("ubee-breakfast"),
  },
  {
    id: "bebek-goreng-bumbu-kuning",
    name: "Bebek Goreng Bumbu Kuning",
    category: "Makanan",
    description:
      "Bebek bumbu kuning khas Nusantara, digoreng keemasan dan disajikan dengan nasi hangat, tempe mendoan, sambal ijo, dan kremesan.",
    price: 50000,
    image: menuPhoto("bebek-goreng-bumbu-kuning"),
  },
  {
    id: "ayam-bakar-maranggi",
    name: "Ayam Bakar Maranggi",
    category: "Makanan",
    description:
      "Ayam bakar bumbu khas Purwakarta, dibakar sempurna dan disajikan dengan nasi hangat, tempe goreng, sambal, dan kecap.",
    price: 42000,
    image: menuPhoto("ayam-bakar-maranggi"),
  },
  {
    id: "bebek-kuah-pedas",
    name: "Bebek Kuah Pedas",
    category: "Makanan",
    description:
      "Bebek bumbu merah pedas khas UB Coffee, bercita rasa asin, gurih, dan pedas, disajikan dengan nasi hangat dan emping.",
    price: 60000,
    image: menuPhoto("bebek-kuah-pedas"),
  },
  {
    id: "kare-baramundi",
    name: "Kare Baramundi",
    category: "Makanan",
    description:
      "Kare rumahan populer dengan ikan baramundi panggang, disajikan bersama nasi hangat, emping, dan sambal.",
    price: 53000,
    image: menuPhoto("kare-baramundi"),
  },
  {
    id: "nasi-goreng-kampung",
    name: "Nasi Goreng Kampung",
    category: "Makanan",
    description:
      "Nasi goreng rempah Nusantara dengan ayam dan sayuran, bercita rasa legit, gurih, asin, dan sedikit pedas. Disajikan bersama acar, kerupuk, ikan asin, dan telur.",
    image: menuPhoto("nasi-goreng-kampung"),
  },
  {
    id: "nasi-goreng-briyani",
    name: "Nasi Goreng Briyani",
    category: "Makanan",
    description:
      "Nasi goreng dengan beras basmati dengan rempah Timur Tengah dan daging kambing muda empuk, disajikan dengan acar mentimun dan emping.",
    image: menuPhoto("nasi-goreng-briyani"),
  },
  {
    id: "spagheti-bolognese",
    name: "Spagheti Bolognese",
    category: "Makanan",
    description:
      "Pasta klasik Italia dengan saus daging cincang dan tomat segar, dibumbui herbs Italia, disajikan bersama garlic bread gurih.",
    image: menuPhoto("spagheti-bolognese"),
  },
  {
    id: "honey-lemon-chicken",
    name: "Honey Lemon Chicken",
    category: "Makanan",
    description:
      "Salad segar dengan paha ayam fillet panggang berbalut madu, lemon, dan herbs, disajikan dengan baby potato dan honey lemon dressing.",
    price: 37000,
    image: menuPhoto("honey-lemon-chicken"),
  },
  {
    id: "gado-gado-mente",
    name: "Gado-Gado Mente",
    category: "Makanan",
    description: "Sayuran, lontong, dan telur rebus dengan saus kacang mete yang gurih, lengkap dengan kerupuk.",
    price: 30000,
    image: menuPhoto("gado-gado-mente"),
  },
  {
    id: "capcay-sharing",
    name: "Capcay Sharing",
    category: "Makanan",
    description: "Capcay kuah dengan aneka sayuran segar dan sosis. Porsi sharing untuk 3 orang.",
    price: 63000,
    image: menuPhoto("capcay-sharing"),
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
    id: "dimsum-kaicha",
    name: "Dimsum Kaicha",
    category: "Makanan",
    description: "Dimsum kulit tipis berisi ayam dan sayuran, disajikan dengan saus sambal dan kuah hangat.",
    price: 30000,
    image: menuPhoto("dimsum-kaicha"),
  },
  {
    id: "fried-wonton",
    name: "Fried Wonton",
    category: "Makanan",
    description: "Pangsit goreng renyah dengan isian gurih, disajikan dengan saus sambal.",
    price: 25000,
    image: menuPhoto("fried-wonton"),
  },
  {
    id: "cookie-bomb",
    name: "Cookie Bomb",
    category: "Makanan",
    description: "Cookie cokelat tebal yang lembut di dalam, disajikan dengan whipped cream dan daun mint.",
    price: 35000,
    image: menuPhoto("cookie-bomb"),
  },
  {
    id: "millecrepes-tiramisu",
    name: "Millecrepes Tiramisu",
    category: "Makanan",
    description: "Lapisan crepes tipis dengan krim tiramisu dan taburan bubuk kakao.",
    price: 25000,
    image: menuPhoto("millecrepes-tiramisu"),
  },
];

export function formatPrice(price: number) {
  return `IDR ${Math.round(price / 1000)}K`;
}
