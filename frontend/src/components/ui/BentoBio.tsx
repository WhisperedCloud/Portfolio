'use client';

import { motion } from 'framer-motion';
import { MapPin, Code2, Cpu, Rocket, Terminal } from 'lucide-react';

const technologies = [
  "Python", "JavaScript", "TypeScript", "React.js", "Next.js", "Angular", 
  "Node.js", "Express.js", "PostgreSQL", "MongoDB", "MySQL", "Supabase",
  "OpenAI API", "Gemini API", "LLMs", "Docker", "AWS", "Git"
];

const TargetingReticles = () => (
  <div className="absolute inset-4 opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none flex flex-col justify-between z-0">
    <div className="flex justify-between">
      <div className="w-4 h-4 border-t-2 border-l-2 border-current" />
      <div className="w-4 h-4 border-t-2 border-r-2 border-current" />
    </div>
    <div className="flex justify-between">
      <div className="w-4 h-4 border-b-2 border-l-2 border-current" />
      <div className="w-4 h-4 border-b-2 border-r-2 border-current" />
    </div>
  </div>
);

export default function BentoBio() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 w-full max-w-[2000px] mx-auto bg-white border-b-2 border-black">
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-black pb-8">
        <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase font-(family-name:--font-playfair) m-0 leading-[0.8]">
          The<br/>Architect.
        </h2>
        <div className="flex items-center gap-4 mt-8 md:mt-0">
            <div className="w-16 h-1 bg-red-600" />
            <p className="text-black text-xs font-bold tracking-[0.4em] uppercase">Origin Story</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t-2 border-l-2 border-black">
        
        {/* Main Bio - Spans 2 cols, 2 rows */}
        <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="md:col-span-2 md:row-span-2 p-8 bg-white border-r-2 border-b-2 border-black relative overflow-hidden group hover:bg-black hover:text-white transition-colors duration-500"
        >
            <TargetingReticles />
            {/* Dot Grid Reveal on Hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-0" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8 font-(family-name:--font-playfair) group-hover:text-white">Engineering Intelligence</h3>
            <p className="text-sm leading-relaxed mb-6 font-medium tracking-wide uppercase text-justify text-black group-hover:text-white transition-colors">
                <span className="text-5xl font-black float-left mr-3 -mt-2.5 font-(family-name:--font-playfair) text-red-600">I</span>
                am a Computer Science and Engineering graduate specializing in Artificial Intelligence and Machine Learning. Over the past few years, I have worked on full-stack web applications, AI-powered SaaS products, conversational AI systems, recruitment platforms, and analytics solutions.
            </p>
            <p className="text-sm leading-relaxed font-medium tracking-wide uppercase text-justify text-black group-hover:text-white transition-colors">
                I enjoy transforming innovative ideas into scalable, user-friendly, and production-ready applications, bridging the gap between cutting-edge AI and intuitive frontend design.
            </p>
            </div>
        </motion.div>

        {/* Location - 1 col, 1 row */}
        <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 p-8 bg-[#f4f4f4] border-r-2 border-b-2 border-black flex flex-col justify-between relative overflow-hidden group hover:bg-red-600 transition-colors"
        >
            <TargetingReticles />
            {/* Radar Wave Background on Hover */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square rounded-full border border-white/20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square rounded-full border border-white/10 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out z-0 delay-100" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="relative w-max">
                <div className="absolute inset-0 bg-current rounded-full animate-ping opacity-20" />
                <MapPin className="text-black group-hover:text-white transition-colors relative z-10 group-hover:animate-bounce" size={32} strokeWidth={2} />
            </div>
            <div className="mt-12">
                <p className="text-[10px] font-bold tracking-[0.3em] text-black group-hover:text-white uppercase mb-2">Base of Operations</p>
                <h4 className="text-2xl font-black text-black group-hover:text-white tracking-tighter uppercase font-(family-name:--font-playfair) leading-none">Chennai, India</h4>
            </div>
            </div>
        </motion.div>

        {/* Current Focus - 1 col, 1 row */}
        <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 md:row-span-1 p-8 bg-black text-white border-r-2 border-b-2 border-black flex flex-col justify-between relative group overflow-hidden"
        >
            <TargetingReticles />
            <div className="relative z-10 h-full flex flex-col justify-between">
            
            <motion.div 
                className="w-max"
                whileHover={{ y: -100, x: 100, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
            >
                <Rocket className="text-red-500" size={32} strokeWidth={2} />
            </motion.div>
            
            <div className="mt-12">
                <p className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase mb-2">Currently</p>
                <h4 className="text-2xl font-black uppercase tracking-tighter leading-none font-(family-name:--font-playfair) group-hover:text-red-500 transition-colors">Building AI Agent Systems</h4>
            </div>
            </div>
        </motion.div>

        {/* Tech Stack Marquee - 2 cols, 1 row */}
        <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 md:row-span-1 p-8 bg-white border-r-2 border-b-2 border-black flex flex-col justify-center overflow-hidden relative"
        >
            <p className="text-[10px] font-bold tracking-[0.3em] text-black uppercase mb-8">Core Technologies</p>
            
            <div className="flex w-max">
                <motion.div 
                    animate={{ x: [0, -1035] }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="flex gap-4 items-center"
                >
                    {[...technologies, ...technologies].map((tech, i) => (
                        <span key={i} className="px-6 py-3 border-2 border-black text-black text-xs font-bold tracking-widest uppercase whitespace-nowrap hover:bg-black hover:text-white transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </motion.div>
            </div>
        </motion.div>

      </div>
    </section>
  );
}
