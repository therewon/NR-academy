import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { Container } from '../../common/Container';
import { SectionBadge } from '../../common/SectionBadge';
import { CarouselArrows } from '../../common/CarouselArrows';
import { Icon } from '../../common/Icon';
import { VideoModal } from '../../common/VideoModal';
import { useCarousel } from '../../../hooks/useCarousel';
import { testimonials as videoTestimonials } from '../../../data/testimonials.data';
import type { VideoTestimonial } from '../../../types/testimonial.types';

export function TestimonialsSection() {
  const { trackRef, scrollByPage } = useCarousel<HTMLDivElement>();
  const { t } = useTranslation();
  const sectionRef = useScrollReveal<HTMLElement>();
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  return (
    <section ref={sectionRef} className="reveal py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionBadge>{t('testimonials.badge')}</SectionBadge>
            <h2 className="mt-5 max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
              Tələbələrimiz nə deyir?
            </h2>
          </div>
          <CarouselArrows onPrev={() => scrollByPage('prev')} onNext={() => scrollByPage('next')} />
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {videoTestimonials.map((item) => (
                <article
                  key={item.id}
                  className="w-[62%] flex-none snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]"
                >
                  <button
                    type="button"
                    onClick={() => item.videoUrl && setActiveVideo(item)}
                    disabled={!item.videoUrl}
                    className="group relative block aspect-[3/4] w-full overflow-hidden rounded-xl2 bg-ink-900 disabled:cursor-not-allowed"
                    aria-label={`${item.studentName} rəyini izlə`}
                  >
                    <img
                      src={item.thumbnailUrl}
                      alt={item.studentName}
                      className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-60"
                      loading="lazy"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-blue shadow-floating transition-transform group-hover:scale-110">
                        <Icon name="play" size={18} />
                      </span>
                    </span>
                  </button>
                  <h3 className="mt-4 text-sm font-bold text-ink-900">{item.studentName}</h3>
                  <p className="mt-0.5 text-xs text-ink-500">{item.courseLabel}</p>
                  <p className="mt-0.5 text-xs font-semibold text-brand-blue">{item.resultLabel}</p>
                </article>
              ))}
        </div>
      </Container>

      {activeVideo?.videoUrl && (
        <VideoModal
          videoUrl={activeVideo.videoUrl}
          title={`${activeVideo.studentName} rəyi`}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
