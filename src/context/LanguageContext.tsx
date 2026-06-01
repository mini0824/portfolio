"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "ja" | "en" | "zh";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("ja");

  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang") as Language;
    if (savedLang && ["ja", "en", "zh"].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      // ブラウザ言語からの自動判別
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("zh")) {
        setLanguageState("zh");
      } else if (browserLang.startsWith("en")) {
        setLanguageState("en");
      } else {
        setLanguageState("ja"); // デフォルトは日本語
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
