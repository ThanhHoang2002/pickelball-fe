import { Filter } from 'lucide-react';
import { memo, useState } from 'react';

import { PeriodFilter as PeriodFilterType } from '../types';

interface PeriodFilterProps {
  selectedPeriod: string;
  onPeriodChange: (period: PeriodFilterType) => void;
}

const periodOptions: { label: string; value: PeriodFilterType }[] = [
  { label: 'Day', value: 'today' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
];

const PeriodFilter = memo(({ selectedPeriod, onPeriodChange }: PeriodFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        className="flex items-center rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select date range"
      >
        <Filter className="mr-2 h-4 w-4" />
        <span>{selectedPeriod}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 rounded-md border border-border bg-card p-2 shadow-lg">
          <div className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
            Select Range
          </div>
          <ul className="mt-2">
            {periodOptions.map((option) => (
              <li
                key={option.value}
                className="cursor-pointer rounded px-3 py-1 text-sm hover:bg-muted"
                onClick={() => {
                  onPeriodChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

PeriodFilter.displayName = 'PeriodFilter';

export default PeriodFilter; 