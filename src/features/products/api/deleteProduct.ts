import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";

export const deleteProduct = async (id: number): Promise<ApiResponse<void>> => {
  const response = await axiosClient.delete<ApiResponse<void>>(`/products/${id}`);
  return response.data;
};
