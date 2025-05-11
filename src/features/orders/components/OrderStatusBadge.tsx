import { OrderStatus, PaymentStatus } from "../types";

import { cn } from "@/utils/cn";

interface OrderStatusBadgeProps {
  status?: OrderStatus | PaymentStatus | string;
  type?: "order" | "payment";
  className?: string;
}

export const OrderStatusBadge = ({ 
  status, 
  type = "order", 
  className 
}: OrderStatusBadgeProps) => {
  // Provide a default empty string if status is undefined or null
  const safeStatus = status || "";
  
  let statusText = "";
  let statusClass = "";

  if (type === "order") {
    switch (safeStatus as OrderStatus) {
      case "PENDING":
        statusText = "Pending";
        statusClass = "bg-yellow-100 text-yellow-800";
        break;
      case "PROCESSING":
        statusText = "Processing";
        statusClass = "bg-blue-100 text-blue-800";
        break;
      case "COMPLETED":
        statusText = "Completed";
        statusClass = "bg-green-100 text-green-800";
        break;
      case "DELIVERED":
        statusText = "Delivered";
        statusClass = "bg-indigo-100 text-indigo-800";
        break;
      case "CANCELLED":
        statusText = "Cancelled";
        statusClass = "bg-red-100 text-red-800";
        break;
      default:
        statusText = "Unknown";
        statusClass = "bg-gray-100 text-gray-800";
    }
  } else {
    switch (safeStatus as PaymentStatus) {
      case "PENDING":
        statusText = "Pending";
        statusClass = "bg-yellow-100 text-yellow-800";
        break;
      case "PAID":
        statusText = "Paid";
        statusClass = "bg-green-100 text-green-800";
        break;
      case "FAILED":
        statusText = "Failed";
        statusClass = "bg-red-100 text-red-800";
        break;
      case "REFUNDED":
        statusText = "Refunded";
        statusClass = "bg-purple-100 text-purple-800";
        break;
      default:
        statusText = "Unknown";
        statusClass = "bg-gray-100 text-gray-800";
    }
  }

  return (
    <span className={cn("rounded-full px-2 py-1 text-xs font-medium", statusClass, className)}>
      {statusText}
    </span>
  );
}; 