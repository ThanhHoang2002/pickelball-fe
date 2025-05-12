import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { createSupplier, deleteSupplier, getAllSuppliers, updateSupplier } from "../api";

import { useToast } from "@/hooks/use-toast";
import { useDebounceSearch } from "@/hooks/useDebounce";
import { SupplierFilterParams } from "@/types/supplier";

export const useSuppliers = (initialFilters: SupplierFilterParams = {}) => {
  const [filters, setFilters] = useState<SupplierFilterParams>({
    page: initialFilters.page || 1,
    size: initialFilters.size || 10,
    sortBy: initialFilters.sortBy,
    sortDirection: initialFilters.sortDirection,
    search: initialFilters.search || "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // React Query hook to fetch suppliers
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["suppliers", filters],
    queryFn: () => getAllSuppliers(filters),
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });

  // Create supplier mutation
  const createSupplierMutation = useMutation({
    mutationFn: (formData: FormData) => createSupplier(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast({
        title: "Success",
        description: "Supplier created successfully",
      });
    },
    onError: (error) => {
      console.error("Error creating supplier:", error);
      toast({
        title: "Error",
        description: "Failed to create supplier. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update supplier mutation
  const updateSupplierMutation = useMutation({
    mutationFn: ({id, formData}: {id: number, formData: FormData}) => updateSupplier(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast({
        title: "Success",
        description: "Supplier updated successfully",
      });
    },
    onError: (error) => {
      console.error("Error updating supplier:", error);
      toast({
        title: "Error",
        description: "Failed to update supplier. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete supplier mutation
  const deleteSupplierMutation = useMutation({
    mutationFn: (id: number) => deleteSupplier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast({
        title: "Success",
        description: "Supplier deleted successfully",
      });
    },
    onError: (error) => {
      console.error("Error deleting supplier:", error);
      toast({
        title: "Error",
        description: "Failed to delete supplier. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Use debounced search
  const { searchTerm, setSearchTerm } = useDebounceSearch((value) => {
    // Reset to page 1 when search term changes
    setFilters((prev) => ({ 
      ...prev, 
      search: value,
      page: 1 
    }));
  }, { delay: 500 });

  // Change page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= (data?.meta.pages || 1)) {
      setFilters((prev) => ({ ...prev, page }));
    }
  };

  // Change sort criteria
  const handleSort = (sortBy: string, sortDirection: 'asc' | 'desc' = 'asc') => {
    setFilters((prev) => ({ ...prev, sortBy, sortDirection }));
  };

  // Change page size
  const handlePageSizeChange = (pageSize: number) => {
    setFilters((prev) => ({ ...prev, pageSize, page: 1 }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      page: 1,
      size: 10,
      search: "",
    });
    setSearchTerm("");
  };

  return {
    suppliers: data?.result || [],
    loading: isLoading,
    error: isError ? "Failed to fetch suppliers. Please try again later." : null,
    searchTerm,
    setSearchTerm,
    currentPage: filters.page || 1,
    totalPages: data?.meta.pages || 1,
    totalItems: data?.meta.total || 0,
    itemsPerPage: filters.size || 10,
    filters,
    goToPage,
    handleSort,
    handlePageSizeChange,
    resetFilters,
    refreshData: refetch,
    // Mutations
    createSupplier: createSupplierMutation.mutate,
    updateSupplier: updateSupplierMutation.mutate,
    deleteSupplier: deleteSupplierMutation.mutate,
    isCreating: createSupplierMutation.isPending,
    isUpdating: updateSupplierMutation.isPending,
    isDeleting: deleteSupplierMutation.isPending,
  };
};
