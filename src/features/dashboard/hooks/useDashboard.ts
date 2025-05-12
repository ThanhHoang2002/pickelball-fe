import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";

import { getDashboardStats, getTopSellingProducts, getRecentOrders } from "../api";
import { DashboardStats, PeriodFilter, TopSellingProduct, RecentOrder } from "../types";

import { useToast } from "@/hooks/use-toast";

export const useDashboard = (initialPeriod: PeriodFilter = "month") => {
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
  })

  // Query cho sản phẩm bán chạy
  const {
    data: topProducts,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery<TopSellingProduct[]>({
    queryKey: ["topProducts"],
    queryFn: async () => {
      try {
        return await getTopSellingProducts(5);
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
      revenue: {
        currentValue: 0,
        previousValue: 0,
        growthRate: 0,
      },
      orders: {
        currentValue: 0,
        previousValue: 0,
        growthRate: 0,
      },
      productsSold: {
        currentValue: 0,
        previousValue: 0,
        growthRate: 0,
      },
      customers: {
        currentValue: 0,
        previousValue: 0,
        growthRate: 0,
      },
    },
    topProducts: topProducts || [],
    recentOrders: recentOrders || [],
    
    // Loading states
    isLoading: isStatsLoading  || isProductsLoading || isOrdersLoading,
    isError: isStatsError || isProductsError || isOrdersError,
    
    // States
    period,
    handlePeriodChange,
    
    // Refetch
    refetchAll: refetchStats,
  };
}; 