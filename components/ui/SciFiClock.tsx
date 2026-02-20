
import React, { useEffect, useState } from 'react';

const SciFiClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let frameId: number;
    const update = () => {
      setTime(new Date());
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');
  
  // Smooth analog rotation calculations
  const ms = time.getMilliseconds();
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  // Smooth movement for second hand
  const secondsDegrees = ((seconds + ms / 1000) / 60) * 360;
  const minutesDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hoursDegrees = ((hours % 12 + minutes / 60) / 12) * 360;

  return (
    <div className="relative p-6 glass-panel rounded-3xl flex flex-col items-center justify-center gap-6 border border-white/10 overflow-hidden w-full h-full min-h-[260px] bg-black/40 shadow-2xl">
      
      {/* Cinematic Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-neon-cyan/5 blur-[50px] rounded-full pointer-events-none" />

      {/* Analogue System */}
      <div className="relative z-10 w-40 h-40 flex items-center justify-center">
         {/* Outer Dial Ring */}
         <div className="absolute inset-0 border border-white/10 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
         
         {/* Animated Orbital Rings */}
         <div className="absolute inset-[-4px] border border-dashed border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
         <div className="absolute inset-[10px] border border-dotted border-neon-cyan/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

         {/* Hour Markers */}
         {[...Array(12)].map((_, i) => {
           const isCardinal = i % 3 === 0;
           return (
             <div 
               key={i}
               className="absolute w-full h-full"
               style={{ transform: `rotate(${i * 30}deg)` }}
             >
               <div className={`mx-auto rounded-full shadow-[0_0_5px_rgba(255,255,255,0.2)] ${isCardinal ? 'w-1 h-3 bg-neon-cyan' : 'w-0.5 h-1.5 bg-white/20'}`} />
             </div>
           );
         })}

         {/* Hands Container with Drop Shadow for Depth */}
         <div className="absolute inset-0 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
            {/* Hour Hand */}
            <div 
               className="absolute top-1/2 left-1/2 w-1.5 h-10 bg-white rounded-full origin-bottom" 
               style={{ transform: `translate(-50%, -100%) rotate(${hoursDegrees}deg)`, zIndex: 10 }}
            />
            {/* Minute Hand */}
            <div 
               className="absolute top-1/2 left-1/2 w-1 h-14 bg-cyan-400 rounded-full origin-bottom" 
               style={{ transform: `translate(-50%, -100%) rotate(${minutesDegrees}deg)`, zIndex: 11 }}
            />
            {/* Second Hand (Smooth Sweep) */}
            <div 
               className="absolute top-1/2 left-1/2 w-[1px] h-16 bg-violet-500 origin-bottom" 
               style={{ transform: `translate(-50%, -100%) rotate(${secondsDegrees}deg)`, zIndex: 12 }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neon-violet rounded-full shadow-[0_0_8px_#bd00ff]" />
            </div>
            
            {/* Center Cap */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-black border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 z-20" />
         </div>
      </div>

      {/* Digital System */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-baseline gap-1 bg-black/50 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-md shadow-inner">
          <span className="text-3xl font-display font-bold text-white tracking-widest tabular-nums leading-none">
              {format(time.getHours())}:{format(time.getMinutes())}
          </span>
          <span className="text-sm font-mono text-neon-cyan/80 w-6 tabular-nums">
              {format(time.getSeconds())}
          </span>
        </div>
        
        {/* System Labels */}
        <div className="flex gap-4 mt-2 w-full justify-center opacity-60">
           <span className="text-[9px] font-mono text-white uppercase tracking-[0.2em]">Local</span>
           <span className="text-[9px] font-mono text-neon-green uppercase tracking-[0.2em] animate-pulse">Sync</span>
        </div>
      </div>
    </div>
  );
};

export default SciFiClock;
