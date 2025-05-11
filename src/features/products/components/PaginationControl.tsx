import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  pageSizeOptions?: number[];
}

const PaginationControl = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [10, 20, 50, 100],
}: PaginationControlProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Create array of pages to display
  const pageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 7) {
      // If there are 7 or fewer pages, display all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always display the first page
      pages.push(1);
      
      // If current page > 4, add ellipsis
      if (currentPage > 4) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Calculate start and end pages to display
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Ensure we always display 3 pages (if possible)
      if (currentPage <= 3) {
        endPage = Math.min(5, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 4, 2);
      }
      
      // Add pages to array
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // If end page is less than totalPages - 1, add ellipsis
      if (endPage < totalPages - 1) {
        pages.push(-2); // -2 represents another ellipsis
      }
      
      // Always display the last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
      <div className="flex items-center gap-2">
        <span>Show</span>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => onItemsPerPageChange(Number(value))}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue>{itemsPerPage}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>of {totalItems} products</span>
      </div>

      <div className="flex items-center gap-1">
        <div className="text-sm text-muted-foreground">
          {startItem}-{endItem} / {totalItems}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center">
          {pageNumbers().map((pageNumber, index) => {
            // Display ellipsis
            if (pageNumber < 0) {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="mx-1 inline-flex h-8 w-8 items-center justify-center"
                >
                  ...
                </span>
              );
            }

            // Display page button
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControl; 