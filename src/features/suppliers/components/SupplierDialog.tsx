import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Supplier } from "@/types/supplier";
import { SupplierForm } from "./SupplierForm";

interface SupplierDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  supplier?: Supplier | null;
  isSubmitting: boolean;
}

export const SupplierDialog = ({
  open,
  onClose,
  onSubmit,
  supplier,
  isSubmitting,
}: SupplierDialogProps) => {
  const isEditing = !!supplier;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? "Edit Supplier" : "Add New Supplier"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the supplier details."
              : "Fill in the details to create a new supplier."}
          </DialogDescription>
        </DialogHeader>

        <SupplierForm
          supplier={supplier}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SupplierDialog; 