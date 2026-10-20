# UB Coffee

Website satu halaman untuk **UB Coffee** (unit usaha PT Brawijaya Multi Usaha), Malang.

Halaman terdiri dari tiga bagian:

1. **Hero**: slideshow foto layar penuh (berganti tiap 6 detik), logo, jam buka, status
   buka/tutup saat ini (WIB), dan tombol Reservasi.
2. **Section 2 (Hub)**: empat panel dalam tab: Menu, Reservasi, Lokasi, serta Berita & Artikel.
   Panel aktif tersimpan di URL (`#menu`, `#reservasi`, `#lokasi`, `#berita`), jadi tautan
   seperti `/#lokasi` langsung membuka panel tersebut. Tautan lama `/#event` otomatis dialihkan
   ke `/#berita`.
3. **Footer**: jam buka semua lokasi dan kontak.

Konten nantinya dikelola lewat dashboard admin. Untuk sementara konten masih ditulis di folder
`data/` dan dibaca lewat lapisan `lib/content/`, sehingga penyambungan ke dashboard cukup dengan
mengganti isi `lib/content/`. Penjelasan lengkap ada di [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Teknologi

- [Next.js 16](https://nextjs.org) (App Router) dengan React 19 dan TypeScript
- CSS biasa (penamaan BEM) di `app/styles/`, tanpa framework CSS
- [Motion](https://motion.dev) untuk animasi (transisi panel, tab, dan pergantian menu); semua
  animasi menghormati pengaturan "kurangi gerakan" (`prefers-reduced-motion`)
- `next/image` untuk optimasi gambar, `next/font` untuk font (Plus Jakarta Sans; Roboto untuk Section 2)
- ESLint dan Prettier

## Menjalankan proyek

Butuh Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Script lain:

| Perintah           | Fungsi                                        |
| ------------------ | --------------------------------------------- |
| `npm run build`    | Build produksi (sekaligus cek TypeScript)     |
| `npm run start`    | Menjalankan hasil build                       |
| `npm run lint`     | Cek kode dengan ESLint                        |
| `npx tsc --noEmit` | Cek tipe TypeScript tanpa build               |
| `npm run format`   | Merapikan format seluruh kode dengan Prettier |

## Struktur folder

```
app/
  layout.tsx          Kerangka HTML, font, metadata
  page.tsx            Halaman utama (server component): ambil data lewat lib/content,
                      lalu teruskan lewat props ke Hero + Hub + Footer
  globals.css         Hanya @import file di styles/ (urutannya penting, lihat di bawah)
  styles/             CSS per bagian
  icon.png            Favicon (dibaca otomatis oleh Next.js)
  apple-icon.png      Ikon "Add to Home Screen" iOS (dibaca otomatis oleh Next.js)
components/           Komponen tampilan; semua data datang lewat props
  Hero.tsx, HeroSlideshow.tsx   Hero dan slideshow fotonya
  Hub.tsx                       Section 2: tab + panel aktif
  Footer.tsx
  ReservationDialog.tsx         Form reservasi meeting room
  Modal.tsx, PhotoSlideshow.tsx, NewsCard.tsx, NewsArticle.tsx, OpenStatus.tsx, Icons.tsx
  MotionProvider.tsx            Pengaturan Motion global (reduced motion)
  panels/                       Isi tiap tab: MenuPanel, ReservationPanel, LocationPanel, NewsPanel
data/                 Sumber konten sementara (nanti digantikan dashboard)
  paths.ts            Helper path foto lokal photo()/menuPhoto(); hanya dipakai di data/
hooks/
  useOpenState.ts     Status buka/tutup yang diperbarui tiap menit
lib/
  content/            Lapisan data: getHeroPhotos(), getMenu(), getNews(), getRooms(), ...
                      Satu-satunya yang membaca data/; nanti diganti fetch ke API dashboard
  format.ts           Format tanggal, jam, dan tautan WhatsApp
  hours.ts            Perhitungan jam buka berdasarkan WIB (fungsi murni)
  booking.ts          Slot reservasi per jam dan helper tanggal WIB (fungsi murni)
  menu.ts             Filter kategori menu
  news.ts             Jenis berita, urutan, dan label kategori berita
  hubNav.ts           Daftar tab, navigasi hash URL, dan alias key tab lama
  reservationApi.ts   Satu-satunya titik kirim reservasi ke dashboard (masih tiruan)
types/
  content.ts          Tipe semua konten: kontrak data dengan dashboard
  reservation.ts      Tipe data reservasi yang dikirim ke dashboard
public/images/
  Logo UB COFFEE.webp Logo (hero dan footer)
  WEBP/               Foto suasana (hero, ruang meeting, berita & artikel) dan wordmark hero
  menu/               Foto menu (mengisi penuh kartu)
docs/
  ARCHITECTURE.md     Arsitektur, alur data, dan kesiapan integrasi dashboard
```

### Catatan CSS

`app/globals.css` meng-import file di `app/styles/` dengan urutan tertentu. **Jangan ubah
urutannya**: `hub-theme.css` (tema gelap section 2) dan `responsive.css` harus datang setelah
bagian yang mereka timpa.

Jarak memakai token `--space-*` di `app/styles/base.css`. Angka di nama token adalah ukuran
desain asli dalam px; seluruh tampilan diperkecil 0,9×, misalnya `--space-16` bernilai `14.4px`.

## Mengubah konten

Sebelum dashboard tersambung, konten diubah di folder `data/`. Bentuk setiap data harus mengikuti
tipe di `types/content.ts`. Tipe ini juga menjadi kontrak dengan dashboard, jadi jangan menambah
atau mengganti nama field tanpa memperbarui tipenya. Setiap item yang bisa diedit punya `id`
yang stabil: jangan mengubah `id` item yang sudah ada.

Setelah mengubah, jalankan `npm run lint`, `npx tsc --noEmit`, dan `npm run build` untuk
memastikan tidak ada yang salah ketik.

### Foto hero (`data/heroPhotos.ts`)

- Simpan foto di `public/images/WEBP/` (format `.webp`, landscape 3:2).
- `heroPhotos`: foto slideshow hero, tampil bergiliran sesuai urutan array. Setiap item berisi
  `id` (format `hero-<nama file>`), `src: photo("<nama file tanpa .webp>")`, dan `alt`.

### Menu (`data/menu.ts`)

- Tambah atau ubah item di array `menu`. `category` harus salah satu dari `"Kopi"`,
  `"Non-Kopi"`, atau `"Makanan"`. Kategori menu sengaja dibuat tetap; urutan tombol filternya
  ada di `lib/menu.ts`.
- Foto: simpan di `public/images/menu/` dengan nama `<id>.webp`, lalu isi
  `image: menuPhoto("<id>", "<nama menu>")` (argumen kedua menjadi teks alt). Foto ditampilkan
  penuh di kartu (tepinya bisa terpotong), jadi letakkan hidangan di tengah foto. Gunakan foto
  potret ±1200 px dalam format WebP.
- Mengganti foto dengan nama file yang sama? Hapus `.next/dev/cache/images` lalu muat ulang
  dengan Ctrl + Shift + R, karena Next.js menyimpan cache gambar berdasarkan nama file.
- `price` boleh diisi tetapi saat ini tidak ditampilkan di halaman.
- Tombol "Lihat Menu Lengkap" membuka PDF di `menuPdf` pada `data/site.ts`.

### Berita & Artikel (`data/news.ts`)

- **Kategori** adalah data di array `newsCategories` (`id`, `slug`, `label`). Kategori baru cukup
  ditambahkan di sana; `label` tampil di tag halaman artikel dan filter (tidak tampil di kartu).
- Tambah item di array `news`. `type`: `"berita"` atau `"artikel"`; `categories`: daftar
  `slug` dari `newsCategories`, boleh lebih dari satu (mis. `["event", "kolaborasi"]`); `date` dalam format `"YYYY-MM-DD"`; `image`:
  `{ src: photo("<nama file>"), alt: "<judul>" }`.
- Slug yang tidak ada di `newsCategories` tidak membuat error: tag tampil "Lainnya", dan saat
  development muncul peringatan di console.
- `excerpt` tampil di kartu (selalu dipotong 2 baris); `body` berisi teks lengkap, satu string per
  paragraf, yang tampil menggantikan isi panel saat kartu diklik.
- Panel menampilkan 3 item terbaru per jenis. Tombol "Lihat Semua" mengganti isi panel (tanpa
  pindah halaman) dengan semua item, filter kategori, dan 9 item per halaman.

### Reservasi meeting room (`data/reservation.ts`)

- `reservationText`: paragraf intro, catatan harga, dan teks ajakan reservasi.
- `rooms`: kartu ruangan (Arjuna, Semeru): `id`, kapasitas, keterangan, "Cocok untuk",
  fasilitas, dan foto (masing-masing dengan `id`). `bookableRooms` = `rooms` + Open Space, yang
  hanya muncul sebagai pilihan di form.
- `roomPrices` dan `meetingPackages`: isi kartu Harga (pilihan "Sewa ruangan" dan
  "Paket + konsumsi"), masing-masing dengan `id`. Form masih mengirim `label` harga dan `name`
  paket.
- `bookings`: jadwal yang sudah dipesan (`id`, `roomId`, `date`, `start`, `end`). `roomId` berisi
  `id` ruangan. Slot form reservasi per jam mengikuti jam buka lokasi utama (`lib/booking.ts`);
  slot yang bentrok tampil "Sudah dipesan". Tanggal bisa dipilih hingga 60 hari ke depan. Isi
  sekarang hanya contoh, nanti diganti data dari dashboard.
- Tombol "Reservasi sekarang" membuka form (`components/ReservationDialog.tsx`). Tombol
  "Reservasi" di hero membuka panel ini dan menggulir ke tombol tersebut.
- Form mengirim data lewat `submitReservation` di `lib/reservationApi.ts`. Dashboard belum
  tersambung, jadi fungsi itu baru meniru pengiriman (jeda + kode reservasi contoh); ganti isinya
  dengan `fetch` ke API dashboard.

### Situs, lokasi, dan jam buka (`data/site.ts`)

- `locations`: daftar lokasi (`ubCoffee` dan `gazeboCorner`), masing-masing dengan `id`, alamat,
  titik peta, dan `hours`.
- Jam buka: setiap baris di `hours` punya `id`. Format jam `"HH:MM"` WIB; `days` berisi nomor hari
  (0 = Minggu … 6 = Sabtu).
- Hari libur: tulis baris tanpa `open`/`close`, misalnya
  `{ id: "gazebo-corner-minggu", day: "Minggu", days: [0] }`. Halaman otomatis menampilkan
  "Libur".
- Jam tutup bersifat eksklusif (tutup pukul 22.00 berarti pukul 22.00 sudah "Tutup"). Jam yang
  melewati tengah malam belum didukung.
- `site`: nama, tagline, perusahaan, PDF menu, WhatsApp, dan Instagram. `site.mainLocationId`
  menentukan lokasi utama: alamat dan jam buka di hero dan footer, serta jam yang membatasi slot
  reservasi, diambil dari lokasi ini. Kalau `id`-nya tidak ditemukan, lokasi pertama yang dipakai.
- Titik peta dibuat oleh helper `place()`: isi koordinat (`"lat,lng"`) bila ada agar titiknya
  tepat.

### Tab section 2 (`lib/hubNav.ts`)

Judul tab di `hubTabs` bisa diubah bebas. Jangan mengubah `key`, karena dipakai sebagai alamat
(`#menu`, `#reservasi`, …) dan tautan yang sudah dibagikan akan berhenti bekerja. Kalau `key`
terpaksa diganti, daftarkan key lama di `legacyTabKeys` (contoh: `event: "berita"`) agar tautan
lama dialihkan otomatis.
