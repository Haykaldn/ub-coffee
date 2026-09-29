import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "UB Coffee – Mampir, duduk, nikmati.",
  description:
    "UB Coffee di Jl. MT. Haryono No.169, Malang. Menu kopi dan makanan, meeting room hingga 15 orang, serta event dan promo terbaru.",
};

export const viewport: Viewport = {
  themeColor: "#0B2A5B",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
