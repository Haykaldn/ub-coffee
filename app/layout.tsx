import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Roboto } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

// Font Section 2 (Hub); variable font, jadi semua ketebalan tersedia
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "UB Coffee",
  description:
    "UB Coffee di Jl. MT. Haryono No.169, Malang. Menu kopi dan makanan, meeting room hingga 15 orang, serta berita dan artikel terbaru.",
};

export const viewport: Viewport = {
  themeColor: "#0B2A5B",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} ${roboto.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
