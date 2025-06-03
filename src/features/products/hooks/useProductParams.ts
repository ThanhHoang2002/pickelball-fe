import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { ProductsParams } from "../api/getAllProduct";

export const useProductsParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prevSearchParamsRef = useRef<URLSearchParams | null>(null);

  // Lấy các tham số từ URL
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

  // Lưu trữ searchParams hiện tại để so sánh
  useEffect(() => {
    prevSearchParamsRef.current = searchParams;
  }, [searchParams]);

  const updateFilters = useCallback(
    (newFilters: Partial<ProductsParams>) => {
      // Tạo một bản sao của searchParams hiện tại
      const updatedParams = new URLSearchParams(searchParams);
      let shouldResetPage = false;

      // Kiểm tra nếu cần reset page
      if (
        newFilters.search !== undefined || 
        newFilters.minPrice !== undefined || 
        newFilters.maxPrice !== undefined ||
        newFilters.supplierId !== undefined ||
        newFilters.sortBy !== undefined ||
        newFilters.sortDirection !== undefined
      ) {
        shouldResetPage = true;
      }

      // Cập nhật các tham số mới
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          updatedParams.set(key, value.toString());
        } else {
          updatedParams.delete(key);
        }
      });

      // Nếu cần reset page và không có page trong newFilters
      if (shouldResetPage && newFilters.page === undefined) {
        updatedParams.set('page', '1');
      }

      // So sánh với searchParams cũ để tránh cập nhật không cần thiết
      const currentParams = new URLSearchParams(searchParams);
      let isDifferent = false;

      // So sánh từng tham số
      updatedParams.forEach((value, key) => {
        if (currentParams.get(key) !== value) {
          isDifferent = true;
        }
      });

      // Kiểm tra các tham số bị xóa
      currentParams.forEach((_, key) => {
        if (!updatedParams.has(key)) {
          isDifferent = true;
        }
      });

      // Chỉ cập nhật nếu có sự thay đổi
      if (isDifferent) {
        setSearchParams(updatedParams);
      }
    },
    [searchParams, setSearchParams]
  );

  return { filters, updateFilters };
};
