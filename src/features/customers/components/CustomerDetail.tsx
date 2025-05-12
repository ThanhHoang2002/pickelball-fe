import { format } from "date-fns";
import { Calendar, Mail, MapPin } from "lucide-react";
import { memo, useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Customer } from "@/types/customer";

interface CustomerDetailProps {
  open: boolean;
  onClose: () => void;
  customer: Customer;
}

export const CustomerDetail = memo(({ open, onClose, customer }: CustomerDetailProps) => {
  // Format date với useCallback để tránh tạo lại hàm mỗi khi render
  const formatDate = useCallback((dateString: string | null) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "dd/MM/yyyy HH:mm");
  }, []);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Customer Details</DialogTitle>
        </DialogHeader>
        
        {/* Customer Header */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-4">
          <div className="h-24 w-24 overflow-hidden rounded-full border">
            <img
              src={customer.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=" + encodeURIComponent(customer.name)}
              alt={customer.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="mt-3 text-center sm:mt-0 sm:flex-1 sm:text-left">
            <h3 className="text-lg font-semibold">{customer.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
            
            <div className="mt-2">
              <Badge variant="outline" className="capitalize">
                {customer.role.name}
              </Badge>
              {customer.gender && (
                <Badge variant="outline" className="ml-2 capitalize">
                  {customer.gender.toLowerCase()}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Contact Information</h4>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-2 rounded-md border p-3">
              <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="break-all text-sm">{customer.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 rounded-md border p-3">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm">{customer.address || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Account Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Account Information</h4>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-2 rounded-md border p-3">
              <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Created At</p>
                <p className="text-sm">{formatDate(customer.createdAt)}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 rounded-md border p-3">
              <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Last Updated</p>
                <p className="text-sm">{formatDate(customer.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

CustomerDetail.displayName = 'CustomerDetail';

export default CustomerDetail; 