"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  const scrollVariant = {
    hidden: { opacity: 0, scale: 0.4, rotateY: 180, y: 150 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0, 
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 20 } 
    }
  };

  return (
    <section id="about" className="w-full flex flex-col items-center py-16 scroll-mt-24">
      <motion.div
        variants={scrollVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="w-full max-w-4xl pixel-box p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center mb-16"
        style={{ perspective: 1000 }}
        whileHover={{ y: -4, boxShadow: "0px 12px 0px 0px rgba(0,0,0,0.1)" }}
      >
        <div className="w-48 h-48 md:w-64 md:h-64 pixel-border bg-gray-200 relative overflow-hidden shrink-0">
          <Image 
            src="/profile.jpg" 
            alt="Meiru Liang Profile" 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 192px, 256px"
          />
        </div>
        <div>
          <h2 className="text-3xl mb-4 border-b-4 border-gray-800 inline-block">▶ PROFILE</h2>
          <p className="text-lg leading-relaxed">
            <strong>梁 美如（りょう みじょ）</strong>です。<br/>
            日中英の3ヶ国語を操る言語能力を武器に、技術で世界の架け橋となるエンジニアを目指しています！<br/>
            現在はUnityを活用したゲーム開発に没頭中。休日は手芸でモノづくりを楽しむなど、デジタルとアナログの両面からクリエイティブな探求を続けています。
          </p>
        </div>
      </motion.div>

      <motion.div 
        variants={scrollVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="w-full max-w-4xl pixel-box p-6 md:p-10 mb-16"
        style={{ perspective: 1000 }}
        whileHover={{ y: -4, boxShadow: "0px 12px 0px 0px rgba(0,0,0,0.1)" }}
      >
        <h2 className="text-3xl mb-8 border-b-4 border-gray-800 inline-block">▶ BACKGROUND (教育背景)</h2>
        <ul className="space-y-8 text-lg relative border-l-4 border-gray-300 ml-4 pl-8">
          <li className="relative">
            <span className="absolute -left-[41px] top-1 w-5 h-5 bg-[#ff6b6b] rounded-full border-4 border-gray-800"></span>
            <p className="font-bold text-xl text-[#ff6b6b]">2028年3月 卒業見込み</p>
            <p className="mt-2 text-xl">工学院大学 情報学部 コンピュータ科学科 在籍</p>
            <p className="text-gray-600 mt-1">CSの基礎、データ構造やアルゴリズムを学習中。</p>
          </li>
          <li className="relative">
            <span className="absolute -left-[41px] top-1 w-5 h-5 bg-[#4dabf7] rounded-full border-4 border-gray-800"></span>
            <p className="font-bold text-xl text-[#4dabf7]">卒業</p>
            <p className="mt-2 text-xl">東京都立国際高等学校 国際バカロレア（IB）コース</p>
            <p className="text-gray-600 mt-1">探究学習を通じた英語での論理的思考と多文化環境での調整力を習得。</p>
          </li>
        </ul>
      </motion.div>

      <motion.div 
        variants={scrollVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="w-full max-w-4xl pixel-box p-6 md:p-10"
        style={{ perspective: 1000 }}
        whileHover={{ y: -4, boxShadow: "0px 12px 0px 0px rgba(0,0,0,0.1)" }}
      >
        <h2 className="text-3xl mb-8 border-b-4 border-gray-800 inline-block">▶ IDENTITY & VISION</h2>
        <div className="space-y-8 text-lg leading-relaxed">
          <div className="bg-gray-100 p-6 pixel-border">
            <h3 className="font-bold text-2xl text-[#ff6b6b] mb-4">アイデンティティ</h3>
            <p>
              日本生まれの中国人。日中両言語がネイティブレベル。<br/>
              IB課程での探究学習を通じ、英語での論理的思考と多文化環境での調整力を習得しました。
            </p>
          </div>
          <div className="bg-gray-100 p-6 pixel-border">
            <h3 className="font-bold text-2xl text-[#4dabf7] mb-4">エンジニアとしての志</h3>
            <p>
              CSの基礎を重視しつつ、言語と技術の壁を溶かし、グローバルな課題を解決するエンジニアを目指しています。<br/>
              将来はシンガポールや香港などの海外拠点での活躍も視野に入れています。
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
