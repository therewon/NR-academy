export interface ApiListResponse<T> {
  data: T[];
  meta?: {
    total: number;
    page?: number;
    pageSize?: number;
  };
}

export interface ApiItemResponse<T> {
  data: T;
}

export interface NavLink {
  id: string;
  label: string;
  path: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon?: string;
}

export type TintColor = 'green' | 'purple' | 'yellow' | 'peach' | 'blue' | 'pink';
