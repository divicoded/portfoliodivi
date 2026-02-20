
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Season } from '../../types';

interface CursorProps {
  season?: Season;
}

const Cursor: React.FC<CursorProps> = ({ season = Season.Vasant }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics for the main cursor
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Secondary trailer for extra fluid feel
  const trailerX = useSpring(mouseX, { damping: 40, stiffness: 200, mass: 0.8 });
  const trailerY = useSpring(mouseY, { damping: 40, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsHoveringLink(
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null
      );
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const getSeasonColor = (s: Season) => {
    switch (s) {
      case Season.Vasant: return '#ff7eb6'; // Pink
      case Season.Grishma: return '#ffaa00'; // Orange/Gold
      case Season.Varsha: return '#00f3ff'; // Cyan
      case Season.Sharad: return '#ff5500'; // Rust Red
      case Season.Hemant: return '#bd00ff'; // Violet
      case Season.Shishir: return '#ffffff'; // White
      default: return '#00f3ff';
    }
  };

  const getCursorShape = (s: Season) => {
    // Tailwind classes for shape morphing
    switch (s) {
      case Season.Vasant: return 'rounded-[12px] rotate-45'; // Flower petal-ish
      case Season.Grishma: return 'rounded-full scale-125'; // Sun
      case Season.Varsha: return 'rounded-t-full rounded-b-[4px] rotate-180'; // Droplet
      case Season.Sharad: return 'rounded-tl-[20px] rounded-br-[20px] rounded-tr-[4px] rounded-bl-[4px] rotate-45'; // Leaf
      case Season.Hemant: return 'rounded-[4px] blur-[2px]'; // Haze
      case Season.Shishir: return 'rounded-full border-2'; // Hollow
      default: return 'rounded-full';
    }
  };

  const color = getSeasonColor(season);

  return (
    <>
      {/* Main Cursor Element */}
      <motion.div
        ref={cursorRef}
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:block"
      >
        <motion.div
          animate={{
            width: isHoveringLink ? 48 : 20,
            height: isHoveringLink ? 48 : 20,
            backgroundColor: isHoveringLink ? 'transparent' : color,
            borderColor: color,
            borderWidth: isHoveringLink ? 2 : 0,
            rotate: isHoveringLink ? 90 : 0
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`flex items-center justify-center backdrop-blur-sm mix-blend-difference ${getCursorShape(season)}`}
        >
           {isHoveringLink && <div className="w-2 h-2 rounded-full bg-white" />}
        </motion.div>
      </motion.div>

      {/* Trailing Element */}
      <motion.div
        style={{ x: trailerX, y: trailerY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 z-[99] pointer-events-none hidden md:block mix-blend-screen"
      >
         <div 
           className={`w-4 h-4 opacity-50 blur-sm transition-colors duration-500`} 
           style={{ backgroundColor: color, borderRadius: '50%' }} 
         />
      </motion.div>
    </>
  );
};

export default Cursor;
