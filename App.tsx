
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import SeasonalEnvironment from './components/scene/SeasonalEnvironment';
import BackgroundBlobs from './components/scene/BackgroundBlobs';
import BentoGrid from './components/ui/BentoGrid';
import GithubCard from './components/ui/GithubCard';
import SciFiClock from './components/ui/SciFiClock';
import ThemeToggle from './components/ui/ThemeToggle';
import TextReveal from './components/ui/TextReveal';
import Magnetic from './components/ui/Magnetic';
import Cursor from './components/layout/Cursor';
import LoadingScreen from './components/ui/LoadingScreen';
import SeasonSector from './components/ui/SeasonSector';
import Greeting from './components/ui/Greeting';
import StatusPanel from './components/ui/StatusPanel';
import SkillBlob from './components/ui/SkillBlob';
import ScrambleText from './components/ui/ScrambleText';
import InfiniteMenu from './components/ui/InfiniteMenu';
import SectionReveal from './components/ui/SectionReveal';
import { PROJECTS, SEASONS } from './constants';
import { Season } from './types';
import { Github, Cpu, Palette, Zap, Box, Terminal } from 'lucide-react';
import gsap from 'gsap';

// Game UI Skill Bar Component
const StatBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="mb-4 group">
    <div className="flex justify-between text-xs font-tech mb-1.5 text-white/60 group-hover:text-white transition-colors uppercase tracking-widest">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className={`h-full ${color} shadow-[0_0_15px_currentColor]`}
      />
    </div>
  </div>
);

// Menu Items for Infinite Gallery
const menuItems = [
  {
    image: './images/aot.png',
    link: 'https://github.com/divicoded',
    title: 'GOATED ANIME',
    description: 'AOT'
  },
  {
    image: 'https://divicoded.github.io/portfoliodivi/images/isagi.png',
    link: 'https://github.com/divicoded',
    title: 'ISAGI',
    description: 'ISAGI'
  },
  {
    image: 'https://divicoded.github.io/portfoliodivi/images/nakumizu.png',
    link: 'https://github.com/divicoded',
    title: 'nakumizu',
    description: 'nakumizu'
  },
  {
    image: 'https://divicoded.github.io/portfoliodivi/images/romance.png',
    link: 'https://github.com/divicoded',
    title: 'The Fragrant Flower Blooms with Dignity',
    description: 'The Fragrant Flower Blooms with Dignity'
  },
  {
    image: 'https://divicoded.github.io/portfoliodivi/images//sao.png',
    link: 'https://github.com/divicoded',
    title: 'SAO',
    description: 'SAO'
  },
  {
    image: 'https://divicoded.github.io/portfoliodivi/images/shoyo.png',
    link: 'https://github.com/divicoded',
    title: 'Shoyo',
    description: 'Shoyo'
  }
];

function App() {
  const [loading, setLoading] = useState(true);
  const [currentSeason, setCurrentSeason] = useState<Season>(Season.Vasant);
  const [timeOfDay, setTimeOfDay] = useState('Morning');

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth(); 
    const hour = date.getHours();

    const seasonIndex = Math.floor(month / 2);
    setCurrentSeason(SEASONS[seasonIndex % SEASONS.length]);

    if (hour < 6) setTimeOfDay('Night');
    else if (hour < 12) setTimeOfDay('Morning');
    else if (hour < 17) setTimeOfDay('Afternoon');
    else if (hour < 21) setTimeOfDay('Evening');
    else setTimeOfDay('Night');
  }, []);

  const cycleTheme = () => {
    const themes = ['Morning', 'Afternoon', 'Evening', 'Night'];
    const nextIndex = (themes.indexOf(timeOfDay) + 1) % themes.length;
    setTimeOfDay(themes[nextIndex]);
  };

  const cycleSeason = () => {
    const currentIndex = SEASONS.indexOf(currentSeason);
    const nextIndex = (currentIndex + 1) % SEASONS.length;
    setCurrentSeason(SEASONS[nextIndex]);
  };

  const handleLoadingComplete = () => {
    setLoading(false);
    setTimeout(() => {
      gsap.fromTo('.hero-element', 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power3.out',
          duration: 1.2
        }
      );
    }, 100);
  };

  // Stats Data
  const radarData = [
    { category: 'Creativity', value: 95, fullMark: 100 },
    { category: 'Interaction', value: 90, fullMark: 100 },
    { category: 'Visuals', value: 85, fullMark: 100 },
    { category: 'Logic', value: 80, fullMark: 100 },
    { category: 'Curiosity', value: 100, fullMark: 100 },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!loading && (
        <main className={`relative min-h-screen w-full overflow-hidden text-white selection:bg-neon-cyan/20 transition-colors duration-1000 ${timeOfDay === 'Night' ? 'bg-obsidian' : 'bg-[#0a0f14]'}`}>
          <div className="bg-noise" />
          <BackgroundBlobs timeOfDay={timeOfDay} season={currentSeason} />
          
          <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-[1] ${
            timeOfDay === 'Morning' ? 'bg-gradient-to-br from-neon-cyan/10 via-transparent to-transparent opacity-30' :
            timeOfDay === 'Afternoon' ? 'bg-gradient-to-tr from-orange-500/5 via-transparent to-transparent opacity-20' :
            timeOfDay === 'Evening' ? 'bg-gradient-to-b from-neon-violet/10 via-transparent to-transparent opacity-30' :
            'bg-black/40'
          }`} />

          <SeasonalEnvironment season={currentSeason} />
          
          <div className="relative z-10 w-full">
            <Navigation />
            <Cursor season={currentSeason} />

            {/* --- HERO SECTION --- */}
            <section id="home" className="min-h-screen flex flex-col relative px-4 md:px-12 pt-24 pb-12 scroll-mt-20 overflow-hidden">
              
              {/* Desktop Controls (Top Right) */}
              <div className="absolute top-6 right-6 md:top-8 md:right-12 z-30 hero-element opacity-0 hidden md:flex gap-4">
                <button onClick={cycleSeason} className="hover:scale-105 transition-transform active:scale-95">
                  <SeasonSector season={currentSeason} />
                </button>
                <ThemeToggle current={timeOfDay} onToggle={cycleTheme} />
              </div>

              {/* Mobile Layout Stack */}
              <div className="md:hidden flex flex-col items-center w-full hero-element opacity-0 pt-4 pb-20">
                
                {/* Mobile Controls Row */}
                <div className="flex justify-between items-center w-full mb-8 px-2">
                   <button onClick={cycleSeason} className="scale-90">
                      <SeasonSector season={currentSeason} />
                   </button>
                   <ThemeToggle current={timeOfDay} onToggle={cycleTheme} />
                </div>

                {/* Clock & Identity Group */}
                <div className="w-full space-y-8">
                   <Magnetic strength={15} radius={100} disableDistortion>
                      <div className="scale-[0.85] origin-top">
                        <SciFiClock />
                      </div>
                   </Magnetic>

                   <div className="text-center px-4">
                      <Greeting />
                      <div className="mt-8 mb-4">
                         {/* Typography Upgrade: Syne for artistic flare */}
                         <h1 className="text-5xl font-art font-extrabold tracking-tight text-white drop-shadow-glow leading-[0.9]">
                           <TextReveal text="I AM DIV" variant="syne" />
                         </h1>
                      </div>
                      <p className="font-tech text-sm text-neon-cyan/60 uppercase tracking-[0.15em] leading-relaxed max-w-[280px] mx-auto border-t border-b border-white/5 py-2">
                        Frontend Architect & Visual Engineer
                      </p>
                   </div>
                </div>

                {/* Card & Status Stack */}
                <div className="w-full mt-12 space-y-6">
                   <Magnetic strength={20} radius={150} disableDistortion>
                      <div className="w-full">
                         <GithubCard season={currentSeason} timeOfDay={timeOfDay} />
                      </div>
                   </Magnetic>

                   {/* Mobile Status Grid */}
                   <div className="grid grid-cols-2 gap-4 px-2">
                      <StatusPanel 
                         label="Location" 
                         value={<span className="text-neon-cyan text-sm font-tech">EARTH [404]</span>} 
                         align="left"
                         className="w-full"
                      />
                      <StatusPanel 
                         label="Status" 
                         value={
                           <span className="text-neon-green text-sm font-tech flex items-center gap-1.5">
                             <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
                             ALIVE... ^_^
                           </span>
                         } 
                         align="right"
                         className="w-full"
                      />
                   </div>

                   <Magnetic strength={20} disableDistortion>
                      <a 
                        
                        className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 border border-white/10 rounded-lg text-xs font-tech tracking-widest font-bold uppercase active:bg-white/10 transition-colors"
                      >
                         <Terminal size={14} />
                         <span>[✦_✦] ᶻ 𝗓 𐰁 .ᐟ</span>
                      </a>
                   </Magnetic>
                </div>
              </div>

              {/* Desktop Layout - Rebalanced */}
              <div className="hidden md:flex flex-row items-center flex-1 max-w-[1920px] mx-auto w-full gap-16 xl:gap-24 relative">
                
                {/* Left Side: Typography & Intro */}
                <div className="w-[45%] flex flex-col justify-center relative z-20 pl-8 xl:pl-16">
                  <div className="hero-element opacity-0 mb-8">
                    <Greeting />
                  </div>
                  
                  <div className="hero-element opacity-0 mb-10">
                     {/* Major Typography Upgrade for Desktop Hero */}
                     <h1 className="text-[100px] xl:text-[140px] leading-[0.85] font-art font-extrabold tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.08)] mix-blend-screen">
                       <TextReveal text="I AM DIV" variant="syne" delay={0.2} />
                     </h1>
                  </div>

                  <p className="hero-element opacity-0 text-lg xl:text-xl text-white/60 max-w-xl font-sans font-light leading-relaxed mb-12 border-l-2 border-white/10 pl-6">
                     Building <span className="text-white font-medium">interactive digital dreams</span>. Touched code once after too much anime... now pretending to be a frontend dev powered by Wi-Fi and an i3 5th-gen relic.
                  </p>
                  
                  <div className="hero-element opacity-0 flex gap-6 items-center">
                    <Magnetic strength={40} radius={200}>
                      <a 
                        
                         className="px-8 py-4 bg-white text-black font-bold font-tech tracking-wider uppercase rounded-full hover:bg-neon-cyan transition-colors flex items-center gap-2"
                      >
                         <Terminal size={18} />
                         <span>[✦_✦]</span>
                      </a>
                    </Magnetic>
                    <Magnetic strength={40} radius={200}>
                       <div className="scale-[0.85] origin-left">
                          <SciFiClock />
                       </div>
                    </Magnetic>
                  </div>
                </div>

                {/* Right Side: Visual Identity Centerpiece */}
                <div className="w-[55%] relative h-[600px] flex items-center justify-center hero-element opacity-0 pr-8">
                   
                   {/* Floating Decoration Behind */}
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-neon-cyan/5 to-neon-violet/5 rounded-full blur-[100px] pointer-events-none" />

                   {/* Main Card Container - Ensure Full Shape */}
                   <div className="relative w-full max-w-2xl h-[400px] xl:h-[450px]">
                      {/* Interactive Card with Fluid Distortion */}
                      <Magnetic strength={60} radius={400} className="w-full h-full">
                         <div className="w-full h-full transform transition-transform duration-500 hover:scale-[1.02]">
                           <GithubCard season={currentSeason} timeOfDay={timeOfDay} />
                         </div>
                      </Magnetic>

                      {/* Floating Status Panels Positioned Around */}
                      <div className="absolute -top-12 -right-4 z-30">
                        <StatusPanel 
                           label="Location" 
                           value={<span className="text-neon-cyan font-tech tracking-wider text-base">EARTH [404]</span>} 
                           align="right"
                           delay={800}
                        />
                      </div>
                      <div className="absolute -bottom-10 -left-8 z-30">
                        <StatusPanel 
                           label="Availability" 
                           value={
                             <span className="text-neon-green font-tech tracking-wider text-base flex items-center gap-2">
                               <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
                               TAKEN AS A JOKE
                             </span>
                           } 
                           align="left"
                           delay={1000}
                        />
                      </div>
                      <div className="absolute top-1/2 -right-16 transform -translate-y-1/2 z-30 hidden xl:block">
                        <StatusPanel 
                           label="Current Focus" 
                           value={<span className="text-white font-tech tracking-wider text-base">idk shi...</span>} 
                           align="right"
                           delay={1200}
                        />
                      </div>

                   </div>
                </div>
              </div>

              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hero-element opacity-0 hidden md:block" onClick={() => document.getElementById('work')?.scrollIntoView()}>
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
              </div>
            </section>

            {/* --- WORK SECTION --- */}
            <section id="work" className="py-24 md:py-32 px-4 md:px-12 max-w-[1800px] mx-auto scroll-mt-20">
              <SectionReveal variant="depth">
                <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end gap-6">
                   <h2 className="text-4xl md:text-6xl font-display font-bold">
                     <TextReveal text="Artifacts of Distraction" variant="mechanical" />
                   </h2>
                   <div className="h-[1px] flex-1 bg-gradient-to-r from-neon-cyan/50 to-transparent mb-4 hidden md:block" />
                </div>
                <BentoGrid projects={PROJECTS} />
              </SectionReveal>
            </section>

            {/* --- SKILLS SECTION --- */}
            <section id="skills" className="py-32 px-4 md:px-6 relative overflow-hidden scroll-mt-20">
              <SectionReveal variant="blur" delay={0.2}>
                {/* Game UI Container */}
                <div className="max-w-7xl mx-auto glass-panel rounded-3xl p-6 md:p-12 relative overflow-hidden border border-white/10 bg-black/20">
                  {/* HUD Overlay Lines */}
                  <div className="absolute top-0 left-0 w-16 h-16 md:w-32 md:h-32 border-l-2 border-t-2 border-white/10 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 md:w-32 md:h-32 border-r-2 border-b-2 border-white/10 rounded-br-3xl pointer-events-none" />
                  <div className="absolute top-8 right-8 text-[10px] font-tech text-neon-cyan/50 tracking-[0.3em] hidden md:block border border-neon-cyan/20 px-2 py-1 rounded">
                    PLAYER_STATS_V2.0
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Radar Chart */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center">
                      <Magnetic strength={20}>
                        <div className="relative">
                          <SkillBlob data={radarData} size={300} season={currentSeason} />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <div className="text-center mt-32">
                               <div className="text-4xl font-art font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">LVL. 99</div>
                               <div className="text-[10px] text-neon-cyan font-tech tracking-widest uppercase mt-1">Max Level</div>
                             </div>
                          </div>
                        </div>
                      </Magnetic>
                    </div>

                    {/* Right Column: Stat Bars & Traits */}
                    <div className="lg:col-span-7 space-y-8">
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Core Skills */}
                          <div className="bg-black/20 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                             <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                               <Terminal className="text-neon-cyan" size={18} /> 
                               <span className="text-neon-cyan tracking-widest text-sm font-tech">CORE_TECH</span>
                             </h3>
                             <StatBar label="JavaScript / ES6+" value={98} color="bg-yellow-400" />
                             <StatBar label="React / Architecture" value={95} color="bg-cyan-400" />
                             <StatBar label="Animation (GSAP/Anime)" value={92} color="bg-purple-400" />
                             <StatBar label="UI Systems / CSS3" value={96} color="bg-pink-400" />
                          </div>

                          {/* Creative Stats */}
                          <div className="bg-black/20 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                             <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                               <Palette className="text-neon-violet" size={18} />
                               <span className="text-neon-violet tracking-widest text-sm font-tech">CREATIVE_ATTR</span>
                             </h3>
                             <StatBar label="Motion UX Design" value={94} color="bg-neon-violet" />
                             <StatBar label="Visual Polish" value={90} color="bg-fuchsia-400" />
                             <StatBar label="Prototyping Speed" value={98} color="bg-green-400" />
                             <StatBar label="Interactive Storytelling" value={88} color="bg-indigo-400" />
                          </div>
                       </div>

                       {/* Builder Traits */}
                       <div className="bg-gradient-to-r from-neon-cyan/5 to-transparent p-6 rounded-2xl border border-neon-cyan/10 relative overflow-hidden group hover:border-neon-cyan/30 transition-colors">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Box size={64} /></div>
                          <h3 className="text-lg font-display font-bold text-white mb-2 flex items-center gap-2">
                            <Zap className="text-yellow-400" size={18} />
                            <span className="tracking-widest text-sm font-tech">PASSIVE ABILITIES</span>
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 relative z-10">
                             <div className="text-sm font-mono text-white/70">
                                <span className="text-neon-cyan block mb-1.5 font-bold uppercase text-xs font-tech">&gt;&gt; Systems Thinker</span>
                                Prefer inventing patterns over copying templates.
                             </div>
                             <div className="text-sm font-mono text-white/70">
                                <span className="text-neon-cyan block mb-1.5 font-bold uppercase text-xs font-tech">&gt;&gt; Creative Engine</span>
                                Treats code as a medium for expression, not just layout.
                             </div>
                          </div>
                       </div>

                    </div>
                  </div>
                </div>
              </SectionReveal>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section id="contact" className="py-32 px-6 text-center relative scroll-mt-20 bg-black/40">
              <SectionReveal variant="scale">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight break-words cursor-default">
                    <ScrambleText text="Initialize Handshake 🤝" className="hover:text-neon-cyan transition-colors" />
                  </h2>
                  <p className="text-white/50 mb-12 text-xl font-light leading-relaxed">
                    Creations forged under the cold stare of unfinished chapters while my textbooks stood in silent judgment.
                  </p>
                  <div className="flex justify-center">
                    <Magnetic>
                      <a href="https://github.com/divicoded" target="_blank" className="flex flex-col items-center gap-2 group">
                        <div className="p-4 bg-white/5 rounded-full group-hover:bg-white/20 transition-colors border border-white/5 group-hover:border-white/50">
                           <Github size={32} className="text-white" />
                        </div>
                        <span className="font-mono text-sm text-white/50 group-hover:text-white">GitHub</span>
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </SectionReveal>
            </section>

            {/* --- INFINITE MENU SECTION --- */}
            <section id="explore" className="relative w-full h-[500px] border-t border-white/5 overflow-hidden">
               <div className="absolute top-8 left-8 z-20 pointer-events-none">
                 <h2 className="text-sm font-tech text-neon-cyan uppercase tracking-[0.3em] border border-neon-cyan/30 px-3 py-1 bg-black/50 backdrop-blur-md rounded">
                   I cannot fit all of my favorite anime characters, but I love every single one anyway.

                 </h2>
               </div>
               <SectionReveal variant="slide" delay={0.2} className="w-full h-full">
                  <InfiniteMenu items={menuItems} scale={1} />
               </SectionReveal>
            </section>
              
            <footer className="border-t border-white/5 py-12 text-white/20 font-mono text-xs flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto uppercase tracking-widest px-6">
               <p>DESIGNED & CODED BY DIV © {new Date().getFullYear()}</p>
               <p>SYSTEM STATUS: ONLINE // v2.0.4</p>
            </footer>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
