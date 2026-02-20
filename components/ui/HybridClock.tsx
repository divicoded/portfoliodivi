import React, { useEffect, useState } from 'react';

const HybridClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border border-white/5 border-t-neon-cyan/50 animate-[spin_10s_linear_infinite]" />
      <div className="absolute inset-2 rounded-full border border-white/5 border-b-neon-violet/50 animate-[spin_15s_linear_infinite_reverse]" />
      
      {/* Digital Time */}
      <div className="flex flex-col items-center">
        <span className="text-4xl font-mono font-bold tracking-tighter text-white">
          {formatTime(time)}
        </span>
        <span className="text-xs font-mono text-white/40 mt-1">
          UTC {time.getUTCHours()}:{time.getUTCMinutes() < 10 ? '0' : ''}{time.getUTCMinutes()}
        </span>
      </div>

      {/* Ticks */}
      <div className="absolute top-0 w-[1px] h-2 bg-neon-400" />
      <div className="absolute bottom-0 w-[1px] h-2 bg-white/20" />
      <div className="absolute left-0 w-2 h-[1px] bg-white/20" />
      <div className="absolute right-0 w-2 h-[1px] bg-white/20" />
    </div>
  );
};

export default HybridClock;