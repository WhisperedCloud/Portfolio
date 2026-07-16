'use client';

import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import TextScramble from './TextScramble';

const timelineData = [
  {
    year: "2026",
    title: "Freelance AI Developer",
    company: "Sanjeev NC",
    desc: "Built 4 AI products including AI Podcaster and Chat to Website. Integrated OpenAI/Gemini APIs, built automated pipelines, and implemented Stripe/Razorpay payment gateways.",
    type: "Experience",
    tech: ["OPENAI", "GEMINI", "STRIPE", "NODE.JS"]
  },
  {
    year: "2025",
    title: "Full Stack Intern",
    company: "Highonswift",
    desc: "Developed scalable MERN applications with JWT auth. Integrated Gen AI APIs, optimized database queries, and reduced API response times by 30%.",
    type: "Experience",
    tech: ["MERN", "JWT", "GEN AI", "MONGODB"]
  },
  {
    year: "2024",
    title: "Full Stack Intern",
    company: "Haircoation & CodTech",
    desc: "Built and integrated 10+ REST APIs using Node.js and MongoDB. Created reusable React components and improved UI responsiveness by 20%.",
    type: "Experience",
    tech: ["NODE.JS", "REACT", "REST API", "UI/UX"]
  },
  {
    year: "2022-26",
    title: "B.E. Computer Science",
    company: "Jeppiaar Engineering College",
    desc: "Honours in Artificial Intelligence and Machine Learning. Also served as Club Service Director for Rotaract Club, organizing 20+ events and leading cross-functional teams.",
    type: "Education",
    tech: ["AI/ML", "DATA STRUCTURES", "LEADERSHIP"]
  }
];

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} className="w-full bg-white border-b-2 border-black py-32 px-6 md:px-12 max-w-[2000px] mx-auto relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-8 mb-16">
        <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase font-(family-name:--font-playfair) leading-none m-0">
          Journal.
        </h2>
        <div className="flex items-center gap-4 mt-8 md:mt-0">
            <div className="w-16 h-0.5 bg-red-600" />
            <p className="text-black text-[10px] font-bold tracking-[0.4em] uppercase">Chronicles</p>
        </div>
      </div>

      {/* Vertical Timeline List */}
      <div className="flex flex-col relative">
        {/* Animated connecting line */}
        <div className="absolute left-6 md:left-[25%] top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block">
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-red-600 origin-top" 
            style={{ scaleY, height: "100%" }} 
          />
        </div>

        {timelineData.map((item, index) => {
          return <TimelineItem key={index} item={item} index={index} />;
        })}
      </div>

    </section>
  );
}

function TimelineItem({ item, index }: { item: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col md:flex-row items-start md:items-stretch border-b-2 border-black group hover:bg-[#f4f4f4] transition-colors relative z-10"
    >
      {/* Timeline Node Dot */}
      <div className="hidden md:block absolute left-[25%] top-1/2 translate-x-[-50%] -translate-y-1/2 w-4 h-4 bg-white border-2 border-black rounded-full z-20 group-hover:border-red-600 group-hover:scale-150 transition-all duration-300">
        <div className="absolute inset-0.75 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Year & Type (Left Column) */}
      <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-between md:justify-start p-6 md:p-8 border-b-2 md:border-b-0 md:border-r-2 border-black bg-white group-hover:bg-[#f4f4f4] transition-colors">
          <span className="text-4xl md:text-5xl font-black text-black font-(family-name:--font-playfair) tracking-tighter">
              <TextScramble text={item.year} trigger={isInView} />
          </span>
                <span className="text-red-600 text-[10px] font-bold tracking-[0.3em] uppercase md:mt-auto bg-white px-2 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] self-start md:self-auto">
                    {item.type}
                </span>
            </div>

            {/* Content (Right Column) */}
            <div className="w-full md:w-3/4 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-4xl font-black text-black tracking-tighter uppercase mb-2 font-(family-name:--font-playfair) group-hover:text-red-600 transition-colors">
                    {item.title}
                </h3>
                <h4 className="text-black text-xs font-bold tracking-widest uppercase mb-6">
                    {item.company}
                </h4>
                <p className="text-black text-sm md:text-base font-medium leading-relaxed max-w-3xl text-justify">
                    {item.desc}
                </p>

                {/* Tech Stack Reveal */}
                <div className="mt-6 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {item.tech.map((t: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-black text-white text-[9px] font-bold tracking-[0.2em] uppercase">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
      </motion.div>
  );
}
