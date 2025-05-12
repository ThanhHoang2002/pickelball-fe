import { Item, sfAnd, sfLike } from "spring-filter-query-builder";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";
import { Supplier, SupplierFilterParams, SupplierResponse } from "@/types/supplier";

/**
 * Lấy danh sách nhà cung cấp
 */
export const getAllSuppliers = async (
  params: SupplierFilterParams = {}
): Promise<SupplierResponse> => {
  const filter = sfAnd(
    [
      params.search && sfLike("name", params.search),
    ].filter(Boolean) as Item[]
  );
  
  const response = await axiosClient.get<ApiResponse<SupplierResponse>>("/suppliers", {
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
 * Lấy thông tin nhà cung cấp theo ID
 */
export const getSupplierById = async (id: number): Promise<Supplier> => {
  const response = await axiosClient.get<ApiResponse<Supplier>>(`/suppliers/${id}`);
  return response.data.data;
};

/**
 * Create a new supplier
 */
export const createSupplier = async (formData: FormData): Promise<Supplier> => {
  const response = await axiosClient.post<ApiResponse<Supplier>>('/suppliers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

/**
 * Update an existing supplier
 */
export const updateSupplier = async (id: number, formData: FormData): Promise<Supplier> => {
  const response = await axiosClient.put<ApiResponse<Supplier>>(`/suppliers/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

/**
 * Delete a supplier
 */
export const deleteSupplier = async (id: number): Promise<void> => {
  await axiosClient.delete<ApiResponse<void>>(`/suppliers/${id}`);
}; 