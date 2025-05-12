import { DashboardStats, PeriodFilter, SalesDataPoint, TopSellingProduct, RecentOrder } from "../types";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";
import { DetailResponse } from "@/types/detailResponse";

/**
 * Lấy số liệu thống kê cho dashboard
 */
export const getDashboardStats = async (period: PeriodFilter = "last30days"): Promise<DashboardStats> => {
  const response = await axiosClient.get<ApiResponse<DashboardStats>>("/dashboard/stats", {
    params: { period },
  });
  return response.data.data;
};

/**
 * Lấy dữ liệu doanh số bán hàng theo ngày
 */
export const getSalesData = async (period: PeriodFilter = "last30days"): Promise<SalesDataPoint[]> => {
  const response = await axiosClient.get<ApiResponse<SalesDataPoint[]>>("/dashboard/sales", {
    params: { period },
  });
  return response.data.data;
};

/**
 * Lấy sản phẩm bán chạy nhất
 */
export const getTopSellingProducts = async (period: PeriodFilter = "last30days", limit: number = 5): Promise<TopSellingProduct[]> => {
  const response = await axiosClient.get<ApiResponse<TopSellingProduct[]>>("/dashboard/top-products", {
    params: { period, limit },
  });
  return response.data.data;
};

/**
 * Lấy đơn hàng gần đây
 */
export const getRecentOrders = async (limit: number = 5): Promise<RecentOrder[]> => {
  const response = await axiosClient.get<ApiResponse<DetailResponse<RecentOrder[]>>>("/orders", {
    params: { 
      size: limit,
      sortBy: "createdAt",
      sortDirection: "desc"
     },
  });
  return response.data.data.result;
}; 