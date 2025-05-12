import { Item, sfAnd, sfEqual, sfLike } from "spring-filter-query-builder";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";
import { CustomerFilterParams, CustomerResponse, Customer } from "@/types/customer";

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