import { memo } from "react";

import { OrderFilterParams, PaymentStatus, OrderStatus } from "../types";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerOrderFilterBarProps {
  filters: OrderFilterParams;
  onFilterChange: (filters: Partial<OrderFilterParams>) => void;
  loading?: boolean;
}

export const CustomerOrderFilterBar = memo(({ 
  filters, 
  onFilterChange, 
  loading = false 
}: CustomerOrderFilterBarProps) => {

  const handlePaymentStatusChange = (value: string) => {
    onFilterChange({ paymentStatus: value === "all" ? undefined : value as PaymentStatus });
    onFilterChange({ orderStatus: value === "all" ? undefined : value as OrderStatus });
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <CardTitle className="mb-4 text-xl md:mb-0">My Orders</CardTitle>
          
          <div className="w-full md:w-64">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Filter by Payment Status
            </label>
            <Select 
              value={filters.paymentStatus || "all"} 
              onValueChange={handlePaymentStatusChange}
            >
              <SelectTrigger disabled={loading}>
                <SelectValue placeholder="All orders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="PENDING">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                    Pending
                  </div>
                </SelectItem>
                <SelectItem value="PAID">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Paid
                  </div>
                </SelectItem>
                <SelectItem value="FAILED">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    Failed
                  </div>
                </SelectItem>
                <SelectItem value="REFUNDED">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    Refunded
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-64">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Filter by Order Status
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All orders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                    All Orders
                  </div>
                </SelectItem>
                <SelectItem value="PENDING">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                    Pending
                  </div>
                </SelectItem>
                <SelectItem value="PROCESSING">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    Processing
                  </div>
                </SelectItem>
                <SelectItem value="SHIPPED">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Shipped
                  </div>
                </SelectItem>
                  <SelectItem value="DELIVERED">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    Delivered
                  </div>
                </SelectItem>
              </SelectContent>
            </Select> 
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CustomerOrderFilterBar.displayName = 'CustomerOrderFilterBar'; 