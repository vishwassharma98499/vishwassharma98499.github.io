export interface TimelineProject {
  title: string;
  bullets: string[];
  techStack: string[];
}

export interface TimelineEntry {
  company: string;
  role: string;
  location: string;
  dateRange: string;
  projects: TimelineProject[];
}
