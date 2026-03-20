import { MainLayout } from "@/components/templates/MainLayout";
import {
  HeroSection,
  ExpertiseSection,
  ExperienceSection,
  ProjectsSection,
  CertificationsSection,
  EducationSection,
  ContactSection,
} from "@/components/organisms";

export function HomePage() {
  return (
    <MainLayout>
      <HeroSection />

      {/* Section glow divider */}
      <div className="relative h-px z-[1] overflow-visible">
        <div
          className="absolute w-[500px] h-[200px] rounded-full -top-[100px] -left-[5%]"
          style={{
            background: "var(--accent)",
            filter: "blur(80px)",
            opacity: 0.06,
          }}
          aria-hidden="true"
        />
      </div>

      <ExpertiseSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <EducationSection />
      <ContactSection />
    </MainLayout>
  );
}
