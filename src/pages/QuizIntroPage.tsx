import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { ResultLookupModal } from '../components/common/ResultLookupModal';
import { cn } from '../utils/cn';
import { useQuiz } from '../hooks/useQuiz';
import { quizSubjects } from '../data/quiz.mock';

export function QuizIntroPage() {
  const revealRef1 = useScrollReveal<HTMLElement>();
  const navigate = useNavigate();
  const { subjectId, selectSubject } = useQuiz();
  const [showLookup, setShowLookup] = useState(false);

  const { t } = useTranslation();

  const handleStart = () => {
    if (!subjectId) return;
    navigate('/test/sual/1');
  };

  return (
    <>
      <section ref={revealRef1} className="reveal py-14 sm:py-20">
        <Container className="max-w-4xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {t('quiz.selectSubject')}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
            Bu demo testdir. Nəticə yalnız cari brauzer sessiyasında saxlanılır və şəxsi kabinetə göndərilmir.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {quizSubjects.map((subject) => (
              <button
                key={subject.id}
                type="button"
                onClick={() => selectSubject(subject.id)}
                className={cn(
                  'rounded-2xl border-2 px-4 py-8 text-center text-sm font-semibold transition-all',
                  subjectId === subject.id
                    ? 'border-brand-blue bg-brand-blue-light text-brand-blue'
                    : 'border-surface-line bg-white text-ink-700 hover:border-brand-blue/40'
                )}
              >
                {subject.label}
              </button>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowLookup(true)}
              className="text-sm font-medium text-ink-500 underline decoration-surface-line underline-offset-4 transition-colors hover:text-brand-blue hover:decoration-brand-blue"
            >
              Nəticənizə baxın
            </button>
            <Button onClick={handleStart} disabled={!subjectId} showArrow>
              Testə başla
            </Button>
          </div>
        </Container>
      </section>

      {showLookup && <ResultLookupModal onClose={() => setShowLookup(false)} />}
    </>
  );
}
