import { useScrollReveal } from '../hooks/useScrollReveal';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/sections/shared/PageHero';
import { FaqAccordionSection } from '../components/sections/shared/FaqAccordionSection';
import { CtaFormSection } from '../components/sections/shared/CtaFormSection';
import { CourseCard } from '../components/course/CourseCard';
import { useAsyncData } from '../hooks/useAsyncData';
import { getCourses } from '../api/endpoints/courses.api';
import { getFaqItems } from '../api/endpoints/faq.api';

export function CoursesPage() {
  const revealRef1 = useScrollReveal<HTMLElement>();
  const { data: courses, isLoading } = useAsyncData(getCourses, []);
  const { data: faqItems, isLoading: faqLoading } = useAsyncData(getFaqItems, []);

  return (
    <>
      <PageHero
        eyebrow="Kurslarımız"
        title="Hər hədəf üçün doğru başlanğıc"
        subtitle="Məktəbəqədər hazırlıqdan olimpiada səviyyəsinə qədər hər tələbəyə uyğun proqram."
      />

      <section ref={revealRef1} className="reveal py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading || !courses
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-[260px] w-full animate-pulse rounded-xl2 bg-surface-soft" />
                ))
              : courses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        </Container>
      </section>

      <FaqAccordionSection items={faqItems ?? []} isLoading={faqLoading} />
      <CtaFormSection />
    </>
  );
}
