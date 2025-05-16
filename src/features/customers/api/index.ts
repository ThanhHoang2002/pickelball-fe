import { Item, sfAnd, sfEqual, sfLike } from "spring-filter-query-builder";

import { CustomerFilterParams, CustomerResponse, Customer, CustomerFormData } from "@/features/customers/types/customer";
import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";

/**
 * Lấy danh sách khách hàng
 */
export const getCustomers = async (
  params: CustomerFilterParams = {}
): Promise<CustomerResponse> => {
  const filter = sfAnd(
    [
      params.search && sfLike("name", params.search),
      params.role && sfEqual("role.name", params.role),
      params.gender && sfEqual("gender", params.gender),
    ].filter(Boolean) as Item[]
  );
  
  const response = await axiosClient.get<ApiResponse<CustomerResponse>>("/users", {
    params: {
      page: params.page || 1,
      size: params.size || 10,
      filter: filter.toString() === "()" ? undefined : filter.toString(),
      sortBy: params.sortBy,
      sortDirection: params.sortDirection,
    },
  });
  return response.data.data;
};

/**
 * Lấy thông tin khách hàng theo ID
 */
export const getCustomerById = async (id: number): Promise<Customer> => {
  const response = await axiosClient.get<ApiResponse<Customer>>(`/users/${id}`);
  return response.data.data;
};

/**
 * Tạo mới khách hàng
 */
export const createCustomer = async (customerData: CustomerFormData): Promise<Customer> => {
  // Tạo FormData để gửi dữ liệu dạng multipart
  const formData = new FormData();
  
  // Thêm các trường dữ liệu cơ bản
  formData.append('name', customerData.name);
  formData.append('email', customerData.email);
  formData.append('gender', customerData.gender);
  formData.append('roleId', customerData.roleId.toString());
  
  // Thêm mật khẩu khi tạo mới (bắt buộc)
  if (customerData.password) {
    formData.append('password', customerData.password);
  }
  
  // Thêm địa chỉ nếu có
  if (customerData.address) {
    formData.append('address', customerData.address);
  }
  
  // Thêm file avatar nếu có
  if (customerData.avatar instanceof File) {
    formData.append('avatar', customerData.avatar);
  }
  
  const response = await axiosClient.post<ApiResponse<Customer>>(
    '/users', 
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  
  return response.data.data;
};

/**
 * Cập nhật thông tin khách hàng
 */
export const updateCustomer = async (id: number, customerData: CustomerFormData): Promise<Customer> => {
  // Tạo FormData để gửi dữ liệu dạng multipart
  const formData = new FormData();
  
  // Thêm các trường dữ liệu cơ bản
  formData.append('name', customerData.name);
  formData.append('email', customerData.email);
  formData.append('gender', customerData.gender);
  formData.append('roleId', customerData.roleId.toString());
  
  // Thêm mật khẩu nếu muốn thay đổi
  if (customerData.password) {
    formData.append('password', customerData.password);
  }
  
  // Thêm địa chỉ nếu có
  if (customerData.address) {
    formData.append('address', customerData.address);
  }
  
  // Thêm file avatar nếu có
  if (customerData.avatar instanceof File) {
    formData.append('avatar', customerData.avatar);
  }
  
  const response = await axiosClient.put<ApiResponse<Customer>>(
    `/users/${id}`, 
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  
  return response.data.data;
}; 