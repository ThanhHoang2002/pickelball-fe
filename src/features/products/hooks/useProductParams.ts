import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { ProductsParams } from "../api/getAllProduct";


export const useProductsParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ProductsParams = {
    page: Number(searchParams.get("page")) || 1,
    size: Number(searchParams.get("size")) || 15,
    search: searchParams.get("search") || undefined,
    status: searchParams.get("status") || undefined,
    supplierId: Number(searchParams.get("supplierId")) || undefined,
    categoryName: searchParams.get("categoryName") || undefined,
    sortBy: searchParams.get("sortBy") || undefined,
    sortDirection: searchParams.get("sortDirection") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
  };

  const updateFilters = useCallback(
    (newFilters: Partial<ProductsParams>) => {
      const updatedParams = new URLSearchParams(searchParams);

      // Cập nhật chỉ các params mới
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "search") {
            updatedParams.set("page", "1");
          }
          updatedParams.set(key, value.toString().trim());
        } else {
          updatedParams.delete(key);
        }
      });

      setSearchParams(updatedParams);
    },
    [searchParams, setSearchParams]
  );
  return { filters, updateFilters };
};
