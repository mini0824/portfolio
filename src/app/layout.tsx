import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Meiru Liang - Portfolio",
  description: "A pixel-art style portfolio of Meiru Liang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${dotGothic.variable} h-full antialiased`}
    >
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js" defer></script>
      </head>
      <body className={`${dotGothic.className} min-h-full flex flex-col font-pixel`}>
        <Navigation />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
