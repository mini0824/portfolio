"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { playButtonSound } from "@/utils/audio";

export default function ProjectsSection() {
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

  const projects = [
    { key: "proj1", tag: "Unity / C#", link: "#", status: "IN PROGRESS" },
    { key: "proj2", tag: "Unity / C# / 3DCG", link: "#", status: "COMPLETED" },
    { key: "proj3", tag: "Next.js / Tailwind", link: "/", status: "VIEW MORE" },
    { key: "proj4", tag: "Art / Design", link: "/projects/pixel-art-gallery", status: "VIEW MORE" }
  ] as const;

  const handleBtnClick = () => {
    playButtonSound("action");
  };

  return (
    <section id="projects" className="w-full flex flex-col items-center py-16 scroll-mt-24 mb-16">
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
          {t.projects.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => {
            const projData = t.projects[proj.key];
            const isCompleted = proj.status === "COMPLETED";
            const isInProgress = proj.status === "IN PROGRESS";

            return (
              <motion.div 
                key={proj.key} 
                className="border border-white/20 p-6 bg-white/60 backdrop-blur-sm flex flex-col gap-4 relative rounded-xl hover:border-[#f783ac] transition-colors"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                style={{ perspective: 1000 }}
                transition={{ duration: 0.5, delay: proj.key === "proj1" ? 0 : 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#f783ac] to-[#e599f7] text-white text-xs font-bold px-3 py-1 border border-white/30 rounded-md shadow-sm">
                  {proj.tag}
                </div>
                <h3 className="text-2xl font-bold mt-4 text-gray-800">{projData.title}</h3>
                <p className="text-lg flex-1 text-gray-600">{projData.desc}</p>
                {proj.link !== "#" ? (
                  <Link href={proj.link} className="mt-auto" onClick={handleBtnClick}>
                    <button className="pixel-btn w-full">{proj.status}</button>
                  </Link>
                ) : (
                  <button 
                    className="pixel-btn w-full opacity-55 cursor-not-allowed mt-auto" 
                    disabled
                  >
                    {isInProgress ? "IN PROGRESS..." : "COMPLETED"}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
