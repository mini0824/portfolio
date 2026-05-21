"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export default function PixelParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // クライアントサイドでのみ乱数を生成してパーティクルを作成
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // 横位置 0-100vw
      size: Math.random() * 8 + 4, // サイズ 4-12px
      duration: Math.random() * 10 + 10, // 移動時間 10-20s
      delay: Math.random() * 5, // 遅延 0-5s
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-gray-300 opacity-50"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}vw`,
            bottom: "-20px", // 画面下部から開始
          }}
          animate={{
            y: ["0vh", "-120vh"], // 下から上へ移動
            rotate: [0, 90, 180, 270, 360], // 回転しながら
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
