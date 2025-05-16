import { memo, useMemo } from 'react';

import { Card } from '@/components/ui/card';

interface CustomerColumnChartProps {
  stats: {
    customers: {
      currentValue: number;
      previousValue: number;
      growthRate: number;
    };
  };
  period: string;
}

const CustomerColumnChart = memo(({ stats, period }: CustomerColumnChartProps) => {
  // Generate mock data for customer growth over time
  const chartData = useMemo(() => {
    const currentTotal = stats.customers.currentValue;
    // Create time periods based on selected period
    let periods: string[] = [];
    let data: number[] = [];

    switch (period.toLowerCase()) {
      case 'day':
        // Hours in a day
        periods = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
        data = [
          Math.round(currentTotal * 0.8),
          Math.round(currentTotal * 0.84),
          Math.round(currentTotal * 0.87),
          Math.round(currentTotal * 0.9),
          Math.round(currentTotal * 0.95),
          Math.round(currentTotal * 0.98),
          currentTotal
        ];
        break;
      case 'week':
        // Days of the week
        periods = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data = [
          Math.round(currentTotal * 0.75),
          Math.round(currentTotal * 0.8),
          Math.round(currentTotal * 0.84),
          Math.round(currentTotal * 0.88),
          Math.round(currentTotal * 0.92),
          Math.round(currentTotal * 0.96),
          currentTotal
        ];
        break;
      case 'month':
        // Weeks in a month
        periods = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        data = [
          Math.round(currentTotal * 0.7),
          Math.round(currentTotal * 0.8),
          Math.round(currentTotal * 0.9),
          currentTotal
        ];
        break;
      case 'year':
        // Quarters in a year
        periods = ['Q1', 'Q2', 'Q3', 'Q4'];
        data = [
          Math.round(currentTotal * 0.6),
          Math.round(currentTotal * 0.7),
          Math.round(currentTotal * 0.85),
          currentTotal
        ];
        break;
      default:
        // Default to month
        periods = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        data = [
          Math.round(currentTotal * 0.7),
          Math.round(currentTotal * 0.8),
          Math.round(currentTotal * 0.9),
          currentTotal
        ];
    }

    return { periods, data };
  }, [stats.customers.currentValue, period]);
  
  // Calculate max height for proper scaling
  const maxValue = Math.max(...chartData.data);
  
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Customer Growth</h2>
        <div className="text-sm text-muted-foreground">
          {period}
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex h-64 items-end justify-between">
          {chartData.data.map((value, index) => {
            const heightPercentage = (value / maxValue) * 100;
            
            return (
              <div key={index} className="relative flex w-full flex-col items-center">
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  {value}
                </div>
                <div 
                  className="w-[80%] rounded-t-md bg-primary"
                  style={{ height: `${heightPercentage}%` }}
                >
                  <div className="h-full w-full transition-all duration-300 hover:bg-primary/90" />
                </div>
                <div className="mt-2 text-xs font-medium">
                  {chartData.periods[index]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm">
          <span className="font-semibold">Growth: </span>
          <span className={stats.customers.growthRate >= 0 ? "text-green-500" : "text-red-500"}>
            {stats.customers.growthRate >= 0 ? "+" : ""}{stats.customers.growthRate.toFixed(1)}%
          </span>
        </div>
        <div className="text-sm">
          <span className="font-semibold">Previous: </span>
          <span className="text-muted-foreground">{stats.customers.previousValue}</span>
        </div>
      </div>
    </Card>
  );
});

CustomerColumnChart.displayName = 'CustomerColumnChart';

export default CustomerColumnChart; 