"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function ExperienceSection() {
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

  const experiences = [
    { key: "exp1", category: "INTERNSHIP" },
    { key: "exp2", category: "INTERNSHIP" },
    { key: "exp3", category: "TRANSLATOR" },
    { key: "exp4", category: "TRANSLATOR" },
  ] as const;

  return (
    <section id="experience" className="w-full flex flex-col items-center py-16 scroll-mt-24">
      <motion.div 
        variants={scrollVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="w-full max-w-4xl pixel-box p-6 md:p-10"
        style={{ perspective: 1000 }}
        whileHover={{ y: -4, boxShadow: "0 12px 40px 0 rgba(229, 153, 247, 0.35)" }}
      >
        <h2 className="text-3xl mb-8 border-b-2 border-purple-300/50 text-gray-800 inline-block font-bold">
          {t.experience.title}
        </h2>
        <div className="grid grid-cols-1 gap-6 mt-4">
          {experiences.map((exp, index) => {
            const expData = t.experience[exp.key];
            return (
              <motion.div 
                key={index} 
                className="border border-white/25 p-6 bg-[#fdfbf7]/60 backdrop-blur-sm hover:border-[#f783ac] transition-colors relative mt-4 rounded-xl"
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false }}
                style={{ perspective: 1000 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="absolute -top-4 -left-3 bg-gradient-to-r from-[#f783ac] to-[#e599f7] text-white px-3 py-1 text-xs font-bold border border-white/30 rounded-md shadow-sm">
                  {exp.category}
                </span>
                <h3 className="text-2xl font-bold mt-2 text-gray-800">{expData.title}</h3>
                <p className="text-lg mt-3 text-gray-600">{expData.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
