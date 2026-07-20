import { faqItems } from '../../data/faq.data';
import type { FaqItem } from '../../types/faq.types';

export async function getFaqItems(): Promise<FaqItem[]> {
  return Promise.resolve(faqItems);
}
