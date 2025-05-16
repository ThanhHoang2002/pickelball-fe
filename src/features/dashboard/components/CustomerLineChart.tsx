import { memo, useMemo } from 'react';

import { Card } from '@/components/ui/card';

interface CustomerLineChartProps {
  stats: {
    customers: {
      currentValue: number;
      previousValue: number;
      growthRate: number;
    };
  };
  period: string;
}

const CustomerLineChart = memo(({ stats, period }: CustomerLineChartProps) => {
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
  
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Customer Growth Trend</h2>
        <div className="text-sm text-muted-foreground">
          {period}
        </div>
      </div>
      
      <div className="relative h-64 w-full pt-4">
        {/* Chart grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`v-${i}`} className="h-full w-[1px] bg-muted" style={{ left: `${(i+1) * 25}%` }} />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`h-${i}`} className="h-[1px] w-full bg-muted" style={{ top: `${(i+1) * 25}%` }} />
          ))}
        </div>
        
        {/* Chart content */}
        <div className="relative flex h-full items-end">
          {chartData.data.map((value, index, arr) => {
            // Calculate position
            const segmentWidth = 100 / (arr.length - 1);
            const left = index * segmentWidth;
            const maxValue = Math.max(...arr);
            const minValue = Math.min(...arr);
            const range = maxValue - minValue;
            
            // Normalize height (80% of container height to leave room for labels)
            const height = range === 0 
              ? 50 
              : 80 * ((value - minValue) / range);
            
            // Only draw line for points after the first
            const lineVisible = index > 0;
            const prevValue = arr[index - 1];
            const prevHeight = range === 0 
              ? 50 
              : 80 * ((prevValue - minValue) / range);
            
            return (
              <div 
                key={index} 
                className="absolute bottom-[10%] flex flex-col items-center justify-end"
                style={{ left: `${left}%` }}
              >
                {/* Line connecting to previous point */}
                {lineVisible && (
                  <div 
                    className="absolute bg-primary"
                    style={{
                      height: '2px',
                      width: `${segmentWidth}%`,
                      bottom: `${Math.min(prevHeight, height)}%`,
                      left: `${-segmentWidth/2}%`,
                      transform: `rotate(${Math.atan2(
                        (height - prevHeight), 
                        segmentWidth
                      )}rad)`,
                      transformOrigin: 'left bottom'
                    }}
                  />
                )}
                
                {/* Point */}
                <div className="relative">
                  {/* Value label */}
                  <div 
                    className="absolute bottom-[100%] left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground"
                  >
                    {value}
                  </div>
                  
                  {/* Data point */}
                  <div 
                    className="z-10 h-3 w-3 rounded-full bg-primary"
                    style={{ 
                      transform: `translateY(${-height}%)` 
                    }}
                  />
                  
                  {/* Category label */}
                  <div 
                    className="absolute left-1/2 top-[100%] mt-2 -translate-x-1/2 whitespace-nowrap text-xs font-medium"
                  >
                    {chartData.periods[index]}
                  </div>
                </div>
                
                {/* Fill area under line */}
                {lineVisible && (
                  <div 
                    className="absolute bg-primary/10"
                    style={{
                      height: `${Math.min(prevHeight, height)}%`,
                      width: `${segmentWidth}%`,
                      bottom: '0',
                      left: `${-segmentWidth/2}%`,
                    }}
                  />
                )}
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

CustomerLineChart.displayName = 'CustomerLineChart';

export default CustomerLineChart; 