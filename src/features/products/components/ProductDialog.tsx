import { useState, useEffect, useRef } from "react";

import { Product, Supplier } from "../types";


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { Category } from "@/features/categories/types";
import { useSuppliers } from "@/features/suppliers/hooks/useSuppliers";

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => void;
  product?: Product;
  isSubmitting?: boolean;
}

// Type for the form data that will be sent to the API
interface FormProduct {
  id?: number;
  name: string;
  description: string;
  sellPrice: number;
  quantity: number;
  status: string;
  categoryId?: number;
  supplierId?: number;
}

const ProductDialog = ({
  open,
  onClose,
  onSave,
  product,
  isSubmitting = false,
}: ProductDialogProps) => {
  const isEditing = !!product;
  const [formData, setFormData] = useState<FormProduct>({
    name: "",
    sellPrice: 0,
    description: "",
    quantity: 0,
    status: "ACTIVE",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageChanged, setImageChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Fetch suppliers using the hook
  const { data: suppliersData, isLoading: isSuppliersLoading } = useSuppliers();
  // Extract suppliers from the response or use empty array as fallback
  const suppliers: Supplier[] = suppliersData?.result || [];

  // Fetch categories using the hook
  const { categories, isLoading: isCategoriesLoading } = useCategories();

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description,
        sellPrice: product.sellPrice,
        quantity: product.quantity,
        status: product.status,
        categoryId: product.category?.id,
        supplierId: product.supplier?.id,
      });
      setImagePreview(product.image || "");
      setImageFile(null);
      setImageChanged(false);
    } else {
      setFormData({
        name: "",
        sellPrice: 0,
        description: "",
        quantity: 0,
        status: "ACTIVE",
      });
      setImagePreview("");
      setImageFile(null);
      setImageChanged(false);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "number") {
      setFormData({ ...formData, [name]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageChanged(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (value: string) => {
    const categoryId = parseInt(value, 10);
    setFormData({ ...formData, categoryId });
  };

  const handleSupplierChange = (value: string) => {
    const supplierId = parseInt(value, 10);
    setFormData({ ...formData, supplierId });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData object to send both product data and image file
    const submitFormData = new FormData();
    
    // Add product data
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined) {
        submitFormData.append(key, value.toString());
      }
    });
    
    // Add image file if it exists or was changed
    if (imageFile && imageChanged) {
      submitFormData.append('image', imageFile);
    }
    
    // Add flag to indicate if we're keeping the existing image in an update operation
    if (isEditing && !imageChanged) {
      submitFormData.append('keepExistingImage', 'true');
    }
    
    onSave(submitFormData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sellPrice" className="text-right">
                Price ($)
              </Label>
              <Input
                id="sellPrice"
                name="sellPrice"
                type="number"
                value={formData.sellPrice}
                onChange={handleChange}
                className="col-span-3"
                required
                min={0}
                step={0.01}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                className="col-span-3"
                required
                min={0}
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="pt-2 text-right">
                Description (Markdown)
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mb-2 font-mono"
                  rows={6}
                  required
                  placeholder="# Product Description
• Feature 1
• Feature 2

**Bold text** for emphasis"
                />
                <div className="mb-2 text-xs text-muted-foreground">
                  Supports Markdown formatting: headings, lists, bold, italic, etc.
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                value={formData.categoryId?.toString()}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {isCategoriesLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading categories...
                    </SelectItem>
                  ) : (
                    categories.map((category: Category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">
                Supplier
              </Label>
              <Select
                value={formData.supplierId?.toString()}
                onValueChange={handleSupplierChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a supplier" />
                </SelectTrigger>
                <SelectContent>
                  {isSuppliersLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading suppliers...
                    </SelectItem>
                  ) : (
                    suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="image" className="pt-2 text-right">
                Product Image
              </Label>
              <div className="col-span-3">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-2"
                  ref={fileInputRef}
                  required={!isEditing}
                />
                {imagePreview && (
                  <div className="relative mt-2 h-40 w-40 overflow-hidden rounded-md border">
                    <img 
                      src={imagePreview} 
                      alt="Product preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                {isEditing && !imageChanged && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Select a new image only if you want to change the current one.
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isCategoriesLoading || isSuppliersLoading || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{isEditing ? "Update" : "Create"} Product</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog; 