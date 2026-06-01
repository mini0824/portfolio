"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function SkillsSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollVariant = {
    hidden: { opacity: 0, scale: 0.85, y: 60 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 } 
    }
  } as const;

  const csSkills = [
    { key: "cs1", tags: "Java / C / MATLAB" },
    { key: "cs2", tags: "C# / Unity" },
    { key: "cs3", tags: "Python" },
    { key: "cs4", tags: "TypeScript / React / Next.js" },
  ] as const;

  return (
    <section id="skills" className="w-full flex flex-col items-center py-16 scroll-mt-24">
      <motion.div 
        variants={scrollVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="w-full max-w-4xl pixel-box p-6 md:p-10"
        style={{ perspective: 1000 }}
        whileHover={{ y: -4, boxShadow: "0 12px 40px 0 rgba(229, 153, 247, 0.35)" }}
      >
        <h2 className="text-3xl mb-10 border-b-2 border-purple-300/50 text-gray-800 inline-block font-bold">
          {t.skills.title}
        </h2>
        
        {/* Computer Science & Development */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-[#f783ac]">
            {t.skills.csTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {csSkills.map((skill) => {
              const skillData = t.skills[skill.key];
              return (
                <motion.div 
                  key={skill.key}
                  className="border border-white/25 p-5 bg-white/60 backdrop-blur-sm shadow-sm hover:border-[#f783ac] transition-colors rounded-xl"
                  whileHover={{ scale: 1.03, rotate: skill.key === "cs1" || skill.key === "cs3" ? -1 : 1 }}
                >
                  <h4 className="font-bold text-xl border-b border-gray-200 pb-2 mb-3 text-gray-800 font-bold">{skillData.title}</h4>
                  <p className="font-bold text-lg text-purple-700">{skill.tags}</p>
                  <p className="text-base mt-2 text-gray-600">{skillData.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Global Communication */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-[#74c0fc]">
            {t.skills.globalTitle}
          </h3>
          <motion.div 
            className="space-y-6 bg-white/60 p-6 border border-white/20 rounded-xl backdrop-blur-sm"
            whileHover={{ y: -2 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-dotted border-purple-300/20 pb-4">
              <span className="text-xl font-bold md:w-40 mb-2 md:mb-0 text-gray-800">{t.skills.jp}</span>
              <span className="flex-1 text-lg font-bold text-gray-600">{t.skills.nativeJp}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-dotted border-purple-300/20 pb-4">
              <span className="text-xl font-bold md:w-40 mb-2 md:mb-0 text-gray-800">{t.skills.zh}</span>
              <span className="flex-1 text-lg font-bold text-gray-600">{t.skills.nativeZh}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-2">
              <span className="text-xl font-bold md:w-40 mb-2 md:mb-0 text-gray-800">{t.skills.en}</span>
              <span className="flex-1 text-lg font-bold text-gray-600">{t.skills.businessEn}</span>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
