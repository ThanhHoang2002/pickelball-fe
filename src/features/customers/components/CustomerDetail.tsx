import { Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Customer } from "@/types/customer";

interface CustomerDetailProps {
  open: boolean;
  onClose: () => void;
  customer: Customer;
}

const CustomerDetail = ({ open, onClose, customer }: CustomerDetailProps) => {
  // Format date to readable format
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Thông tin khách hàng
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-8 py-4 md:grid-cols-3">
          {/* Avatar and Status */}
          <div className="text-center">
            <div className="mx-auto mb-3 h-28 w-28 overflow-hidden rounded-full">
              <img
                src={customer.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=Default"}
                alt={customer.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mb-1 text-lg font-semibold">{customer.name}</h3>
            <div className="mb-3">
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                customer.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Khách hàng từ {formatDate(customer.createdAt)}
            </p>
          </div>

          {/* Contact Information */}
          <div className="col-span-2 space-y-4">
            {/* Contact Details */}
            <div className="rounded-lg border p-4">
              <h4 className="mb-3 font-medium">Thông tin liên hệ</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>{customer.address}</span>
                </div>
              </div>
            </div>

            {/* Order Statistics */}
            <div className="rounded-lg border p-4">
              <h4 className="mb-3 font-medium">Đơn hàng & Thanh toán</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md bg-primary/10 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tổng đơn hàng</span>
                    <ShoppingBag className="h-4 w-4 text-primary" />
                  </div>
                  <p className="mt-1 text-xl font-semibold">{customer.totalOrders}</p>
                </div>
                <div className="rounded-md bg-primary/10 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tổng thanh toán</span>
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <p className="mt-1 text-xl font-semibold">{formatCurrency(customer.totalSpent)}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2 rounded-lg border p-4">
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">Đơn hàng gần nhất:</span>
                  <span className="ml-1">{formatDate(customer.lastOrderDate)}</span>
                </div>
              </div>
              
              {customer.notes && (
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500" />
                  <div>
                    <span className="text-sm font-medium">Ghi chú:</span>
                    <p className="text-sm">{customer.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button type="button">
            Xem đơn hàng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetail; 