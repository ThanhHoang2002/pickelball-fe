import { Customer, CustomerFilter } from "@/types/customer";

// Mảng dữ liệu mẫu khách hàng
const customers: Customer[] = [
  {
    id: "CUS001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Dusty",
    totalOrders: 5,
    totalSpent: 1250000,
    createdAt: "2023-01-15T08:30:00Z",
    lastOrderDate: "2023-11-15T10:15:00Z",
    status: "active"
  },
  {
    id: "CUS002",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0901234567",
    address: "456 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mittens",
    totalOrders: 3,
    totalSpent: 850000,
    createdAt: "2023-02-20T09:45:00Z",
    lastOrderDate: "2023-11-16T16:45:00Z",
    status: "active"
  },
  {
    id: "CUS003",
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0912345678",
    address: "789 Đường Phạm Ngọc Thạch, Quận 3, TP. Hồ Chí Minh",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
    totalOrders: 8,
    totalSpent: 3200000,
    createdAt: "2023-03-10T10:15:00Z",
    lastOrderDate: "2023-11-18T09:15:00Z",
    status: "active"
  },
  {
    id: "CUS004",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0978123456",
    address: "101 Đường Võ Văn Tần, Quận 3, TP. Hồ Chí Minh",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bella",
    totalOrders: 1,
    totalSpent: 80000,
    createdAt: "2023-04-05T14:30:00Z",
    lastOrderDate: "2023-11-20T16:05:00Z",
    status: "inactive",
    notes: "Không liên lạc được với khách hàng"
  },
  {
    id: "CUS005",
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0939876543",
    address: "202 Đường Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Max",
    totalOrders: 4,
    totalSpent: 1500000,
    createdAt: "2023-05-12T11:20:00Z",
    lastOrderDate: "2023-11-22T11:20:00Z",
    status: "active"
  },
  {
    id: "CUS006",
    name: "Vũ Thị F",
    email: "vuthif@example.com",
    phone: "0967890123",
    address: "303 Đường Cách Mạng Tháng Tám, Quận 10, TP. Hồ Chí Minh",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophie",
    totalOrders: 6,
    totalSpent: 2100000,
    createdAt: "2023-06-18T09:10:00Z",
    lastOrderDate: "2023-10-30T14:25:00Z",
    status: "active"
  },
  {
    id: "CUS007",
    name: "Đỗ Văn G",
    email: "dovang@example.com",
    phone: "0945678901",
    address: "404 Đường Nguyễn Trãi, Quận 5, TP. Hồ Chí Minh",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver",
    totalOrders: 2,
    totalSpent: 450000,
    createdAt: "2023-07-25T16:40:00Z",
    lastOrderDate: "2023-10-15T10:30:00Z",
    status: "inactive",
    notes: "Khách hàng yêu cầu không liên hệ qua điện thoại"
  },
  {
    id: "CUS008",
    name: "Ngô Thị H",
    email: "ngothih@example.com",
    phone: "0923456789",
    address: "505 Đường Lý Thường Kiệt, Quận 10, TP. Hồ Chí Minh",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lucy",
    totalOrders: 7,
    totalSpent: 2800000,
    createdAt: "2023-08-05T08:15:00Z",
    lastOrderDate: "2023-11-05T09:20:00Z",
    status: "active"
  },
  {
    id: "CUS009",
    name: "Trịnh Văn I",
    email: "trinhvani@example.com",
    phone: "0934567890",
    address: "606 Đường Hùng Vương, Quận 5, TP. Hồ Chí Minh",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie",
    totalOrders: 3,
    totalSpent: 920000,
    createdAt: "2023-09-10T10:25:00Z",
    lastOrderDate: "2023-10-25T15:10:00Z",
    status: "active"
  },
  {
    id: "CUS010",
    name: "Lý Thị K",
    email: "lythik@example.com",
    phone: "0912345678",
    address: "707 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP. Hồ Chí Minh",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Luna",
    totalOrders: 9,
    totalSpent: 3700000,
    createdAt: "2023-10-15T14:50:00Z",
    lastOrderDate: "2023-11-10T13:40:00Z",
    status: "active"
  }
];

/**
 * Lấy tất cả khách hàng
 */
export const getAllCustomers = (): Customer[] => {
  return customers;
};

/**
 * Lấy khách hàng theo ID
 */
export const getCustomerById = (id: string): Customer | undefined => {
  return customers.find(customer => customer.id === id);
};

/**
 * Lọc khách hàng theo trạng thái
 */
export const getCustomersByStatus = (status: 'active' | 'inactive'): Customer[] => {
  return customers.filter(customer => customer.status === status);
};

/**
 * Lọc khách hàng theo các tiêu chí
 */
export const filterCustomers = (filter: CustomerFilter): Customer[] => {
  let filteredCustomers = [...customers];

  // Lọc theo trạng thái
  if (filter.status) {
    filteredCustomers = filteredCustomers.filter(customer => customer.status === filter.status);
  }

  // Tìm kiếm
  if (filter.search) {
    const searchTerm = filter.search.toLowerCase();
    filteredCustomers = filteredCustomers.filter(customer => 
      customer.id.toLowerCase().includes(searchTerm) ||
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.phone.includes(searchTerm)
    );
  }

  // Sắp xếp
  if (filter.sortBy) {
    switch (filter.sortBy) {
      case 'name_asc':
        filteredCustomers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        filteredCustomers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'date_asc':
        filteredCustomers.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'date_desc':
        filteredCustomers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'orders_asc':
        filteredCustomers.sort((a, b) => a.totalOrders - b.totalOrders);
        break;
      case 'orders_desc':
        filteredCustomers.sort((a, b) => b.totalOrders - a.totalOrders);
        break;
      case 'spent_asc':
        filteredCustomers.sort((a, b) => a.totalSpent - b.totalSpent);
        break;
      case 'spent_desc':
        filteredCustomers.sort((a, b) => b.totalSpent - a.totalSpent);
        break;
    }
  } else {
    // Mặc định sắp xếp theo ngày tạo tài khoản mới nhất
    filteredCustomers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return filteredCustomers;
}; 