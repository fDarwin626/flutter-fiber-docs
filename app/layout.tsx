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
    "Native, declarative 3D for Flutter. Procedural shapes from Dart parameters, PBR materials, lights, image/text/live-widget textures, and glTF/GLB models, rendered directly against OpenGL ES. Inspired by react-three-fiber. No WebView, no bundled engine.",
  keywords: [
    "flutter",
    "flutter 3d",
    "flutter 3d package",
    "flutter 3d model viewer",
    "flutter glb",
    "flutter gltf",
    "flutter 3d library",
    "flutter pbr",
    "flutter clearcoat",
    "flutter opengl",
    "flutter three.js",
    "flutter 3d without webview",
    "dart 3d",
    "react-three-fiber flutter",
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
      "Native 3D for Flutter: procedural shapes, PBR materials, textures, and glTF/GLB models. No WebView, no bundled engine.",
    url: siteUrl,
    siteName: "flutter_fiber",
    images: ["/Flutter_icon.png"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "flutter_fiber native, declarative 3D for Flutter",
    description:
      "Native 3D for Flutter: procedural shapes, PBR materials, textures, and glTF/GLB models. No WebView, no bundled engine.",
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