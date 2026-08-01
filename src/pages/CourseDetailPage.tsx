import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParams } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Icon } from '../components/common/Icon';
import { FaqAccordionSection } from '../components/sections/shared/FaqAccordionSection';
import { CtaFormSection } from '../components/sections/shared/CtaFormSection';
import { PlaceholderPage } from './PlaceholderPage';
import { useAsyncData } from '../hooks/useAsyncData';
import { getCourseById } from '../api/endpoints/courses.api';
import { getFaqItems } from '../api/endpoints/faq.api';
import { COURSE_LEVEL_LABELS } from '../types/course.types';
import { genericCurriculum } from '../data/curriculum.data';
import { ROUTES } from '../constants/routes';
import { FeedbackState } from '../components/common/FeedbackState';
import { getCertificates } from '../api/endpoints/certificates.api';

export function CourseDetailPage() {
  const revealRef1 = useScrollReveal<HTMLElement>();
  const revealRef2 = useScrollReveal<HTMLElement>();
  const revealRef3 = useScrollReveal<HTMLElement>();
  const revealRef4 = useScrollReveal<HTMLElement>();
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);
  const { data: course, isLoading, error, refetch } = useAsyncData(() => getCourseById(courseId), [courseId]);
  const { data: faqItems, isLoading: faqLoading } = useAsyncData(getFaqItems, []);
  const {
    data: certificates,
    isLoading: certificatesLoading,
    error: certificatesError,
    refetch: refetchCertificates,
  } = useAsyncData(getCertificates, []);
  const courseCertificates = certificates?.filter((certificate) => certificate.courseId === courseId) ?? [];

  if (!isLoading && !error && !course) {
    return <PlaceholderPage title="Kurs tapılmadı" description="Axtardığınız kurs mövcud deyil." />;
  }

  return (
    <>
      <section ref={revealRef1} className="reveal pt-14 sm:pt-20">
        <Container className="text-center">
          {error ? (
            <FeedbackState title="Kurs məlumatı yüklənmədi" description={error.message} onAction={refetch} />
          ) : isLoading || !course ? (
            <div className="mx-auto h-24 w-full max-w-xl animate-pulse rounded-xl2 bg-surface-soft" />
          ) : (
            <>
              <h1 className="mx-auto max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                {course.title}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">
                {course.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-ink-700">
                <span className="section-badge">{COURSE_LEVEL_LABELS[course.level]} səviyyə</span>
                <span className="section-badge">{course.duration} ay</span>
                <span className="section-badge">{course.price} AZN</span>
              </div>
              <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl3 bg-surface-soft">
                <img src={course.imageUrl} alt={course.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
            </>
          )}
        </Container>
      </section>

      <section ref={revealRef2} className="reveal py-20 sm:py-28">
        <Container>
          <span className="section-badge">Tədris proqramı</span>
          <h2 className="mt-5 max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            Kursun hər səviyyəsində nə öyrənəcəksiniz?
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-[280px_1fr]">
            <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col">
              {genericCurriculum.map((level, i) => (
                <div
                  key={level.id}
                  className={`flex-none rounded-xl2 border px-4 py-3 text-sm font-semibold lg:flex-auto ${
                    i === 0 ? 'border-brand-blue bg-brand-blue-light text-brand-blue' : 'border-surface-line text-ink-700'
                  }`}
                >
                  {level.code} <span className="font-normal text-ink-500">({level.label})</span>
                </div>
              ))}
            </div>

            <div className="card-surface p-6 sm:p-8">
              <p className="text-sm font-semibold text-ink-500">
                {course?.title ?? 'Kurs'} sıfırdan → {genericCurriculum[0].code} ({genericCurriculum[0].label})
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                <span className="font-bold">Nəticə: </span>
                {genericCurriculum[0].outcome}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-500">
                Kursun məzmunu:
              </p>
              <ul className="mt-2 flex flex-col gap-2">
                {genericCurriculum[0].content.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                    <Icon name="check" size={14} className="mt-0.5 flex-none text-brand-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {course?.teacher && (
        <section ref={revealRef3} className="reveal py-20 sm:py-28">
          <Container>
            <span className="section-badge">Müəllim heyətimiz</span>
            <h2 className="mt-5 max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
              Təhsil yolunda ən güclü tərəfdaşınız
            </h2>
            <div className="mt-8 max-w-sm">
              <Button to={ROUTES.teachers} variant="outline" showArrow>
                {course.teacher.fullName} — profilə bax
              </Button>
            </div>
          </Container>
        </section>
      )}

      <section ref={revealRef4} className="reveal py-20 sm:py-28">
        <Container>
          <span className="section-badge">Uğurlu nəticələrimiz</span>
          <h2 className="mt-5 max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            Bu kursu keçən tələbələrimiz
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {certificatesError ? (
              <FeedbackState
                title="Nəticələri yükləmək mümkün olmadı"
                description={certificatesError.message}
                onAction={refetchCertificates}
              />
            ) : certificatesLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-44 animate-pulse rounded-xl2 bg-surface-soft" />
              ))
            ) : courseCertificates.length === 0 ? (
              <FeedbackState title="Bu kurs üzrə nəticə hələ yoxdur" description="Sertifikatlar verildikdə burada görünəcək." />
            ) : (
              courseCertificates.slice(0, 4).map((certificate) => (
                <article key={certificate.id} className="card-surface flex min-h-44 flex-col justify-between p-5">
                  <div>
                    <span className="inline-flex rounded-full bg-brand-blue-light px-3 py-1 text-xs font-bold text-brand-blue">
                      {certificate.score}%
                    </span>
                    <h3 className="mt-4 text-base font-bold text-ink-900">{certificate.testTitle}</h3>
                    <p className="mt-1 text-xs text-ink-500">{certificate.certificateType}</p>
                  </div>
                  {certificate.certificateUrl && (
                    <a
                      href={certificate.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 text-sm font-semibold text-brand-blue hover:underline"
                    >
                      Sertifikata bax
                    </a>
                  )}
                </article>
              ))
            )}
          </div>
        </Container>
      </section>

      <FaqAccordionSection items={faqItems ?? []} isLoading={faqLoading} />
      <CtaFormSection />
    </>
  );
}
