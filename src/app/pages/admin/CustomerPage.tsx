import { motion } from 'framer-motion';
import { Search, Eye, ChevronLeft, ChevronRight, Calendar, Mail, User } from 'lucide-react';
import { useState, memo, useCallback, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CustomerDetail from '@/features/customers/components/CustomerDetail';
import { useCustomers } from '@/features/customers/hooks/useCustomers';
import { Customer } from '@/types/customer';

// Tách riêng thành component con để tránh re-render không cần thiết
const CustomerRow = memo(({ 
  customer, 
  onViewCustomer, 
  formatDate 
}: { 
  customer: Customer; 
  onViewCustomer: (customer: Customer) => void;
  formatDate: (dateString: string | null) => string;
}) => {
  return (
    <TableRow key={customer.id}>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img
              src={customer.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(customer.name)}`}
              alt={customer.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{customer.name}</p>
            <p className="text-xs text-muted-foreground">#{customer.id}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span className="max-w-[200px] truncate text-sm" title={customer.email}>
              {customer.email}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm capitalize">{customer.gender.toLowerCase()}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{formatDate(customer.createdAt)}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onViewCustomer(customer)}
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">View details</span>
        </Button>
      </TableCell>
    </TableRow>
  );
});

CustomerRow.displayName = 'CustomerRow';

// Tách phân trang thành component riêng
const Pagination = memo(({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  goToPage 
}: { 
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  goToPage: (page: number) => void; 
}) => {
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
      <div>
        Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} customers
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </Button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNumber;
          if (totalPages <= 5) {
            pageNumber = i + 1;
          } else if (currentPage <= 3) {
            pageNumber = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + i;
          } else {
            pageNumber = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';

const CustomerPage = () => {
  const [isCustomerDetailOpen, setIsCustomerDetailOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  
  // Sử dụng custom hook
  const { 
    customers,
    loading,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    goToPage,
    fetchCustomerById
  } = useCustomers();

  // Format date - memoize để tránh tạo lại hàm mỗi lần render
  const formatDate = useCallback((dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  }, []);
  
  // View customer details và đảm bảo không gọi API nhiều lần
  const handleViewCustomer = useCallback(async (customer: Customer) => {
    try {
      // Lấy thông tin chi tiết khách hàng từ cache hoặc API
      const detailedCustomer = await fetchCustomerById(customer.id);
      setCurrentCustomer(detailedCustomer);
      setIsCustomerDetailOpen(true);
    } catch (error) {
      console.error("Error fetching customer details:", error);
      // Fallback nếu không lấy được thông tin chi tiết
      setCurrentCustomer(customer);
      setIsCustomerDetailOpen(true);
    }
  }, [fetchCustomerById]);

  // Handle close dialog
  const handleCloseDialog = useCallback(() => {
    setIsCustomerDetailOpen(false);
  }, []);

  // Memoize danh sách customers để tránh re-render
  const customersList = useMemo(() => {
    return customers.map((customer) => (
      <CustomerRow 
        key={customer.id}
        customer={customer}
        onViewCustomer={handleViewCustomer}
        formatDate={formatDate}
      />
    ));
  }, [customers, handleViewCustomer, formatDate]);

  return (
    <motion.div 
      className="container mx-auto py-8" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Customer Management</h1>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Loading customers...
                </TableCell>
              </TableRow>
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              customersList
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          goToPage={goToPage}
        />
      )}
      
      {/* Customer Detail Dialog */}
      {currentCustomer && (
        <CustomerDetail
          open={isCustomerDetailOpen}
          onClose={handleCloseDialog}
          customer={currentCustomer}
        />
      )}
    </motion.div>
  );
};

export default CustomerPage; 