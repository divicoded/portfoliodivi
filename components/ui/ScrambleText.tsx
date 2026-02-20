
import React, { useRef, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
}

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 30;
const CHARS = "!@#$%^&*():{};|,.<>/?~qwertyuiopasdfghjklzxcvbnm";

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = "", 
  scrambleSpeed = SHUFFLE_TIME 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    let pos = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = text.split("").map((char, index) => {
        if (index < pos) {
          return text[index];
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");

      setDisplayText(scrambled);
      pos += 1 / CYCLES_PER_LETTER;

      if (pos >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, scrambleSpeed);
  };

  return (
    <span 
      className={className} 
      onMouseEnter={scramble}
      onMouseLeave={() => { /* Optional: Stop or reset? Usually nicer to let it finish */ }}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;
