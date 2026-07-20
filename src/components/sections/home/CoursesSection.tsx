import { useTranslation } from 'react-i18next';
import { Container } from '../../common/Container';
import { SectionBadge } from '../../common/SectionBadge';
import { Button } from '../../common/Button';
import { CourseCard } from '../../course/CourseCard';
import { useAsyncData } from '../../../hooks/useAsyncData';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { getCourses } from '../../../api/endpoints/courses.api';
import { ROUTES } from '../../../constants/routes';

export function CoursesSection() {
  const { data: courses, isLoading } = useAsyncData(getCourses, []);
  const { t } = useTranslation();
  const headingRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>({ stagger: 180 });

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div ref={headingRef} className="reveal">
          <SectionBadge>{t('courses.badge')}</SectionBadge>
          <h2 className="mt-5 max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            {t('courses.title')}
          </h2>
        </div>

        <div ref={gridRef} className="reveal mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading || !courses
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[260px] w-full animate-pulse rounded-xl2 bg-surface-soft" />
              ))
            : courses.slice(0, 6).map((course) => (
                <div key={course.id} className="reveal-child">
                  <CourseCard course={course} />
                </div>
              ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button to={ROUTES.courses}>{t('courses.viewAll')}</Button>
        </div>
      </Container>
    </section>
  );
}
