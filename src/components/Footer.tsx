import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t-4 border-gray-800 p-8 mt-auto bg-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4">
        <h3 className="text-2xl font-bold tracking-[0.2em] border-b-4 border-gray-800 inline-block px-4 pb-1 mb-2 uppercase">Contact Info</h3>
        <div className="flex gap-6 mt-2">
          <a href="https://github.com/mini0824?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#ff6b6b] transition-colors">
            <span className="text-lg font-bold">GitHub</span>
          </a>
          <a href="mailto:ryomijyo@gmail.com" className="flex items-center gap-2 hover:text-[#ff6b6b] transition-colors">
            <Mail size={24} />
            <span className="text-lg">ryomijyo@gmail.com</span>
          </a>
        </div>
        <p className="text-sm mt-4 text-gray-600">© 2026 Meiru Liang. All rights reserved.</p>
      </div>
    </footer>
  );
}
