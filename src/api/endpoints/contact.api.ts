import type { ContactFormPayload } from '../../types/contact.types';

export async function submitContactForm(payload: ContactFormPayload): Promise<{ success: boolean }> {
  void payload;
  throw new Error('Müraciət endpoint-i backend-də hələ mövcud deyil.');
}

export const isContactSubmissionAvailable = false;
