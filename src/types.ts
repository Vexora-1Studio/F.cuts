export interface PortfolioItem {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  category: 'youtube' | 'commercial' | 'shorts';
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  softwareUsed: string[];
  client: string;
  date: string;
  isDemo?: boolean;
}

export interface AIShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'ai-commercial' | 'ai-vfx' | 'ai-visuals' | 'ai-shortform';
  thumbnailUrl: string;
  videoUrl?: string;
  duration: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  aiTools: string[];
  deliverables: string[];
  workflowNotes: string;
  year: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  englishTitle: string;
  description: string;
  shortTag: string;
  visualType: 'longform' | 'shortform' | 'cinematic' | 'aivideo' | 'color';
  features: string[];
  deliverables: string[];
  featured?: boolean;
  accent: 'cyan' | 'magenta';
}
