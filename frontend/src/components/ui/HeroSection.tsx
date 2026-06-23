'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Typewriter from './Typewriter';
import SystemMetrics from './SystemMetrics';

const Hero3DElement = dynamic(() => import('./Hero3DElement'), { ssr: false });

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

  const spokenIntro = "Hi, I'm Eeshwar M, a Full Stack and AI Developer. I specialize in scalable web applications and intelligent solutions using React, Node.js, and Large Language Models. I focus on creating user-centric products that combine innovation with real-world value.";

  const playIntroVoice = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(spokenIntro);
    
    const voices = window.speechSynthesis.getVoices();
    const humanVoice = voices.find(v => 
      v.name.includes("Google UK English Male") || 
      v.name.includes("Google US English") || 
      v.name.includes("Samantha") || 
      v.name.includes("Daniel") ||
      v.name.includes("Natural") ||
      v.name.includes("Premium")
    ) || voices.find(v => v.lang === 'en-GB') || voices.find(v => v.lang.startsWith('en'));

    if (humanVoice) utterance.voice = humanVoice;
    utterance.rate = 1.20; // Slower rate for better articulation
    utterance.pitch = 0.7; // Lower pitch for deeper bass

    utterance.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Delay slightly to ensure voices are loaded
    const timer = setTimeout(playIntroVoice, 1000);

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
      playIntroVoice();
    }
  };

  return (
    <section ref={containerRef as any} className="relative h-[120vh] w-full flex flex-col justify-center overflow-hidden bg-white border-b-2 border-black">
      
      {/* Background Grid Lines (Harsh) */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      {/* 3D Wireframe Element */}
      <Hero3DElement />

      {/* System Metrics Overlay */}
      <SystemMetrics />

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
                <p className="text-sm md:text-base text-black font-medium leading-relaxed uppercase tracking-widest text-justify min-h-[150px]">
                    <Typewriter text={technicalBio} delay={500} speed={15} />
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
