export interface Teacher {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
  experience: number;
}

export interface TeacherWithSubjects extends Teacher {
  subjects: string[];
}
