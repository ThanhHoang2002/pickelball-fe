import { useParams } from 'react-router-dom';

import { ProductDetails } from '@/features/products/components/ProductDetails';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useProductById, useAllProducts } from '@/features/products/hooks/useProducts';

export const ProductDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useProductById(slug);
  const { data: allProducts = [] } = useAllProducts();
  
  // Get related products by category
  const relatedProducts = product 
    ? allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];
  
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }
  
  if (isError || !product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
          <p className="mt-2 text-gray-600">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
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
            <a href="/" className="text-sm text-gray-500 hover:text-gray-700">Home</a>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <a href={`/category/${product.category}`} className="text-sm text-gray-500 hover:text-gray-700">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ')}
            </a>
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
            title="You may also like"
          />
        </div>
      )}
    </div>
  );
}; 