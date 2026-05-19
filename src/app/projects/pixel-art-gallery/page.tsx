import Image from "next/image";
import Link from "next/link";

export default function PixelArtGalleryPage() {
  return (
    <main className="min-h-screen p-8 md:p-16 flex flex-col items-center gap-10">
      <Link href="/projects" className="self-start mb-4">
        <button className="pixel-btn">◀ RETURN TO INVENTORY</button>
      </Link>

      <section className="w-full max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest pixel-border p-4 bg-white inline-block">
          Artwork Gallery
        </h1>
      </section>

      <section className="w-full max-w-4xl pixel-box p-6 md:p-10 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-gray-200 relative pixel-border overflow-hidden">
              <Image 
                src="/0432127e4f1785b6.jpg" 
                alt="Ghost Drawing" 
                layout="fill" 
                objectFit="contain" 
                className="bg-white"
              />
            </div>
            <div className="p-4 bg-gray-100 pixel-border border-gray-300">
              <h3 className="text-xl font-bold border-b-2 border-gray-800 inline-block mb-2">Ghost Design</h3>
              <p className="text-sm">
                VR学生プロジェクトのために制作したお化けのキャラクターデザインです。
                実際のプロジェクトでは、このデザインを元に缶バッジも制作されました。
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-gray-200 relative pixel-border overflow-hidden">
              <Image 
                src="/IMG_5492.jpeg" 
                alt="Personal Drawing" 
                layout="fill" 
                objectFit="contain"
                className="bg-white"
              />
            </div>
            <div className="p-4 bg-gray-100 pixel-border border-gray-300">
              <h3 className="text-xl font-bold border-b-2 border-gray-800 inline-block mb-2">Illustration</h3>
              <p className="text-sm">
                趣味で描いているイラストレーション。ピクセルアート以外にも、様々なスタイルで制作を行っています。
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl border-b-4 border-gray-800 inline-block self-start mt-6 uppercase tracking-wider">▶ Message</h2>
        <p className="text-lg leading-relaxed">
          デジタルの世界だけでなく、現実のグッズ（缶バッジなど）として形になるモノづくりにも興味があります。
          自分のデザインが誰かの手に渡り、使われることに喜びを感じます。
        </p>

        <h2 className="text-3xl border-b-4 border-gray-800 inline-block self-start mt-6 uppercase tracking-wider">▶ Tools</h2>
        <ul className="text-lg list-disc ml-6 space-y-2">
          <li><strong>Digital:</strong> Procreate, Photoshop</li>
          <li><strong>Analog:</strong> 各種スケッチ用具</li>
        </ul>
      </section>
    </main>
  );
}
