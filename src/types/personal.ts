export interface PersonalInfo {
  name: string;
  initials: string;
  title: string;
  subtitle: string;
  location: string;
  tagline: string;
  avatarUrl: string;
  resumeUrl: string;
}

export interface ContactLink {
  platform: string;
  emoji: string;
  label: string;
  value: string;
  href: string;
}

export interface AvailabilityInfo {
  status: string;
  description: string;
  details: { label: string; value: string }[];
}
