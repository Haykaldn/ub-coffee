@AGENTS.md

# UB Coffee

Landing page satu halaman UB Coffee yang akan disambungkan ke dashboard admin untuk mengedit
konten. Arsitektur dan alur data: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Cara mengubah
konten: [README.md](README.md).

## Aturan data

- Komponen, panel, dan hook **tidak boleh** import dari `data/`.
- Alur data: `data/` → `lib/content/` → `app/page.tsx` → props → komponen. Hanya `lib/content/`
  yang membaca `data/`, dan hanya `app/page.tsx` yang memanggil `lib/content/`.
- Saat dashboard tersambung, yang diganti hanya isi fungsi di `lib/content/` (dan
  `lib/reservationApi.ts`), bukan komponen.
- Tipe konten ada di `types/content.ts` (dan `types/reservation.ts` untuk data kirim). Tipe ini
  adalah kontrak dengan dashboard: ubah dengan hati-hati dan jangan mendefinisikan tipe konten di
  `data/` atau komponen.
- Setiap item yang bisa diedit admin wajib punya `id` stabil. Jangan mengubah `id` yang sudah ada.
- Gambar memakai tipe `Photo { src, alt }`. Helper `photo()`/`menuPhoto()` di `data/paths.ts`
  hanya boleh dipakai di dalam `data/`.
- Data yang dikirim ke client component harus serializable (tanpa fungsi atau objek `Date`).
- `lib/hours.ts` dan `lib/booking.ts` adalah fungsi murni: data diterima lewat parameter.
- `lib/reservationApi.ts` adalah satu-satunya titik kirim reservasi. Field `ReservationPayload`
  jangan diubah tanpa izin.
- Tampilan dan perilaku website tidak boleh berubah sebagai efek samping refactor.

## Kategori

- Kategori **menu** adalah union tetap (`"Kopi" | "Non-Kopi" | "Makanan"`), dengan filter di
  `lib/menu.ts`. Jangan diubah menjadi data.
- Kategori **berita** adalah data (`NewsCategory { id, slug, label }` di `newsCategories`).
  `NewsItem.categories` berisi daftar slug (boleh lebih dari satu); slug yang tidak dikenal tampil "Lainnya" lewat
  `categoryLabel()` di `lib/news.ts`, tidak boleh error.
- Jenis berita (`"berita" | "artikel"`) adalah union tetap.

## Navigasi

- Tab section 2 ada di `hubTabs` di `lib/hubNav.ts`. `key` dipakai sebagai hash URL: jangan
  diubah. Kalau terpaksa diganti, daftarkan key lama di `legacyTabKeys` agar tautan lama
  dialihkan (contoh yang ada: `event` → `berita`).

## CSS

- CSS biasa dengan penamaan BEM di `app/styles/`, tanpa framework CSS.
- **Jangan ubah urutan `@import` di `app/globals.css`**: `hub-theme.css` dan `responsive.css`
  harus datang setelah bagian yang mereka timpa.
- Jarak memakai token `--space-*` di `app/styles/base.css` (ukuran desain × 0,9).

## Next.js 16

- Versi ini punya perubahan besar. Baca panduan di `node_modules/next/dist/docs/` sebelum
  menulis kode yang memakai API Next.js (lihat AGENTS.md).

## Perintah

- `npm run lint` dan `npx tsc --noEmit` setelah setiap perubahan; keduanya harus lolos.
- `npm run build` sebelum menyatakan pekerjaan selesai.
- `npm run format` untuk merapikan format dengan Prettier.

## Larangan

- Jangan menambah library baru tanpa izin.
- Jangan mengubah file di luar folder `ub-coffee` tanpa izin.
- Jangan menjalankan `git commit`, `push`, atau `reset` kecuali diminta. Branch `main` terhubung
  ke Vercel, jadi push ke `main` langsung deploy.
