import { Item, sfAnd, sfEqual, sfGe, sfLe, sfLike } from "spring-filter-query-builder";

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
  sortBy?: string;
  sortDirection?: string;
  minPrice?: number;
  maxPrice?: number;
}
export const getAllProduct = async (
  params: ProductsParams
): Promise<DetailResponse<Product[]>> => {
  const filter = sfAnd(
    [
      params.search && sfLike("name", params.search),
      params.categoryName && sfEqual("category.name", params.categoryName),
      params.status && sfEqual("status", params.status),
      params.minPrice && sfGe("sellPrice", params.minPrice),
      params.maxPrice && sfLe("sellPrice", params.maxPrice),
      params.supplierId && sfEqual("supplier.id", params.supplierId),

    ].filter(Boolean) as Item[]
  );
  
const response = await axiosPublic.get<ApiResponse<DetailResponse<Product[]>>>(
    "/products",
    {
      params: {
        page: params.page,
        size: params.size,
        filter: filter.toString()==="()"?undefined:filter.toString(),
        sortBy: params.sortBy,
        sortDirection: params.sortDirection,
      },
    }
  );
  return response.data.data;
};