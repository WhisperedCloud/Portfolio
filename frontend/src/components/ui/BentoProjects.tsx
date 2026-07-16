'use client';

import { motion } from 'framer-motion';
import { Mic, Brain, TrendingUp, Database, Search, ExternalLink, Calendar } from 'lucide-react';
import { useState, useRef, MouseEvent } from 'react';

const projects = [
  {
    title: "AI Job Portal",
    tech: "TypeScript / PostgreSQL / Supabase / OpenAI",
    desc: "An AI-powered recruitment platform featuring role-based authentication, job posting, resume uploads, applicant tracking, and intelligent candidate matching.",
    highlights: ["100+ users", "AI Resume Scoring", "85%+ Match Accuracy"],
    icon: <Mic size={150} strokeWidth={1} />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    isLarge: true,
  },
  {
    title: "Leave Flow",
    tech: "React / Node.js / MongoDB",
    desc: "A full-stack leave approval and management system with role-based access control, multi-level workflows, and real-time analytics.",
    highlights: ["RBAC", "Multi-level Approvals", "Dashboard Analytics"],
    icon: <Calendar size={100} strokeWidth={1} />,
    colSpan: "md:col-span-3",
    rowSpan: "md:row-span-1",
    isLarge: false,
  },
  {
    title: "Memory Chatbot",
    tech: "Python / Streamlit / OpenAI",
    desc: "A context-aware conversational AI system with persistent memory capabilities that maintains context across sessions.",
    highlights: ["Session Memory", "30% Less Hallucinations"],
    icon: <Brain size={100} strokeWidth={1} />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    isLarge: false,
  },
  {
    title: "Aura AI",
    tech: "Python / NLP / LLM APIs",
    desc: "A real-time sentiment analysis platform that classifies text using advanced Natural Language Processing.",
    highlights: ["Real-time Inference", "End-to-end Workflow"],
    icon: <TrendingUp size={100} strokeWidth={1} />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    isLarge: false,
  },
  {
    title: "Finance & Toolkit",
    tech: "Angular / TypeScript / Gemini",
    desc: "Two productivity apps: Finance Tracker for visualization, and Resume Toolkit for ATS-friendly resumes.",
    highlights: ["Analytics Dashboards", "ATS Generation"],
    icon: <Database size={120} strokeWidth={1} />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    isLarge: false,
  },
  {
    title: "Recipe Sharing",
    tech: "React.js / Node.js / PostgreSQL",
    desc: "A multi-user platform allowing users to create, manage, search, and share recipes securely.",
    highlights: ["JWT Auth", "Full-text search"],
    icon: <Search size={100} strokeWidth={1} />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    isLarge: false,
  }
  
];

function BentoCard({ project, index }: { project: any, index: number }) {
  const boundingRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -500, y: -500 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!boundingRef.current) return;
    const rect = boundingRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      ref={boundingRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`group relative overflow-hidden rounded-4xl border border-white/5 bg-dark-bg/80 backdrop-blur-md p-8 md:p-10 transition-all duration-500 hover:border-neon-blue/30 ${project.colSpan} ${project.rowSpan} flex flex-col`}
    >
      {/* Mouse Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 240, 168, 0.08), transparent 40%)`,
        }}
      />

      {/* Massive Background Icon */}
      <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none z-0">
        <div className="text-neon-blue">{project.icon}</div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className={`${project.isLarge ? 'text-3xl md:text-5xl' : 'text-2xl'} font-black text-white tracking-widest uppercase mb-2`}>
              {project.title}
            </h3>
            <p className="text-neon-blue text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase max-w-[80%]">
              {project.tech}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-neon-blue group-hover:text-black group-hover:border-neon-blue transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 shrink-0">
            <ExternalLink size={18} />
          </div>
        </div>

        {/* Content */}
        <div className="mt-auto">
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.highlights.map((hl: string, i: number) => (
              <div 
                key={i} 
                className="px-3 py-1.5 rounded-md border border-white/5 bg-white/5 text-[10px] text-gray-300 tracking-wider font-bold uppercase backdrop-blur-sm group-hover:border-neon-blue/20 transition-colors duration-300 flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-neon-blue rounded-full shadow-[0_0_5px_#00f0a8]" />
                {hl}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoProjects() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-px bg-neon-blue" />
          <p className="text-neon-blue text-[10px] font-bold tracking-[0.3em] uppercase">Ecosystem Builds</p>
          <div className="w-8 h-px bg-neon-blue" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Featured Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {projects.map((project, index) => (
          <BentoCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
