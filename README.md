# UB Coffee

Website satu halaman untuk **UB Coffee** (unit usaha PT Brawijaya Multi Usaha), Malang.

Halaman terdiri dari tiga bagian:

1. **Hero**: dinding foto bergerak, jam buka, dan status buka/tutup saat ini (WIB).
2. **Section 2 (Hub)**: empat panel dalam tab: Menu, Reservasi, Lokasi, serta Event & Promo.
   Panel aktif tersimpan di URL (`#menu`, `#reservasi`, `#lokasi`, `#event`), jadi tautan
   seperti `/#lokasi` langsung membuka panel tersebut.
3. **Footer**: jam buka semua lokasi dan kontak.

## Teknologi

- [Next.js 16](https://nextjs.org) (App Router) dengan React 19 dan TypeScript
- CSS biasa (penamaan BEM) di `app/styles/`, tanpa framework CSS
- [Motion](https://motion.dev) untuk animasi (transisi panel, tab, dan pergantian menu)
- `next/image` untuk optimasi gambar, `next/font` untuk font (Montserrat dan Plus Jakarta Sans)
- ESLint dan Prettier

## Menjalankan proyek

Butuh Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Script lain:

| Perintah         | Fungsi                                        |
| ---------------- | --------------------------------------------- |
| `npm run build`  | Build produksi (sekaligus cek TypeScript)     |
| `npm run start`  | Menjalankan hasil build                       |
| `npm run lint`   | Cek kode dengan ESLint                        |
| `npm run format` | Merapikan format seluruh kode dengan Prettier |

## Struktur folder

```
app/
  layout.tsx          Kerangka HTML, font, metadata
  page.tsx            Halaman utama: Hero + Hub + Footer
  globals.css         Hanya @import file di styles/ (urutannya penting, lihat di bawah)
  styles/             CSS per bagian
  icon.png            Favicon (dibaca otomatis oleh Next.js)
  apple-icon.png      Ikon "Add to Home Screen" iOS (dibaca otomatis oleh Next.js)
components/
  Hero.tsx, Hub.tsx, Footer.tsx, ...
  panels/             Isi tiap tab: MenuPanel, ReservationPanel, LocationPanel, EventPanel
data/                 Semua konten yang bisa diubah (lihat bagian berikut)
hooks/
  useOpenState.ts     Status buka/tutup yang diperbarui tiap menit
lib/
  hours.ts            Perhitungan jam buka berdasarkan WIB (fungsi biasa, tanpa React)
types/
  content.ts          Tipe yang dipakai di banyak file (Photo, HoursRow)
public/images/
  WEBP/               Foto suasana (hero, latar section 2, reservasi, event)
  menu/               Foto produk menu (latar transparan)
```

### Catatan CSS

`app/globals.css` meng-import file di `app/styles/` dengan urutan tertentu. **Jangan ubah
urutannya**: `hub-theme.css` (tema gelap section 2) dan `responsive.css` harus datang setelah
bagian yang mereka timpa.

Jarak memakai token `--space-*` di `app/styles/base.css`. Angka di nama token adalah ukuran
desain asli dalam px; seluruh tampilan diperkecil 0,9×, misalnya `--space-16` bernilai `14.4px`.

## Mengubah konten

Semua konten ada di folder `data/`. Setelah mengubah, jalankan `npm run lint` dan
`npm run build` untuk memastikan tidak ada yang salah ketik.

### Menu (`data/menu.ts`)

- Tambah atau ubah item di array `menu`. `category` harus salah satu dari `"Kopi"`,
  `"Non-Kopi"`, atau `"Makanan"`.
- Foto: simpan di `public/images/menu/` dengan nama `<id>.webp`, lalu isi
  `image: menuPhoto("<id>")`. Gunakan foto **berlatar transparan** dan potong rapat ke tepi
  objek (sisi terpanjang ±900 px, ukuran file di bawah 100 KB).
- `price` boleh diisi tetapi saat ini tidak ditampilkan di halaman.
- Tombol "Lihat Menu Lengkap" membuka PDF di `menuPdf` pada `data/site.ts`.

### Jam buka, alamat, dan kontak (`data/site.ts`)

- Jam buka ada di `hours` milik tiap lokasi (`ubCoffee` dan `gazeboCorner`). Format jam
  `"HH:MM"` WIB; `days` berisi nomor hari (0 = Minggu … 6 = Sabtu).
- Hari libur: tulis baris tanpa `open`/`close`, misalnya `{ day: "Minggu", days: [0] }`.
  Halaman otomatis menampilkan "Libur".
- Jam tutup bersifat eksklusif (tutup pukul 22.00 berarti pukul 22.00 sudah "Tutup"). Jam yang
  melewati tengah malam belum didukung.
- WhatsApp, Instagram, dan nama perusahaan ada di objek `site`.

### Foto hero dan latar section 2 (`data/heroPhotos.ts`)

- Simpan foto di `public/images/WEBP/` (format `.webp`, landscape).
- `heroPhotos`: foto dinding hero. Isi dengan `photo("<nama file tanpa .webp>")`.
- `ambientPhotos`: foto latar section 2, cukup tulis nama file tanpa `.webp`.

### Event & Promo (`data/news.ts`)

- Tambah item di array `news`. `category`: `"event"`, `"promo"`, atau `"info"`; `date` dalam
  format `"YYYY-MM-DD"`.
- Item dengan `featured: true` tampil besar; tiga item lain tampil di daftar "Kabar terbaru".

### Reservasi meeting room (`data/reservation.ts`)

Harga sewa (`roomPrices`), fasilitas (`roomFacilities`), foto ruangan (`roomPhotos`), paket
meeting (`meetingPackages`), dan paragraf teks (`reservationText`). Judul dan teks yang memakai
huruf miring/tebal ada langsung di `components/panels/ReservationPanel.tsx`.

### Tab section 2 (`data/navigation.ts`)

Judul tab bisa diubah bebas. Jangan mengubah `key`, karena dipakai sebagai alamat (`#menu`,
`#reservasi`, …) dan tautan lama akan berhenti bekerja.
