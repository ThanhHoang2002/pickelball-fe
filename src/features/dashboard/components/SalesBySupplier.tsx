import { memo, useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

import { PeriodFilter as PeriodFilterType, SupplierRevenueData } from '../types';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Định nghĩa kiểu dữ liệu cho props
interface SalesBySupplierProps {
  period: string;
  periodValue: PeriodFilterType;
  supplierRevenue: SupplierRevenueData[];
  isLoading: boolean;
  isError: boolean;
}

const SalesBySupplier = memo(({ 
  period, 
  supplierRevenue: data,
  isLoading: loading,
  isError: error
}: SalesBySupplierProps) => {
  // Giả lập dark/light mode
  const isDark = document.documentElement.classList.contains('dark');

  // Chuẩn bị dữ liệu cho biểu đồ với custom colors
  const chartData = useMemo(() => {
    // Map các màu sắc cho từng nhà cung cấp
    const colors = [
      'hsl(var(--primary))',      // Primary
      'hsl(var(--destructive))',  // Destructive
      'hsl(var(--warning))',      // Warning
      'hsl(var(--success))',      // Success
      'hsl(var(--secondary))'     // Secondary
    ];
    
    return data.map((item, index) => ({
      ...item,
      color: colors[index % colors.length]
    }));
  }, [data]);

  // Hiển thị skeleton khi đang loading
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-[180px]" />
          <Skeleton className="h-4 w-[250px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="mb-2 h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="mt-1 h-3 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Hiển thị thông báo lỗi
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales by Supplier</CardTitle>
          <CardDescription>
            Distribution of sales revenue across major suppliers - {period}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex h-[350px] items-center justify-center">
          <p className="text-center text-muted-foreground">
            Failed to load data. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Hiển thị khi không có dữ liệu
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales by Supplier</CardTitle>
          <CardDescription>
            Distribution of sales revenue across major suppliers - {period}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex h-[350px] items-center justify-center">
          <p className="text-center text-muted-foreground">
            No data available for this period.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Supplier</CardTitle>
        <CardDescription>
          Distribution of sales revenue across major suppliers - {period}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke={isDark ? 'hsl(var(--muted))' : '#e5e7eb'}
              />
              <XAxis 
                dataKey="name" 
                tick={{ fill: isDark ? 'hsl(var(--foreground))' : '#6b7280' }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                tickFormatter={(value: number) => `$${Math.round(value)}`}
                tick={{ fill: isDark ? 'hsl(var(--foreground))' : '#6b7280' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value: number) => [`$${value}`, 'Revenue']}
                contentStyle={{
                  backgroundColor: isDark ? 'hsl(var(--card))' : '#fff',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{
                  color: isDark ? 'hsl(var(--foreground))' : '#111827',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}
                itemStyle={{
                  color: isDark ? 'hsl(var(--muted-foreground))' : '#6b7280',
                }}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                barSize={36}
                fill="url(#colorGradient)"
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {chartData.map((supplier, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="mb-2 h-3 w-3 rounded-full" 
                style={{ backgroundColor: supplier.color }}
              />
              <div className="text-center text-sm font-medium">{supplier.name}</div>
              <div className="text-center text-xs text-muted-foreground">
                {supplier.percentage}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

SalesBySupplier.displayName = 'SalesBySupplier';

export default SalesBySupplier; 