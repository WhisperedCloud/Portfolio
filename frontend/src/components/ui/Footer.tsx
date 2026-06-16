'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-16 px-6 md:px-12">
      <div className="max-w-[2000px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
        
        {/* Left Side: Massive Typography */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase font-[family-name:var(--font-playfair)] mb-4">
                Eswar M.
            </h2>
            <div className="flex flex-col gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-white/50">
                <p>+91 6383517575</p>
                <p>Chennai, India</p>
            </div>
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-8">
                <a href="https://github.com/WhisperedCloud" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase hover:text-red-600 transition-colors">
                    GitHub
                </a>
                <a href="https://linkedin.com/in/m--eswar" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase hover:text-red-600 transition-colors">
                    LinkedIn
                </a>
            </div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mt-4 md:mt-0">
                © {new Date().getFullYear()} All Rights Reserved.
            </p>
        </div>

      </div>
    </footer>
  );
}
