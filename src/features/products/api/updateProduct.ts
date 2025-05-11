import { Product } from "../types";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";

export const updateProduct = async (id: number, formData: FormData): Promise<ApiResponse<Product>> => {
  const response = await axiosClient.put<ApiResponse<Product>>(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};