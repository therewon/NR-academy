import type { NavLink } from '../types/common.types';
import { ROUTES } from './routes';

export const primaryNavLinks: NavLink[] = [
  { id: 'courses', label: 'Kurslar', path: ROUTES.courses },
  { id: 'about', label: 'Haqqımızda', path: ROUTES.about },
  { id: 'teachers', label: 'Müəllimlər', path: ROUTES.teachers },
  { id: 'faq', label: 'FAQ', path: ROUTES.faq },
  { id: 'contact', label: 'Əlaqə', path: ROUTES.contact },
];

export const footerQuickLinks: NavLink[] = [
  { id: 'about', label: 'Haqqımızda', path: ROUTES.about },
  { id: 'teachers', label: 'Müəllimlər', path: ROUTES.teachers },
  { id: 'reviews', label: 'Tələbə rəyləri', path: ROUTES.home },
  { id: 'faq', label: 'FAQ', path: ROUTES.faq },
  { id: 'contact', label: 'Əlaqə', path: ROUTES.contact },
];

export const footerCourseLinks: NavLink[] = [
  { id: 'languages', label: 'Xarici dillər', path: ROUTES.courses },
  { id: 'preschool', label: 'Məktəbəqədər', path: ROUTES.courses },
  { id: 'improve', label: 'Təkmilləşdirmə', path: ROUTES.courses },
  { id: 'exam', label: 'Abituriyent hazırlığı', path: ROUTES.courses },
  { id: 'olympiad', label: 'Olimpiada hazırlığı', path: ROUTES.courses },
];
