'use client';


import { useAppStore } from '@/store';
import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VoiceToggle() {
  const { isVoiceEnabled, setVoiceEnabled, setHoveredElement } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleVoice = () => {
    setVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled) {
      // AI Voice Assistant Introduction
      const msg = new SpeechSynthesisUtterance("Hello, I am Eswar. Welcome to my interactive portfolio. I am a Full Stack and AI Developer passionate about creating intelligent software solutions that solve real-world problems. Let's build something amazing together.");
      window.speechSynthesis.speak(msg);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleVoice}
      onMouseEnter={() => setHoveredElement('button')}
      onMouseLeave={() => setHoveredElement(null)}
      className="fixed bottom-6 right-6 p-4 rounded-full glass-panel z-50 text-white hover:text-neon-blue transition-colors duration-300"
      aria-label="Toggle Voice Assistant"
    >
      {isVoiceEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
}
