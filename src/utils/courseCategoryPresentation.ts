import type { TintColor } from '../types/common.types';
import type { IconName } from '../components/common/Icon';

export interface CoursePresentation {
  tint: TintColor;
  icon: IconName;
}

const KEYWORD_RULES: Array<{ keywords: string[]; presentation: CoursePresentation }> = [
  { keywords: ['dil', 'language', 'ielts', 'toefl'], presentation: { tint: 'green', icon: 'language' } },
  { keywords: ['ibtidai', 'primary'], presentation: { tint: 'purple', icon: 'primary' } },
  { keywords: ['təkmilləşdirmə', 'improve'], presentation: { tint: 'yellow', icon: 'improve' } },
  { keywords: ['məktəbəqədər', 'preschool'], presentation: { tint: 'peach', icon: 'preschool' } },
  { keywords: ['abituriyent', 'exam', 'imtahan'], presentation: { tint: 'blue', icon: 'exam' } },
  { keywords: ['olimpiada', 'olympiad'], presentation: { tint: 'pink', icon: 'olympiad' } },
];

const FALLBACK: CoursePresentation = { tint: 'blue', icon: 'exam' };

export function getCoursePresentation(title: string): CoursePresentation {
  const normalized = title.toLocaleLowerCase('az');
  const match = KEYWORD_RULES.find((rule) => rule.keywords.some((keyword) => normalized.includes(keyword)));
  return match?.presentation ?? FALLBACK;
}
