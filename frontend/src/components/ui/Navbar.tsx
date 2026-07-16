'use client';

import { useAppStore } from '@/store';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import TextScramble from './TextScramble';

export default function Navbar() {
  const setHoveredElement = useAppStore((state) => state.setHoveredElement);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-60 origin-left" 
        style={{ scaleX }} 
      />
      <div className="fixed top-0 left-0 w-full z-50 bg-white border-b-2 border-black flex items-center justify-between px-6 py-4 md:px-12 md:py-6 mt-1">
        
        {/* Brand */}
        <div 
          className="flex items-center cursor-pointer relative z-50"
          onMouseEnter={() => setHoveredElement('link')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <div className="text-black text-2xl md:text-3xl font-black tracking-tighter uppercase font-(family-name:--font-playfair)">
            ESWAR M
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-12 text-xs font-bold tracking-[0.3em] uppercase text-black">
          {[
            { name: 'Index', href: '#about' },
            { name: 'Archive', href: '#projects' },
            { name: 'Journal', href: '#experience' },
            { name: 'Contact', href: '#contact' }
          ].map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="hover:underline underline-offset-8 decoration-2 transition-all relative"
              onMouseEnter={() => { setHoveredElement('link'); setHoveredLink(link.name); }} 
              onMouseLeave={() => { setHoveredElement(null); setHoveredLink(null); }}
            >
              <TextScramble text={link.name} trigger={hoveredLink === link.name} />
            </a>
          ))}
        </div>

        {/* Actions & Mobile Toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 px-4 py-2 border-2 border-black">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black">Open to Work</span>
          </div>
          
          <button 
            className="md:hidden flex items-center justify-center p-2 text-black transition-transform active:scale-95 relative z-50"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={32} strokeWidth={2.5} /> : <Menu size={32} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Brutalist Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-18 left-0 w-full bg-white border-b-4 border-black z-40 flex flex-col items-center py-12 gap-8 md:hidden"
            style={{ boxShadow: "0px 20px 0px 0px rgba(0,0,0,1)" }}
          >
            <a href="#about" onClick={toggleMobileMenu} className="text-4xl font-black tracking-tighter uppercase font-(family-name:--font-playfair) text-black hover:text-red-600 transition-colors">Index</a>
            <a href="#projects" onClick={toggleMobileMenu} className="text-4xl font-black tracking-tighter uppercase font-(family-name:--font-playfair) text-black hover:text-red-600 transition-colors">Archive</a>
            <a href="#experience" onClick={toggleMobileMenu} className="text-4xl font-black tracking-tighter uppercase font-(family-name:--font-playfair) text-black hover:text-red-600 transition-colors">Journal</a>
            <a href="#contact" onClick={toggleMobileMenu} className="text-4xl font-black tracking-tighter uppercase font-(family-name:--font-playfair) text-black hover:text-red-600 transition-colors">Contact</a>
            
            <div className="mt-8 flex items-center gap-3 px-6 py-3 border-2 border-black bg-black text-white active:scale-95 transition-transform">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Open to Work</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
