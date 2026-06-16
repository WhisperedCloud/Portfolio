'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const technicalBio = "Full Stack & AI Developer crafting modern web applications and AI-driven solutions using React, Node.js, TypeScript, and Generative AI technologies. Turning complex ideas into scalable, user-focused products.";

  const spokenIntro = "Hi, I'm Eswar M, a Full Stack & AI Developer passionate about building scalable web applications and intelligent AI-powered solutions. I specialize in React, Next.js, Node.js, TypeScript, PostgreSQL, and Large Language Models, with experience delivering production-ready products that integrate Generative AI, automation, and modern cloud technologies. From AI recruitment platforms to conversational assistants, I focus on creating impactful, user-centric solutions that combine innovation, performance, and real-world business value.";

  useEffect(() => {
    // Attempt to auto-play speech synthesis on load
    const playIntro = () => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(spokenIntro);
        utterance.onend = () => setIsPlaying(false);
        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
    };

    // Delay slightly to ensure voices are loaded
    const timer = setTimeout(playIntro, 1000);

    return () => {
        clearTimeout(timer);
        window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(spokenIntro);
      utterance.onend = () => setIsPlaying(false);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section ref={containerRef as any} className="relative h-[120vh] w-full flex flex-col justify-center overflow-hidden bg-white border-b-2 border-black">
      
      {/* Background Grid Lines (Harsh) */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      {/* Hero Content */}
      <motion.div 
        style={{ y: textY, scale: textScale }}
        className="relative z-10 flex flex-col w-full px-6 md:px-12 pt-32"
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b-2 border-black pb-8 mb-8">
            <h1 className="text-[12vw] md:text-[8vw] font-black text-black leading-[0.8] tracking-tighter uppercase font-[family-name:var(--font-playfair)] m-0 p-0 mix-blend-multiply">
              <motion.span 
                className="inline-block"
                animate={{ x: mousePosition.x * -30, y: mousePosition.y * -30 }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
              >
                Visionary.
              </motion.span>
            </h1>
            <div className="flex flex-col text-right mt-8 md:mt-0">
                <span className="text-black text-xs font-bold tracking-[0.4em] uppercase mb-2">Role // 01</span>
                <span className="text-2xl md:text-4xl font-bold tracking-tight text-black uppercase">Full Stack & AI Developer</span>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <motion.h2 
                className="text-[10vw] md:text-[7vw] font-black text-black leading-[0.8] tracking-tighter uppercase font-[family-name:var(--font-playfair)] mix-blend-multiply"
                animate={{ x: mousePosition.x * 20, y: mousePosition.y * 20 }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
            >
              Architect.
            </motion.h2>

            <div className="max-w-md border-l-2 border-black pl-6">
                <p className="text-sm md:text-base text-black font-medium leading-relaxed uppercase tracking-widest text-justify">
                    {technicalBio}
                </p>
                <div className="mt-8 flex gap-4">
                    <button 
                        onClick={handleSpeak}
                        className="px-8 py-4 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-red-600 transition-colors flex items-center gap-3"
                    >
                        {isPlaying ? (
                            <>
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                STOP AUDIO
                            </>
                        ) : (
                            <>
                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                LISTEN TO BIO
                            </>
                        )}
                    </button>
                    <a href="#projects" className="px-8 py-4 border-2 border-black text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors">
                        View Archive
                    </a>
                </div>
            </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-[-150px] right-12 flex flex-col items-center gap-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-black uppercase [writing-mode:vertical-lr]">Scroll</span>
            <motion.div 
                animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-0.5 h-32 bg-black" 
            />
        </div>
      </motion.div>

    </section>
  );
}
