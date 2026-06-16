'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import Navbar from '@/components/ui/Navbar';

// Import our new cinematic components
const HeroSection = dynamic(() => import('@/components/ui/HeroSection'), { ssr: false });
const BentoBio = dynamic(() => import('@/components/ui/BentoBio'), { ssr: false });
const Timeline = dynamic(() => import('@/components/ui/Timeline'), { ssr: false });
const VaultProjects = dynamic(() => import('@/components/ui/VaultProjects'), { ssr: false });
const TerminalContact = dynamic(() => import('@/components/ui/TerminalContact'), { ssr: false });
const SkillsNeuralStack = dynamic(() => import('@/components/ui/SkillsNeuralStack'), { ssr: false });
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: false });

export default function Home() {
  const containerRef = useRef(null);

  return (
    <main ref={containerRef} className="relative text-black selection:bg-black selection:text-white font-sans overflow-x-hidden bg-white">
      <Navbar />

      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Interactive Bento Grid Bio */}
      <BentoBio />

      {/* 3. The Neural Stack (Skills) */}
      <div className="relative z-20">
        <SkillsNeuralStack />
      </div>

      {/* 4. The Vault (Projects) */}
      <div className="relative z-30">
        <VaultProjects />
      </div>

      {/* 5. Sticky Scroll Timeline (Experience & Education) */}
      <div className="relative z-40">
        <Timeline />
      </div>

      {/* 6. Terminal Contact */}
      <div className="relative z-50">
        <TerminalContact />
      </div>

      {/* 7. Footer */}
      <div className="relative z-50">
        <Footer />
      </div>

    </main>
  );
}
