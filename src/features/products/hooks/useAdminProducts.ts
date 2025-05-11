import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';

import { createProduct } from '../api/createProduct';
import { deleteProduct } from '../api/deleteProduct';
import { getAllProduct, ProductsParams } from '../api/getAllProduct';
import { updateProduct } from '../api/updateProduct';
import { Product } from '../types';

export interface AdminProductsFilters {
  search: string;
  categoryId?: number;
  categoryName?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

// Ánh xạ từ categoryId sang categoryName
const categoryMap: Record<number, string> = {
  1: 'Paddles',
  2: 'Accessories'
};

export const useAdminProducts = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<AdminProductsFilters>({
    search: '',
    categoryId: undefined,
    categoryName: undefined,
    status: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    isBestSeller: undefined,
    isNewArrival: undefined
  });
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Sorting
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Convert filters to API params
  const queryParams: ProductsParams = useMemo(() => {
    // Lấy categoryName từ categoryId nếu có
    let categoryName = filters.categoryName;
    if (!categoryName && filters.categoryId) {
      categoryName = categoryMap[filters.categoryId];
    }

    return {
      page: currentPage - 1, // API uses 0-based indexing
      size: itemsPerPage,
      search: filters.search || undefined,
      sortBy: sortField,
      sortDirection: sortDirection,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      status: filters.status,
      categoryName, // Sử dụng categoryName cho API
    };
  }, [currentPage, itemsPerPage, filters, sortField, sortDirection]);

  // Fetch products
  const {
    data: productsResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['admin-products', queryParams],
    queryFn: async () => {
      return await getAllProduct(queryParams);
    }
  });

  // Extract products and pagination info
  const products = productsResponse?.result || [];
  const totalItems = productsResponse?.meta.total || 0;
  const totalPages = productsResponse?.meta.pages || 1;

  // Mutations
  const createMutation = useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setIsProductDialogOpen(false);
      setCurrentProduct(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) => 
      updateProduct(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setIsProductDialogOpen(false);
      setCurrentProduct(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setIsDeleteDialogOpen(false);
      setCurrentProduct(null);
    },
    onError: (error) => {
      // Giữ dialog mở để hiển thị lỗi
      return error;
    }
  });

  // Event handlers
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsProductDialogOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsProductDialogOpen(true);
  };
  
  const handleDeleteClick = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (currentProduct) {
      try {
        await deleteMutation.mutateAsync(currentProduct.id);
        return { success: true };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // Trả về lỗi để component xử lý hiển thị thông báo
        const errorMessage = error?.response?.data?.message || 
                           'Cannot delete product that is used in orders.';
        return { success: false, message: errorMessage };
      }
    }
    return { success: false, message: 'No product selected' };
  };
  
  const handleSaveProduct = async (formData: FormData) => {
    if (currentProduct) {
      // Cập nhật sản phẩm
      // Thêm ID vào formData nếu không có
      if (!formData.has('id')) {
        formData.append('id', currentProduct.id.toString());
      }
      await updateMutation.mutateAsync({ id: currentProduct.id, formData });
    } else {
      // Thêm sản phẩm mới
      await createMutation.mutateAsync(formData);
    }
  };

  // Filter handlers
  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi tìm kiếm
  };

  const handleFilterChange = (newFilters: Partial<AdminProductsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi bộ lọc
  };

  const handleSortChange = (field: string) => {
    if (field === sortField) {
      // Nếu đang sort theo field này rồi thì đảo chiều sort
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Nếu sort theo field mới thì mặc định là asc
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi số item trên trang
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: '',
      categoryId: undefined,
      categoryName: undefined,
      status: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      isBestSeller: undefined,
      isNewArrival: undefined
    });
    setSortField('name');
    setSortDirection('asc');
    setCurrentPage(1);
  };

  return {
    // Data
    products,
    totalItems,
    totalPages,
    currentPage,
    itemsPerPage,
    
    // Loading states
    isLoading,
    isError,
    error,
    
    // Dialog states
    currentProduct,
    isProductDialogOpen,
    isDeleteDialogOpen,
    setIsProductDialogOpen,
    setIsDeleteDialogOpen,
    
    // Filters & Sorting
    filters,
    sortField,
    sortDirection,
    
    // CRUD handlers
    handleAddProduct,
    handleEditProduct,
    handleDeleteClick,
    handleDeleteConfirm,
    handleSaveProduct,
    
    // Filter & Sort handlers
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    resetFilters,
    
    // Pagination handlers
    handlePageChange,
    handleItemsPerPageChange,
    
    // Mutations loading states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    
    // Refresh data
    refetch
  };
}; 