
import React from 'react';
import Magnetic from './Magnetic';

interface StatusPanelProps {
  label: string;
  value: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
  delay?: number;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ label, value, align = 'right', className = '', delay = 0 }) => {
  return (
    <Magnetic strength={10} className={className}>
      <div 
        className={`relative group backdrop-blur-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Tech Brackets */}
        <div className="absolute -left-2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/0 via-white/20 to-white/0 group-hover:via-neon-cyan/50 transition-colors" />
        <div className="absolute -right-2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/0 via-white/20 to-white/0 group-hover:via-neon-cyan/50 transition-colors" />

        <div className={`px-4 py-2 flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
          <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1 group-hover:text-neon-cyan/70 transition-colors flex items-center gap-2">
            {align === 'right' && <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-neon-cyan transition-colors" />}
            {label}
            {align === 'left' && <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-neon-cyan transition-colors" />}
          </span>
          <div className="font-mono text-xs md:text-sm text-white/90 group-hover:text-white transition-colors bg-white/5 px-2 py-0.5 rounded border border-white/5 group-hover:border-white/10">
            {value}
          </div>
        </div>
      </div>
    </Magnetic>
  );
};

export default StatusPanel;
