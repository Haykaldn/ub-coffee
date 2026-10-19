// Path foto lokal di public/. Hanya dipakai di dalam data/; nanti dashboard mengirim URL
// foto langsung, jadi komponen tidak boleh bergantung pada helper ini.

// Foto asli UB Coffee (public/images/WEBP). Foto potret sudah dipotong jadi landscape 3:2.
export const photo = (file: string) => `/images/WEBP/${file}.webp`;
