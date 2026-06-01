"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { playFeatherSound } from "@/utils/audio";

interface Feather {
  id: number;
  x: number; 
  y: number; 
  baseY: number; // 基準Y座標
  size: number;
  phase: number;
  swingSpeed: number;
  swingRange: number;
  type: number;
  isHovered?: boolean;
  age: number; // フェードイン制御用
  fadeInDuration: number;
}

interface Trail {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  life: number;
}

interface Burst {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

// タイプ0: 細長い羽根
const PixelFeather1 = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    <path d="M12 4h2v2h-2V4zm-2 2h2v2h-2V6zm-2 2h2v2H8V8zm-2 2h2v2H6v-2zm-2 2h2v2H4v-2zm-2 2h2v2H2v-2z" fill="#ccd1d9" />
    <path d="M14 2h4v2h-4V2zm2 2h4v2h-4V4zm2 2h4v2h-4V6zm-6 2h6v2h-6V8zm-6 2h6v2H8v-2zm-6 2h6v2H2v-2z" fill="#ffffff" />
    <path d="M10 4h2v2h-2V4zm-2 2h2v2H8V6zm-2 2h2v2H6V8zm-2 2h2v2H4v-2zm-2 2h2v2H2v-2z" fill="#e6e9ed" />
  </svg>
);

// タイプ1: ふっくらした羽根
const PixelFeather2 = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    <path d="M12 4h1v16h-1V4z" fill="#ccd1d9" />
    <path d="M8 6h4v12H8V6zm5 2h3v8h-3V8z" fill="#ffffff" />
    <path d="M9 8h3v8H9V8z" fill="#e6e9ed" />
    <path d="M6 10h2v4H6v-4zm10 2h2v2h-2v-2z" fill="#ffffff" />
  </svg>
);

// タイプ2: 小さく丸い羽根
const PixelFeather3 = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
    <path d="M10 6h4v2h-4V6zm-2 2h8v8H8V8zm2 8h4v2h-4v-2z" fill="#ffffff" />
    <path d="M9 10h6v4H9v-4z" fill="#e6e9ed" />
    <path d="M11 12h2v6h-2v-6z" fill="#ccd1d9" />
  </svg>
);

const renderFeather = (type: number) => {
  switch (type) {
    case 1: return <PixelFeather2 />;
    case 2: return <PixelFeather3 />;
    default: return <PixelFeather1 />;
  }
};

export default function PixelFeathers() {
  const { language } = useLanguage();
  const t = translations[language];
  const [feathers, setFeathers] = useState<Feather[]>([]);
  const feathersRef = useRef<Feather[]>([]);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [mounted, setMounted] = useState(false);
  const requestRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // feathersの最新状態を常にrefに保持し、ループ内のクロージャ問題を解消
  useEffect(() => {
    feathersRef.current = feathers;
  }, [feathers]);

  // 左右に多め（計90%の確率）、中央に極小（10%の確率）でX座標を生成
  const getRandomX = () => {
    const rand = Math.random();
    if (rand < 0.45) {
      return 2 + Math.random() * 26; // 左側 (2% 〜 28%)
    } else if (rand < 0.90) {
      return 72 + Math.random() * 26; // 右側 (72% 〜 98%)
    } else {
      return 28 + Math.random() * 44; // 中央 (28% 〜 72%)
    }
  };

  // 新しい羽のオブジェクトを生成するヘルパー関数 (クリックされるまで永続滞在)
  const createNewFeather = (id: number, useRandomAge: boolean = false): Feather => {
    const fadeInDuration = 90; // 約1.5秒かけてフェードイン
    
    // 初期生成時は、ロード直後から表示されている羽を増やすため、一部はフェードイン完了状態にする
    const age = useRandomAge ? Math.floor(Math.random() * (fadeInDuration + 1)) : 0;
    const baseY = 5 + Math.random() * 90; // 画面全体 (5% 〜 95%)

    return {
      id,
      x: getRandomX(),
      y: baseY,
      baseY,
      size: 25 + Math.random() * 30, // 25px〜55px
      phase: Math.random() * Math.PI * 2,
      swingSpeed: 0.1 + Math.random() * 0.2, // 揺れスピード
      swingRange: 0.5 + Math.random() * 0.8, // 揺れ幅
      type: Math.floor(Math.random() * 3),
      isHovered: false,
      age,
      fadeInDuration,
    };
  };

  // 初期羽の生成
  useEffect(() => {
    setMounted(true);
    const initialFeathers: Feather[] = [];
    const count = 30; // 羽の数を30に維持
    for (let i = 0; i < count; i++) {
      initialFeathers.push(createNewFeather(i, true));
    }
    setFeathers(initialFeathers);
  }, []);

  const handleFeatherClick = (feather: Feather) => {
    playFeatherSound(feather.size);

    // バースト座標
    const startX = (getFeatherX(feather) / 100) * window.innerWidth;
    const startY = (feather.y / 100) * window.innerHeight;

    const pCount = 14;
    const newBursts: Burst[] = [];
    const colors = ["#ffdeeb", "#e599f7", "#ffffff", "#ffd8a8", "#a5d8ff"];

    for (let i = 0; i < pCount; i++) {
      const angle = (i / pCount) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 1.5 + Math.random() * 3;
      newBursts.push({
        id: Date.now() + i + Math.random(),
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.floor(Math.random() * 4),
        life: 1.0,
      });
    }

    setBursts((prev) => [...prev, ...newBursts]);

    // クリックされた羽を別の場所に再生成 (常に総数30をキープ)
    setFeathers((prev) =>
      prev.map((f) => {
        if (f.id === feather.id) {
          return createNewFeather(Date.now() + Math.random(), false);
        }
        return f;
      })
    );
  };

  const setFeatherHover = (id: number, isHovered: boolean) => {
    setFeathers((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          return { ...f, isHovered };
        }
        return f;
      })
    );
  };

  // 揺れを含めたX座標計算 (ホバー時は揺れを完全に停止)
  const getFeatherX = (f: Feather) => {
    const time = timeRef.current;
    const currentSwing = f.isHovered ? 0 : f.swingRange;
    return f.x + Math.sin(time * 0.02 * f.swingSpeed + f.phase) * currentSwing;
  };

  // 不透明度の計算ヘルパー (出現時フェードインのみ)
  const getFeatherOpacity = (f: Feather) => {
    if (f.age < f.fadeInDuration) {
      return f.age / f.fadeInDuration;
    }
    return 1.0;
  };

  // 毎フレームのループ
  useEffect(() => {
    if (!mounted || feathersRef.current.length === 0) return;

    const update = () => {
      timeRef.current += 1;
      const time = timeRef.current;

      // 1. 羽の更新 (ホバー中は完全に停止させる)
      setFeathers((prev) =>
        prev.map((f) => {
          if (f.isHovered) return f;

          // ageはフェードインが完了（fadeInDuration）するまで進める
          const nextAge = f.age < f.fadeInDuration ? f.age + 1 : f.age;

          // サイン波による上下の漂い（落下せずその場にとどまる）
          const nextY = f.baseY + Math.sin(time * 0.02 + f.phase) * 1.5;

          return { 
            ...f, 
            age: nextAge,
            y: nextY 
          };
        })
      );

      // 2. 軌跡の追加・更新
      if (time % 14 === 0) {
        const trailColors = ["#ffffff", "#ffdeeb", "#e599f7", "#fff9db", "#e8f7ff"];
        setTrails((prev) => {
          const newTrails = feathersRef.current
            .filter((f) => getFeatherOpacity(f) > 0.15) // 出現し始めの時は軌跡を出さない
            .map((f) => {
              const fx = (getFeatherX(f) / 100) * window.innerWidth + f.size / 2;
              const fy = (f.y / 100) * window.innerHeight + f.size / 2;
              const currentSize = f.isHovered ? 4 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 3);
              return {
                id: Math.random() + time,
                x: fx,
                y: fy,
                color: trailColors[Math.floor(Math.random() * trailColors.length)],
                size: currentSize,
                life: 1.0,
              };
            });
          return [...prev, ...newTrails]
            .map((t) => ({ ...t, life: t.life - 0.015, y: t.y + 0.12 }))
            .filter((t) => t.life > 0);
        });
      } else {
        setTrails((prev) =>
          prev
            .map((t) => ({ ...t, life: t.life - 0.015, y: t.y + 0.12 }))
            .filter((t) => t.life > 0)
        );
      }

      // 3. バースト
      setBursts((prev) =>
        prev
          .map((b) => ({
            ...b,
            x: b.x + b.vx,
            y: b.y + b.vy,
            vy: b.vy + 0.1,
            vx: b.vx * 0.96,
            life: b.life - 0.025,
          }))
          .filter((b) => b.life > 0)
      );

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
      {/* 1. 羽根の軌跡 */}
      {trails.map((t) => (
        <div
          key={t.id}
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            width: `${t.size}px`,
            height: `${t.size}px`,
            backgroundColor: t.color,
            opacity: t.life,
            boxShadow: `0 0 5px 1px ${t.color}`,
          }}
        />
      ))}

      {/* 2. 羽根本体 */}
      {feathers.map((f) => {
        const currentX = getFeatherX(f);
        // ホバー時は回転揺れを抑えて安定させる
        const rot = f.isHovered ? 0 : Math.sin(timeRef.current * 0.02 * f.swingSpeed + f.phase) * 12;
        const opacity = getFeatherOpacity(f);

        const triggerAction = (e: React.SyntheticEvent) => {
          e.preventDefault();
          handleFeatherClick(f);
        };

        // 当たり判定を広げるためのパディング（ピクセル単位）- 35pxに超拡張
        const padding = 35;
        const totalSize = f.size + padding * 2;

        return (
          <div
            key={f.id}
            className="absolute cursor-pointer pointer-events-auto select-none group flex items-center justify-center animate-feather-in"
            style={{
              // 外側のラッパーの位置。中心を合わせるために padding 分だけマイナス調整
              left: `calc(${currentX}% - ${padding}px)`,
              top: `calc(${f.y}% - ${padding}px)`,
              width: `${totalSize}px`,
              height: `${totalSize}px`,
              opacity: opacity, // JS側ライフサイクル制御の不透明度をインライン適用
            }}
            onClick={triggerAction}
            onTouchStart={triggerAction}
            onMouseEnter={() => setFeatherHover(f.id, true)}
            onMouseLeave={() => setFeatherHover(f.id, false)}
          >
            {/* 実際に表示され、ホバー時に瞬時に反応する羽のグラフィック本体 */}
            <div
              className="transition-all duration-150 ease-out transform group-hover:scale-130 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]"
              style={{
                width: `${f.size}px`,
                height: `${f.size}px`,
                transform: `rotate(${rot}deg)`,
              }}
            >
              <div className="w-full h-full">
                {renderFeather(f.type)}
              </div>
            </div>
          </div>
        );
      })}

      {/* 3. クリック時のバースト */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            backgroundColor: b.color,
            opacity: b.life,
            boxShadow: `0 0 5px 2px ${b.color}`,
          }}
        />
      ))}

      {/* 4. 羽根のクリック案内テキスト */}
      <div className="fixed bottom-4 right-4 text-[10px] md:text-xs text-white/45 pointer-events-none font-pixel tracking-widest select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] z-20">
        {t.feathers.hint}
      </div>
    </div>
  );
}
