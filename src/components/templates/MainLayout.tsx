import { SkipToContent } from "@/components/atoms";
import {
  ParticleCanvas,
  FloatingShapes,
  ScrollBackground,
  Navbar,
  Footer,
} from "@/components/organisms";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <SkipToContent />
      <ParticleCanvas />
      <FloatingShapes />
      <ScrollBackground />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
