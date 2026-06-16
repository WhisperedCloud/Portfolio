'use client';

import { motion } from 'framer-motion';

const timelineData = [
  {
    year: "2026",
    title: "Freelance AI Developer",
    company: "Sanjeev NC",
    desc: "Built 4 AI products including AI Podcaster and Chat to Website. Integrated OpenAI/Gemini APIs, built automated pipelines, and implemented Stripe/Razorpay payment gateways.",
    type: "Experience"
  },
  {
    year: "2025",
    title: "Full Stack Intern",
    company: "Highonswift",
    desc: "Developed scalable MERN applications with JWT auth. Integrated Gen AI APIs, optimized database queries, and reduced API response times by 30%.",
    type: "Experience"
  },
  {
    year: "2024",
    title: "Full Stack Intern",
    company: "Haircoation & CodTech",
    desc: "Built and integrated 10+ REST APIs using Node.js and MongoDB. Created reusable React components and improved UI responsiveness by 20%.",
    type: "Experience"
  },
  {
    year: "2022-26",
    title: "B.E. Computer Science",
    company: "Jeppiaar Engineering College",
    desc: "Honours in Artificial Intelligence and Machine Learning. Also served as Club Service Director for Rotaract Club, organizing 20+ events and leading cross-functional teams.",
    type: "Education"
  }
];

export default function Timeline() {
  return (
    <section id="experience" className="w-full bg-white border-b-2 border-black py-32 px-6 md:px-12 max-w-[2000px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-8 mb-16">
        <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase font-[family-name:var(--font-playfair)] leading-none m-0">
          Journal.
        </h2>
        <div className="flex items-center gap-4 mt-8 md:mt-0">
            <div className="w-16 h-[2px] bg-red-600" />
            <p className="text-black text-[10px] font-bold tracking-[0.4em] uppercase">Chronicles</p>
        </div>
      </div>

      {/* Vertical Timeline List */}
      <div className="flex flex-col">
        {timelineData.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col md:flex-row items-start md:items-stretch border-b-2 border-black group hover:bg-[#f4f4f4] transition-colors"
          >
            {/* Year & Type (Left Column) */}
            <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-between md:justify-start p-6 md:p-8 border-b-2 md:border-b-0 md:border-r-2 border-black">
                <span className="text-4xl md:text-5xl font-black text-black font-[family-name:var(--font-playfair)] tracking-tighter">
                    {item.year}
                </span>
                <span className="text-red-600 text-[10px] font-bold tracking-[0.3em] uppercase md:mt-auto bg-white px-2 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] self-start md:self-auto">
                    {item.type}
                </span>
            </div>

            {/* Content (Right Column) */}
            <div className="w-full md:w-3/4 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-4xl font-black text-black tracking-tighter uppercase mb-2 font-[family-name:var(--font-playfair)] group-hover:text-red-600 transition-colors">
                    {item.title}
                </h3>
                <h4 className="text-black text-xs font-bold tracking-widest uppercase mb-6">
                    {item.company}
                </h4>
                <p className="text-black text-sm md:text-base font-medium leading-relaxed max-w-3xl text-justify">
                    {item.desc}
                </p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
