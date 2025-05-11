import { format } from "date-fns";
import { Calendar, FileText, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Supplier } from "@/types/supplier";

interface SupplierDetailProps {
  open: boolean;
  onClose: () => void;
  supplier: Supplier;
}

export const SupplierDetail = ({ open, onClose, supplier }: SupplierDetailProps) => {
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "dd/MM/yyyy HH:mm");
  };

  // Generate initials for supplier avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Supplier Details</DialogTitle>
        </DialogHeader>
        
        {/* Supplier Header */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-4">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-muted">
            {supplier.image ? (
              <img
                src={supplier.image}
                alt={supplier.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xl font-semibold">{getInitials(supplier.name)}</span>
            )}
          </div>
          
          <div className="mt-3 text-center sm:mt-0 sm:flex-1 sm:text-left">
            <h3 className="text-lg font-semibold">{supplier.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {supplier.id}</p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Supplier Description */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Description</h4>
          
          <div className="flex items-start gap-2 rounded-md border p-3">
            <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm">{supplier.description || "No description available."}</p>
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
                <p className="text-sm">{formatDate(supplier.createdAt)}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 rounded-md border p-3">
              <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Last Updated</p>
                <p className="text-sm">{formatDate(supplier.updatedAt)}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 rounded-md border p-3">
              <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Created By</p>
                <p className="text-sm">{supplier.createdBy || "N/A"}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 rounded-md border p-3">
              <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Updated By</p>
                <p className="text-sm">{supplier.updatedBy || "N/A"}</p>
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
};

export default SupplierDetail; 