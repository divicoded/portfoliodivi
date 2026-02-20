
export enum Season {
  Vasant = 'vasant',   // Spring
  Grishma = 'grishma', // Summer
  Varsha = 'varsha',   // Monsoon/Rain
  Sharad = 'sharad',   // Autumn
  Hemant = 'hemant',   // Pre-winter
  Shishir = 'shishir'  // Winter
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  image?: string;
  featured?: boolean;
  size?: 'small' | 'medium' | 'large' | 'wide';
  highlight?: string;
  languages?: { name: string; percent: number }[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
}

export type ThemeMode = 'morning' | 'afternoon' | 'evening' | 'night';
