import { ChevronDown, ChevronUp } from 'lucide-react';

import { TableHead } from '@/components/ui/table';

interface SortableHeaderProps {
  field: string;
  currentSortField: string;
  currentSortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  children: React.ReactNode;
  className?: string;
}

const SortableHeader = ({
  field,
  currentSortField,
  currentSortDirection,
  onSort,
  children,
  className = ''
}: SortableHeaderProps) => {
  const isActive = currentSortField === field;
  
  return (
    <TableHead
      className={`${className} cursor-pointer select-none hover:text-primary ${
        isActive ? 'text-primary' : ''
      }`}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        {isActive && (
          currentSortDirection === 'asc' 
            ? <ChevronUp className="h-4 w-4" /> 
            : <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </TableHead>
  );
};

export default SortableHeader; 