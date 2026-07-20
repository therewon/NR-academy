export interface ContactFormPayload {
  fullName: string;
  phone: string;
  interestedCourseId: string;
  language: 'AZ' | 'RU';
  note?: string;
}
