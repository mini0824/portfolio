# Meiru Liang - Trilingual Retro & Interactive Portfolio Website

A retro 8-bit themed, highly interactive, and trilingual (Japanese, English, Chinese) portfolio website built with Next.js and React.

##  Live Website

The portfolio is deployed and hosted on Cloudflare Workers.
*   **Live URL**: [https://portfolio.onemijyo.workers.dev/](https://portfolio.onemijyo.workers.dev/)

---

##  Concept & Core Features

Designed to be more than a static resume, this website offers an engaging game-like experience to showcase technical depth and trilingual communication skills.

1.  **Interactive Synthesizer Sound Effects (Web Audio API)**
    *   No external audio files (e.g., mp3 or wav) are loaded. Sound waves are synthesized dynamically on the client side using JavaScript.
    *   Clicking floating pixel-art feathers plays crisp, bell-like tones that progress through a melody ("Twinkle Twinkle Little Star") as consecutive notes are clicked.
2.  **Context-Driven Localization (React Context API)**
    *   To reflect my trilingual communication background (Japanese, English, and Chinese), the entire site is fully localized.
    *   Selecting a language dynamically re-renders all text blocks and media assets in real-time, avoiding prop-drilling by managing states via Context.
3.  **Collision-free Layered Visuals (Pointer Event Control)**
    *   Integrates floating animations using Framer Motion and Anime.js.
    *   Feathers float gracefully behind content cards. To keep interactive cards completely clickable while allowing feathers to react to hover and click in the margin, the layout utilizes precise `pointer-events: none` and `pointer-events: auto` controls.
4.  **Secure Message Delivery (Cloudflare Workers API)**
    *   To keep personal email addresses hidden from the client-side code and public Git repositories, contact form submissions are processed through a serverless middleman API built on Cloudflare Workers.

---

##  Technology Stack

### Frontend & Core
*   **Next.js 16 (App Router / Turbopack)**
*   **React 19**
*   **TypeScript (v5)**

### Styling & Typography
*   **Tailwind CSS v4** (Fast, modern utility-first CSS framework)
*   **Vanilla CSS / PostCSS** (Custom 8-bit scanline scan-grids, border designs, and floating CSS animations)
*   **DotGothic16 (Google Fonts)** (Trilingual-compatible retro pixel-art font family)

### Animation & Graphics
*   **Framer Motion (v12)** (Spring transitions, smooth layout expansions)
*   **Anime.js (v3)** (Floating feather physics and pixel-dust particle bursts on click)
*   **Lucide React** (SVG icons)

### Audio
*   **Web Audio API** (OscillatorNode & GainNode retro synthesizer sound design)

### Infrastructure & Serverless API
*   **Cloudflare Workers** (Static hosting & contact form mail relay API)

---

##  Key Architecture & Code Rationale

### 1. [LanguageContext.tsx](src/context/LanguageContext.tsx)
*   **What**: Manages Japanese/English/Chinese language states.
*   **Why**: Managed globally through React Context to eliminate prop-drilling across deep component trees, trigger instant re-renders, and auto-detect preferred browser language configurations on first load.

### 2. [audio.ts](src/utils/audio.ts)
*   **What**: Real-time sound wave synthesis using Web Audio API.
*   **Why**: Loading large audio assets slows page speeds. Dynamic synthesis removes heavy file loads entirely, offering lightweight performance while enabling real-time JS control over pitch, scale frequency, and harmonic resonance (stacking an octave double-sine wave).

### 3. [PixelFeathers.tsx](src/components/PixelFeathers.tsx)
*   **What**: Controls background feather positioning, hover-to-stop physics, and click bursts.
*   **Why**: Employs `requestAnimationFrame` for optimal rendering cycles rather than heavy CSS transitions. Combined with `pointer-events` rules, it establishes visual depth while keeping page components completely responsive.

---

##  Setup & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Dev Server (localhost:3000)
```bash
npm run dev
```

### 3. Build Production Bundle
```bash
npm run build
```
