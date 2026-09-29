import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 75],
    formats: ["image/webp"],
  },
};

export default nextConfig;
