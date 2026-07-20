import { useScrollReveal } from '../hooks/useScrollReveal';
import { Container } from '../components/common/Container';
import { SectionBadge } from '../components/common/SectionBadge';
import { Icon } from '../components/common/Icon';
import { FaqAccordionSection } from '../components/sections/shared/FaqAccordionSection';
import { CtaFormSection } from '../components/sections/shared/CtaFormSection';
import { useAsyncData } from '../hooks/useAsyncData';
import { getTeachers } from '../api/endpoints/teachers.api';
import { getFaqItems } from '../api/endpoints/faq.api';
import { milestones, studentReviews, timelineFooterText } from '../data/about.data';
import openBox from '../assets/illustrations/open-box.png';

const statRows = [
  { icon: 'improve' as const, label: (count: number) => `${count}+ Təhsil istiqaməti` },
  { icon: 'language' as const, label: () => 'Azərbaycan və Rus Bölməsi' },
  { icon: 'improve' as const, label: () => 'Onlayn və Offline Tədris' },
];

export function AboutPage() {
  const heroRef = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const teamRef = useScrollReveal<HTMLElement>();
  const timelineRef = useScrollReveal<HTMLElement>();
  const todayRef = useScrollReveal<HTMLElement>();
  const { data: teachers, isLoading } = useAsyncData(getTeachers, []);
  const { data: faqItems, isLoading: faqLoading } = useAsyncData(getFaqItems, []);

  return (
    <>
      <section ref={heroRef} className="reveal pt-14 sm:pt-20">
        <Container>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight text-ink-900 sm:text-5xl">
            <span className="text-brand-blue">5 il</span> ərzində keyfiyyətli təhsil təqdim edir, uğur
            hekayələrini birlikdə yazırıq.
          </h1>
          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl3 bg-surface-soft">
            <img
              src="https://images.weserv.nl/?url=picsum.photos/seed/classroom/1200/600"
              alt="Sinifdə tədris prosesi"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Container>
      </section>

      <section ref={teamRef} className="reveal py-20 sm:py-28">
        <Container>
          <SectionBadge>Heyətimiz</SectionBadge>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Yaxından tanış olaq
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading || !teachers
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-72 animate-pulse rounded-xl2 bg-surface-soft" />
                ))
              : teachers.slice(0, 3).map((teacher) => (
                  <article key={teacher.id} className="card-surface overflow-hidden">
                    <div className="aspect-[4/5] w-full bg-surface-soft">
                      <img
                        src={teacher.imageUrl}
                        alt={teacher.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="text-sm font-bold text-ink-900">{teacher.name}</p>
                        <p className="text-xs text-ink-500">{teacher.experience}+ il təcrübə</p>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue-light text-brand-blue">
                        in
                      </span>
                    </div>
                  </article>
                ))}
          </div>
        </Container>
      </section>

      <section ref={timelineRef} className="reveal border-y border-surface-line bg-surface-soft py-20 sm:py-28">
        <Container>
          <div className="timeline">
            {}
            <span className="section-badge">Tarixçəmiz</span>

            {}
            <div className="timeline__line timeline__line--down h-32 sm:h-44" />

            {}
            <div className="timeline__dot" />
            <div className="mx-auto mt-6 max-w-2xl text-center">
              <span className="section-badge">{milestones[0].year}</span>
              <h2 className="mt-6 text-2xl font-extrabold leading-tight text-ink-900 sm:text-3xl">
                {milestones[0].title}
              </h2>
              {milestones[0].subtitle && (
                <p className="mt-4 text-sm leading-relaxed text-ink-500">{milestones[0].subtitle}</p>
              )}
            </div>

            {}
            <div className="timeline__line timeline__line--up h-16 sm:h-24 mt-10" />
            <div className="h-8 sm:h-12" />
            <div className="timeline__line timeline__line--down h-16 sm:h-24" />

            {}
            <div className="timeline__dot" />
            <div className="mx-auto mt-6 max-w-2xl text-center">
              <span className="section-badge">{milestones[1].year}</span>
              <h2 className="mt-6 text-2xl font-extrabold leading-tight text-ink-900 sm:text-3xl">
                {milestones[1].title}
              </h2>
            </div>

            {}
            <div className="reviews-funnel mt-10">
              <div className="reviews-scatter">
                {studentReviews.map((review, i) => {
                  const layouts = [
                    { left: '0%', top: '0', rotate: '-3deg' },
                    { right: '0%', top: '15px', rotate: '2.5deg' },
                    { left: '10%', top: '110px', rotate: '2deg' },
                    { right: '2%', top: '125px', rotate: '-2deg' },
                    { left: '3%', top: '235px', rotate: '-1.5deg' },
                    { right: '5%', top: '265px', rotate: '3deg' },
                    { left: '8%', top: '370px', rotate: '2.5deg' },
                    { right: '5%', top: '385px', rotate: '-3deg' },
                  ];
                  const { rotate, ...pos } = layouts[i] || { rotate: '0deg' };
                  return (
                    <div key={review.id} className="review-item" style={{ ...pos, transform: `rotate(${rotate})` } as any}>
                      <div className="review-avatar">
                        <img src={review.avatar} alt={review.name} loading="lazy" />
                        <span>{review.name}</span>
                      </div>
                      <div className={`review-bubble review-bubble--${review.color}`}>{review.text}</div>
                    </div>
                  );
                })}
                <div className="reviews-funnel__box">
                  <img src={openBox} alt="" aria-hidden="true" />
                </div>
              </div>
            </div>

            {}
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink-500 sm:mt-14">
              {timelineFooterText}
            </p>
          </div>
        </Container>
      </section>

      <section ref={todayRef} className="reveal py-20 sm:py-28">
        <Container className="text-center">
          <SectionBadge>Bu gün</SectionBadge>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            Komandamız {teachers?.length ?? '—'} peşəkar müəllimə çatdı — hər biri öz sahəsində real
            təcrübəyə malik mütəxəssisdir.
          </h2>

          <div className="mx-auto mt-10 flex max-w-md flex-col gap-6">
            {statRows.map((row) => (
              <div key={row.icon + row.label(0)} className="flex flex-col items-center gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white">
                  <Icon name={row.icon} size={18} />
                </span>
                <p className="text-sm font-semibold text-ink-900">{row.label(6)}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-lg text-xl font-bold text-ink-900">
            6 000+ məzun təhsil və karyera yolunda uğurla irəliləyib
          </p>

          <div className="mt-8 aspect-[16/7] w-full overflow-hidden rounded-xl3 bg-surface-soft">
            <img
              src="https://images.weserv.nl/?url=picsum.photos/seed/graduates/1200/500"
              alt="Məzunlarımız"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Container>
      </section>

      <FaqAccordionSection items={faqItems ?? []} isLoading={faqLoading} />
      <CtaFormSection />
    </>
  );
}
