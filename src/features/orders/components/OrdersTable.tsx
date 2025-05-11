import { Eye } from "lucide-react";

import { OrderStatusBadge } from "./OrderStatusBadge";
import { PaymentMethodBadge } from "./PaymentMethodBadge";
import { Order } from "../types";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrdersTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  loading?: boolean;
}

export const OrdersTable = ({ 
  orders, 
  onViewOrder, 
  loading = false 
}: OrdersTableProps) => {
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Format currency in USD (dollars)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead >Total</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                {loading ? "Loading..." : "No orders found."}
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.user.name}</p>
                    <p className="text-xs text-muted-foreground">{order.phone}</p>
                  </div>
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(order.totalPrice)}
                </TableCell>
                <TableCell>
                  <PaymentMethodBadge method={order.paymentMethod} />
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.paymentStatus} type="payment" />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewOrder(order)}
                    className="h-8 w-8 p-0"
                    disabled={loading}
                  >
                    <span className="sr-only">View details</span>
                    <Eye size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}; 