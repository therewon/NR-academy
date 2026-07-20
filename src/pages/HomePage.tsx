import { Hero } from '../components/sections/home/Hero';
import { PartnersMarquee } from '../components/sections/home/PartnersMarquee';
import { AboutSection } from '../components/sections/home/AboutSection';
import { CoursesSection } from '../components/sections/home/CoursesSection';
import { QuizBanner } from '../components/sections/home/QuizBanner';
import { TeachersSection } from '../components/sections/home/TeachersSection';
import { TestimonialsSection } from '../components/sections/home/TestimonialsSection';
import { FaqSection } from '../components/sections/home/FaqSection';
import { CtaFormSection } from '../components/sections/shared/CtaFormSection';

export function HomePage() {
  return (
    <>
      <Hero />
      <PartnersMarquee />
      <AboutSection />
      <CoursesSection />
      <QuizBanner />
      <TeachersSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaFormSection />
    </>
  );
}
