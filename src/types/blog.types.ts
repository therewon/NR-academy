export interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  categoryName: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}
