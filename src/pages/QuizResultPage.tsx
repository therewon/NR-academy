import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Icon } from '../components/common/Icon';
import { RegisterModal } from '../components/common/RegisterModal';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useQuiz } from '../context/QuizContext';
import { ROUTES } from '../constants/routes';

export function QuizResultPage() {
  const navigate = useNavigate();
  const { questions, score, startedAt, refNumber, finishQuiz, reset } = useQuiz();
  const [showRegister, setShowRegister] = useState(false);
  const [copied, setCopied] = useState(false);

  const { t } = useTranslation();
  const resultRef = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  useEffect(() => {
    if (questions.length === 0) {
      navigate(ROUTES.quizIntro, { replace: true });
      return;
    }
    if (!refNumber) {
      finishQuiz();
    }
    const timer = setTimeout(() => setShowRegister(true), 1200);
    return () => clearTimeout(timer);
  }, [questions.length, navigate, refNumber, finishQuiz]);

  if (questions.length === 0) return null;

  const elapsedSeconds = startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0;
  const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
  const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');

  const handleNewTest = () => {
    reset();
    navigate(ROUTES.quizIntro);
  };

  const handleCopy = () => {
    if (refNumber) {
      navigator.clipboard.writeText(refNumber).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <>
      <div className="h-1 w-full bg-brand-blue" />

      <section ref={resultRef} className={showRegister ? 'reveal py-10 blur-sm sm:py-14' : 'reveal py-10 sm:py-14'}>
        <Container className="max-w-3xl">
          <div className="rounded-xl3 bg-surface-soft p-8 sm:p-10">
            <h1 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
              {t('quiz.completed')}
            </h1>
            <p className="mt-1 text-sm text-ink-500">
              Aşağıda nəticələrinizlə tanış ola bilərsiniz.
            </p>

            {}
            {refNumber && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-brand-blue-light px-5 py-3">
                <Icon name="exam" size={18} className="flex-none text-brand-blue" />
                <div className="flex-1">
                  <p className="text-xs text-ink-500">İş nömrəniz (yadda saxlayın)</p>
                  <p className="text-lg font-extrabold tabular-nums text-brand-blue">{refNumber}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-blue shadow-sm transition-colors hover:bg-brand-blue hover:text-white"
                >
                  {copied ? 'Kopyalandı!' : 'Kopyala'}
                </button>
              </div>
            )}

            <p className="mt-8 text-5xl font-extrabold text-ink-900">
              {score.correct}
              <span className="text-2xl text-ink-500">/{questions.length}</span>
            </p>
            <p className="text-sm text-ink-500">Ümumi nəticəniz</p>

            <div className="mt-8 flex gap-4">
              <div className="rounded-xl2 bg-white px-5 py-4">
                <p className="text-lg font-bold text-ink-900">
                  {score.correct}<span className="text-sm text-ink-500">/{questions.length}</span>
                </p>
                <p className="text-xs text-ink-500">Düzgün cavab</p>
              </div>
              <div className="rounded-xl2 bg-white px-5 py-4">
                <p className="text-lg font-bold text-ink-900">
                  {score.wrong}<span className="text-sm text-ink-500">/{questions.length}</span>
                </p>
                <p className="text-xs text-ink-500">Səhv cavab</p>
              </div>
              <div className="rounded-xl2 bg-white px-5 py-4">
                <p className="text-lg font-bold tabular-nums text-ink-900">
                  {minutes}:{seconds}
                </p>
                <p className="text-xs text-ink-500">Sərf olunan vaxt</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button to={ROUTES.home} variant="outline">
              Ana səhifə
            </Button>
            <Button onClick={handleNewTest} showArrow>
              Yeni test
            </Button>
          </div>
        </Container>
      </section>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}
