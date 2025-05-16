import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo, useMemo } from 'react';

import { Button } from '@/components/ui/button';

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  goToPage: (page: number) => void;
}

const CustomerPagination = memo(({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  goToPage,
}: CustomerPaginationProps) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const pageNumbers = useMemo(() => {
    const numbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Display all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else if (currentPage <= 3) {
      // Display first 5 pages
      for (let i = 1; i <= maxVisiblePages; i++) {
        numbers.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      // Display last 5 pages
      for (let i = totalPages - 4; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      // Display current page and 2 pages before and after
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        numbers.push(i);
      }
    }
    
    return numbers;
  }, [currentPage, totalPages]);

  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
      <div>
        Showing {startItem}-{endItem} of {totalItems} customers
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
          tabIndex={0}
        >
          <ChevronLeft size={16} />
        </Button>
        
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={currentPage === pageNumber ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => goToPage(pageNumber)}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={currentPage === pageNumber ? "page" : undefined}
            tabIndex={0}
          >
            {pageNumber}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          tabIndex={0}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
});

CustomerPagination.displayName = 'CustomerPagination';

export default CustomerPagination; 