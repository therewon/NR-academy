import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMemo, useState } from 'react';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/sections/shared/PageHero';
import { CtaFormSection } from '../components/sections/shared/CtaFormSection';
import { useAsyncData } from '../hooks/useAsyncData';
import { getTeachers } from '../api/endpoints/teachers.api';
import { getCourses } from '../api/endpoints/courses.api';
import { deriveTeacherSubjects } from '../utils/deriveTeacherSubjects';
import { cn } from '../utils/cn';
import { FeedbackState } from '../components/common/FeedbackState';

export function TeachersPage() {
  const revealRef1 = useScrollReveal<HTMLElement>();
  const { data: teachers, isLoading: teachersLoading, error: teachersError, refetch: refetchTeachers } = useAsyncData(getTeachers, []);
  const { data: courses, isLoading: coursesLoading, error: coursesError, refetch: refetchCourses } = useAsyncData(getCourses, []);
  const [activeSubject, setActiveSubject] = useState<string>('Hamısı');

  const teachersWithSubjects = useMemo(
    () => (teachers && courses ? deriveTeacherSubjects(teachers, courses) : []),
    [teachers, courses]
  );

  const subjects = useMemo(
    () => ['Hamısı', ...new Set(teachersWithSubjects.flatMap((t) => t.subjects))],
    [teachersWithSubjects]
  );

  const filteredTeachers =
    activeSubject === 'Hamısı'
      ? teachersWithSubjects
      : teachersWithSubjects.filter((t) => t.subjects.includes(activeSubject));

  const isLoading = teachersLoading || coursesLoading;

  return (
    <>
      <PageHero
        eyebrow="Müəllimlərimiz"
        title="Gələcəyini peşəkar müəllimlərlə qur"
        subtitle="Sahəsində təcrübəli, nəticə yönümlü müəllim heyətimizlə tanış olun."
      />

      <section ref={revealRef1} className="reveal py-14 sm:py-20">
        <Container>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => setActiveSubject(subject)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  activeSubject === subject
                    ? 'border-brand-blue bg-brand-blue-light text-brand-blue'
                    : 'border-surface-line text-ink-700 hover:border-brand-blue'
                )}
              >
                {subject}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-5">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-48 animate-pulse rounded-xl2 bg-surface-soft" />
                ))
              : teachersError || coursesError
                ? (
                  <FeedbackState
                    title="Müəllimləri yükləmək mümkün olmadı"
                    description={(teachersError || coursesError)?.message}
                    onAction={() => { refetchTeachers(); refetchCourses(); }}
                  />
                )
              : filteredTeachers.map((teacher) => (
                  <article key={teacher.id} className="card-surface flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
                    <div className="h-40 w-full flex-none overflow-hidden rounded-xl2 bg-surface-soft sm:w-40">
                      <img
                        src={teacher.imageUrl}
                        alt={teacher.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink-900">{teacher.name}</h3>
                      <p className="text-xs text-ink-500">{teacher.experience}+ il təcrübə</p>

                      {teacher.subjects.length > 0 && (
                        <>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-500">
                            Öyrətdiyi fənlər:
                          </p>
                          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                            {teacher.subjects.map((subject) => (
                              <li key={subject} className="text-sm text-ink-700">
                                • {subject}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-500">Haqqında:</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-700">{teacher.bio}</p>
                    </div>
                  </article>
                ))}

            {!isLoading && filteredTeachers.length === 0 && (
              <p className="py-10 text-center text-sm text-ink-500">Bu fənn üzrə müəllim tapılmadı.</p>
            )}
          </div>
        </Container>
      </section>

      <CtaFormSection />
    </>
  );
}
