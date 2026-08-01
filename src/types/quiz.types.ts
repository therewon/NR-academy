export interface QuizSubject {
  id: string;
  label: string;
}

export interface QuizAnswerOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  subjectId: string;
  text: string;
  options: QuizAnswerOption[];
  correctOptionId: string;
}

export interface StoredResult {
  refNumber: string;
  subjectLabel: string;
  correct: number;
  wrong: number;
  total: number;
  elapsed: string;
  date: string;
}
