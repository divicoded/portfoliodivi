
import React, { useRef, useState, useEffect, useId } from 'react';
import { motion, useSpring, useMotionTemplate, useReducedMotion } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Pull strength
  radius?: number; // Proximity radius for interaction
  className?: string;
  onClick?: () => void;
  disableDistortion?: boolean;
}

const Magnetic: React.FC<MagneticProps> = ({ 
  children, 
  strength = 30, 
  radius = 200, 
  className = '', 
  onClick,
  disableDistortion = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const filterId = useId().replace(/:/g, ''); // Ensure valid ID for SVG
  const shouldReduceMotion = useReducedMotion();

  // Physics springs for position
  const position = {
    x: useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 }),
    y: useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })
  };
  
  // Spring for distortion intensity
  const distortionScale = useSpring(0, { stiffness: 200, damping: 20 });
  
  // Ref for the SVG filter element to manipulate attributes directly for performance
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    // If reduced motion is preferred or distortion disabled, skip logic
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const dist = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));

      if (dist < radius) {
        // Calculate pull intensity (0 to 1)
        const intensity = 1 - (dist / radius); 
        const moveX = (clientX - centerX) * intensity * (strength / radius);
        const moveY = (clientY - centerY) * intensity * (strength / radius);
        
        position.x.set(moveX);
        position.y.set(moveY);

        if (!disableDistortion && displacementMapRef.current) {
          // Ramp up distortion as we get closer
          // Peak distortion happens slightly off-center to create a "wave" feel
          const dScale = Math.max(0, intensity * 20);
          displacementMapRef.current.scale.baseVal = dScale;
        }

      } else {
        // Reset
        position.x.set(0);
        position.y.set(0);
        if (!disableDistortion && displacementMapRef.current) {
          displacementMapRef.current.scale.baseVal = 0;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [radius, strength, shouldReduceMotion, disableDistortion]);

  return (
    <div className={`relative ${className}`}>
      {/* Unique SVG Filter for fluid distortion */}
      {!disableDistortion && !shouldReduceMotion && (
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id={`liquid-${filterId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.015" 
                numOctaves="2" 
                result="noise" 
              />
              <feDisplacementMap 
                ref={displacementMapRef}
                in="SourceGraphic" 
                in2="noise" 
                scale="0" 
                xChannelSelector="R" 
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      <motion.div
        ref={ref}
        onClick={onClick}
        style={{ 
          x: position.x, 
          y: position.y,
          // Apply filter only if active
          filter: (!disableDistortion && !shouldReduceMotion) ? `url(#liquid-${filterId})` : 'none'
        }}
        className="relative z-10 will-change-transform backface-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Magnetic;
