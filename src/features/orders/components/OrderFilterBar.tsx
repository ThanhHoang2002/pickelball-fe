import { format } from "date-fns";
import { Filter } from "lucide-react";

import { OrderFilterParams, PaymentMethod, PaymentStatus } from "../types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Simplified filter UI without requiring additional UI components
interface OrderFilterBarProps {
  filters: OrderFilterParams;
  onFilterChange: (filters: Partial<OrderFilterParams>) => void;
  loading?: boolean;
}

export const OrderFilterBar = ({ 
  filters, 
  onFilterChange, 
  loading = false 
}: OrderFilterBarProps) => {

  const handlePaymentStatusChange = (value: string) => {
    onFilterChange({ paymentStatus: value === "all" ? undefined : value as PaymentStatus });
  };

  const handlePaymentMethodChange = (value: string) => {
    onFilterChange({ paymentMethod: value === "all" ? undefined : value as PaymentMethod });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.paymentStatus) count++;
    if (filters.paymentMethod) count++;
    if (filters.fromDate || filters.toDate) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="mb-6 rounded-md border">
      <div className="p-4">
        <div className="space-y-4">
        
          {/* Filter sections */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Payment Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Status</label>
              <Select 
                value={filters.paymentStatus || "all"} 
                onValueChange={handlePaymentStatusChange}
              >
                <SelectTrigger disabled={loading}>
                  <SelectValue placeholder="All payment statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All payment statuses</SelectItem>
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
              {filters.paymentStatus && (
                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs">
                    Payment: {filters.paymentStatus}
                  </span>
                </div>
              )}
            </div>

            {/* Payment Method Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <Select 
                value={filters.paymentMethod || "all"} 
                onValueChange={handlePaymentMethodChange}
              >
                <SelectTrigger disabled={loading}>
                  <SelectValue placeholder="All payment methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All payment methods</SelectItem>
                  <SelectItem value="COD">Cash on Delivery (COD)</SelectItem>
                  <SelectItem value="TRANSFER">Bank Transfer</SelectItem>
                  <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                </SelectContent>
              </Select>
              {filters.paymentMethod && (
                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs">
                    Method: {filters.paymentMethod}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Active Filter Summary */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-md bg-slate-50 p-2 text-sm">
              <Filter size={16} className="text-slate-500" />
              <span className="font-medium">Active filters:</span>
              {filters.paymentStatus && (
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                  Payment: {filters.paymentStatus}
                </span>
              )}
              {filters.paymentMethod && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Method: {filters.paymentMethod}
                </span>
              )}
              {(filters.fromDate || filters.toDate) && (
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                  Date: {filters.fromDate && format(new Date(filters.fromDate), "MM/dd")}
                  {filters.fromDate && filters.toDate && " - "}
                  {filters.toDate && format(new Date(filters.toDate), "MM/dd")}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 