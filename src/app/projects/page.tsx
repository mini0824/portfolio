import Link from "next/link";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "Jumping game",
      description: "Unityで開発中のアクションゲーム。爽快感のあるジャンプ操作とギミックを実装しています。",
      tag: "Unity / C#",
      link: "#",
      status: "IN PROGRESS"
    },
    {
      title: "VR Hachioji Project",
      description: "Unityを用いた工学院大学八王子キャンパスの精巧な3DCGモデリング。",
      tag: "Unity / C# / 3DCG",
      link: "#",
      status: "COMPLETED"
    },
    {
      title: "Current Portfolio",
      description: "本ポートフォリオサイトの設計・開発。8-bit風デザインとマルチページ構成を採用。",
      tag: "Next.js / Tailwind",
      link: "/",
      status: "VIEW MORE"
    },
    {
      title: "Artwork Gallery",
      description: "趣味で描いている絵のコレクション。VRプロジェクトでのバッジデザインなども含みます。",
      tag: "Art / Design",
      link: "/projects/pixel-art-gallery",
      status: "VIEW MORE"
    }
  ];

  return (
    <div className="p-8 md:p-16 flex flex-col items-center">
      <section className="w-full max-w-4xl pixel-box p-6 md:p-10">
        <h2 className="text-3xl mb-8 border-b-4 border-gray-800 inline-block">▶ INVENTORY (制作物)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <div key={idx} className="pixel-border p-6 bg-gray-100 flex flex-col gap-4 relative">
              <div className="absolute top-0 right-0 bg-gray-800 text-white text-sm font-bold px-3 py-1">
                {proj.tag}
              </div>
              <h3 className="text-2xl font-bold mt-4">{proj.title}</h3>
              <p className="text-lg flex-1 text-gray-700">{proj.description}</p>
              {proj.link !== "#" ? (
                <Link href={proj.link} className="mt-auto">
                  <button className="pixel-btn w-full">{proj.status}</button>
                </Link>
              ) : (
                <button className="pixel-btn w-full opacity-50 cursor-not-allowed">IN PROGRESS...</button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
