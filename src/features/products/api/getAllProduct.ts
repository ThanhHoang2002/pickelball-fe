import { Item, sfAnd, sfEqual, sfLike } from "spring-filter-query-builder";

import { Product } from "@/features/products/types";
import axiosPublic from "@/lib/axios-public";
import { ApiResponse } from "@/types/apiResponse";
import { DetailResponse } from "@/types/detailResponse";
export interface ProductsParams {
  page?: number;
  size?: number;
  search?: string;
  categoryName?: string;
  status?: string;
  supplierId?: number;
}
export const getAllProduct = async (
  params: ProductsParams
): Promise<ApiResponse<DetailResponse<Product>>> => {
  const filter = sfAnd(
    [
      params.search && sfLike("name", params.search),
      params.categoryName && sfEqual("category.name", params.categoryName),
      params.status && sfEqual("status", params.status),
      params.supplierId && sfEqual("supplier.id", params.supplierId),
    ].filter(Boolean) as Item[]
  );
  
const response = await axiosPublic.get<ApiResponse<DetailResponse<Product>>>(
    "products",
    {
      params: {
        page: params.page,
        size: params.size,
        filter: filter.toString()==="()"?undefined:filter.toString(), // Nếu không có filter thì không truyền vào params
      },
    }
  );
  return response.data;
};