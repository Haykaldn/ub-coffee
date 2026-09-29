// Foto sementara dari Unsplash, diminta dalam ukuran kecil agar optimizer Next tidak
// mengunduh file asli (bisa beberapa MB). Hapus setelah foto asli UB Coffee tersedia.
export function unsplash(id: string, width = 1200) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`;
}
