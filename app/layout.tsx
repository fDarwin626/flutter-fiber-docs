import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "flutter_fiber — native, declarative 3D for Flutter",
  description:
    "A native, declarative Flutter 3D package inspired by react-three-fiber. Procedural geometry, PBR lighting, grouping, and animation — built from Dart data.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}