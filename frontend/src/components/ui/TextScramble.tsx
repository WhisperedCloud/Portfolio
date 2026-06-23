'use client';
import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({ 
  text, 
  trigger, 
  className 
}: { 
  text: string, 
  trigger: boolean, 
  className?: string 
}) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
      }

      iteration += 1 / 3;
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger, text]);

  return <span className={className}>{displayText}</span>;
}
