import { Link, useParams } from 'react-router-dom';

import { ProductDetails } from '@/features/products/components/ProductDetails';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useProductById, useProductsByCategory } from '@/features/products/hooks/useProducts';
import { mappingCategoryName } from '@/utils/mappingCategoryName';

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProductById(id);
  
  // Get related products by category
  const categoryName = product?.category?.name;
  const { data: relatedProducts = [] } = useProductsByCategory(
    categoryName ?? '', 
    { size: 4 }
  );
  const filteredRelatedProducts = product 
    ? relatedProducts.filter(p => p.id !== product.id)
    : [];
  
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }
  
  if (isError || !product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Không tìm thấy sản phẩm</h1>
          <p className="mt-2 text-gray-600">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">Trang chủ</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/category/${mappingCategoryName(product.category.name)}`} className="text-sm text-gray-500 hover:text-gray-700">
              {product.category.name}
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-sm text-gray-700">{product.name}</span>
          </li>
        </ol>
      </nav>
      
      {/* Product details */}
      <ProductDetails product={product} />
      
      {/* Related products */}
      {filteredRelatedProducts.length > 0 && (
        <div className="mt-24">
          <ProductGrid
            products={filteredRelatedProducts}
            title="Related products"
          />
        </div>
      )}
    </div>
  );
}; 