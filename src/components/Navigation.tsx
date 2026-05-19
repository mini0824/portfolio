"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";

const GithubLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const navLinks = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "EXPERIENCE", path: "/experience" },
  { name: "SKILLS", path: "/skills" },
  { name: "PROJECTS", path: "/projects" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-gray-200 border-b-4 border-gray-800 p-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* 左側：ナビゲーションリンク */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {navLinks.map((link) => {
            const isActive = 
              link.path === "/" 
                ? pathname === "/" 
                : pathname.startsWith(link.path);

            return (
              <Link key={link.name} href={link.path}>
                <button
                  className={`pixel-btn ${isActive ? "pixel-btn-active" : ""}`}
                >
                  {link.name}
                </button>
              </Link>
            );
          })}
        </div>

        {/* 右側：コンタクトアイコン */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/mini0824?tab=repositories" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 text-white border-2 border-gray-800 hover:bg-[#ff6b6b] hover:border-[#ff6b6b] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-1 active:translate-x-1 active:shadow-none">
            <GithubLogo />
          </a>
          <a href="mailto:ryomijyo@gmail.com" className="p-2 bg-gray-800 text-white border-2 border-gray-800 hover:bg-[#4dabf7] hover:border-[#4dabf7] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-1 active:translate-x-1 active:shadow-none">
            <Mail size={24} />
          </a>
        </div>
        
      </div>
    </nav>
  );
}
