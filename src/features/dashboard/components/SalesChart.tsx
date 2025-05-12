import { memo } from 'react';

import { SalesDataPoint } from '../types';

import { Card } from '@/components/ui/card';

interface SalesChartProps {
  data: SalesDataPoint[];
  period: string;
}

const SalesChart = memo(({ data, period }: SalesChartProps) => {
  // Tìm giá trị cao nhất để thiết lập tỷ lệ
  const maxAmount = data.length > 0
    ? Math.max(...data.map(item => item.amount))
    : 0;
  
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Sales Overview</h2>
        <div className="text-sm text-muted-foreground">{period}</div>
      </div>
      <div className="h-64 w-full">
        {data.length > 0 ? (
          <div className="flex h-full items-end justify-between">
            {data.map((item, index) => {
              // Tính chiều cao dựa trên giá trị so với giá trị lớn nhất
              const heightPercentage = maxAmount > 0
                ? (item.amount / maxAmount) * 100
                : 0;
              
              return (
                <div
                  key={index}
                  className="relative flex h-full w-[8%] flex-col justify-end"
                >
                  <div
                    className="rounded-t bg-chart-1"
                    style={{ height: `${heightPercentage}%` }}
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">No data available</p>
          </div>
        )}
      </div>
    </Card>
  );
});

SalesChart.displayName = 'SalesChart';

export default SalesChart; 