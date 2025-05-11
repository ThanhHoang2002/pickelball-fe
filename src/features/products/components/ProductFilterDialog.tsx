import { FilterIcon, X } from "lucide-react";
import { useState, useEffect } from "react";

import { AdminProductsFilters } from "../hooks/useAdminProducts";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
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
import { Separator } from "@/components/ui/separator";
import { useDebounce } from "@/hooks/useDebounce";

// Fixed category list
const categories = [
  { id: 1, name: "Paddles" },
  { id: 2, name: "Accessories" }
];

// Fixed status options
const statusOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "OUT_OF_STOCK", label: "Out of Stock" }
];

interface ProductFilterDialogProps {
  filters: AdminProductsFilters;
  onApplyFilters: (filters: AdminProductsFilters) => void;
  onResetFilters: () => void;
}

const ProductFilterDialog = ({
  filters,
  onApplyFilters,
  onResetFilters,
}: ProductFilterDialogProps) => {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<AdminProductsFilters>(filters);
  
  // Sử dụng state riêng cho minPrice và maxPrice để áp dụng debounce
  const [minPriceInput, setMinPriceInput] = useState<string>("");
  const [maxPriceInput, setMaxPriceInput] = useState<string>("");
  
  // State để theo dõi khi nào đang áp dụng debounce
  const [isMinPriceDebouncing, setIsMinPriceDebouncing] = useState(false);
  const [isMaxPriceDebouncing, setIsMaxPriceDebouncing] = useState(false);
  
  // Áp dụng debounce cho giá trị nhập vào
  const debouncedMinPrice = useDebounce(minPriceInput, { delay: 500 });
  const debouncedMaxPrice = useDebounce(maxPriceInput, { delay: 500 });

  // Reset local filters when external filters change
  useEffect(() => {
    setLocalFilters(filters);
    setMinPriceInput(filters.minPrice?.toString() || "");
    setMaxPriceInput(filters.maxPrice?.toString() || "");
  }, [filters]);
  
  // Cập nhật trạng thái debouncing khi nhập liệu
  useEffect(() => {
    if (minPriceInput !== debouncedMinPrice) {
      setIsMinPriceDebouncing(true);
    } else {
      setIsMinPriceDebouncing(false);
    }
  }, [minPriceInput, debouncedMinPrice]);
  
  useEffect(() => {
    if (maxPriceInput !== debouncedMaxPrice) {
      setIsMaxPriceDebouncing(true);
    } else {
      setIsMaxPriceDebouncing(false);
    }
  }, [maxPriceInput, debouncedMaxPrice]);
  
  // Cập nhật localFilters khi giá trị debounced thay đổi
  useEffect(() => {
    const minPrice = debouncedMinPrice === "" ? undefined : Number(debouncedMinPrice);
    handleChange("minPrice", minPrice);
  }, [debouncedMinPrice]);
  
  useEffect(() => {
    const maxPrice = debouncedMaxPrice === "" ? undefined : Number(debouncedMaxPrice);
    handleChange("maxPrice", maxPrice);
  }, [debouncedMaxPrice]);

  const handleChange = (
    key: keyof AdminProductsFilters,
    value: string | number | boolean | undefined
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    setOpen(false);
  };

  const handleReset = () => {
    onResetFilters();
    setMinPriceInput("");
    setMaxPriceInput("");
    setOpen(false);
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      // If value is "all", set categoryName to undefined (no category selected)
      handleChange("categoryName", undefined);
      handleChange("categoryId", undefined);
    } else {
      // Use the value directly as categoryName
      handleChange("categoryName", value);
      // Update categoryId for consistency
      const category = categories.find(c => c.name === value);
      handleChange("categoryId", category?.id);
    }
  };

  // Handle status selection
  const handleStatusChange = (value: string) => {
    if (value === "all") {
      // If value is "all", set status to undefined (no status selected)
      handleChange("status", undefined);
    } else {
      // Otherwise, set the value (already uppercase)
      handleChange("status", value);
    }
  };

  // Determine current category value for display in select
  const currentCategoryValue = localFilters.categoryName || 
    (localFilters.categoryId ? categories.find(c => c.id === localFilters.categoryId)?.name : "all");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2 flex items-center gap-2">
          <FilterIcon size={16} />
          Advanced Filter
          {Object.values(filters).some(val => val !== undefined && val !== '') && (
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {Object.values(filters).filter(val => val !== undefined && val !== '').length}
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Filter Products</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Filter by category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              value={currentCategoryValue || "all"}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter by status */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={localFilters.status || "all"}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter by price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Price (USD)</Label>
            <div className="col-span-3 flex items-center gap-2">
              <div className="relative w-full">
                <Input
                  placeholder="From"
                  type="number"
                  value={minPriceInput}
                  onChange={(e) => setMinPriceInput(e.target.value)}
                  className={`w-full ${isMinPriceDebouncing ? 'border-yellow-400' : ''}`}
                />
                {isMinPriceDebouncing && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400"></div>
                  </div>
                )}
              </div>
              <span>-</span>
              <div className="relative w-full">
                <Input
                  placeholder="To"
                  type="number"
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(e.target.value)}
                  className={`w-full ${isMaxPriceDebouncing ? 'border-yellow-400' : ''}`}
                />
                {isMaxPriceDebouncing && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-2" />
        </div>
        <DialogFooter className="gap-2 sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-1"
          >
            <X size={16} /> Clear filters
          </Button>
          <Button type="button" onClick={handleApply}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFilterDialog; 