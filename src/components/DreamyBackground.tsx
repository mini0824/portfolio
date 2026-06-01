"use client";

import { motion } from "framer-motion";

export default function DreamyBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-10]">
      {/* 幻想的な三日月の雲海背景画像 */}
      {/* ごく低速のスケール・位置アニメーションで、雲海がゆっくりと漂う立体感を演出 */}
      <motion.div
        className="absolute inset-[-20px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background_dream.jpg')" }}
        animate={{
          scale: [1, 1.04, 1],
          x: [-5, 5, -5],
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 30, // 30秒かけて1ループする非常にゆっくりとした動き
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
