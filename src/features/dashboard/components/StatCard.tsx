import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';
import { memo } from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  icon: LucideIcon;
  growthRate: number;
  progressPercentage: number;
}

const StatCard = memo(({ title, value, previousValue, icon: Icon, growthRate, progressPercentage }: StatCardProps) => {
  const isPositiveGrowth = growthRate >= 0;
  
  return (
    <Card className="flex flex-col p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-primary/10 p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center">
          <span className={cn(
            "flex items-center text-sm font-medium",
            isPositiveGrowth ? "text-green-500" : "text-red-500"
          )}>
            {isPositiveGrowth ? (
              <ArrowUp className="mr-0.5 h-4 w-4" />
            ) : (
              <ArrowDown className="mr-0.5 h-4 w-4" />
            )}
            <span>{Math.abs(growthRate).toFixed(1)}%</span>
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="mt-2 text-3xl font-bold">{value}</p>
        {previousValue !== undefined && (
          <p className="mt-1 text-xs text-muted-foreground">Previous: {previousValue}</p>
        )}
      </div>
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div 
          className="h-full bg-primary" 
          style={{ width: `${Math.min(Math.max(progressPercentage, 0), 100)}%` }} 
        />
      </div>
    </Card>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard; 