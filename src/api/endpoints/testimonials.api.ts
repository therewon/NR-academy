import { apiClient, isMockMode } from '../client';
import type { Testimonial } from '../../types/testimonial.types';

export async function getTestimonials(): Promise<Testimonial[]> {
  if (isMockMode) return [];

  const { data } = await apiClient.get<Testimonial[]>('/Testimonials');
  return data;
}
