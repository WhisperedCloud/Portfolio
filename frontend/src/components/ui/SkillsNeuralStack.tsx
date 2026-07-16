'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import TextScramble from './TextScramble';
import { Database, Server, Monitor, Brain, Cloud, Code } from 'lucide-react';

const nodes = [
  { 
    name: 'AI Integration', 
    sub: 'OpenAI / Gemini / LLMs / Generative AI ', 
    icon: <Brain strokeWidth={1.5} size={48} />, 
    highlight: true,
    desc: 'Engineering intelligent workflows and prompt-chaining.'
  },
  { 
    name: 'Frontend Arch', 
    sub: 'React / Next.js / Angular / Bootstrap / SCSS / CSS / Tailwind', 
    icon: <Monitor strokeWidth={1.5} size={40} />,
    desc: 'Building highly interactive, scalable client-side apps.'
  },
  { 
    name: 'Backend Systems', 
    sub: 'Node.js / Express/ Nest.js / REST API ', 
    icon: <Server strokeWidth={1.5} size={40} />,
    desc: 'Architecting robust, secure REST APIs.'
  },
  { 
    name: 'Core Languages', 
    sub: 'Python / TypeScript / Javarscript ', 
    icon: <Code strokeWidth={1.5} size={40} />,
    desc: 'Writing clean, typed, and efficient logic.'
  },
  { 
    name: 'Databases', 
    sub: 'PostgreSQL / MongoDB / MySQL / Firebase / Supabase', 
    icon: <Database strokeWidth={1.5} size={40} />,
    desc: 'Designing optimized schemas and data layers.'
  },
  { 
    name: 'Cloud & DevOps', 
    sub: 'AWS / Docker / CI/CD / Git', 
    icon: <Cloud strokeWidth={1.5} size={40} />,
    desc: 'Deploying reliable, scalable infrastructure.'
  },
];

function SkillNode({ node, index }: { node: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col p-8 border-r-2 border-b-2 border-black transition-colors duration-500 cursor-crosshair overflow-hidden ${node.highlight ? 'bg-black text-white hover:bg-red-600' : 'bg-white text-black hover:bg-black hover:text-white'}`}
    >
      {/* Scanning Background Fill */}
      <div className="absolute top-0 left-0 w-full h-0 bg-white/10 group-hover:h-full transition-all duration-700 ease-out z-0 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start mb-16">
          <div className={`transition-transform duration-500 group-hover:scale-110 ${node.highlight ? 'text-red-500 group-hover:text-white' : 'text-black group-hover:text-white'}`}>
              {node.icon}
          </div>
          <span className="text-xs font-bold font-mono tracking-widest opacity-50">0{index + 1}</span>
      </div>
      
      <h3 className="relative z-10 text-3xl font-black tracking-tighter uppercase mb-2 font-(family-name:--font-playfair)">
        <TextScramble text={node.name} trigger={isHovered} />
      </h3>
      <p className={`relative z-10 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 ${node.highlight ? 'text-white/60 group-hover:text-white/80' : 'text-red-600'}`}>
        {node.sub}
      </p>
      <p className={`relative z-10 text-sm font-medium leading-relaxed uppercase tracking-widest ${node.highlight ? 'text-white/80' : 'text-black/60 group-hover:text-white/80'}`}>
        {node.desc}
      </p>
    </motion.div>
  );
}

export default function SkillsNeuralStack() {
  return (
    <section id="skills" className="w-full bg-white border-b-2 border-black py-32 px-6 md:px-12 max-w-[2000px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-8 mb-16">
        <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase font-(family-name:--font-playfair) leading-none m-0">
          Neural<br/>Stack.
        </h2>
        <div className="flex items-center gap-4 mt-8 md:mt-0">
            <div className="w-16 h-0.5 bg-red-600" />
            <p className="text-black text-[10px] font-bold tracking-[0.4em] uppercase">Core Capabilities</p>
        </div>
      </div>

      {/* Brutalist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t-2 border-l-2 border-black">
        {nodes.map((node, index) => (
          <SkillNode key={node.name} node={node} index={index} />
        ))}
      </div>
      
    </section>
  );
}
