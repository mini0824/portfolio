"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statusBoxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // anime.jsが読み込まれるのを待つ
    const startAnimations = () => {
      const anime = (window as any).anime;
      if (!anime) {
        setTimeout(startAnimations, 100);
        return;
      }

      // タイトルの文字分割アニメーション
      if (titleRef.current) {
        const text = titleRef.current.textContent || "";
        titleRef.current.innerHTML = text
          .split("")
          .map((char) => `<span class="letter inline-block">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        anime.timeline({ loop: false })
          .add({
            targets: ".letter",
            translateY: [40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: (el: any, i: number) => 500 + 30 * i,
          });
      }

      // ステータスボックスの展開アニメーション
      if (statusBoxRef.current) {
        anime({
          targets: statusBoxRef.current,
          scaleY: [0, 1],
          opacity: [0, 1],
          easing: "easeOutElastic(1, .8)",
          duration: 1500,
          delay: 800,
        });
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

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 relative overflow-hidden">
      <section className="w-full max-w-4xl flex flex-col items-center text-center gap-8 mt-10">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] to-[#fcc419] pixel-border p-6 bg-white"
        >
          MEIRU LIANG
        </h1>
        
        <div 
          ref={statusBoxRef}
          className="pixel-box p-6 mt-8 max-w-2xl w-full text-left bg-white opacity-0 origin-top"
        >
          <h2 className="text-2xl border-b-4 border-gray-800 inline-block mb-4">▶ STATUS</h2>
          <ul className="text-lg space-y-2">
            <li><span className="font-bold text-[#4dabf7]">NAME:</span> 梁 美如 (Meiru Liang)</li>
            <li><span className="font-bold text-[#4dabf7]">LEVEL:</span> 22</li>
            <li><span className="font-bold text-[#4dabf7]">CLASS:</span> 情報学部 3年 (28卒)</li>
            <li><span className="font-bold text-[#4dabf7]">JOB:</span> 多言語エンジニア</li>
          </ul>
        </div>

        <div className="mt-4 text-xl md:text-2xl font-bold leading-relaxed px-4">
          <p>「日中英の言語能力と、技術で世界を繋ぐクエストを遂行中」</p>
        </div>

        <Link href="#about" className="mt-12">
          <button 
            ref={buttonRef}
            className="pixel-btn text-2xl px-10 py-5 shadow-xl"
          >
            ▶ START GAME
          </button>
        </Link>
      </section>

      {/* 各セクションをここに配置 */}
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
    </div>
  );
}
