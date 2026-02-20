
import React from 'react';
import { Season } from '../../types';

interface SeasonSectorProps {
  season: Season;
}

const SeasonSector: React.FC<SeasonSectorProps> = ({ season }) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-center gap-3 px-4 py-2 rounded-full bg-black/20 border border-white/10 backdrop-blur-md hover:bg-white/5 hover:border-neon-cyan/30 transition-all">
        {/* Orbital Icon */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          <div className="absolute inset-0 border border-neon-cyan/30 rounded-full animate-[spin_4s_linear_infinite]" />
          <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full shadow-[0_0_5px_#00f3ff]" />
        </div>
        
        <div className="flex flex-col items-start leading-none">
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Cycle</span>
          <span className="text-xs font-bold font-display text-white uppercase tracking-wider group-hover:text-neon-cyan transition-colors">
            {season}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeasonSector;
