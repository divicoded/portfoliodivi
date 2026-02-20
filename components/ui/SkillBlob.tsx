
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Season } from '../../types';

interface SkillData {
  category: string;
  value: number; // 0-100
  fullMark: number;
}

interface SkillBlobProps {
  data: SkillData[];
  size?: number;
  season?: Season;
}

const SkillBlob: React.FC<SkillBlobProps> = ({ data, size = 300, season = Season.Vasant }) => {
  const radius = size / 2.5;
  const center = size / 2;
  const total = data.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2; // Start at top
    // Scale value to fit radius
    const r = (value / 100) * radius; 
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const polyPoints = useMemo(() => {
    return data.map((d, i) => {
      const { x, y } = getCoordinates(d.value, i);
      return `${x},${y}`;
    }).join(' ');
  }, [data, radius, center]);

  const getSeasonColors = (s: Season) => {
    switch (s) {
      case Season.Vasant: return { stroke: '#34d399', fill: 'rgba(52, 211, 153, 0.2)', shadow: 'rgba(52, 211, 153, 0.3)' }; // Spring Green
      case Season.Grishma: return { stroke: '#fbbf24', fill: 'rgba(251, 191, 36, 0.2)', shadow: 'rgba(251, 191, 36, 0.3)' }; // Summer Gold
      case Season.Varsha: return { stroke: '#22d3ee', fill: 'rgba(34, 211, 238, 0.2)', shadow: 'rgba(34, 211, 238, 0.3)' }; // Monsoon Cyan
      case Season.Sharad: return { stroke: '#fb923c', fill: 'rgba(251, 146, 60, 0.2)', shadow: 'rgba(251, 146, 60, 0.3)' }; // Autumn Orange
      case Season.Hemant: return { stroke: '#818cf8', fill: 'rgba(129, 140, 248, 0.2)', shadow: 'rgba(129, 140, 248, 0.3)' }; // Pre-winter Indigo
      case Season.Shishir: return { stroke: '#ffffff', fill: 'rgba(255, 255, 255, 0.2)', shadow: 'rgba(255, 255, 255, 0.3)' }; // Winter White
      default: return { stroke: '#00f3ff', fill: 'rgba(0, 243, 255, 0.2)', shadow: 'rgba(0, 243, 255, 0.3)' };
    }
  };

  const colors = getSeasonColors(season);

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Web */}
        {[25, 50, 75, 100].map((level) => (
           <polygon
             key={level}
             points={data.map((_, i) => {
               const { x, y } = getCoordinates(level, i);
               return `${x},${y}`;
             }).join(' ')}
             fill="transparent"
             stroke="rgba(255,255,255,0.05)"
             strokeWidth="1"
           />
        ))}

        {/* Axis Lines */}
        {data.map((_, i) => {
          const { x, y } = getCoordinates(100, i);
          return (
            <line 
              key={i} 
              x1={center} 
              y1={center} 
              x2={x} 
              y2={y} 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="1" 
            />
          );
        })}

        {/* The Data Blob */}
        <motion.polygon
          points={polyPoints}
          fill={colors.fill}
          stroke={colors.stroke}
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ scale: 0, opacity: 0, transformOrigin: 'center' }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 10px ${colors.shadow})` }}
        />
        
        {/* Labels */}
        {data.map((d, i) => {
           const { x, y } = getCoordinates(115, i); // Push labels out slightly
           return (
             <text
               key={i}
               x={x}
               y={y}
               textAnchor="middle"
               dominantBaseline="middle"
               fill="rgba(255,255,255,0.7)"
               className="text-[10px] md:text-xs font-mono uppercase"
               style={{ textShadow: '0 0 5px rgba(0,0,0,0.5)' }}
             >
               {d.category}
             </text>
           );
        })}
      </svg>
      
      {/* Center Glow */}
      <div 
        className="absolute w-4 h-4 rounded-full blur-md animate-pulse pointer-events-none" 
        style={{ backgroundColor: colors.stroke, opacity: 0.5 }}
      />
    </div>
  );
};

export default SkillBlob;
