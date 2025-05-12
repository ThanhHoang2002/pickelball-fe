import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";

import { getCategories, getCategoryById } from "../api/categoryApi";
import { Category, CategoryFilterParams } from "../types";

import { useToast } from "@/hooks/use-toast";
import { useDebounceSearch } from "@/hooks/useDebounce";

export const useCategories = (initialFilters: CategoryFilterParams = {}) => {
  const [filters, setFilters] = useState<CategoryFilterParams>({
    page: initialFilters.page || 1,
    size: initialFilters.size || 10,
    sortBy: initialFilters.sortBy || 'createdAt',
    sortOrder: initialFilters.sortOrder || 'desc',
    search: initialFilters.search || "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // React Query hook để fetch categories với error handling
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories", filters],
    queryFn: async () => {
      try {
        return await getCategories(filters);
      } catch (error: unknown) {
        toast({
          title: "Error",
          description: "Could not load categories. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 1000 * 60, // 1 phút
    gcTime: 1000 * 60 * 5, // 5 phút
  });

  // Prefetch trang tiếp theo để cải thiện UX
  const prefetchNextPage = useCallback(() => {
    if (!data?.data?.meta.pages || (filters.page || 1) >= data.data.meta.pages) return;
    
    const nextPageFilters = { ...filters, page: (filters.page || 1) + 1 };
    queryClient.prefetchQuery({
      queryKey: ["categories", nextPageFilters],
      queryFn: () => getCategories(nextPageFilters),
      staleTime: 1000 * 30, // 30 giây
    });
  }, [data?.data?.meta.pages, filters, queryClient]);

  // Hook tìm kiếm với debounce
  const { searchTerm, setSearchTerm } = useDebounceSearch((value) => {
    // Reset về trang 1 khi thay đổi search term
    setFilters((prev) => ({ 
      ...prev, 
      search: value,
      page: 1 
    }));
  }, { delay: 500 });

  // Thay đổi trang và prefetch trang tiếp theo
  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= (data?.data?.meta.pages || 1)) {
      setFilters((prev) => ({ ...prev, page }));
      // Prefetch trang kế tiếp nếu có
      if (page < (data?.data?.meta.pages || 1)) {
        const nextPageFilters = { ...filters, page: page + 1 };
        queryClient.prefetchQuery({
          queryKey: ["categories", nextPageFilters],
          queryFn: () => getCategories(nextPageFilters),
          staleTime: 1000 * 30, // 30 giây
        });
      }
    }
  }, [data?.data?.meta.pages, filters, queryClient]);

  // Thay đổi số lượng item trên một trang
  const handlePageSizeChange = useCallback((size: number) => {
    setFilters((prev) => ({ ...prev, size, page: 1 }));
  }, []);

  // Tìm kiếm - sử dụng trực tiếp từ searchTerm và setSearchTerm

  // Thay đổi sắp xếp
  const handleSortChange = useCallback((sortBy: string, sortOrder: 'asc' | 'desc' = 'asc') => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  }, []);

  // Reset bộ lọc
  const resetFilters = useCallback(() => {
    setFilters({
      page: 1,
      size: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      search: "",
    });
    setSearchTerm("");
  }, [setSearchTerm]);

  // Lấy thông tin chi tiết danh mục theo ID với React Query
  const fetchCategoryById = useCallback((id: number) => {
    return queryClient.fetchQuery<Category>({
      queryKey: ["category", id],
      queryFn: async () => {
        try {
          const response = await getCategoryById(id);
          return response.data;
        } catch (error: unknown) {
          toast({
            title: "Error",
            description: "Could not load category details. Please try again later.",
            variant: "destructive",
          });
          throw error;
        }
      },
      staleTime: 1000 * 60, // 1 phút
    });
  }, [queryClient, toast]);

  // Prefetch data khi component mount
  useEffect(() => {
    if (data && !isLoading && !isError && data.data.meta.pages > 1 && (filters.page || 1) < data.data.meta.pages) {
      prefetchNextPage();
    }
  }, [data, isLoading, isError, filters.page, prefetchNextPage]);

  // Handle search
  const handleSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  return {
    categories: data?.data?.result || [],
    meta: data?.data?.meta,
    isLoading,
    isError,
    error,
    filters,
    searchTerm,
    setSearchTerm,
    refetch,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    handleSortChange,
    resetFilters,
    fetchCategoryById,
  };
}; 