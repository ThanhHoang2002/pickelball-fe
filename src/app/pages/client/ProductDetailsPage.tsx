import { Link, useParams } from 'react-router-dom';

import { ProductDetails } from '@/features/products/components/ProductDetails';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useProductById, useProductsByCategory } from '@/features/products/hooks/useProducts';
import { mappingCategoryName } from '@/utils/mappingCategoryName';

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Fetch product data
  const { 
    data: product, 
    isLoading: isProductLoading, 
    isError: isProductError 
  } = useProductById(id ? Number(id) : 0);
  
  // Get related products by category only when product data is available
  const categoryName = product?.category?.name;
  const { 
    data: relatedProductsData, 
    isLoading: isRelatedLoading,
    isError: isRelatedError
  } = useProductsByCategory(
    categoryName ?? '', 
    { size: 4 }
  );
  
  // Combine loading states
  const isLoading = isProductLoading || isRelatedLoading;
  const isError = isProductError || isRelatedError;
  // Filter out the current product from related products
  const relatedProducts = relatedProductsData?.result?.filter(
    p => p.id !== product?.id
  ) || [];
  
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (isError || !product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <p className="mt-2 text-gray-600">The product you are looking for does not exist or has been deleted.</p>
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
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">Home</Link>
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
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <ProductGrid
            products={relatedProducts}
            title="Related products"
          />
        </div>
      )}
    </div>
  );
}; 