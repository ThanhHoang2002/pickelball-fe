import { useState, useCallback } from "react";


import { getOrderById, updatePaymentStatus } from "../api";
import { Order, PaymentStatus } from "../types";

import { useToast } from "@/hooks/use-toast";

export const useOrder = (initialId?: number) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchOrder = useCallback(async (id: number) => {
    if (!id) return null;
    
    try {
      setLoading(true);
      const data = await getOrderById(id);
      setOrder(data);
      return data;
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.",
        variant: "destructive",
      });
      console.error("Error fetching order:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleUpdatePaymentStatus = async (id: number, paymentStatus: PaymentStatus) => {
    try {
      setLoading(true);
      const updatedOrder = await updatePaymentStatus(id, paymentStatus);
      setOrder(updatedOrder);

      toast({
        title: "Thành công",
        description: "Cập nhật trạng thái thanh toán thành công.",
      });

      return updatedOrder;
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái thanh toán. Vui lòng thử lại sau.",
        variant: "destructive",
      });
      console.error("Error updating payment status:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Nếu có initialId, fetch order ngay lập tức
  if (initialId && !order && !loading) {
    fetchOrder(initialId);
  }

  return {
    order,
    loading,
    fetchOrder,
    updatePaymentStatus: handleUpdatePaymentStatus,
  };
}; 