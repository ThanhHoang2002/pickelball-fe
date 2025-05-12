import { motion } from "framer-motion";
import { memo } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { LoginPrompt } from "@/features/auth/components/LoginPrompt";
import useAuthStore from "@/features/auth/stores/authStore";
import {
  CustomerOrderFilterBar,
  OrderDialog,
  OrderPagination,
  OrdersTable
} from "@/features/orders/components";
import { useMyOrders } from "@/features/orders/hooks";

// Sử dụng memo để tối ưu hóa hiệu suất, tránh re-render không cần thiết
const MyOrdersPage = memo(() => {
  // Lấy trạng thái người dùng từ auth store
  const { currentUser } = useAuthStore();
  
  // Sử dụng custom hook để quản lý đơn hàng
  const {
    orders,
    meta,
    loading,
    filters,
    updateFilters,
    selectedOrder,
    isOrderDialogOpen,
    handleViewOrder,
    handleCloseOrderDialog,
    handlePageChange,
    handlePageSizeChange
  } = useMyOrders();

  // Nếu chưa đăng nhập, hiển thị thông báo
  if (!currentUser) {
    return <LoginPrompt message="Please login to view your orders" />;
  }

  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Filter Bar */}
      <CustomerOrderFilterBar
        filters={filters}
        onFilterChange={updateFilters}
        loading={loading}
      />

      {/* Orders Table hoặc Empty State */}
      {orders.length > 0 ? (
        <OrdersTable
          orders={orders}
          onViewOrder={handleViewOrder}
          loading={loading}
        />
      ) : (
        <EmptyState
          title="No orders found"
          description={
            loading
              ? "Loading your orders..."
              : filters.paymentStatus
              ? `No ${filters.paymentStatus.toLowerCase()} orders found`
              : "You haven't placed any orders yet"
          }
          icon="shopping-bag"
          action={
            !loading && !filters.paymentStatus
              ? {
                  label: "Start Shopping",
                  href: "/category/paddles",
                }
              : undefined
          }
        />
      )}

      {/* Pagination */}
      {orders.length > 0 && (
        <OrderPagination
          currentPage={meta.page}
          pageSize={meta.pageSize}
          totalItems={meta.total}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          loading={loading}
        />
      )}

      {/* Order Detail Dialog */}
      <OrderDialog
        open={isOrderDialogOpen}
        onClose={handleCloseOrderDialog}
        order={selectedOrder}
        loading={loading}
      />
    </motion.div>
  );
});

MyOrdersPage.displayName = "MyOrdersPage";

export default MyOrdersPage;