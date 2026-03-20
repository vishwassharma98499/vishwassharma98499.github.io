export interface Project {
  id: string;
  title: string;
  description: string;
  emoji: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
}
