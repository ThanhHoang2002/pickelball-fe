import { Product } from "../types";

import axiosPublic from "@/lib/axios-public";
import { ApiResponse } from "@/types/apiResponse";

export const getProductById = async (id: string | number): Promise<ApiResponse<Product>> => {
  const response = await axiosPublic.get<ApiResponse<Product>>(`products/${id}`);
  return response.data;
};  