"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { playButtonSound } from "@/utils/audio";

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleBtnClick = (type: "nav" | "link" | "action" | "lang") => {
    playButtonSound(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");
    handleBtnClick("action");

    const workersUrl = process.env.NEXT_PUBLIC_WORKERS_URL;

    // 環境変数が設定されていない場合は開発用のデモ成功モードとして動作
    if (!workersUrl) {
      console.warn("NEXT_PUBLIC_WORKERS_URL is not defined. Simulating API request...");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      return;
    }

    try {
      const response = await fetch(workersUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setStatus("error");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden pointer-events-none min-h-[calc(100vh-140px)] z-30">
      
      {/* 問い合わせフォームカード */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="pixel-box p-8 max-w-lg w-full text-left pointer-events-auto"
      >
        <h2 className="text-2xl border-b-2 border-purple-300/50 text-gray-800 inline-block mb-6 font-bold font-pixel tracking-wider">
          {t.contact.title}
        </h2>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8 flex flex-col items-center gap-6"
            >
              <div className="text-xl font-bold text-green-600 bg-green-50 border border-green-200 rounded-lg px-6 py-4 shadow-sm w-full font-pixel">
                {t.contact.success}
              </div>
              <Link href="/" onClick={() => handleBtnClick("nav")}>
                <button className="pixel-btn px-6 py-3 text-sm">
                  {t.contact.back}
                </button>
              </Link>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
              
              {/* 名前 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-purple-700 font-pixel">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2 border border-purple-300/30 rounded-lg bg-white/40 backdrop-blur-sm text-gray-800 placeholder-gray-400 font-bold focus:outline-none focus:border-[#e599f7] focus:ring-1 focus:ring-[#e599f7] transition-all"
                />
              </div>

              {/* メールアドレス */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-purple-700 font-pixel">
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2 border border-purple-300/30 rounded-lg bg-white/40 backdrop-blur-sm text-gray-800 placeholder-gray-400 font-bold focus:outline-none focus:border-[#e599f7] focus:ring-1 focus:ring-[#e599f7] transition-all"
                />
              </div>

              {/* メッセージ */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-purple-700 font-pixel">
                  {t.contact.message}
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2 border border-purple-300/30 rounded-lg bg-white/40 backdrop-blur-sm text-gray-800 placeholder-gray-400 font-bold focus:outline-none focus:border-[#e599f7] focus:ring-1 focus:ring-[#e599f7] resize-none transition-all"
                />
              </div>

              {/* エラーメッセージ */}
              {status === "error" && (
                <div className="text-xs font-bold text-red-500 bg-red-50 border border-red-200 rounded-lg p-3 font-pixel">
                  {t.contact.error}
                </div>
              )}

              {/* 操作ボタン */}
              <div className="flex items-center justify-between pt-2">
                <Link href="/" onClick={() => handleBtnClick("nav")}>
                  <span className="text-sm text-purple-600 hover:text-purple-800 font-bold font-pixel cursor-pointer border-b border-purple-300/40">
                    {t.contact.back}
                  </span>
                </Link>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="pixel-btn px-6 py-3 text-sm disabled:opacity-50"
                >
                  {status === "submitting" ? t.contact.sending : t.contact.send}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
