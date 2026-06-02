"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "ja" | "en" | "zh";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

/**
 * @file LanguageContext.tsx
 * @description ポートフォリオサイト全体の多言語表示（日・英・中）を管理するContextおよびProviderです。
 * 
 * [What] 
 * ユーザーが選択した表示言語（Language）の状態を保持し、サイト全体の表示文字列をリアルタイムに切り替えるための状態と更新関数を提供します。
 * 
 * [Why - Context APIの採用理由]
 * 1. ナビゲーションバー、各種ステータスカード、プロジェクト紹介など、深くネストされたコンポーネント間で言語状態を受け渡す必要があり、Propsドリルダウン（バケツリレー）を完全に回避するため。
 * 2. 言語切り替え時にアプリケーション全体のテキスト表示を即座に再レンダリングし、ユーザー体験を損なわずに多言語表示を追従させるため。
 * 3. クライアントサイドでの状態保持に留め、軽量かつ状態の同期が容易なContext APIが最もシンプルで保守性が高いと判断したため。
 */

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("ja");

  useEffect(() => {
    // ローカルストレージに保存されている言語設定を優先
    const savedLang = localStorage.getItem("portfolio_lang") as Language;
    if (savedLang && ["ja", "en", "zh"].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      // 保存設定がない場合、ブラウザ言語から自動的に最適な初期言語を判別
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

/**
 * useLanguage フック
 * @description LanguageContextに安全にアクセスするためのカスタムフック。
 * プロバイダーの配下以外で呼び出された場合に明示的にエラーを出力します。
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
