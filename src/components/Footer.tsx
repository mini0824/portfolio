"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { playButtonSound } from "@/utils/audio";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  const handleBtnClick = () => {
    playButtonSound("link");
  };

  return (
    <footer className="w-full border-t border-purple-300/20 p-8 mt-auto bg-white/20 backdrop-blur-lg shadow-[0_-4px_30px_rgba(0,0,0,0.03)] z-30">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4">
        <h3 className="text-2xl font-bold tracking-[0.2em] border-b-2 border-purple-300/40 text-gray-800 inline-block px-4 pb-1 mb-2 uppercase">
          Contact Info
        </h3>
        <div className="flex gap-6 mt-2 text-gray-700 font-bold">
          <a 
            href="https://github.com/mini0824?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 hover:text-[#f783ac] transition-colors font-bold text-lg"
            onClick={handleBtnClick}
          >
            GitHub
          </a>
          <Link 
            href="/contact" 
            className="flex items-center gap-2 hover:text-[#e599f7] transition-colors text-lg"
            onClick={handleBtnClick}
          >
            <Mail size={24} />
            <span>Contact</span>
          </Link>
        </div>
        <p className="text-sm mt-4 text-gray-500 font-bold">{t.footer.text}</p>
      </div>
    </footer>
  );
}
