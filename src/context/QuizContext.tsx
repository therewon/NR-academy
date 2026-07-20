import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { getQuestionsForSubject, quizSubjects } from '../data/quiz.mock';
import type { QuizQuestion } from '../types/quiz.types';

export interface StoredResult {
  refNumber: string;
  subjectLabel: string;
  correct: number;
  wrong: number;
  total: number;
  elapsed: string;
  date: string;
}

interface QuizState {
  subjectId: string | null;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  startedAt: number | null;
  refNumber: string | null;
  selectSubject: (subjectId: string) => void;
  answerQuestion: (questionId: string, optionId: string) => void;
  finishQuiz: () => void;
  reset: () => void;
  score: { correct: number; wrong: number; total: number };
  lookupResult: (refNumber: string) => StoredResult | null;
}

const QuizContext = createContext<QuizState | null>(null);

function generateRefNumber(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

const resultStore = new Map<string, StoredResult>();

export function QuizProvider({ children }: PropsWithChildren) {
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [refNumber, setRefNumber] = useState<string | null>(null);

  const selectSubject = (id: string) => {
    setSubjectId(id);
    setQuestions(getQuestionsForSubject(id));
    setAnswers({});
    setStartedAt(Date.now());
    setRefNumber(null);
  };

  const answerQuestion = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const score = useMemo(() => {
    const correct = questions.filter((q) => answers[q.id] === q.correctOptionId).length;
    const answeredCount = Object.keys(answers).length;
    return { correct, wrong: answeredCount - correct, total: questions.length };
  }, [questions, answers]);

  const finishQuiz = () => {
    const ref = generateRefNumber();
    setRefNumber(ref);

    const elapsedSec = startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0;
    const mm = Math.floor(elapsedSec / 60).toString().padStart(2, '0');
    const ss = (elapsedSec % 60).toString().padStart(2, '0');

    const subjectLabel = quizSubjects.find((s) => s.id === subjectId)?.label ?? '';

    resultStore.set(ref, {
      refNumber: ref,
      subjectLabel,
      correct: score.correct,
      wrong: score.wrong,
      total: questions.length,
      elapsed: `${mm}:${ss}`,
      date: new Date().toLocaleDateString('az'),
    });
  };

  const reset = () => {
    setSubjectId(null);
    setQuestions([]);
    setAnswers({});
    setStartedAt(null);
    setRefNumber(null);
  };

  const lookupResult = (ref: string): StoredResult | null => {
    return resultStore.get(ref) ?? null;
  };

  return (
    <QuizContext.Provider
      value={{ subjectId, questions, answers, startedAt, refNumber, selectSubject, answerQuestion, finishQuiz, reset, score, lookupResult }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within a QuizProvider');
  return ctx;
}
