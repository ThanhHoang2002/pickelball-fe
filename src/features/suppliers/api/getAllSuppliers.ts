import { Supplier } from "@/features/products/types";
import axiosPublic from "@/lib/axios-public";
import { ApiResponse } from "@/types/apiResponse";
import { DetailResponse } from "@/types/detailResponse";

export const getAllSuppliers = async () : Promise<DetailResponse<Supplier[]>> => {
  const response = await axiosPublic.get<ApiResponse<DetailResponse<Supplier[]>>>("/suppliers");
  return response.data.data;
};
