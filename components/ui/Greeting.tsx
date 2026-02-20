
import React, { useEffect, useState } from 'react';
import TextReveal from './TextReveal';

const Greeting: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 5) setGreeting('System Standby');
    else if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else if (hour < 22) setGreeting('Good Evening');
    else setGreeting('Night Mode Active');
  }, []);

  return (
    <div className="flex items-center gap-4 p-3 bg-black/40 border border-neon-green/30 rounded-md backdrop-blur-md shadow-[0_0_15px_rgba(10,255,104,0.1)]">
      {/* Animated Blob */}
      <div className="relative flex items-center justify-center w-10 h-10">
        <span className="absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-20 animate-ping"></span>
        <div className="relative w-3 h-3 bg-neon-green rounded-full shadow-[0_0_10px_#0aff68] animate-pulse"></div>
        {/* Orbiting ring */}
        <div className="absolute inset-0 border border-neon-green/30 rounded-full animate-[spin_3s_linear_infinite] border-t-transparent" />
      </div>

      <div className="flex flex-col">
        <span className="font-mono text-[10px] text-neon-green tracking-widest uppercase mb-1">
          System Online
        </span>
        <h2 className="text-sm md:text-base font-mono font-bold text-white tracking-tight">
          <TextReveal text={greeting} variant="mechanical" />
        </h2>
      </div>
    </div>
  );
};

export default Greeting;
