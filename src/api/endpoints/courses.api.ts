import { apiClient, isMockMode } from '../client';
import { mockCourses } from '../../data/courses.mock';
import type { Course } from '../../types/course.types';

export async function getCourses(): Promise<Course[]> {
  if (isMockMode) return Promise.resolve(mockCourses);

  const { data } = await apiClient.get<Course[]>('/Course');
  return data;
}

export async function getCourseById(id: number): Promise<Course | undefined> {
  if (isMockMode) return Promise.resolve(mockCourses.find((course) => course.id === id));

  const { data } = await apiClient.get<Course>(`/Course/${id}`);
  return data;
}
