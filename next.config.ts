import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Foto sementara dari Unsplash. Ganti dengan foto asli UB Coffee di /public/images.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    qualities: [60, 75],
    formats: ["image/webp"],
  },
};

export default nextConfig;
