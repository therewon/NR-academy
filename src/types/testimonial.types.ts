export interface Testimonial {
  id: number;
  userId: number;
  testId: number;
  reviewText: string;
  rating: number;
  createdAt: string;
}

export interface VideoTestimonial {
  id: string;
  studentName: string;
  courseLabel: string;
  resultLabel: string;
  thumbnailUrl: string;
  videoUrl: string;
}
