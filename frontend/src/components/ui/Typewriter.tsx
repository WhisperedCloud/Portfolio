'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Typewriter({ 
  text, 
  delay = 0, 
  speed = 30 
}: { 
  text: string, 
  delay?: number, 
  speed?: number 
}) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const startTyping = () => {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);
      
      return () => clearInterval(intervalId);
    };

    timeoutId = setTimeout(startTyping, delay);
    return () => clearTimeout(timeoutId);
  }, [text, delay, speed]);

  return (
    <span>
      {displayedText}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-3 bg-red-600 ml-1"
      />
    </span>
  );
}
