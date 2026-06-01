"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { playButtonSound } from "@/utils/audio";

const GithubLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const navLinks = [
  { nameKey: "home", path: "/" },
  { nameKey: "about", path: "/#about" },
  { nameKey: "experience", path: "/#experience" },
  { nameKey: "skills", path: "/#skills" },
  { nameKey: "projects", path: "/#projects" },
] as const;

export default function Navigation() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const handleLangChange = (lang: "ja" | "en" | "zh") => {
    playButtonSound("lang");
    setLanguage(lang);
  };

  const handleBtnClick = () => {
    playButtonSound("nav");
  };

  return (
    <nav className="w-full bg-white/20 backdrop-blur-lg border-b border-purple-300/20 p-4 sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* 左側：ロゴとお名前 ＆ ナビゲーションリンク */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <Link href="/" onClick={handleBtnClick}>
            <span className="text-2xl font-bold tracking-widest text-gray-850 font-pixel select-none cursor-pointer drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]">
              MEIRU LIANG
            </span>
          </Link>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {navLinks.map((link) => {
              return (
                <Link key={link.nameKey} href={link.path} onClick={handleBtnClick}>
                  <motion.button
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pixel-btn"
                  >
                    {t.nav[link.nameKey]}
                  </motion.button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 右側：言語切り替え ＆ コンタクトアイコン */}
        <div className="flex items-center gap-4">
          {/* 言語切り替えバー */}
          <div className="flex bg-white/20 border border-purple-300/30 rounded-lg p-0.5 shadow-sm backdrop-blur-sm">
            {(["ja", "en", "zh"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLangChange(lang)}
                className={`px-2.5 py-1 text-xs font-bold rounded-md font-pixel transition-all duration-200 cursor-pointer ${
                  language === lang
                    ? "bg-white/60 text-purple-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/10"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <motion.a 
            whileHover={{ y: -2, rotate: [0, -8, 8, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
            href="https://github.com/mini0824?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2.5 bg-white/30 text-gray-800 border border-purple-300/40 hover:bg-[#f783ac]/80 hover:border-[#f783ac] hover:text-white transition-all rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.05)] backdrop-blur-sm active:translate-y-0.5 cursor-pointer"
            onClick={() => playButtonSound("link")}
          >
            <GithubLogo />
          </motion.a>
          <Link href="/contact" onClick={() => playButtonSound("link")}>
            <motion.button 
              whileHover={{ y: -2, rotate: [0, -8, 8, -8, 8, 0] }}
              transition={{ duration: 0.4 }}
              className="p-2.5 bg-white/30 text-gray-800 border border-purple-300/40 hover:bg-[#e599f7]/80 hover:border-[#e599f7] hover:text-white transition-all rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.05)] backdrop-blur-sm active:translate-y-0.5 cursor-pointer flex items-center justify-center"
            >
              <Mail size={24} />
            </motion.button>
          </Link>
        </div>
        
      </div>
    </nav>
  );
}
