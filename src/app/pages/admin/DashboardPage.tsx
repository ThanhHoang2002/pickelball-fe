import { motion } from 'framer-motion';
import { DollarSign, CakeSlice, ShoppingBasket, Users } from 'lucide-react';
import { memo, useMemo } from 'react';

import {
  StatCard,
  TopProducts,
  RecentOrders,
  PeriodFilter
} from '@/features/dashboard/components';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { formatCurrency } from '@/utils/format';

// Function để map period filter sang label hiển thị
const getPeriodLabel = (period: string): string => {
  const periodMap: Record<string, string> = {
    today: 'Day',
    week: 'Week',
    month: 'Month',
    year: 'Year',
  };
  return periodMap[period] || 'Month';
};

const DashboardPage = () => {
  // Sử dụng custom hook để lấy dữ liệu
  const {
    stats,
    topProducts,
    recentOrders,
    period,
    handlePeriodChange,
    isLoading,
  } = useDashboard('month');

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
          value={formatCurrency(stats.revenue.currentValue)}
          previousValue={formatCurrency(stats.revenue.previousValue)}
          icon={DollarSign}
          growthRate={stats.revenue.growthRate}
          progressPercentage={progressPercentages.revenue}
        />
        <StatCard
          title="Total Orders"
          value={stats.orders.currentValue}
          previousValue={stats.orders.previousValue}
          icon={ShoppingBasket}
          growthRate={stats.orders.growthRate}
          progressPercentage={progressPercentages.orders}
        />
        <StatCard
          title="Products Sold"
          value={stats.productsSold.currentValue}
          previousValue={stats.productsSold.previousValue}
          icon={CakeSlice}
          growthRate={stats.productsSold.growthRate}
          progressPercentage={progressPercentages.products}
        />
        <StatCard
          title="New Customers"
          value={stats.customers.currentValue}
          previousValue={stats.customers.previousValue}
          icon={Users}
          growthRate={stats.customers.growthRate}
          progressPercentage={progressPercentages.customers}
        />
      </div>

      {/* Charts */}
      <div className="mt-8">
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