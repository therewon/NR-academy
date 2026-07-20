import type { QuizQuestion, QuizSubject } from '../types/quiz.types';

export const quizSubjects: QuizSubject[] = [
  { id: 'english', label: 'İngilis dili' },
  { id: 'azerbaijani', label: 'Azərbaycan dili' },
  { id: 'history', label: 'Tarix' },
  { id: 'geography', label: 'Coğrafiya' },
  { id: 'biology', label: 'Biologiya' },
  { id: 'math', label: 'Riyaziyyat' },
  { id: 'chemistry', label: 'Kimya' },
  { id: 'physics', label: 'Fizika' },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q-en-1',
    subjectId: 'english',
    text: 'Which sentence is grammatically correct?',
    options: [
      { id: 'a', text: 'She has been working here since five years.' },
      { id: 'b', text: 'She has been working here for five years.' },
      { id: 'c', text: 'She is working here since five years.' },
      { id: 'd', text: 'She have been working here for five years.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q-en-2',
    subjectId: 'english',
    text: 'Choose the correct word: "I ___ to the store yesterday."',
    options: [
      { id: 'a', text: 'go' },
      { id: 'b', text: 'goes' },
      { id: 'c', text: 'went' },
      { id: 'd', text: 'gone' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'q-en-3',
    subjectId: 'english',
    text: 'What is the opposite of "increase"?',
    options: [
      { id: 'a', text: 'Raise' },
      { id: 'b', text: 'Decrease' },
      { id: 'c', text: 'Expand' },
      { id: 'd', text: 'Grow' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q-en-4',
    subjectId: 'english',
    text: 'Which is a synonym of "happy"?',
    options: [
      { id: 'a', text: 'Sad' },
      { id: 'b', text: 'Angry' },
      { id: 'c', text: 'Joyful' },
      { id: 'd', text: 'Tired' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'q-en-5',
    subjectId: 'english',
    text: 'Complete: "If it rains, I ___ stay home."',
    options: [
      { id: 'a', text: 'will' },
      { id: 'b', text: 'would' },
      { id: 'c', text: 'am' },
      { id: 'd', text: 'was' },
    ],
    correctOptionId: 'a',
  },
  ...(['azerbaijani', 'history', 'geography', 'biology', 'math', 'chemistry', 'physics'] as const).map(
    (subjectId, i) => ({
      id: `q-${subjectId}-1`,
      subjectId,
      text: `Nümunə sual — ${subjectId} fənni üzrə (${i + 1})`,
      options: [
        { id: 'a', text: 'Variant A' },
        { id: 'b', text: 'Variant B' },
        { id: 'c', text: 'Variant C' },
        { id: 'd', text: 'Variant D' },
      ],
      correctOptionId: 'a',
    })
  ),
];

export function getQuestionsForSubject(subjectId: string): QuizQuestion[] {
  return quizQuestions.filter((q) => q.subjectId === subjectId);
}
