import type { ContactFormPayload } from '../../types/contact.types';

export async function submitContactForm(payload: ContactFormPayload): Promise<{ success: boolean }> {
  console.info('[mock — no public backend endpoint yet] contact form submitted:', payload);
  return Promise.resolve({ success: true });
}
