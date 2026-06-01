"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function AboutSection() {
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

  return (
    <section id="about" className="w-full flex flex-col items-center py-16 scroll-mt-24">
      {/* PROFILE */}
      <motion.div
        variants={scrollVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="w-full max-w-4xl pixel-box p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center mb-16"
        style={{ perspective: 1000 }}
        whileHover={{ y: -4, boxShadow: "0 12px 40px 0 rgba(229, 153, 247, 0.35)" }}
      >
        <div className="w-48 h-48 md:w-64 md:h-64 border border-white/20 bg-white/20 relative overflow-hidden shrink-0 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-sm">
          <Image 
            src="/profile_v2.jpg" 
            alt="Meiru Liang Profile" 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 192px, 256px"
          />
        </div>
        <div>
          <h2 className="text-3xl mb-4 border-b-2 border-purple-300/50 text-gray-800 inline-block font-bold">
            {t.about.profileTitle}
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            {t.about.profileText.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </motion.div>

      {/* BACKGROUND */}
      <motion.div 
        variants={scrollVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="w-full max-w-4xl pixel-box p-6 md:p-10 mb-16"
        style={{ perspective: 1000 }}
        whileHover={{ y: -4, boxShadow: "0 12px 40px 0 rgba(229, 153, 247, 0.35)" }}
      >
        <h2 className="text-3xl mb-8 border-b-2 border-purple-300/50 text-gray-800 inline-block font-bold">
          {t.about.bgTitle}
        </h2>
        <ul className="space-y-8 text-lg relative border-l-2 border-white/20 ml-4 pl-8">
          <li className="relative">
            <span className="absolute -left-[40px] top-1 w-5 h-5 bg-[#f783ac] rounded-full border-2 border-white/40 shadow-[0_0_8px_rgba(247,131,172,0.6)]"></span>
            <p className="font-bold text-xl text-pink-600">{t.about.bg1Date}</p>
            <p className="mt-2 text-xl text-gray-800 font-bold">{t.about.bg1Title}</p>
            <p className="text-gray-600 mt-1">{t.about.bg1Desc}</p>
          </li>
          <li className="relative">
            <span className="absolute -left-[40px] top-1 w-5 h-5 bg-[#74c0fc] rounded-full border-2 border-white/40 shadow-[0_0_8px_rgba(116,192,252,0.6)]"></span>
            <p className="font-bold text-xl text-blue-600">{t.about.bg2Date}</p>
            <p className="mt-2 text-xl text-gray-800 font-bold">{t.about.bg2Title}</p>
            <p className="text-gray-600 mt-1">{t.about.bg2Desc}</p>
          </li>
        </ul>
      </motion.div>

      {/* IDENTITY & VISION */}
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
          {t.about.identityTitle}
        </h2>
        <div className="space-y-8 text-lg leading-relaxed">
          <div className="bg-white/60 p-6 border border-white/20 rounded-xl backdrop-blur-sm">
            <h3 className="font-bold text-2xl text-[#f783ac] mb-4">{t.about.idHeader}</h3>
            <p className="text-gray-700 font-medium">
              {t.about.idDesc.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className="bg-white/60 p-6 border border-white/20 rounded-xl backdrop-blur-sm">
            <h3 className="font-bold text-2xl text-[#74c0fc] mb-4">{t.about.visionHeader}</h3>
            <p className="text-gray-700 font-medium">
              {t.about.visionDesc.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
