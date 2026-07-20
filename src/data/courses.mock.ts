import { CourseLevel } from '../types/course.types';
import type { Course } from '../types/course.types';
import { mockTeachers } from './teachers.mock';

function teacherRef(id: number) {
  const teacher = mockTeachers.find((t) => t.id === id)!;
  return { teacherId: teacher.id, teacherName: teacher.name, teacher: { id: teacher.id, fullName: teacher.name } };
}

export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Xarici Dillər',
    description: 'İngilis, Alman, Fransız və digər dillərdə fərdi yanaşma tələb edən proqram.',
    price: 120,
    imageUrl: 'https://images.weserv.nl/?url=picsum.photos/seed/lang/600/400',
    level: CourseLevel.Beginner,
    duration: 5,
    ...teacherRef(2),
  },
  {
    id: 2,
    title: 'İbtidai Sinif',
    description: '1-4-cü sinif şagirdləri üçün əsas fənlər üzrə dəstək proqramı.',
    price: 90,
    imageUrl: 'https://images.weserv.nl/?url=picsum.photos/seed/primary/600/400',
    level: CourseLevel.Beginner,
    duration: 9,
    ...teacherRef(8),
  },
  {
    id: 3,
    title: 'Təkmilləşdirmə',
    description: '5-9-cu sinif şagirdləri üçün fənlər üzrə bilik və bacarıqların gücləndirilməsi.',
    price: 100,
    imageUrl: 'https://images.weserv.nl/?url=picsum.photos/seed/improve/600/400',
    level: CourseLevel.Intermediate,
    duration: 9,
    ...teacherRef(6),
  },
  {
    id: 4,
    title: 'Məktəbəqədər Hazırlıq',
    description: '5-6 yaş aralığı uşaqlar üçün oxu-yazı və məntiq hazırlığı.',
    price: 80,
    imageUrl: 'https://images.weserv.nl/?url=picsum.photos/seed/preschool/600/400',
    level: CourseLevel.Beginner,
    duration: 9,
    ...teacherRef(4),
  },
  {
    id: 5,
    title: 'Abituriyent Hazırlığı',
    description: 'Buraxılış imtahanına hərtərəfli hazırlıq proqramı.',
    price: 150,
    imageUrl: 'https://images.weserv.nl/?url=picsum.photos/seed/exam/600/400',
    level: CourseLevel.Advanced,
    duration: 12,
    ...teacherRef(1),
  },
  {
    id: 6,
    title: 'Olimpiada Hazırlığı',
    description: 'Respublika və beynəlxalq olimpiadalara ixtisaslaşmış hazırlıq.',
    price: 150,
    imageUrl: 'https://images.weserv.nl/?url=picsum.photos/seed/olympiad/600/400',
    level: CourseLevel.Advanced,
    duration: 12,
    ...teacherRef(5),
  },
];
