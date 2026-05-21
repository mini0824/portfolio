"use client";

import { motion } from "framer-motion";

export default function ExperienceSection() {
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

  const experiences = [
    {
      title: "リクルート WOW BASE インターン",
      description: "プロダクト開発とビジネス視点での課題解決プロセスを経験。",
      category: "INTERNSHIP"
    },
    {
      title: "株式会社スピードリンクジャパン インターン",
      description: "エンジニアの現場業務と技術スタックの実践的理解。",
      category: "INTERNSHIP"
    },
    {
      title: "マカオ政府観光局・マカオ航空共催商談会",
      description: "中日・英日の逐次通訳（セミナー・商談対応）。",
      category: "TRANSLATOR"
    },
    {
      title: "国際イベント通訳・翻訳",
      description: "AnimeJapan 2025、東京マラソン 2025等での日中英3言語対応。",
      category: "TRANSLATOR"
    }
  ];

  return (
    <section id="experience" className="w-full flex flex-col items-center py-16 scroll-mt-24">
      <motion.div 
        variants={scrollVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="w-full max-w-4xl pixel-box p-6 md:p-10"
        style={{ perspective: 1000 }}
        whileHover={{ y: -4, boxShadow: "0px 12px 0px 0px rgba(0,0,0,0.1)" }}
      >
        <h2 className="text-3xl mb-8 border-b-4 border-gray-800 inline-block">▶ QUEST_CLEARED (実務・実績)</h2>
        <div className="grid grid-cols-1 gap-6 mt-4">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              className="border-4 border-gray-300 p-6 bg-[#fdfbf7] hover:border-[#ff6b6b] transition-colors relative mt-4"
              initial={{ opacity: 0, x: -50, rotateY: 90 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: false }}
              style={{ perspective: 1000 }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 80 }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="absolute -top-5 -left-4 bg-gray-800 text-white px-3 py-1 text-sm font-bold border-2 border-white">
                {exp.category}
              </span>
              <h3 className="text-2xl font-bold mt-2">{exp.title}</h3>
              <p className="text-lg mt-3 text-gray-700">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
