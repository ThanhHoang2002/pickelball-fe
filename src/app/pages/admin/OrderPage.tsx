import { motion } from "framer-motion";
import { useState } from "react";

import { 
  OrderDialog, 
  OrderFilterBar, 
  OrderPagination, 
  OrdersTable 
} from "@/features/orders/components";
import { useOrders } from "@/features/orders/hooks";
import { Order, OrderFilterParams } from "@/features/orders/types";

const OrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const { orders, meta, loading, filters, updateFilters, updatePaymentStatus } = useOrders({
    page: 1,
    size: 10,
    sortBy: "createdAt",
    sortDirection: "desc",
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDialogOpen(true);
  };

  const handleCloseOrderDialog = () => {
    setIsOrderDialogOpen(false);
  };

  const handleFilterChange = (newFilters: Partial<OrderFilterParams>) => {
    updateFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  const handlePageSizeChange = (size: number) => {
    updateFilters({ size, page: 1 });
  };

  return (
    <motion.div
      className="container py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <p className="text-muted-foreground">Manage and track all orders</p>
      </div>

      <OrderFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        loading={loading}
      />

      <OrdersTable
        orders={orders}
        onViewOrder={handleViewOrder}
        loading={loading}
      />

      <OrderPagination
        currentPage={meta.page || 1}
        pageSize={meta.pageSize || 10}
        totalItems={meta.total || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        loading={loading}
      />

      <OrderDialog
        open={isOrderDialogOpen}
        onClose={handleCloseOrderDialog}
        order={selectedOrder}
        onUpdatePaymentStatus={updatePaymentStatus}
        loading={loading}
      />
    </motion.div>
  );
};

export default OrderPage; 