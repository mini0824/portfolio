"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { playButtonSound } from "@/utils/audio";

export default function CurrentPortfolioPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const handleBtnClick = () => {
    playButtonSound("nav");
  };

  const pageVariant = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 } 
    }
  } as const;

  return (
    <main className="min-h-screen p-8 md:p-16 flex flex-col items-center gap-10 pointer-events-none relative z-30">
      
      {/* 戻るボタン */}
      <Link href="/#projects" className="self-start mb-2 pointer-events-auto" onClick={handleBtnClick}>
        <button className="pixel-btn">{t.currentPortfolio.returnBtn}</button>
      </Link>

      {/* ページタイトル */}
      <section className="w-full max-w-4xl text-center pointer-events-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold tracking-widest pixel-border p-5 bg-white/45 backdrop-blur-sm inline-block text-gray-800 font-pixel"
        >
          {t.currentPortfolio.title}
        </motion.h1>
      </section>

      {/* メイン詳細カード */}
      <motion.section 
        variants={pageVariant}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl pixel-box p-6 md:p-10 flex flex-col gap-8 pointer-events-auto"
      >
        
        {/* サブタイトル */}
        <div className="border-b border-purple-300/40 pb-4">
          <p className="text-xl font-bold text-purple-700 font-pixel">{t.currentPortfolio.subtitle}</p>
        </div>

        {/* プロジェクト背景と目的 */}
        <div>
          <h2 className="text-2xl mb-4 border-b-2 border-purple-300/50 text-gray-800 inline-block font-bold font-pixel">
            {t.currentPortfolio.bgTitle}
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 font-medium">
            {t.currentPortfolio.bgDesc}
          </p>
        </div>

        {/* 主要特徴 ＆ 機能 */}
        <div>
          <h2 className="text-2xl mb-6 border-b-2 border-purple-300/50 text-gray-800 inline-block font-bold font-pixel">
            {t.currentPortfolio.featuresTitle}
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/40 p-5 border border-white/20 rounded-xl backdrop-blur-sm">
              <h3 className="font-bold text-lg text-pink-600 mb-2 font-pixel">{t.currentPortfolio.feature1Title}</h3>
              <p className="text-gray-600 text-base font-medium">{t.currentPortfolio.feature1Desc}</p>
            </div>
            
            <div className="bg-white/40 p-5 border border-white/20 rounded-xl backdrop-blur-sm">
              <h3 className="font-bold text-lg text-blue-600 mb-2 font-pixel">{t.currentPortfolio.feature2Title}</h3>
              <p className="text-gray-600 text-base font-medium">{t.currentPortfolio.feature2Desc}</p>
            </div>
            
            <div className="bg-white/40 p-5 border border-white/20 rounded-xl backdrop-blur-sm">
              <h3 className="font-bold text-lg text-purple-600 mb-2 font-pixel">{t.currentPortfolio.feature3Title}</h3>
              <p className="text-gray-600 text-base font-medium">{t.currentPortfolio.feature3Desc}</p>
            </div>
          </div>
        </div>

        {/* 使用技術 (技術スタック) */}
        <div>
          <h2 className="text-2xl mb-6 border-b-2 border-purple-300/50 text-gray-800 inline-block font-bold font-pixel">
            {t.currentPortfolio.techTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            
            {/* Frontend / Build */}
            <div className="border border-white/25 p-5 bg-white/60 backdrop-blur-sm shadow-sm rounded-xl">
              <h4 className="font-bold text-lg border-b border-gray-200 pb-2 mb-3 text-purple-700 font-pixel">Frontend & Styling</h4>
              <ul className="text-base text-gray-600 space-y-1.5 font-medium">
                <li>• <strong>Next.js 16 (App Router / Turbopack)</strong></li>
                <li>• <strong>React 19 / TypeScript</strong></li>
                <li>• <strong>Tailwind CSS v4 ＆ Custom CSS</strong></li>
                <li className="text-xs text-gray-500 pl-4">(Scanline ＆ Pixel-art 枠線)</li>
              </ul>
            </div>

            {/* Animation / Audio / State */}
            <div className="border border-white/25 p-5 bg-white/60 backdrop-blur-sm shadow-sm rounded-xl">
              <h4 className="font-bold text-lg border-b border-gray-200 pb-2 mb-3 text-purple-700 font-pixel">Interactive & Localization</h4>
              <ul className="text-base text-gray-600 space-y-1.5 font-medium">
                <li>• <strong>Framer Motion v12 ＆ Anime.js</strong></li>
                <li>• <strong>Web Audio API (リアルタイムシンセ音合成)</strong></li>
                <li className="text-xs text-gray-500 pl-4">(OscillatorNode / GainNode によるきらきら星)</li>
                <li>• <strong>React Context API (三ヶ国語ローカライズ)</strong></li>
              </ul>
            </div>

          </div>
        </div>

        {/* 外部リンク (Visit Site) */}
        <div className="flex justify-center pt-6 border-t border-purple-300/20">
          <Link href="/" onClick={handleBtnClick}>
            <button className="pixel-btn text-base px-8 py-4">
              {t.currentPortfolio.visitSite}
            </button>
          </Link>
        </div>

      </motion.section>
    </main>
  );
}
