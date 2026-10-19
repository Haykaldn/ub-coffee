import type { Location, SiteInfo } from "@/types/content";

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

const ubCoffee: Location = {
  id: "ub-coffee",
  name: "UB Coffee",
  address: "Jl. MT. Haryono No.169, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145",
  addressShort: "Jl. MT. Haryono No.169, Malang",
  landmark: "Tepi Jl. MT. Haryono, dekat gerbang masuk KPRI UB",
  // TODO: isi koordinat asli UB Coffee (argumen ke-2) agar titik peta tepat.
  ...place("UB Coffee, Jl. MT. Haryono No.169, Ketawanggede, Lowokwaru, Malang"),
  hours: [
    {
      id: "ub-coffee-weekdays",
      day: "Minggu – Jumat",
      days: [0, 1, 2, 3, 4, 5],
      open: "07:00",
      close: "22:00",
    },
    { id: "ub-coffee-sabtu", day: "Sabtu", days: [6], open: "09:00", close: "22:00" },
  ],
};

const gazeboCorner: Location = {
  id: "gazebo-corner",
  name: "Gazebo Corner by UB Coffee",
  address: "Jl. Universitas Brawijaya, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145",
  addressShort: "Gazebo Raden Wijaya, Universitas Brawijaya",
  landmark: "Berlokasi di Gazebo Raden Wijaya Universitas Brawijaya",
  // Plus Code Google (2JV7+J3X) menunjuk titik yang tepat
  ...place("2JV7+J3X Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur"),
  hours: [
    {
      id: "gazebo-corner-weekdays",
      day: "Senin – Sabtu",
      days: [1, 2, 3, 4, 5, 6],
      open: "08:00",
      close: "18:00",
    },
    { id: "gazebo-corner-minggu", day: "Minggu", days: [0] },
  ],
};

export const locations: Location[] = [ubCoffee, gazeboCorner];

export const site: SiteInfo = {
  name: "UB Coffee",
  tagline: "Mampir, duduk, nikmati.",
  company: "PT Brawijaya Multi Usaha",
  companyUrl: "https://brawijayamultiusaha.co.id",
  // PDF menu lengkap (Google Drive)
  menuPdf: "https://drive.google.com/file/d/12NkYto4KrPpZlWOe-BfJy7LZF3TuHb1F/view",
  whatsapp: "6282132245897",
  whatsappDisplay: "+62 821-3224-5897",
  instagram: "Instagram UB Coffee",
  instagramUrl: "https://www.instagram.com/ub_coffee/",
  // Hero, footer, dan slot reservasi memakai alamat & jam buka lokasi ini
  mainLocationId: ubCoffee.id,
};
