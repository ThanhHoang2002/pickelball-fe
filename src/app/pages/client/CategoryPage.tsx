import { Loader2, Search } from 'lucide-react';
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
import { useCart } from '@/features/cart';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useProductsParams } from '@/features/products/hooks/useProductParams';
import { useProductsByCategory } from '@/features/products/hooks/useProducts';
import { useSuppliers } from '@/features/suppliers/hooks/useSuppliers';
import { useDebounceSearch } from '@/hooks/useDebounce';
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
  const { suppliers: suppliersData } = useSuppliers();
  const {addItem} = useCart()
  
  // Lấy các tham số lọc từ URL
  const minPrice = filters.minPrice;
  const maxPrice = filters.maxPrice;
  const sortBy = filters.sortBy;
  const sortDirection = filters.sortDirection;
  const searchTerm = filters.search;
  
  // Lưu trữ category hiện tại để theo dõi thay đổi
  const [previousCategory, setPreviousCategory] = useState<string | undefined>(category);
  
  // Sử dụng debounce cho giá trị giá và search
  const minPriceSearch = useDebounceSearch((value: string) => {
    updateFilters({ minPrice: value ? Number(value) : undefined, page: 1 });
  }, { delay: 500 });
  
  const maxPriceSearch = useDebounceSearch((value: string) => {
    updateFilters({ maxPrice: value ? Number(value) : undefined, page: 1 });
  }, { delay: 500 });
  
  const searchTermDebounce = useDebounceSearch((value: string) => {
    updateFilters({ search: value || undefined, page: 1 });
  }, { delay: 500 });
  
  // Cập nhật category filter từ URL parameter
  useEffect(() => {
    if (category) {
      // Nếu category thay đổi, reset search và các bộ lọc khác
      if (category !== previousCategory) {
        // Reset search
        searchTermDebounce.setSearchTerm('');
        // Reset price inputs
        minPriceSearch.setSearchTerm('');
        maxPriceSearch.setSearchTerm('');
        
        // Cập nhật filters với category mới và reset các bộ lọc
        updateFilters({
          categoryName: mappingCategoryName(category),
          size: 18,
          page: 1,
          search: undefined,
          minPrice: undefined,
          maxPrice: undefined,
          supplierId: undefined,
          sortBy: undefined,
          sortDirection: undefined
        });
        
        // Cập nhật previous category
        setPreviousCategory(category);
      } else {
        // Nếu không thay đổi category, chỉ cập nhật categoryName
        updateFilters({
          categoryName: mappingCategoryName(category),
          size: 18
        });
      }
    }
  }, [category]);
  
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
  
  // Xử lý xóa search
  const handleClearSearch = () => {
    searchTermDebounce.setSearchTerm('');
    updateFilters({ search: undefined, page: 1 });
  };
  
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

  // Initialize search and price inputs with current filter values
  useEffect(() => {
    if (searchTerm) {
      searchTermDebounce.setSearchTerm(searchTerm);
    }
    if (minPrice !== undefined) {
      minPriceSearch.setSearchTerm(String(minPrice));
    }
    if (maxPrice !== undefined) {
      maxPriceSearch.setSearchTerm(String(maxPrice));
    }
  }, []);

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
      
      {/* Search bar - Hiển thị ở trên cùng */}
      <div className="mb-8">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 py-3 pl-10 pr-12 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Search products..."
            value={searchTermDebounce.searchTerm}
            onChange={(e) => searchTermDebounce.setSearchTerm(e.target.value)}
          />
          {searchTermDebounce.searchTerm && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={handleClearSearch}
            >
              <span className="text-xl">&times;</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Filters - sidebar */}
        <div className="hidden md:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
              
              {/* Lọc theo nhà cung cấp */}
              {suppliersData?.length && suppliersData?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Supplier</h4>
                  <div className="mt-2 space-y-2">
                    {suppliersData.map((supplier) => (
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
                      min="0"
                      value={minPriceSearch.searchTerm}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numValue = value ? Number(value) : undefined;
                        
                        // Validate: giá trị không âm
                        if (numValue !== undefined && numValue < 0) return;
                        
                        // Validate: minPrice không được lớn hơn maxPrice nếu maxPrice đã được nhập
                        if (maxPriceSearch.searchTerm && numValue !== undefined && numValue > Number(maxPriceSearch.searchTerm)) {
                          alert("Minimum price cannot be greater than maximum price");
                          return;
                        }
                        
                        minPriceSearch.setSearchTerm(value);
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
                      min="0"
                      value={maxPriceSearch.searchTerm}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numValue = value ? Number(value) : undefined;
                        
                        // Validate: giá trị không âm
                        if (numValue !== undefined && numValue < 0) return;
                                                
                        maxPriceSearch.setSearchTerm(value);
                      }}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
                {/* Error message for price validation */}
                {minPriceSearch.searchTerm && maxPriceSearch.searchTerm && 
                  Number(minPriceSearch.searchTerm) > Number(maxPriceSearch.searchTerm) && (
                  <p className="mt-1 text-xs text-red-500">
                    Minimum price cannot be greater than maximum price
                  </p>
                )}
                {/* Reset button for price filter */}
                {(minPrice !== undefined || maxPrice !== undefined) && (
                  <button
                    onClick={() => {
                      minPriceSearch.setSearchTerm('');
                      maxPriceSearch.setSearchTerm('');
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
          {/* Thông báo search results */}
          {searchTerm && !isLoading && (
            <div className="mb-6 flex justify-between">
              <p className="text-sm text-gray-600">
                Search results for <span className="font-medium">&ldquo;{searchTerm}&rdquo;</span>
              </p>
              <button
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={handleClearSearch}
              >
                Clear search
              </button>
            </div>
          )}
          
          <ProductGrid 
            products={productData?.result || []}
            cols={3}
            emptyMessage={isLoading ? 'Loading products...' : 'No products found matching your criteria.'}
            addItem={addItem}
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