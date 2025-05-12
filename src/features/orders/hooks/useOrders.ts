import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";

import { getAllOrders, updatePaymentStatus } from "../api";
import { OrderFilterParams, PaymentStatus } from "../types";

import { useToast } from "@/hooks/use-toast";
import { useDebounceSearch } from "@/hooks/useDebounce";

export const useOrders = (initialFilters: OrderFilterParams = {}) => {
  const [filters, setFilters] = useState<OrderFilterParams>({
    page: initialFilters.page || 1,
    size: initialFilters.size || 10,
    sortBy: initialFilters.sortBy || "createdAt",
    sortDirection: initialFilters.sortDirection || "desc",
    search: initialFilters.search || "",
    paymentStatus: initialFilters.paymentStatus,
    paymentMethod: initialFilters.paymentMethod,
    fromDate: initialFilters.fromDate,
    toDate: initialFilters.toDate,
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // React Query để fetch orders với error handling
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orders", filters],
    queryFn: async () => {
      try {
        return await getAllOrders(filters);
      } catch (error: unknown) {
        toast({
          title: "Error",
          description: "Could not load orders. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 1000 * 60, // 1 phút
    gcTime: 1000 * 60 * 5, // 5 phút
  });

  // Mutation để cập nhật trạng thái thanh toán
  const updatePaymentStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: PaymentStatus }) => 
      updatePaymentStatus(id, status),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Payment status updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Could not update payment status. Please try again later.",
        variant: "destructive",
      });
      console.error("Error updating payment status:", error);
    },
  });

  // Prefetch trang tiếp theo để cải thiện UX
  const prefetchNextPage = useCallback(() => {
    if (!data?.meta.pages || (filters.page || 1) >= data.meta.pages) return;
    
    const nextPageFilters = { ...filters, page: (filters.page || 1) + 1 };
    queryClient.prefetchQuery({
      queryKey: ["orders", nextPageFilters],
      queryFn: () => getAllOrders(nextPageFilters),
      staleTime: 1000 * 30, // 30 giây
    });
  }, [data?.meta.pages, filters, queryClient]);

  // Tìm kiếm với debounce
  const { searchTerm, setSearchTerm } = useDebounceSearch((value) => {
    // Reset về trang 1 khi thay đổi search term
    setFilters((prev) => ({ 
      ...prev, 
      search: value,
      page: 1 
    }));
  }, { delay: 500 });

  // Update filters với memoization để tránh re-render không cần thiết
  const updateFilters = useCallback((newFilters: Partial<OrderFilterParams>) => {
    setFilters((prev) => {
      // Nếu page được cung cấp trong newFilters, sử dụng nó, ngược lại reset về trang 1
      const updatedPage = Object.prototype.hasOwnProperty.call(newFilters, 'page') 
        ? newFilters.page 
        : 1;
      
      return { 
        ...prev, 
        ...newFilters,
        page: updatedPage 
      };
    });
  }, []);

  // Handle payment status update với memoization
  const handleUpdatePaymentStatus = useCallback((id: number, status: PaymentStatus) => {
    return updatePaymentStatusMutation.mutateAsync({ id, status });
  }, [updatePaymentStatusMutation]);

  // Prefetch data khi component mount hoặc filters thay đổi
  useEffect(() => {
    if (data && !isLoading && !isError && data.meta.pages > 1 && (filters.page || 1) < data.meta.pages) {
      prefetchNextPage();
    }
  }, [data, isLoading, isError, filters.page, prefetchNextPage]);

  return {
    orders: data?.result || [],
    meta: data?.meta || { page: 1, pageSize: 10, pages: 0, total: 0 },
    loading: isLoading || updatePaymentStatusMutation.isPending,
    isError,
    filters,
    searchTerm,
    setSearchTerm,
    updateFilters,
    fetchOrders: refetch,
    updatePaymentStatus: handleUpdatePaymentStatus,
  };
}; 