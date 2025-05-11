import { Product } from "../types";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";

export const createProduct = async (formData: FormData): Promise<ApiResponse<Product>> => {
  const response = await axiosClient.post<ApiResponse<Product>>('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data; 
};
