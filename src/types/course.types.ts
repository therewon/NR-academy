
export const CourseLevel = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
} as const;

export type CourseLevel = (typeof CourseLevel)[keyof typeof CourseLevel];

export interface TeacherInCourse {
  id: number;
  fullName: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  level: CourseLevel;
  duration: number;
  teacherId: number;
  teacherName: string;
  teacher: TeacherInCourse;
}

export const COURSE_LEVEL_LABELS: Record<CourseLevel, string> = {
  [CourseLevel.Beginner]: 'Başlanğıc',
  [CourseLevel.Intermediate]: 'Orta',
  [CourseLevel.Advanced]: 'İrəli',
};
