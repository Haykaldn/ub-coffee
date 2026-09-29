export type HoursRow = {
  day: string;
  days: number[]; // 0 = Minggu … 6 = Sabtu
  open: string; // "HH:MM" WIB
  close: string;
};

export type Location = {
  key: string;
  name: string;
  address: string;
  addressShort: string;
  landmark: string;
  mapsUrl: string;
  mapsEmbed: string;
  directionsUrl: string;
  hours: HoursRow[];
};

/**
 * Titik peta. Koordinat ("lat,lng" dari Google Maps: klik kanan titik → salin angka)
 * paling akurat; tanpa koordinat, Google menebak dari nama tempat + alamat.
 */
const place = (query: string, coords?: string) => {
  const q = coords ?? query;
  return {
    mapsUrl: mapsSearch(q),
    mapsEmbed: mapsEmbed(q),
    directionsUrl: mapsDirections(q),
  };
};

const mapsSearch = (q: string) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
const mapsEmbed = (q: string) =>
  "https://www.google.com/maps?q=" + encodeURIComponent(q) + "&z=17&output=embed";
const mapsDirections = (q: string) =>
  "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(q);

// TODO: jam buka perlu dikonfirmasi.
const ubCoffee: Location = {
  key: "ub-coffee",
  name: "UB Coffee",
  address:
    "Jl. MT. Haryono No.169, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145",
  addressShort: "Jl. MT. Haryono No.169, Malang",
  landmark: "Tepi Jl. MT. Haryono, dekat gerbang masuk KPRI UB",
  // TODO: isi koordinat asli UB Coffee (argumen ke-2) agar titik peta tepat.
  ...place("UB Coffee, Jl. MT. Haryono No.169, Ketawanggede, Lowokwaru, Malang"),
  hours: [
    { day: "Senin – Jumat", days: [1, 2, 3, 4, 5], open: "07:30", close: "22:30" },
    { day: "Sabtu", days: [6], open: "09:00", close: "22:30" },
    { day: "Minggu", days: [0], open: "12:00", close: "20:00" },
  ],
};

// TODO: ganti alamat, patokan, query maps, dan jam buka dengan data asli Gazebo Corner.
const gazeboCorner: Location = {
  key: "gazebo-corner",
  name: "Gazebo Corner by UB Coffee",
  address: "[Alamat Gazebo Corner], Kota Malang, Jawa Timur",
  addressShort: "[Alamat singkat], Malang",
  landmark: "[Patokan lokasi Gazebo Corner]",
  ...place("Gazebo Corner by UB Coffee, Malang"),
  hours: [
    { day: "Senin – Jumat", days: [1, 2, 3, 4, 5], open: "08:00", close: "17:00" },
    { day: "Sabtu", days: [6], open: "09:00", close: "15:00" },
    { day: "Minggu", days: [0], open: "10:00", close: "17:00" },
  ],
};

export const locations: Location[] = [ubCoffee, gazeboCorner];

export const site = {
  name: "UB Coffee",
  tagline: "Mampir, duduk, nikmati.",
  company: "PT Brawijaya Multi Usaha",
  companyUrl: "https://brawijayamultiusaha.co.id",
  // Hero & footer memakai data lokasi utama (UB Coffee)
  address: ubCoffee.address,
  addressShort: ubCoffee.addressShort,
  landmark: ubCoffee.landmark,
  // File PDF menu diletakkan di public/menu-ub-coffee.pdf
  menuPdf: "/menu-ub-coffee.pdf",
  whatsapp: "6282132245897",
  whatsappDisplay: "+62 821-3224-5897",
  instagram: "Instagram UB Coffee",
  instagramUrl: "https://www.instagram.com/ub_coffee/",
  mapsUrl: ubCoffee.mapsUrl,
  mapsEmbed: ubCoffee.mapsEmbed,
  directionsUrl: ubCoffee.directionsUrl,
  hours: ubCoffee.hours,
};

export function waLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** "07:30" → "07.30" (format jam Indonesia) */
export function formatTime(t: string) {
  return t.replace(":", ".");
}
