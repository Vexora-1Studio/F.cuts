export type Language = 'ar' | 'en';

export interface PortfolioItem {
  id: string;
  title: string;
  titleEn: string;
  englishTitle: string;
  description: string;
  descriptionEn: string;
  category: 'youtube' | 'commercial' | 'shorts';
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  softwareUsed: string[];
  client: string;
  clientEn: string;
  date: string;
  isDemo?: boolean;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  englishTitle: string;
  description: string;
  descriptionEn: string;
  shortTag: string;
  visualType: 'longform' | 'shortform' | 'cinematic' | 'aivideo' | 'color';
  features: string[];
  featuresEn: string[];
  deliverables: string[];
  deliverablesEn: string[];
  featured?: boolean;
  accent: 'cyan' | 'magenta';
}
