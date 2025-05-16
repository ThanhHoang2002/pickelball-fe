import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";

import { getCustomers, getCustomerById, createCustomer as apiCreateCustomer, updateCustomer as apiUpdateCustomer } from "../api";

import { useToast } from "@/hooks/use-toast";
import { useDebounceSearch } from "@/hooks/useDebounce";
import { Customer, CustomerFilterParams, CustomerFormData } from "@/features/customers/types/customer";

export const useCustomers = (initialFilters: CustomerFilterParams = {}) => {
  const [filters, setFilters] = useState<CustomerFilterParams>({
    page: initialFilters.page || 1,
    size: initialFilters.size || 10,
    sortBy: initialFilters.sortBy,
    sortDirection: initialFilters.sortDirection,
    search: initialFilters.search || "",
    role: initialFilters.role,
    gender: initialFilters.gender,
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // React Query hook để fetch customers với error handling
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["customers", filters],
    queryFn: async () => {
      try {
        return await getCustomers(filters);
      } catch (error: unknown) {
        toast({
          title: "Error",
          description: "Could not load customers. Please try again later.",
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
    if (!data?.meta.pages || (filters.page || 1) >= data.meta.pages) return;
    
    const nextPageFilters = { ...filters, page: (filters.page || 1) + 1 };
    queryClient.prefetchQuery({
      queryKey: ["customers", nextPageFilters],
      queryFn: () => getCustomers(nextPageFilters),
      staleTime: 1000 * 30, // 30 giây
    });
  }, [data?.meta.pages, filters, queryClient]);

  // Hook tìm kiếm với debounce
  const { searchTerm, setSearchTerm } = useDebounceSearch((value) => {
    // Reset về trang 1 khi thay đổi search term
    setFilters((prev) => ({ 
      ...prev, 
      search: value,
      page: 1 
    }));
  }, { delay: 500 });

  // Chuyển trang và prefetch trang tiếp theo
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= (data?.meta.pages || 1)) {
      setFilters((prev) => ({ ...prev, page }));
      // Prefetch trang kế tiếp nếu có
      if (page < (data?.meta.pages || 1)) {
        const nextPageFilters = { ...filters, page: page + 1 };
        queryClient.prefetchQuery({
          queryKey: ["customers", nextPageFilters],
          queryFn: () => getCustomers(nextPageFilters),
          staleTime: 1000 * 30, // 30 giây
        });
      }
    }
  }, [data?.meta.pages, filters, queryClient]);

  // Thay đổi tiêu chí sắp xếp
  const handleSort = useCallback((sortBy: string, sortDirection: 'asc' | 'desc' = 'asc') => {
    setFilters((prev) => ({ ...prev, sortBy, sortDirection }));
  }, []);

  // Thay đổi kích thước trang
  const handlePageSizeChange = useCallback((size: number) => {
    setFilters((prev) => ({ ...prev, size, page: 1 }));
  }, []);

  // Lọc theo role
  const filterByRole = useCallback((role: string | undefined) => {
    setFilters((prev) => ({ ...prev, role, page: 1 }));
  }, []);

  // Lọc theo giới tính
  const filterByGender = useCallback((gender: string | undefined) => {
    setFilters((prev) => ({ ...prev, gender, page: 1 }));
  }, []);

  // Reset bộ lọc
  const resetFilters = useCallback(() => {
    setFilters({
      page: 1,
      size: 10,
      search: "",
    });
    setSearchTerm("");
  }, [setSearchTerm]);

  // Lấy thông tin chi tiết khách hàng theo ID với React Query
  const fetchCustomerById = useCallback((id: number) => {
    return queryClient.fetchQuery<Customer>({
      queryKey: ["customer", id],
      queryFn: async () => {
        try {
          return await getCustomerById(id);
        } catch (error: unknown) {
          toast({
            title: "Error",
            description: "Could not load customer details. Please try again later.",
            variant: "destructive",
          });
          throw error;
        }
      },
      staleTime: 1000 * 60, // 1 phút
    });
  }, [queryClient, toast]);

  // Create a new customer
  const createCustomer = useCallback(async (customerData: CustomerFormData) => {
    try {
      const newCustomer = await apiCreateCustomer(customerData);
      // Invalidate queries to refresh customer list
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      return newCustomer;
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Failed to create customer. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  }, [queryClient, toast]);

  // Update an existing customer
  const updateCustomer = useCallback(async (id: number, customerData: CustomerFormData) => {
    try {
      const updatedCustomer = await apiUpdateCustomer(id, customerData);
      // Invalidate queries to refresh customer list and details
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["customer", id],
      });
      return updatedCustomer;
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Failed to update customer. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  }, [queryClient, toast]);

  // Prefetch data khi component mount
  if (data && !isLoading && !isError && data.meta.pages > 1 && (filters.page || 1) < data.meta.pages) {
    prefetchNextPage();
  }

  return {
    customers: data?.result || [],
    meta: data?.meta,
    loading: isLoading,
    error: isError ? "Failed to fetch customers. Please try again later." : null,
    searchTerm,
    setSearchTerm,
    currentPage: filters.page || 1,
    totalPages: data?.meta?.pages || 1,
    totalItems: data?.meta?.total || 0,
    itemsPerPage: filters.size || 10,
    filters,
    goToPage,
    handleSort,
    handlePageSizeChange,
    filterByRole,
    filterByGender,
    resetFilters,
    refreshData: refetch,
    fetchCustomerById,
    createCustomer,
    updateCustomer
  };
}; 