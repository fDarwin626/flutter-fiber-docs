import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import GsapInit from "@/components/GsapInit";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flutter-fiber-docs.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "flutter_fiber native, declarative 3D for Flutter",
  description:
    "A native, declarative Flutter 3D package inspired by react-three-fiber. Procedural geometry, PBR lighting, grouping, and animation built from Dart data, no asset pipeline, no WebView, no bundled engine.",
  keywords: [
    "flutter",
    "flutter 3d",
    "dart 3d",
    "react-three-fiber flutter",
    "flutter opengl",
    "flutter game engine",
    "flutter geometry",
    "flutter fiber",
  ],
  authors: [{ name: "Darwin (CoCoNuT-sTuDiOs)" }],
  icons: {
    icon: "/Flutter_icon.png",
    shortcut: "/Flutter_icon.png",
    apple: "/Flutter_icon.png",
  },
  openGraph: {
    title: "flutter_fiber native, declarative 3D for Flutter",
    description:
      "Procedural geometry, PBR lighting, grouping, and animation for Flutter built from Dart data, not loaded from a file.",
    url: siteUrl,
    siteName: "flutter_fiber",
    images: ["/Flutter_icon.png"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "flutter_fiber native, declarative 3D for Flutter",
    description:
      "Procedural geometry, PBR lighting, grouping, and animation for Flutter built from Dart data.",
    images: ["/Flutter_icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
    verification: {
     google:"_1lyoTC_gvW-q_2NLlzOBjiNYFm2b36Wsvx2xG-pnT4"
    },
  };


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} ${inter.variable} antialiased`}>
        <GsapInit />
        {children}
      </body>
    </html>
  );
}