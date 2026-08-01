import { createContext } from 'react';
import type { QuizQuestion, StoredResult } from '../types/quiz.types';

export interface QuizState {
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

export const QuizContext = createContext<QuizState | null>(null);
