import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";

import { getAllOrders } from "../api";
import { Order, OrderFilterParams } from "../types";

import useAuthStore from "@/features/auth/stores/authStore";
import { useToast } from "@/hooks/use-toast";

export const useMyOrders = (initialFilters: Partial<OrderFilterParams> = {}) => {
  // Lấy thông tin người dùng từ auth store
  const { currentUser } = useAuthStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // State để quản lý filters
  const [filters, setFilters] = useState<OrderFilterParams>({
    page: initialFilters.page || 1,
    size: initialFilters.size || 5,
    sortBy: initialFilters.sortBy || "createdAt",
    sortDirection: initialFilters.sortDirection || "desc",
    paymentStatus: initialFilters.paymentStatus,
    fromDate: initialFilters.fromDate,
    toDate: initialFilters.toDate,
    userId: currentUser?.id,
  });

  // State quản lý đơn hàng đang xem chi tiết
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  // Query để lấy danh sách đơn hàng
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myOrders", filters],
    queryFn: async () => {
      try {
        return await getAllOrders(filters);
      } catch (error: unknown) {
        toast({
          title: "Error",
          description: "Could not load your orders. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 1000 * 60, // 1 phút
    gcTime: 1000 * 60 * 5, // 5 phút
    enabled: !!currentUser, // Chỉ gọi khi đã đăng nhập
  });

  // Prefetch trang tiếp theo để cải thiện UX
  const prefetchNextPage = useCallback(() => {
    if (!data?.meta.pages || (filters.page || 1) >= data.meta.pages) return;
    
    const nextPageFilters = { ...filters, page: (filters.page || 1) + 1 };
    queryClient.prefetchQuery({
      queryKey: ["myOrders", nextPageFilters],
      queryFn: () => getAllOrders(nextPageFilters),
      staleTime: 1000 * 30, // 30 giây
    });
  }, [data?.meta.pages, filters, queryClient]);

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

  // Xử lý mở modal chi tiết đơn hàng
  const handleViewOrder = useCallback((order: Order) => {
    setSelectedOrder(order);
    setIsOrderDialogOpen(true);
  }, []);

  // Xử lý đóng modal chi tiết đơn hàng
  const handleCloseOrderDialog = useCallback(() => {
    setIsOrderDialogOpen(false);
  }, []);

  // Xử lý thay đổi trang
  const handlePageChange = useCallback((page: number) => {
    updateFilters({ page });
  }, [updateFilters]);

  // Xử lý thay đổi số lượng hiển thị
  const handlePageSizeChange = useCallback((size: number) => {
    updateFilters({ size, page: 1 });
  }, [updateFilters]);

  // Xử lý thay đổi filter
  const handleFilterChange = useCallback((newFilters: Partial<OrderFilterParams>) => {
    updateFilters(newFilters);
  }, [updateFilters]);

  // Prefetch data khi component mount hoặc filters thay đổi
  useEffect(() => {
    if (data && !isLoading && !isError && data.meta.pages > 1 && (filters.page || 1) < data.meta.pages) {
      prefetchNextPage();
    }
  }, [data, isLoading, isError, filters.page, prefetchNextPage]);

  return {
    orders: data?.result || [],
    meta: data?.meta || { page: 1, pageSize: 5, pages: 0, total: 0 },
    loading: isLoading,
    isError,
    filters,
    updateFilters: handleFilterChange,
    selectedOrder,
    isOrderDialogOpen,
    handleViewOrder,
    handleCloseOrderDialog,
    handlePageChange,
    handlePageSizeChange,
  };
}; 