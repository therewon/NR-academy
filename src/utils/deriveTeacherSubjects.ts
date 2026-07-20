import type { Course } from '../types/course.types';
import type { Teacher, TeacherWithSubjects } from '../types/teacher.types';

export function deriveTeacherSubjects(teachers: Teacher[], courses: Course[]): TeacherWithSubjects[] {
  return teachers.map((teacher) => ({
    ...teacher,
    subjects: [
      ...new Set(courses.filter((course) => course.teacherId === teacher.id).map((course) => course.title)),
    ],
  }));
}
