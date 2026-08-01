import { useScrollReveal } from '../hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { cn } from '../utils/cn';
import { useQuiz } from '../hooks/useQuiz';
import { quizSubjects } from '../data/quiz.mock';
import { ROUTES } from '../constants/routes';

const QUESTION_SECONDS = 10 * 60;

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export function QuizQuestionPage() {
  const revealRef1 = useScrollReveal<HTMLElement>();
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();
  const { subjectId, questions, answers, answerQuestion } = useQuiz();
  const stepIndex = Number(step) - 1;
  const question = questions[stepIndex];
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_SECONDS);

  useEffect(() => {
    setSecondsLeft(QUESTION_SECONDS);
    const interval = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(interval);
  }, [stepIndex]);

  useEffect(() => {
    if (!subjectId || questions.length === 0) {
      navigate(ROUTES.quizIntro, { replace: true });
    }
  }, [subjectId, questions.length, navigate]);

  if (!question) return null;

  const subjectLabel = quizSubjects.find((s) => s.id === subjectId)?.label ?? '';
  const isLast = stepIndex === questions.length - 1;
  const selectedOptionId = answers[question.id];
  const progressPercent = ((stepIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    if (isLast) {
      navigate(ROUTES.quizResult);
    } else {
      navigate(`/test/sual/${stepIndex + 2}`);
    }
  };

  return (
    <>
      <div className="h-1 w-full bg-brand-blue" />

      <section ref={revealRef1} className="reveal py-10 sm:py-14">
        <Container className="max-w-3xl">
          <div className="card-surface p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-ink-500">Seçilmiş fənn</p>
                <p className="text-sm font-bold text-ink-900">{subjectLabel}</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-xs text-ink-500">Sual {stepIndex + 1} / {questions.length}</p>
                <div className="mx-auto mt-2 h-2 max-w-[200px] overflow-hidden rounded-full bg-surface-soft">
                  <div
                    className="h-full rounded-full bg-brand-blue transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-500">Qalan vaxt</p>
                <p className="tabular-nums text-sm font-bold text-red-500">{formatTime(secondsLeft)}</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold text-brand-blue">Sual {stepIndex + 1}</p>
              <h1 className="mt-1 text-lg font-bold text-ink-900 sm:text-xl">{question.text}</h1>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {question.options.map((option, i) => {
                const isSelected = selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => answerQuestion(question.id, option.id)}
                    className={cn(
                      'flex items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium transition-all',
                      isSelected
                        ? 'border-brand-blue bg-brand-blue-light text-ink-900'
                        : 'border-surface-line bg-white text-ink-700 hover:border-brand-blue/40'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs font-bold',
                        isSelected
                          ? 'bg-brand-blue text-white'
                          : 'bg-surface-soft text-ink-500'
                      )}
                    >
                      {isSelected ? '✓' : LETTERS[i]}
                    </span>
                    {option.text}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={handleNext} disabled={!selectedOptionId} showArrow>
                {isLast ? 'Nəticəni gör' : 'Davam et'}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
