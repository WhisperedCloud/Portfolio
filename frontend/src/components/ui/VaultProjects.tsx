'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import TextScramble from './TextScramble';

const projects = [
    {
        category: "AI PLATFORM",
        title: "AI Job Portal",
        desc: "An AI-powered recruitment platform featuring role-based authentication and intelligent matching.",
        tags: ["TYPESCRIPT", "POSTGRESQL", "SUPABASE", "OPENAI"],
        link: "https://github.com/WhisperedCloud/Job_portal.git",
        year: "2024"
    },
    {
        category: "CONVERSATIONAL AI",
        title: "AI Chatbot",
        desc: "Context-aware conversational AI system with persistent memory capabilities.",
        tags: ["PYTHON", "STREAMLIT", "OPENAI"],
        link: "https://github.com/WhisperedCloud/AI-chatbot.git",
        year: "2024"
    },
    {
        category: "AI / NLP",
        title: "Aura AI",
        desc: "Real-time sentiment analysis platform classifying text via NLP.",
        tags: ["PYTHON", "STREAMLIT", "NLP", "LLM"],
        link: "https://github.com/WhisperedCloud/Aura-AI.git",
        year: "2024"
    },
    {
        category: "WEB APP",
        title: "Recipe Sharing",
        desc: "Multi-user platform allowing users to securely manage and search recipes.",
        tags: ["REACT.JS", "NODE.JS", "POSTGRESQL"],
        link: "https://github.com/WhisperedCloud/Recipe-sharing-Platform.git",
        year: "2023"
    },
    {
        category: "PRODUCTIVITY",
        title: "Finance Tracker",
        desc: "Interactive analytics dashboards for expense monitoring.",
        tags: ["ANGULAR", "TYPESCRIPT", "CHART.JS"],
        link: "https://github.com/WhisperedCloud/Finance-Tracker.git",
        year: "2023"
    },
    {
        category: "PRODUCTIVITY",
        title: "Resume Toolkit",
        desc: "ATS-friendly resume generation using AI APIs.",
        tags: ["ANGULAR", "TYPESCRIPT", "GEMINI API"],
        link: "https://github.com/WhisperedCloud/Resume_Toolkit.git",
        year: "2023"
    }
];

export default function VaultProjects() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section id="projects" className="w-full bg-[#f4f4f4] border-b-2 border-black font-sans py-32 px-6 md:px-12">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-8 mb-16 max-w-[2000px] mx-auto">
                <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase font-[family-name:var(--font-playfair)] m-0 leading-[0.8]">
                    The<br/>Archive.
                </h2>
                
                {/* Stats */}
                <div className="flex gap-8 mt-12 md:mt-0 text-right">
                    <div className="flex flex-col items-end border-r-2 border-black pr-8">
                        <h3 className="text-5xl font-black text-black tracking-tighter font-[family-name:var(--font-playfair)]">06</h3>
                        <p className="text-[9px] font-bold tracking-[0.2em] text-black uppercase mt-1">Total</p>
                    </div>
                    <div className="flex flex-col items-end border-r-2 border-black pr-8">
                        <h3 className="text-5xl font-black text-black tracking-tighter font-[family-name:var(--font-playfair)]">05</h3>
                        <p className="text-[9px] font-bold tracking-[0.2em] text-black uppercase mt-1">AI Powered</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <h3 className="text-5xl font-black text-black tracking-tighter font-[family-name:var(--font-playfair)]">03</h3>
                        <p className="text-[9px] font-bold tracking-[0.2em] text-black uppercase mt-1">Full Stack</p>
                    </div>
                </div>
            </div>

            {/* Brutalist Project List */}
            <div className="max-w-[2000px] mx-auto flex flex-col border-t-2 border-l-2 border-r-2 border-black">
                {projects.map((project, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-8 border-b-2 border-black bg-white hover:bg-black transition-colors cursor-pointer overflow-hidden"
                    >
                        {/* Left Side */}
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16 w-full md:w-auto">
                            <span className="text-black group-hover:text-white text-xl font-bold font-mono w-16">
                                {(idx + 1).toString().padStart(2, '0')}
                            </span>
                            <div>
                                <h3 className="text-3xl md:text-5xl font-black text-black group-hover:text-white tracking-tighter uppercase font-[family-name:var(--font-playfair)] mb-2 group-hover:translate-x-4 transition-transform">
                                    <TextScramble text={project.title} trigger={hoveredIdx === idx} />
                                </h3>
                                <p className="text-black group-hover:text-red-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                                    {project.category}
                                </p>
                            </div>
                        </div>

                        {/* Middle JSON Data */}
                        <div className="hidden lg:flex flex-1 justify-center items-center px-4 opacity-0 group-hover:opacity-80 transition-opacity duration-300 overflow-hidden pointer-events-none">
                            <div className="text-green-400 font-mono text-[9px] xl:text-[10px] border-l-2 border-green-500/40 pl-4 whitespace-pre">
                                {`{\n  "id": "PRJ-${(idx + 1).toString().padStart(3, '0')}",\n  "status": "DEPLOYED",\n  "uptime": "99.99%",\n  "latency": "${Math.floor(Math.random() * 30 + 10)}ms"\n}`}
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 mt-8 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                            <div className="flex flex-wrap gap-2 max-w-[250px]">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 border border-black group-hover:border-white/30 text-black group-hover:text-white/70 text-[8px] font-bold tracking-widest uppercase">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <span className="text-black group-hover:text-white text-lg font-bold font-[family-name:var(--font-playfair)]">
                                    {project.year}
                                </span>
                                <a 
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 flex items-center justify-center border-2 border-black group-hover:border-white rounded-full group-hover:bg-white transition-colors"
                                >
                                    <ExternalLink size={20} className="text-black group-hover:text-black" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="w-full flex justify-center mt-16">
                <button className="px-12 py-6 bg-transparent border-2 border-black text-black text-xs font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-colors">
                    Load More Projects
                </button>
            </div>

        </section>
    );
}
