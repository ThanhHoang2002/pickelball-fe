import { useState, useCallback, useEffect } from "react";

import { getAllOrders, updatePaymentStatus } from "../api";
import { Order, OrderFilterParams, OrderResponse, PaymentStatus } from "../types";

import { useToast } from "@/hooks/use-toast";

export const useOrders = (initialFilters: OrderFilterParams = {}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<OrderResponse["meta"]>({
    page: 1, // API uses 1-indexed pages
    pageSize: 10,
    pages: 0,
    total: 0,
  });
  const [filters, setFilters] = useState<OrderFilterParams>({
    ...initialFilters,
    page: initialFilters.page || 1, // Ensure we start with page 1 for API
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchOrders = useCallback(async (params: OrderFilterParams = filters) => {
    try {
      setLoading(true);
      const response = await getAllOrders(params);
      setOrders(response.result);
      setMeta(response.meta);
      return response;
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not load orders. Please try again later.",
        variant: "destructive",
      });
      console.error("Error fetching orders:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [filters, toast]);

  const handleUpdatePaymentStatus = async (id: number, paymentStatus: PaymentStatus) => {
    try {
      setLoading(true);
      const updatedOrder = await updatePaymentStatus(id, paymentStatus);
      
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order))
      );

      toast({
        title: "Success",
        description: "Payment status updated successfully.",
      });

      return updatedOrder;
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update payment status. Please try again later.",
        variant: "destructive",
      });
      console.error("Error updating payment status:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = useCallback((newFilters: Partial<OrderFilterParams>) => {
    setFilters((prev) => {
      // If page is provided in newFilters, use it, otherwise when other filters change, reset to page 1
      const updatedPage = Object.prototype.hasOwnProperty.call(newFilters, 'page') 
        ? newFilters.page 
        : 1;
      
      const updatedFilters = { 
        ...prev, 
        ...newFilters,
        page: updatedPage 
      };
      
      fetchOrders(updatedFilters);
      return updatedFilters;
    });
  }, [fetchOrders]);

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    meta,
    loading,
    filters,
    updateFilters,
    fetchOrders,
    updatePaymentStatus: handleUpdatePaymentStatus,
  };
}; 