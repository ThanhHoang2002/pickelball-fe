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

/**
 * Form data for creating or updating a customer
 */
export interface CustomerFormData {
  name: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  roleId: number;
  address?: string;
  avatar?: File | null;
  password?: string;
}

// Thu00eam CustomerFormData type 