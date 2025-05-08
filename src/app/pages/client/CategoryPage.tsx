import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useProductsByCategory } from '@/features/products/hooks/useProducts';
import { Product } from '@/features/products/types';
import { useDebounce } from '@/hooks/useDebounce';



// Mapping giữa ID danh mục và mô tả
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Vợt': 'Discover the best pickleball paddles for all skill levels.',
  'Phụ kiện': 'Enhance your pickleball experience with essential accessories.',
};

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Fetch sản phẩm theo danh mục
  console.log(category)
  const { data, isLoading } = useProductsByCategory(category ?? '');
  const products = data || [];
  
  // State lưu trữ sản phẩm sau khi lọc
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Lấy các tham số lọc từ URL
  const supplierParam = searchParams.get('supplier');
  const priceMinParam = searchParams.get('priceMin');
  const priceMaxParam = searchParams.get('priceMax');
  const sortParam = searchParams.get('sort');
  
  // State để lưu trữ giá trị đang nhập trước khi debounce
  const [minPriceInput, setMinPriceInput] = useState(priceMinParam || '');
  const [maxPriceInput, setMaxPriceInput] = useState(priceMaxParam || '');
  
  // Sử dụng debounce cho giá trị giá
  const debouncedMinPrice = useDebounce(minPriceInput, { delay: 500 });
  const debouncedMaxPrice = useDebounce(maxPriceInput, { delay: 500 });
  
  // Tạo tiêu đề dựa trên danh mục
  const getPageTitle = () => {
    if (!category) {
      return 'All';
    }
    return category;
  };
  
  // Cập nhật filteredProducts khi products thay đổi
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  
  // Áp dụng bộ lọc khi sản phẩm hoặc tham số lọc thay đổi
  useEffect(() => {
    let result = [...products];
    
    // Lọc theo nhà cung cấp
    if (supplierParam) {
      const supplierId = parseInt(supplierParam, 10);
      result = result.filter(product => product.supplier.id === supplierId);
    }
    
    // Lọc theo khoảng giá
    if (priceMinParam) {
      const priceMin = parseInt(priceMinParam, 10);
      result = result.filter(product => product.sellPrice >= priceMin);
    }
    
    if (priceMaxParam) {
      const priceMax = parseInt(priceMaxParam, 10);
      result = result.filter(product => product.sellPrice <= priceMax);
    }
    
    // Sắp xếp sản phẩm
    if (sortParam) {
      if (sortParam === 'price-asc') {
        result.sort((a, b) => a.sellPrice - b.sellPrice);
      } else if (sortParam === 'price-desc') {
        result.sort((a, b) => b.sellPrice - a.sellPrice);
      } else if (sortParam === 'name-asc') {
        result.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortParam === 'name-desc') {
        result.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortParam === 'newest') {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }
    
    setFilteredProducts(result);
  }, [products, supplierParam, priceMinParam, priceMaxParam, sortParam]);
  
  // Cập nhật URL khi giá trị debounced thay đổi
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    
    if (debouncedMinPrice) {
      newParams.set('priceMin', debouncedMinPrice);
    } else {
      newParams.delete('priceMin');
    }
    
    setSearchParams(newParams);
  }, [debouncedMinPrice, searchParams, setSearchParams]);
  
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    
    if (debouncedMaxPrice) {
      newParams.set('priceMax', debouncedMaxPrice);
    } else {
      newParams.delete('priceMax');
    }
    
    setSearchParams(newParams);
  }, [debouncedMaxPrice, searchParams, setSearchParams]);
  
  // Hàm xử lý cập nhật params
  const updateSearchParams = (paramName: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value) {
      newParams.set(paramName, value);
    } else {
      newParams.delete(paramName);
    }
    
    setSearchParams(newParams);
  };
  
  // Danh sách các nhà cung cấp duy nhất
  const suppliers = Array.from(
    new Set(products.map(product => product.supplier.id))
  ).map(id => {
    const supplier = products.find(product => product.supplier.id === id)?.supplier;
    return {
      id,
      name: supplier?.name || ''
    };
  });
  
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
              {suppliers.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Supplier</h4>
                  <div className="mt-2 space-y-2">
                    {suppliers.map((supplier) => (
                      <div key={supplier.id} className="flex items-center">
                        <input
                          id={`supplier-${supplier.id}`}
                          name="supplier"
                          type="checkbox"
                          checked={supplierParam === supplier.id.toString()}
                          onChange={(e) => {
                            updateSearchParams('supplier', e.target.checked ? supplier.id.toString() : null);
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
                      placeholder="Lowest price"
                      value={minPriceInput}
                      onChange={(e) => {
                        setMinPriceInput(e.target.value);
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
                      placeholder="Highest price"
                      value={maxPriceInput}
                      onChange={(e) => {
                        setMaxPriceInput(e.target.value);
                      }}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
              </div>
              
              {/* Sắp xếp */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900">Sort</h4>
                <select
                  value={sortParam || ''}
                  onChange={(e) => {
                    updateSearchParams('sort', e.target.value || null);
                  }}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Default</option>
                  <option value="price-asc">Price: Low to high</option>
                  <option value="price-desc">Price: High to low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="md:col-span-3">
          <ProductGrid 
            products={filteredProducts}
            cols={3}
            emptyMessage={isLoading ? 'Loading products...' : 'No products found matching your criteria.'}
          />
        </div>
      </div>
    </div>
  );
}; 