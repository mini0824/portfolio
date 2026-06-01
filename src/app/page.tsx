"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { playButtonSound } from "@/utils/audio";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const statusBoxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const startAnimations = () => {
      const anime = (window as any).anime;
      if (!anime) {
        setTimeout(startAnimations, 100);
        return;
      }

      // ボタンの浮遊アニメーション
      if (buttonRef.current) {
        anime({
          targets: buttonRef.current,
          translateY: [-5, 5],
          direction: "alternate",
          loop: true,
          easing: "easeInOutSine",
          duration: 1500,
        });
      }
    };

    startAnimations();
  }, []);

  const handleBtnClick = () => {
    playButtonSound("action");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 relative overflow-hidden">
      {/* 1. ファーストビュー：キャッチコピーとSTART GAMEのみ */}
      <section className="w-full max-w-4xl flex flex-col items-center text-center justify-center gap-8 min-h-[calc(100vh-140px)] relative z-30 pointer-events-none">
        <div className="mt-4 text-xl md:text-2xl font-bold leading-relaxed px-4 text-purple-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">
          <p>{t.status.tagline}</p>
        </div>

        <Link href="#status-section" className="mt-4" onClick={handleBtnClick}>
          <button 
            ref={buttonRef}
            className="pixel-btn text-2xl px-10 py-5"
          >
            {t.status.startGame}
          </button>
        </Link>
      </section>

      {/* 2. スクロール後の最初のコンテンツ：STATUSブロック */}
      <section id="status-section" className="w-full flex flex-col items-center py-8 scroll-mt-24 relative z-30 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="pixel-box p-6 max-w-2xl w-full text-left origin-top"
        >
          <h2 className="text-2xl border-b-2 border-purple-300/50 text-gray-800 inline-block mb-4 font-bold">
            {t.status.title}
          </h2>
          <ul className="text-lg space-y-2 text-gray-700 font-bold">
            <li><span className="font-bold text-purple-700">{t.status.name}</span> {t.status.nameVal}</li>
            <li><span className="font-bold text-purple-700">{t.status.level}</span> 22</li>
            <li><span className="font-bold text-purple-700">{t.status.class}</span> {t.status.classVal}</li>
            <li><span className="font-bold text-purple-700">{t.status.job}</span> {t.status.jobVal}</li>
          </ul>
        </motion.div>
      </section>

      {/* 各セクションをここに配置 */}
      <div className="w-full relative z-30 flex flex-col items-center pointer-events-none">
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
      </div>
    </div>
  );
}
