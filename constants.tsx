
import { Season, Project } from './types';
import { Layers, Cpu, Home, Terminal } from 'lucide-react';

export const SEASONS: Season[] = [
  Season.Vasant,
  Season.Grishma,
  Season.Varsha,
  Season.Sharad,
  Season.Hemant,
  Season.Shishir
];

export const PROJECTS: Project[] = [
  // HERO TILES (Large 2x2 or Wide 2x1)
  {
    id: 'yokoso',
    title: 'Yokoso',
    description: 'Experimental immersive interface playground where gradients, particles, and motion create a living UI environment.',
    tech: ['HTML', 'CSS', 'JS', 'WebGL'],
    link: 'https://divicoded.github.io/yokoso/',
    size: 'large',
    highlight: 'Hero Experience',
    image: 'https://divicoded.github.io/portfoliodivi/images/yokoso.png',
    languages: [{ name: 'CSS', percent: 50.7 }, { name: 'JS', percent: 33.3 }, { name: 'HTML', percent: 16 }]
  },
  {
    id: 'fractured',
    title: 'FRACTURED',
    description: 'High-fidelity narrative game engine turning the browser into a psychological interface with meta-memory and glitches.',
    tech: ['React 19', 'TypeScript', 'Tailwind'],
    link: 'https://divicoded.github.io/fractured-game/',
    size: 'large',
    highlight: 'Game Engine',
    image: 'https://divicoded.github.io/portfoliodivi/images/fractured.png',
    languages: [{ name: 'TypeScript', percent: 93.3 }, { name: 'HTML', percent: 6.2 }, { name: 'JS', percent: 0.5 }]
  },
  {
    id: 'hushwood',
    title: 'Hushwood',
    description: 'Choice-driven narrative experience featuring visual storytelling, persistent memory, and image-based decisions.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    link: 'https://divicoded.github.io/hushwood/',
    size: 'wide',
    highlight: 'Interactive Narrative',
    image: 'https://divicoded.github.io/portfoliodivi/images/hushwood.png'
  },
  {
    id: 'inkecho',
    title: 'InkEcho',
    description: 'Cinematic poetry anthology with atmosphere-driven UI, procedural mood particles, and 3D tilt cards.',
    tech: ['React 19', 'Framer Motion', 'Vite'],
    link: 'https://divicoded.github.io/ink-echo/',
    size: 'wide',
    highlight: 'Atmospheric UI',
    image: 'https://divicoded.github.io/portfoliodivi/images/inkecho.png',
    languages: [{ name: 'TypeScript', percent: 91.4 }, { name: 'HTML', percent: 8.6 }]
  },

  // MEDIUM TILES
  {
    id: 'replichat',
    title: 'RepliChat',
    description: 'Local chat viewer that reconstructs exported conversations into a modern messaging interface with smart parsing.',
    tech: ['Vanilla JS', 'CSS', 'Privacy-First'],
    link: 'https://divicoded.github.io/RepliChat/',
    size: 'medium',
    highlight: 'Tooling',
    image: 'https://divicoded.github.io/portfoliodivi/images/replichat.png',
    languages: [{ name: 'CSS', percent: 65.3 }, { name: 'JS', percent: 25.1 }, { name: 'HTML', percent: 9.6 }]
  },
  {
    id: 'mazetilt',
    title: 'MazeTilt',
    description: 'Physics-based tilt maze controlled by real-time device motion events.',
    tech: ['HTML', 'JS', 'Physics Engine'],
    link: 'https://divicoded.github.io/MazeTilt/',
    size: 'medium',
    highlight: 'Physics Interaction',
    languages: [{ name: 'HTML', percent: 47.5 }, { name: 'JS', percent: 42.5 }, { name: 'CSS', percent: 10 }]
  },

  // STANDARD TILES
  {
    id: 'poems',
    title: 'Poems',
    description: 'Digital poetry notebook blending writing and code.',
    tech: ['HTML', 'CSS', 'JS'],
    link: 'https://divicoded.github.io/Poems/',
    size: 'small',
    highlight: 'Literary UI'
  },
  {
    id: 'poems-alt',
    title: 'Poems Alt UI',
    description: 'Alternate interface experiment for poetry experience.',
    tech: ['UI Design'],
    link: 'https://divicoded.github.io/Poems/inkechov2.html',
    size: 'small',
    highlight: 'Variant'
  },
  {
    id: 'hii',
    title: 'Hii',
    description: 'Early prototype of Yokoso with animation experiments.',
    tech: ['Legacy'],
    link: 'https://divicoded.github.io/Hii/',
    size: 'small',
    highlight: 'Prototype'
  },
  {
    id: 'ansh',
    title: 'ANSH Assistant',
    description: 'Voice-powered desktop assistant performing tasks via speech.',
    tech: ['Python', 'Automation'],
    link: null,
    size: 'small',
    highlight: 'AI'
  }
];

export const NAV_ITEMS = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Work', href: '#work', icon: Layers },
  { label: 'Stats', href: '#skills', icon: Cpu },
  { label: 'Link', href: '#contact', icon: Terminal },
];

export const SKILLS = [
  "React",
  "TypeScript",
  "Next.js",
  "TailwindCSS",
  "GSAP",
  "Three.js",
  "WebGL",
  "Node.js",
  "Vite",
  "Python (Basic)",
  "Creative UI Engineering"
];
