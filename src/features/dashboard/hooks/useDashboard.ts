import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";

import { getDashboardStats, getSalesData, getTopSellingProducts, getRecentOrders } from "../api";
import { DashboardStats, PeriodFilter, SalesDataPoint, TopSellingProduct, RecentOrder } from "../types";

import { useToast } from "@/hooks/use-toast";

export const useDashboard = (initialPeriod: PeriodFilter = "last30days") => {
  const [period, setPeriod] = useState<PeriodFilter>(initialPeriod);
  const { toast } = useToast();

  // Query cho số liệu thống kê tổng quan
  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    refetch: refetchStats,
  } = useQuery<DashboardStats>({
    queryKey: ["dashboardStats", period],
    queryFn: async () => {
      try {
        return await getDashboardStats(period);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load dashboard statistics. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 phút
  });

  // Query cho dữ liệu doanh số bán hàng
  const {
    data: salesData,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = useQuery<SalesDataPoint[]>({
    queryKey: ["salesData", period],
    queryFn: async () => {
      try {
        return await getSalesData(period);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load sales data. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 phút
  });

  // Query cho sản phẩm bán chạy
  const {
    data: topProducts,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery<TopSellingProduct[]>({
    queryKey: ["topProducts", period],
    queryFn: async () => {
      try {
        return await getTopSellingProducts(period, 5);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load top products. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 phút
  });

  // Query cho đơn hàng gần đây
  const {
    data: recentOrders,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useQuery<RecentOrder[]>({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      try {
        return await getRecentOrders(5);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load recent orders. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 phút
  });

  // Memoized function để thay đổi khoảng thời gian
  const handlePeriodChange = useCallback((newPeriod: PeriodFilter) => {
    setPeriod(newPeriod);
  }, []);

  return {
    // Stats
    stats: stats || {
      totalRevenue: 0,
      revenueGrowth: 0,
      totalOrders: 0,
      ordersGrowth: 0,
      productsSold: 0,
      productsGrowth: 0,
      newCustomers: 0,
      customersGrowth: 0,
    },
    salesData: salesData || [],
    topProducts: topProducts || [],
    recentOrders: recentOrders || [],
    
    // Loading states
    isLoading: isStatsLoading || isSalesLoading || isProductsLoading || isOrdersLoading,
    isError: isStatsError || isSalesError || isProductsError || isOrdersError,
    
    // States
    period,
    handlePeriodChange,
    
    // Refetch
    refetchAll: refetchStats,
  };
}; 