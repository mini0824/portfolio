"use client";

/**
 * @file audio.ts
 * @description Web Audio API を使用して、アセットファイル不要で動的に8-bit風効果音を合成・再生するユーティリティです。
 * 
 * [What]
 * ナビゲーションや外部リンクなどのボタンクリック音、および画面上を漂う羽をクリックした際のオルゴール音階メロディー（きらきら星）を再生します。
 * 
 * [Why - Web Audio API による動的波形合成の採用理由]
 * 1. 音声ファイル（mp3, wav等）のロードが一切発生しないため、サイトの初期通信量（アセットサイズ）を削減し、初期ページの読み込み時間を大幅に高速化するため。
 * 2. 音色やピッチ（周波数）、ディケイ（減衰時間）を JavaScript からミリ秒単位で完全に動的制御でき、インタラクティブで心地よいフィードバック（倍音の重ね合わせやアルペジオチャイムなど）を簡単に調整可能なため。
 * 3. ブラウザのセキュリティ制約（ユーザー操作なしでの自動再生ブロック）を考慮し、クリックのインタラクション発火時に AudioContext を動的にレジューム・初期化するシングルトン構成とすることで再生エラーを回避するため。
 */

let audioCtx: AudioContext | null = null;
let featherNoteIndex = 0;

/**
 * AudioContextをシングルトンパターンで初期化・取得
 * @returns {AudioContext} アクティブなAudioContextインスタンス
 */
const getAudioContext = (): AudioContext => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

// きらめくオルゴール風「きらきら星」メロディーの周波数定義 (C5〜A5)
const twinkleMelody = [
  523.25, 523.25, 783.99, 783.99, 880.00, 880.00, 783.99, // ドドソソララソ
  698.46, 698.46, 659.25, 659.25, 587.33, 587.33, 523.25, // ファファミミレレド
  783.99, 783.99, 698.46, 698.46, 659.25, 659.25, 587.33, // ソソファファミミレ
  783.99, 783.99, 698.46, 698.46, 659.25, 659.25, 587.33, // ソソファファミミレ
  523.25, 523.25, 783.99, 783.99, 880.00, 880.00, 783.99, // ドドソソララソ
  698.46, 698.46, 659.25, 659.25, 587.33, 587.33, 523.25  // ファファミミレレド
];

/**
 * ボタンの種類に応じたクリック効果音を再生
 * @param {("nav" | "lang" | "link" | "action")} type 効果音の種類
 */
export const playButtonSound = (type: "nav" | "lang" | "link" | "action" = "nav") => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === "nav") {
      // ナビゲーションバーボタン: 軽快で澄んだ「ティン」 (1100Hzの短いサイン波)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1100, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
      
    } else if (type === "lang") {
      // 言語変更ボタン (JA, EN, ZH): 跳ねる「コロッ」というかわいい2連音
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.setValueAtTime(1100, now + 0.04);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);

    } else if (type === "link") {
      // 外部リンクボタン: スライドする「ポワーン」 (600Hz→950Hzへ上昇するサイン波)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.12);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);

    } else if (type === "action") {
      // START GAME および VIEW MORE ボタン: 幻想的なアルペジオチャイム音「シャラーン」
      const freqs = [523.25, 659.25, 783.99, 987.77]; // C5 - E5 - G5 - B5 (Cmaj7)
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const timeDelay = idx * 0.04;
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + timeDelay);
        gain.gain.setValueAtTime(0, now + timeDelay);
        gain.gain.linearRampToValueAtTime(0.03, now + timeDelay + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeDelay + 0.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + timeDelay);
        osc.stop(now + timeDelay + 0.22);
      });
    }
  } catch (e) {
    console.warn("Audio playback failed or blocked", e);
  }
};

/**
 * 羽根クリック用効果音
 * クリックするたび「きらきら星」のオルゴールメロディーを順に進めて演奏します。
 * 主音と1オクターブ上の倍音を重ねることで、澄んだキラキラ感を演出します。
 * @param {number} size 羽根のサイズ (必要に応じてピッチ調整に利用可能)
 */
export const playFeatherSound = (size: number) => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // 現在の音階周波数を取得
    const baseFreq = twinkleMelody[featherNoteIndex];
    // 次回クリックに向けてインデックスを進行
    featherNoteIndex = (featherNoteIndex + 1) % twinkleMelody.length;

    // 1. 主音 (サイン波)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(baseFreq, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.06, now + 0.005);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35); // 0.35秒の残響
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.4);

    // 2. 高音の倍音 (オクターブ上の澄んだキラキラ感)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(baseFreq * 2, now);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.02, now + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.3);

  } catch (e) {
    console.warn("Audio playback failed or blocked", e);
  }
};
