import { User, UsersRound, Users } from 'lucide-react';
import { memo, useMemo } from 'react';

import { Card } from '@/components/ui/card';

interface CustomerRoleStat {
  role: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

interface CustomerStatChartProps {
  stats: {
    customers: {
      currentValue: number;
    };
  };
  period: string;
}

const CustomerStatChart = memo(({ stats, period }: CustomerStatChartProps) => {
  // Normally this would come from an API, but for demo purposes we'll calculate it
  const customerStats = useMemo(() => {
    const total = stats.customers.currentValue;
    
    // Mock distribution by role (normally would come from backend)
    const roleCounts: CustomerRoleStat[] = [
      {
        role: 'Admin',
        // ~10% are admins
        count: Math.round(total * 0.1),
        icon: <User className="h-4 w-4" />,
        color: 'bg-destructive'
      },
      {
        role: 'Employee',
        // ~20% are employees
        count: Math.round(total * 0.2),
        icon: <UsersRound className="h-4 w-4" />,
        color: 'bg-primary'
      },
      {
        role: 'Customer',
        // ~70% are regular users
        count: Math.round(total * 0.7),
        icon: <Users className="h-4 w-4" />,
        color: 'bg-muted-foreground'
      }
    ];
    
    return roleCounts;
  }, [stats.customers.currentValue]);
  
  // Find max value for scaling
  const maxCount = useMemo(() => {
    if (customerStats.length === 0) return 0;
    return Math.max(...customerStats.map(item => item.count));
  }, [customerStats]);
  
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Customer Distribution</h2>
        <div className="text-sm text-muted-foreground">
          {period}
        </div>
      </div>
      
      <div className="space-y-6">
        {customerStats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-muted p-1.5">
                  {stat.icon}
                </span>
                <span className="font-medium">{stat.role}</span>
              </div>
              <span className="font-medium">{stat.count}</span>
            </div>
            
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div 
                className={`h-full ${stat.color}`} 
                style={{ 
                  width: `${maxCount > 0 ? (stat.count / maxCount) * 100 : 0}%` 
                }} 
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Total Customers: {stats.customers.currentValue}
      </div>
    </Card>
  );
});

CustomerStatChart.displayName = 'CustomerStatChart';

export default CustomerStatChart; 