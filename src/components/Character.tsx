"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Character() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  
  // キャラクターのサイズと移動スピード
  const charSize = 80;
  const speed = 30; // 1回のキー入力で移動するピクセル数

  useEffect(() => {
    // クライアントサイドでのみ表示（ハイドレーションエラー防止）
    setIsClient(true);
    
    // 初期位置を画面の右下に設定
    setPosition({
      x: window.innerWidth - charSize - 40,
      y: window.innerHeight - charSize - 40,
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        switch (e.key) {
          case "ArrowUp":
          case "w":
          case "W":
            newY -= speed;
            break;
          case "ArrowDown":
          case "s":
          case "S":
            newY += speed;
            break;
          case "ArrowLeft":
          case "a":
          case "A":
            newX -= speed;
            break;
          case "ArrowRight":
          case "d":
          case "D":
            newX += speed;
            break;
          default:
            return prev; // 対象のキー以外は何もせず終了
        }

        // 画面外に出ないように制限
        const maxX = window.innerWidth - charSize;
        const maxY = window.innerHeight - charSize;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        return { x: newX, y: newY };
      });
      
      // 注意: e.preventDefault() は呼びません。
      // これにより、矢印キーでの画面スクロールが通常通り機能します。
    };

    window.addEventListener("keydown", handleKeyDown);

    // ウィンドウリサイズ時にも画面外に出ないように調整
    const handleResize = () => {
      setPosition((prev) => {
        const maxX = window.innerWidth - charSize;
        const maxY = window.innerHeight - charSize;
        return {
          x: Math.min(prev.x, maxX),
          y: Math.min(prev.y, maxY),
        };
      });
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${charSize}px`,
        height: `${charSize}px`,
        transition: "left 0.15s ease-out, top 0.15s ease-out", // 滑らかな移動アニメーション
      }}
    >
      <div className="relative w-full h-full rounded-full border-4 border-gray-800 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] bg-white">
        <Image
          src="/profile.jpg"
          alt="My Character"
          fill
          className="object-cover"
        />
      </div>
      {/* キャラクターに影を追加して浮いているように見せる */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-black/20 rounded-[50%] blur-[2px] -z-10"></div>
    </div>
  );
}
