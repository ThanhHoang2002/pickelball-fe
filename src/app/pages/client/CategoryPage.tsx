import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useProductsParams } from '@/features/products/hooks/useProductParams';
import { useProductsByCategory } from '@/features/products/hooks/useProducts';
import { useSuppliers } from '@/features/suppliers/hooks/useSuppliers';
import { useDebounce } from '@/hooks/useDebounce';
import { mappingCategoryName } from '@/utils/mappingCategoryName';

// Mapping giữa ID danh mục và mô tả
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Vợt': 'Discover the best pickleball paddles for all skill levels.',
  'Phụ kiện': 'Enhance your pickleball experience with essential accessories.',
};

// Số sản phẩm mỗi trang
export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { filters, updateFilters } = useProductsParams();
  const { data: suppliersData } = useSuppliers();
  
  // Lấy các tham số lọc từ URL
  const minPrice = filters.minPrice;
  const maxPrice = filters.maxPrice;
  const sortBy = filters.sortBy;
  const sortDirection = filters.sortDirection;
  
  // State để lưu trữ giá trị đang nhập trước khi debounce
  const [minPriceInput, setMinPriceInput] = useState<number | undefined>(minPrice);
  const [maxPriceInput, setMaxPriceInput] = useState<number | undefined>(maxPrice);
  
  // Sử dụng debounce cho giá trị giá
  const debouncedMinPrice = useDebounce<number | undefined>(minPriceInput, { delay: 500 });
  const debouncedMaxPrice = useDebounce<number | undefined>(maxPriceInput, { delay: 500 });
  
  // Cập nhật category filter từ URL parameter
  useEffect(() => {
    if (category) {
      updateFilters({
        categoryName: mappingCategoryName(category),
        size: 18 // Hiển thị 18 sản phẩm mỗi trang
      });
    }
  }, [category, updateFilters]);
  
  // Fetch sản phẩm theo danh mục
  const { data: productData, isLoading, isFetching } = useProductsByCategory(
    mappingCategoryName(category ?? ''), 
    filters
  );
  
  const meta = productData?.meta;
  const totalPages = meta?.pages || 0;
  const currentPage = filters.page || 1;
  
  // Tạo tiêu đề dựa trên danh mục
  const getPageTitle = () => {
    if (!category) {
      return 'All';
    }
    return category;
  };
  
  // Cập nhật URL khi giá trị debounced thay đổi
  useEffect(() => {
    if (debouncedMinPrice !== minPrice) {
      updateFilters({ minPrice: debouncedMinPrice, page: 1 });
    }
  }, [debouncedMinPrice, minPrice, updateFilters]);
  
  useEffect(() => {
    if (debouncedMaxPrice !== maxPrice) {
      updateFilters({ maxPrice: debouncedMaxPrice, page: 1 });
    }
  }, [debouncedMaxPrice, maxPrice, updateFilters]);
  
  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };
  
  // Xử lý thay đổi supplier
  const handleSupplierChange = (supplierId: number, checked: boolean) => {
    if (checked) {
      updateFilters({ supplierId, page: 1 });
    } else {
      updateFilters({ supplierId: undefined, page: 1 });
    }
  };

  // Xử lý thay đổi sắp xếp
  const handleSortChange = (value: string) => {
    if (!value) {
      updateFilters({ 
        sortBy: undefined, 
        sortDirection: undefined,
        page: 1
      });
      return;
    }

    const [field, direction] = value.split('-');
    updateFilters({ 
      sortBy: field, 
      sortDirection: direction,
      page: 1
    });
  };

  // Tạo các nút phân trang
  const renderPaginationItems = () => {
    // Mảng chứa các nút hiển thị
    const items = [];
    
    // Giới hạn số nút hiển thị
    const maxVisiblePages = 5;
    
    // Tính toán phạm vi hiển thị
    let startPage: number;
    let endPage: number;
    
    if (totalPages <= maxVisiblePages) {
      // Nếu số trang ít hơn giới hạn, hiển thị tất cả
      startPage = 1;
      endPage = totalPages;
    } else {
      // Tính toán phạm vi hiển thị khi số trang nhiều
      const halfVisible = Math.floor(maxVisiblePages / 2);
      
      if (currentPage <= halfVisible + 1) {
        // Trang hiện tại gần đầu
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - halfVisible) {
        // Trang hiện tại gần cuối
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        // Trang hiện tại ở giữa
        startPage = currentPage - halfVisible;
        endPage = currentPage + halfVisible;
      }
    }
    
    // Thêm nút trang đầu tiên
    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink 
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Thêm dấu chấm lửng nếu không liền kề với trang đầu
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    
    // Thêm các nút trang trong phạm vi
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            onClick={() => handlePageChange(page)}
            isActive={currentPage === page}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Thêm nút trang cuối cùng
    if (endPage < totalPages) {
      // Thêm dấu chấm lửng nếu không liền kề với trang cuối
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };
  
  if (!category) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
          <p className="mt-2 text-gray-600">The category you are looking for does not exist.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold capitalize text-gray-900">{getPageTitle()}</h1>
        <p className="mt-4 text-gray-600">
          {CATEGORY_DESCRIPTIONS[category] || 'Discover the best pickleball paddles for all skill levels'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Filters - sidebar */}
        <div className="hidden md:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
              
              {/* Lọc theo nhà cung cấp */}
              {suppliersData?.result?.length && suppliersData?.result?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Supplier</h4>
                  <div className="mt-2 space-y-2">
                    {suppliersData.result.map((supplier) => (
                      <div key={String(supplier.id)} className="flex items-center">
                        <input
                          id={`supplier-${supplier.id}`}
                          name="supplier"
                          type="checkbox"
                          checked={filters.supplierId === supplier.id}
                          onChange={(e) => {
                            handleSupplierChange(supplier.id, e.target.checked);
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor={`supplier-${supplier.id}`} className="ml-3 text-sm text-gray-600">
                          {supplier.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Lọc theo giá */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900">Price</h4>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price-min" className="sr-only">
                      Lowest price
                    </label>
                    <input
                      type="number"
                      id="price-min"
                      placeholder="Min"
                      value={minPriceInput ?? ''}
                      onChange={(e) => {
                        const value = e.target.value === '' ? undefined : Number(e.target.value);
                        setMinPriceInput(value);
                      }}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="price-max" className="sr-only">
                      Highest price
                    </label>
                    <input
                      type="number"
                      id="price-max"
                      placeholder="Max"
                      value={maxPriceInput ?? ''}
                      onChange={(e) => {
                        const value = e.target.value === '' ? undefined : Number(e.target.value);
                        setMaxPriceInput(value);
                      }}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
                {/* Reset button for price filter */}
                {(minPrice !== undefined || maxPrice !== undefined) && (
                  <button
                    onClick={() => {
                      setMinPriceInput(undefined);
                      setMaxPriceInput(undefined);
                      updateFilters({ minPrice: undefined, maxPrice: undefined, page: 1 });
                    }}
                    className="mt-2 text-xs text-gray-600 hover:text-black"
                  >
                    Reset price filter
                  </button>
                )}
              </div>
              
              {/* Sắp xếp */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900">Sort</h4>
                <select
                  value={sortBy && sortDirection ? `${sortBy}-${sortDirection}` : ''}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Default</option>
                  <option value="sellPrice-asc">Price: Low to High</option>
                  <option value="sellPrice-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product grid and pagination */}
        <div className="md:col-span-3">        
          <ProductGrid 
            products={productData?.result || []}
            cols={3}
            emptyMessage={isLoading ? 'Loading products...' : 'No products found matching your criteria.'}
          />
          
          {/* Hiển thị loading spinner khi đang fetch */}
          {isFetching && (
            <div className="my-8 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          )}
          
          {/* Phân trang với shadcn/ui Pagination */}
          {!isLoading && totalPages > 0 && (
            <Pagination className="mt-8">
              <PaginationContent>
                {/* Nút Previous */}
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {/* Các nút số trang */}
                {renderPaginationItems()}
                
                {/* Nút Next */}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}; 