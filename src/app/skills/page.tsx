export default function Skills() {
  return (
    <div className="p-8 md:p-16 flex flex-col items-center gap-16">
      <section className="w-full max-w-4xl pixel-box p-6 md:p-10">
        <h2 className="text-3xl mb-10 border-b-4 border-gray-800 inline-block">▶ EQUIPMENT (スキルセット)</h2>
        
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-[#ff6b6b] flex items-center gap-2">
            <span>⚔️</span> Computer Science & Development
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-300 p-5 bg-white shadow-sm hover:border-[#ff6b6b] transition-colors">
              <h4 className="font-bold text-xl border-b-2 border-gray-200 pb-2 mb-3">CS Basics</h4>
              <p className="font-bold text-lg">Java / C言語 / MATLAB</p>
              <p className="text-base mt-2 text-gray-600">大学の講義・演習を通じ、データ構造やアルゴリズムの基礎として習得。</p>
            </div>
            <div className="border-2 border-gray-300 p-5 bg-white shadow-sm hover:border-[#ff6b6b] transition-colors">
              <h4 className="font-bold text-xl border-b-2 border-gray-200 pb-2 mb-3">Game & VR</h4>
              <p className="font-bold text-lg">C# / Unity</p>
              <p className="text-base mt-2 text-gray-600">VRプロジェクトやゲーム開発のメインスキル。物理ベースの挙動やUIシステムを実装可能。</p>
            </div>
            <div className="border-2 border-gray-300 p-5 bg-white shadow-sm hover:border-[#ff6b6b] transition-colors">
              <h4 className="font-bold text-xl border-b-2 border-gray-200 pb-2 mb-3">Scripting</h4>
              <p className="font-bold text-lg">Python</p>
              <p className="text-base mt-2 text-gray-600">データ処理や自動化スクリプトに使用。</p>
            </div>
            <div className="border-2 border-gray-300 p-5 bg-white shadow-sm hover:border-[#ff6b6b] transition-colors">
              <h4 className="font-bold text-xl border-b-2 border-gray-200 pb-2 mb-3">Web</h4>
              <p className="font-bold text-lg">TypeScript / React / Next.js</p>
              <p className="text-base mt-2 text-gray-600">本ポートフォリオサイトの構築などに活用。</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6 text-[#4dabf7] flex items-center gap-2">
            <span>🌍</span> Global Communication
          </h3>
          <div className="space-y-6 bg-gray-100 p-6 pixel-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-dotted border-gray-300 pb-4">
              <span className="text-xl font-bold md:w-40 mb-2 md:mb-0">日本語</span>
              <span className="flex-1 text-lg font-bold text-gray-700">Native (JLPT N1)</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-dotted border-gray-300 pb-4">
              <span className="text-xl font-bold md:w-40 mb-2 md:mb-0">中国語</span>
              <span className="flex-1 text-lg font-bold text-gray-700">Native (HSK 6級 268点)</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-2">
              <span className="text-xl font-bold md:w-40 mb-2 md:mb-0">英語</span>
              <span className="flex-1 text-lg font-bold text-gray-700">Business (IELTS 7.0 / TOEIC 925点)</span>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
