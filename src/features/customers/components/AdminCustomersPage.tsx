import { motion } from 'framer-motion';
import { Search, Eye, ChevronLeft, ChevronRight, UserPlus, Filter, Mail, Phone, Calendar, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

import CustomerDetail from './CustomerDetail';

import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllCustomers } from '@/features/dashboard/customers/api/getCustomers';
import { Customer } from '@/types/customer';

const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>(getAllCustomers());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive' | ''>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [isCustomerDetailOpen, setIsCustomerDetailOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Lọc khách hàng theo tìm kiếm và trạng thái
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter ? customer.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sắp xếp khách hàng
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'date_asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'date_desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'orders_asc':
        return a.totalOrders - b.totalOrders;
      case 'orders_desc':
        return b.totalOrders - a.totalOrders;
      case 'spent_asc':
        return a.totalSpent - b.totalSpent;
      case 'spent_desc':
        return b.totalSpent - a.totalSpent;
      default:
        // Mặc định sắp xếp theo ngày tạo tài khoản (mới nhất trước)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
  
  const currentItems = sortedCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  
  // Xử lý xem chi tiết khách hàng
  const handleViewCustomer = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsCustomerDetailOpen(true);
  };
  
  // Định dạng tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };
  
  // Định dạng ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };
  
  // Điều hướng phân trang
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <motion.div 
      className="container mx-auto py-8" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý khách hàng</h1>
        <Button className="flex items-center gap-2">
          <UserPlus size={16} />
          Thêm khách hàng
        </Button>
      </div>
      
      {/* Thanh tìm kiếm và lọc */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm khách hàng..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
          <Select 
            value={statusFilter} 
            onValueChange={(value) => setStatusFilter(value as 'active' | 'inactive' | '')}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={sortBy} 
            onValueChange={(value) => setSortBy(value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Mặc định</SelectItem>
              <SelectItem value="name_asc">Tên (A-Z)</SelectItem>
              <SelectItem value="name_desc">Tên (Z-A)</SelectItem>
              <SelectItem value="date_asc">Ngày đăng ký (Cũ nhất)</SelectItem>
              <SelectItem value="date_desc">Ngày đăng ký (Mới nhất)</SelectItem>
              <SelectItem value="orders_desc">Đơn hàng (Cao - Thấp)</SelectItem>
              <SelectItem value="orders_asc">Đơn hàng (Thấp - Cao)</SelectItem>
              <SelectItem value="spent_desc">Chi tiêu (Cao - Thấp)</SelectItem>
              <SelectItem value="spent_asc">Chi tiêu (Thấp - Cao)</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={String(itemsPerPage)} onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Số lượng hiển thị" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 mục</SelectItem>
              <SelectItem value="10">10 mục</SelectItem>
              <SelectItem value="20">20 mục</SelectItem>
              <SelectItem value="50">50 mục</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Bảng dữ liệu */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Thông tin liên hệ</TableHead>
              <TableHead>Ngày đăng ký</TableHead>
              <TableHead className="text-center">Đơn hàng</TableHead>
              <TableHead className="text-right">Tổng chi tiêu</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Không tìm thấy khách hàng nào.
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <img
                          src={customer.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=Default"}
                          alt={customer.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{formatDate(customer.createdAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <ShoppingBag className="h-3 w-3 text-muted-foreground" />
                      <span>{customer.totalOrders}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(customer.totalSpent)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      customer.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Mở menu</span>
                          <Filter size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Xem chi tiết</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Gửi email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          <span>Xem đơn hàng</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Phân trang */}
      {filteredCustomers.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCustomers.length)} trên {filteredCustomers.length} khách hàng
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
      )}
      
      {/* Dialog Chi tiết khách hàng */}
      {currentCustomer && (
        <CustomerDetail
          open={isCustomerDetailOpen}
          onClose={() => setIsCustomerDetailOpen(false)}
          customer={currentCustomer}
        />
      )}
    </motion.div>
  );
};

export default AdminCustomersPage; 