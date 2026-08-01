export interface Certificate {
  id: number;
  userId: number;
  courseId: number;
  certificateUrl: string;
  issuedAt: string;
  certificateType: string;
  score: number;
  testTitle: string;
}
