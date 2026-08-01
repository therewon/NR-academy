import { apiClient, isMockMode } from '../client';
import { mockTeachers } from '../../data/teachers.mock';
import type { Teacher } from '../../types/teacher.types';
import { resolveApiAssetUrl } from '../url';

function normalizeTeacher(teacher: Teacher): Teacher {
  return { ...teacher, imageUrl: resolveApiAssetUrl(teacher.imageUrl) };
}

export async function getTeachers(): Promise<Teacher[]> {
  if (isMockMode) return Promise.resolve(mockTeachers);

  const { data } = await apiClient.get<Teacher[]>('/Teacher');
  return data.map(normalizeTeacher);
}

export async function getTeacherById(id: number): Promise<Teacher | undefined> {
  if (isMockMode) return Promise.resolve(mockTeachers.find((teacher) => teacher.id === id));

  const { data } = await apiClient.get<Teacher>(`/Teacher/${id}`);
  return normalizeTeacher(data);
}
