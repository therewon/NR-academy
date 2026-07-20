import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { Container } from '../../common/Container';
import { SectionBadge } from '../../common/SectionBadge';
import { CarouselArrows } from '../../common/CarouselArrows';
import { useAsyncData } from '../../../hooks/useAsyncData';
import { useCarousel } from '../../../hooks/useCarousel';
import { getTeachers } from '../../../api/endpoints/teachers.api';

export function TeachersSection() {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal<HTMLElement>();
  const { data: teachers, isLoading } = useAsyncData(getTeachers, []);
  const { trackRef, scrollByPage } = useCarousel<HTMLDivElement>();

  return (
    <section ref={sectionRef} className="reveal py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionBadge>{t('teachers.badge')}</SectionBadge>
            <h2 className="mt-5 max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
              Hansı müəllimlər sənə arzuladığın təhsili verəcək?
            </h2>
          </div>
          <CarouselArrows onPrev={() => scrollByPage('prev')} onNext={() => scrollByPage('next')} />
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {isLoading || !teachers
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 w-[78%] flex-none animate-pulse rounded-xl2 bg-surface-soft sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]"
                />
              ))
            : teachers.map((teacher) => (
                <article
                  key={teacher.id}
                  className="w-[78%] flex-none snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-xl2 bg-surface-soft">
                    <img
                      src={teacher.imageUrl}
                      alt={teacher.name}
                      className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink-900">{teacher.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{teacher.bio}</p>
                </article>
              ))}
        </div>
      </Container>
    </section>
  );
}
