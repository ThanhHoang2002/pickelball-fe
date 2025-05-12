export interface CustomerRole {
  id: number;
  name: string;
  description?: string;
}

export interface Customer {
  id: number;
  email: string;
  name: string;
  gender: string;
  address?: string;
  updatedAt: string | null;
  createdAt: string;
  role: CustomerRole;
  avatar: string | null;
}

export interface CustomerResponse {
  meta: {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: Customer[];
}

export interface CustomerFilterParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  search?: string;
  role?: string;
  gender?: string;
} 