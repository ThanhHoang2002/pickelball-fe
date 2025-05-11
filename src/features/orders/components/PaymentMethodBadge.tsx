import { PaymentMethod } from "../types";

import { cn } from "@/utils/cn";

interface PaymentMethodBadgeProps {
  method: PaymentMethod;
  className?: string;
}

export const PaymentMethodBadge = ({ method, className }: PaymentMethodBadgeProps) => {
  let methodText = "";
  let methodClass = "";

  switch (method) {
    case "COD":
      methodText = "Cash (COD)";
      methodClass = "bg-amber-50 text-amber-600 border-amber-200";
      break;
    case "TRANSFER":
      methodText = "Bank Transfer";
      methodClass = "bg-blue-50 text-blue-600 border-blue-200";
      break;
    case "CREDIT_CARD":
      methodText = "Credit Card";
      methodClass = "bg-purple-50 text-purple-600 border-purple-200";
      break;
    default:
      methodText = method;
      methodClass = "bg-gray-100 text-gray-800 border-gray-200";
  }

  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium", 
        methodClass, 
        className
      )}
    >
      {methodText}
    </span>
  );
}; 