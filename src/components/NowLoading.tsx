"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NowLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // 初回マウント時ロード
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // パス遷移の監視
  useEffect(() => {
    if (pathname !== lastPath) {
      setIsLoading(true);
      setLastPath(pathname);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [pathname, lastPath]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none backdrop-blur-md"
          style={{
            background: "linear-gradient(135deg, rgba(247, 131, 172, 0.85), rgba(229, 153, 247, 0.85), rgba(255, 216, 168, 0.85))",
          }}
        >
          {/* うっすらとしたスキャンライン効果（ロード画面らしさ） */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.04)_50%)] bg-[length:100%_4px] pointer-events-none" />

          <div className="flex flex-col items-center gap-6 z-10">
            {/* 跳ねる3色のパステルピクセルブロック */}
            <div className="flex gap-2">
              <div className="w-5 h-5 bg-[#ff8787] border-2 border-white/60 shadow-[0_2px_10px_rgba(255,135,135,0.4)] animate-bounce [animation-delay:-0.3s]" />
              <div className="w-5 h-5 bg-[#ffd43b] border-2 border-white/60 shadow-[0_2px_10px_rgba(255,212,59,0.4)] animate-bounce [animation-delay:-0.15s]" />
              <div className="w-5 h-5 bg-[#74c0fc] border-2 border-white/60 shadow-[0_2px_10px_rgba(116,192,252,0.4)] animate-bounce" />
            </div>

            {/* 点滅する白半透明のガラス風テキストプレート */}
            <div className="text-gray-800 text-3xl font-bold tracking-widest px-8 py-4 border border-white/30 bg-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] backdrop-blur-md animate-pulse">
              NOW LOADING...
            </div>
            
            {/* サブテキスト */}
            <div className="text-gray-700 text-sm tracking-widest mt-2 uppercase font-bold">
              GENERATING QUEST SCENE
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
