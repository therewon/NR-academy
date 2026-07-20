import { apiClient } from '../client';
import type { BlogPost, BlogCategory } from '../../types/blog.types';

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data } = await apiClient.get<BlogPost[]>('/BlogPost');
  return data;
}

export async function getBlogPostById(id: number): Promise<BlogPost> {
  const { data } = await apiClient.get<BlogPost>(`/BlogPost/${id}`);
  return data;
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const { data } = await apiClient.get<BlogCategory[]>('/BlogCategory');
  return data;
}
