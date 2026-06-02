"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * @component PageTransition
 * @description 各ページコンポーネントがマウントされる際のフェードインアニメーションを制御するコンポーネントです。
 * 
 * [What]
 * ページ遷移時に、新しいページのコンテンツ全体が y軸方向に+20px の位置から元の位置に戻りつつ、0.3秒かけて透過度0から1へと変化するフェードイン効果を提供します。
 * 
 * [Why - 設計と制限の理由]
 * 1. ページが切り替わった際の視覚的な引っ掛かり（無機質な切り替え）を和らげ、画面遷移全体を滑らかに体感させるため。
 * 2. Next.js App Router において `template.tsx` 内で `AnimatePresence mode="wait"` を用いると、Next.jsルーターの非同期データフェッチと競合して遷移途中でレンダリングが永久にフリーズする不具合があるため、これを完全に防止する目的で `AnimatePresence` をあえて削除。
 * 3. 遷移時には NowLoading 画面が手前を不透明グラデーションで覆うため、古いページの exit アニメーションはそもそも非表示になり不要。そのため、遷移先の `key={pathname}` の変更契機で発火するシンプルなフェードインのみに絞ることで、バグのない安全で美しい遷移を実現しています。
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex-1 w-full flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
}
