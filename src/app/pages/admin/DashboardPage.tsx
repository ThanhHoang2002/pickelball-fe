import { motion } from 'framer-motion';
import { DollarSign, CakeSlice, ShoppingBasket, Users } from 'lucide-react';
import { memo, useMemo } from 'react';

import {
  StatCard,
  SalesChart,
  TopProducts,
  RecentOrders,
  PeriodFilter
} from '@/features/dashboard/components';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { formatCurrency } from '@/utils/format';

// Function để map period filter sang label hiển thị
const getPeriodLabel = (period: string): string => {
  const periodMap: Record<string, string> = {
    today: 'Today',
    last7days: 'Last 7 days',
    last30days: 'Last 30 days',
    last12months: 'Last 12 months',
    alltime: 'All time',
  };
  return periodMap[period] || 'Last 30 days';
};

const DashboardPage = () => {
  // Sử dụng custom hook để lấy dữ liệu
  const {
    stats,
    salesData,
    topProducts,
    recentOrders,
    period,
    handlePeriodChange,
    isLoading,
  } = useDashboard('last30days');

  // Memoize period label để tránh tính toán lại không cần thiết
  const periodLabel = useMemo(() => getPeriodLabel(period), [period]);

  // Memoize progress percentages để tránh tính toán lại không cần thiết
  const progressPercentages = useMemo(() => ({
    revenue: 75,
    orders: 65,
    products: 40,
    customers: 55,
  }), []);

  return (
    <>
      <motion.div
        className="mb-8 sm:flex sm:items-center sm:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold md:text-3xl">Bakery Dashboard</h1>
        </div>
        <div className="grid grid-flow-col gap-2">
          <PeriodFilter
            selectedPeriod={periodLabel}
            onPeriodChange={handlePeriodChange}
          />
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          growthRate={stats.revenueGrowth}
          progressPercentage={progressPercentages.revenue}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingBasket}
          growthRate={stats.ordersGrowth}
          progressPercentage={progressPercentages.orders}
        />
        <StatCard
          title="Products Sold"
          value={stats.productsSold}
          icon={CakeSlice}
          growthRate={stats.productsGrowth}
          progressPercentage={progressPercentages.products}
        />
        <StatCard
          title="New Customers"
          value={stats.newCustomers}
          icon={Users}
          growthRate={stats.customersGrowth}
          progressPercentage={progressPercentages.customers}
        />
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <SalesChart data={salesData} period={periodLabel} />
        <TopProducts products={topProducts} />
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <RecentOrders orders={recentOrders} />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
    </>
  );
};

export default memo(DashboardPage); 