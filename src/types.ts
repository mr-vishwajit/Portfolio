export type Language = 'en' | 'hi';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  problem: string;
  dataset: string;
  tools: string[];
  process: string;
  keyInsight: string;
  businessResult: string;
  githubUrl: string;
  demoUrl: string;
  isPlaceholder: boolean;
}

export interface SuggestedProject {
  title: { en: string; hi: string };
  recommendedTools: string[];
  objective: { en: string; hi: string };
  suggestedDataset: { en: string; hi: string };
  whyItMatters: { en: string; hi: string };
}

export interface ExperienceItem {
  id: string;
  organization: { en: string; hi: string };
  location: { en: string; hi: string };
  role: { en: string; hi: string };
  period: { en: string; hi: string };
  tasks: { en: string[]; hi: string[] };
  notes?: { en: string; hi: string };
}

export interface EducationItem {
  id: string;
  degree: { en: string; hi: string };
  institution: { en: string; hi: string };
  location: { en: string; hi: string };
  timeline: { en: string; hi: string };
  timelineNote?: { en: string; hi: string };
  subjects: { en: string[]; hi: string[] };
}

export interface SkillCategory {
  name: { en: string; hi: string };
  description: { en: string; hi: string };
  skills: { name: string; isPrimary?: boolean }[];
}
