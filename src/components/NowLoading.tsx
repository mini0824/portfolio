"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * @component NowLoading
 * @description ページ遷移時および初期ロード時に全画面に覆いかぶさる、ゲーム風ローディングスクリーンです。
 * 
 * [What]
 * ページのパス（URL）が変更されたタイミングで自動的に出現し、パステル調の跳ねるブロックアニメーションとともに約1.2秒の待機演出を表示したあと、滑らかにフェードアウトします。
 * 
 * [Why - 設計とタイマー管理の選定理由]
 * 1. ページ遷移時に発生し得るコンテンツレンダリングのタイムラグやちらつきをユーザーに意識させず、ポートフォリオの世界観（8-bitゲーム風クエスト）を補強してブランド表現を高めるため。
 * 2. 状態の更新（isLoadingのトグル）によるエフェクトの再実行とクリーンアップ関数の自動呼び出し（clearTimeout）が競合して無限ロードが起きるのを防ぐため、依存配列を `[pathname]` のみに絞った単一のシンプルな `useEffect` に統合。状態更新時の不要なタイマーキャンセルを100%防ぎ、安定動作を実現するため。
 */
export default function NowLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

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
