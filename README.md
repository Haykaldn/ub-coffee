# UB Coffee

Website satu halaman untuk **UB Coffee** (unit usaha PT Brawijaya Multi Usaha), Malang.

Halaman terdiri dari tiga bagian:

1. **Hero**: slideshow foto layar penuh (berganti tiap 6 detik), logo, jam buka, status
   buka/tutup saat ini (WIB), dan tombol Reservasi.
2. **Section 2 (Hub)**: empat panel dalam tab: Menu, Reservasi, Lokasi, serta Berita & Artikel.
   Panel aktif tersimpan di URL (`#menu`, `#reservasi`, `#lokasi`, `#event`), jadi tautan
   seperti `/#lokasi` langsung membuka panel tersebut.
3. **Footer**: jam buka semua lokasi dan kontak.

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
  Hero.tsx, HeroSlideshow.tsx   Hero dan slideshow fotonya
  Hub.tsx                       Section 2: tab + panel aktif
  Footer.tsx
  ReservationDialog.tsx         Form reservasi meeting room
  Modal.tsx, PhotoSlideshow.tsx, NewsCard.tsx, NewsArticle.tsx, OpenStatus.tsx, Icons.tsx
  MotionProvider.tsx            Pengaturan Motion global (reduced motion)
  panels/                       Isi tiap tab: MenuPanel, ReservationPanel, LocationPanel, EventPanel
data/                 Semua konten yang bisa diubah (lihat bagian berikut)
hooks/
  useOpenState.ts     Status buka/tutup yang diperbarui tiap menit
lib/
  hours.ts            Perhitungan jam buka berdasarkan WIB (fungsi biasa, tanpa React)
  booking.ts          Slot reservasi per jam dan helper tanggal WIB
  reservationApi.ts   Pengiriman data reservasi ke dashboard (masih tiruan)
  hubNav.ts           Pindah panel lewat hash URL (dipakai tombol Reservasi di hero)
types/
  content.ts          Tipe yang dipakai di banyak file (Photo, HoursRow)
public/images/
  Logo UB COFFEE.webp Logo (hero dan footer)
  WEBP/               Foto suasana (hero, ruang meeting, berita & artikel) dan wordmark hero
  menu/               Foto menu (mengisi penuh kartu)
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
  `image: menuPhoto("<id>")`. Foto ditampilkan penuh di kartu (tepinya bisa terpotong),
  jadi letakkan hidangan di tengah foto. Gunakan foto potret ±1200 px dalam format WebP.
- Mengganti foto dengan nama file yang sama? Hapus `.next/dev/cache/images` lalu muat ulang
  dengan Ctrl + Shift + R, karena Next.js menyimpan cache gambar berdasarkan nama file.
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

### Foto hero (`data/heroPhotos.ts`)

- Simpan foto di `public/images/WEBP/` (format `.webp`, landscape 3:2).
- `heroPhotos`: foto slideshow hero, tampil bergiliran sesuai urutan array. Isi dengan
  `photo("<nama file tanpa .webp>")` dan teks `alt`.
- Helper `photo()` yang sama dipakai untuk foto ruangan (`data/reservation.ts`) dan berita
  (`data/news.ts`).

### Berita & Artikel (`data/news.ts`)

- Tambah item di array `news`. `type`: `"berita"` atau `"artikel"`; `category`: `"event"`,
  `"kolaborasi"`, `"tips"`, atau `"cerita"` (label badge di `newsLabel`); `date` dalam format
  `"YYYY-MM-DD"`.
- `excerpt` tampil di kartu (selalu dipotong 2 baris); `body` berisi teks lengkap, satu string per
  paragraf, yang tampil menggantikan isi panel saat kartu diklik.
- Panel menampilkan 3 item terbaru per jenis. Tombol "Lihat Semua" mengganti isi panel (tanpa
  pindah halaman) dengan semua item, filter kategori, dan 9 item per halaman.

### Reservasi meeting room (`data/reservation.ts`)

- `reservationText`: paragraf intro, catatan harga, dan teks ajakan reservasi.
- `rooms`: kartu ruangan (Arjuna, Semeru): kapasitas, keterangan, "Cocok untuk", fasilitas, dan
  foto. `bookableRooms` = `rooms` + Open Space, yang hanya muncul sebagai pilihan di form.
- `roomPrices` dan `meetingPackages`: isi kartu Harga (pilihan "Sewa ruangan" dan
  "Paket + konsumsi").
- `bookings`: jadwal yang sudah dipesan (`room`, `date`, `start`, `end`). Slot form reservasi
  per jam mengikuti jam buka UB Coffee (`lib/booking.ts`); slot yang bentrok tampil "Sudah
  dipesan". Tanggal bisa dipilih hingga 60 hari ke depan. Isi sekarang hanya contoh, nanti
  diganti data dari dashboard.
- Tombol "Reservasi sekarang" membuka form (`components/ReservationDialog.tsx`). Tombol
  "Reservasi" di hero membuka panel ini dan menggulir ke tombol tersebut.
- Form mengirim data lewat `submitReservation` di `lib/reservationApi.ts`. Dashboard belum
  tersambung, jadi fungsi itu baru meniru pengiriman (jeda + kode reservasi contoh); ganti isinya
  dengan `fetch` ke API dashboard.

### Tab section 2 (`data/navigation.ts`)

Judul tab bisa diubah bebas. Jangan mengubah `key`, karena dipakai sebagai alamat (`#menu`,
`#reservasi`, …) dan tautan lama akan berhenti bekerja.
