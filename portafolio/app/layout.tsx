import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelFont = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Christian Martinez — Fullstack Developer & UI Designer",
  description:
    "Portafolio de Christian André Martinez, desarrollador fullstack especializado en React, Next.js y Node.js. Explora proyectos, habilidades y contacto.",
  keywords: ["Fullstack Developer", "React", "Next.js", "TypeScript", "Node.js", "UI Design", "El Salvador"],
  authors: [{ name: "Christian André Martinez" }],
  openGraph: {
    title: "Christian André Martinez — Fullstack Developer & UI Designer",
    description:
      "Portafolio de Christian André Martinez, desarrollador fullstack especializado en React, Next.js y Node.js.",
    type: "website",
    locale: "es_SV",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian André Martinez — Fullstack Developer & UI Designer",
    description:
      "Portafolio de Christian André Martinez, desarrollador fullstack especializado en React, Next.js y Node.js.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070709",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${pixelFont.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="min-h-full">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
