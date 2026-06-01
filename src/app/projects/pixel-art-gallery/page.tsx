"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { playButtonSound } from "@/utils/audio";

export default function PixelArtGalleryPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const handleBtnClick = () => {
    playButtonSound();
  };

  return (
    <main className="min-h-screen p-8 md:p-16 flex flex-col items-center gap-10">
      <Link href="/" className="self-start mb-4" onClick={handleBtnClick}>
        <button className="pixel-btn">{t.gallery.returnBtn}</button>
      </Link>

      <section className="w-full max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest pixel-border p-4 bg-white/45 backdrop-blur-sm inline-block text-gray-800">
          {t.gallery.title}
        </h1>
      </section>

      <section className="w-full max-w-4xl pixel-box p-6 md:p-10 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ghost Design */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-white/10 relative border border-white/20 rounded-xl overflow-hidden shadow-sm backdrop-blur-sm">
              <Image 
                src="/0432127e4f1785b6.jpg" 
                alt="Ghost Drawing" 
                fill 
                className="object-contain bg-white/5"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <div className="p-4 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl">
              <h3 className="text-xl font-bold border-b border-purple-300/40 text-gray-800 inline-block mb-2">{t.gallery.ghostTitle}</h3>
              <p className="text-sm text-gray-600">
                {t.gallery.ghostDesc}
              </p>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-white/10 relative border border-white/20 rounded-xl overflow-hidden shadow-sm backdrop-blur-sm">
              <Image 
                src="/IMG_5492.jpeg" 
                alt="Personal Drawing" 
                fill 
                className="object-contain bg-white/5"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <div className="p-4 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl">
              <h3 className="text-xl font-bold border-b border-purple-300/40 text-gray-800 inline-block mb-2">{t.gallery.illTitle}</h3>
              <p className="text-sm text-gray-600">
                {t.gallery.illDesc}
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl border-b border-purple-300/40 text-gray-800 inline-block self-start mt-6 uppercase tracking-wider font-bold">
          {t.gallery.msgTitle}
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          {t.gallery.msgText}
        </p>

        <h2 className="text-3xl border-b border-purple-300/40 text-gray-800 inline-block self-start mt-6 uppercase tracking-wider font-bold">
          {t.gallery.toolsTitle}
        </h2>
        <ul className="text-lg list-disc ml-6 space-y-2 text-gray-600">
          <li><strong>Digital:</strong> Procreate, Photoshop</li>
          <li><strong>Analog:</strong> 各種スケッチ用具 / Various sketch tools</li>
        </ul>
      </section>
    </main>
  );
}
