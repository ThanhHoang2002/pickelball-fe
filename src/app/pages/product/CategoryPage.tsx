import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useProductsByCategory } from '@/features/products/hooks/useProducts';
import { ProductCategory, Skill } from '@/features/products/types';

// Map URL parameter to product category type
const getCategoryFromParam = (category?: string): ProductCategory | undefined => {
  if (!category) return undefined;
  
  const categoryMap: Record<string, ProductCategory> = {
    'paddles': 'paddles',
    'paddle-sets': 'paddle-sets',
    'clothing': 'clothing',
    'accessories': 'accessories',
    'custom-paddles': 'custom-paddles',
  };
  
  return categoryMap[category as string];
};

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const validCategory = getCategoryFromParam(category);
  const { data: products = [], isLoading } = useProductsByCategory(validCategory as ProductCategory);
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Get filter parameters
  const skillParam = searchParams.get('skill') as Skill | null;
  const typeParam = searchParams.get('type');
  const filterParam = searchParams.get('filter');
  
  // Create a title for the page based on category and filters
  const getPageTitle = () => {
    let title = validCategory 
      ? validCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
      : 'Products';
      
    if (skillParam) {
      title = `${skillParam.charAt(0).toUpperCase() + skillParam.slice(1)} ${title}`;
    }
    
    if (typeParam) {
      title = `${typeParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`;
    }
    
    if (filterParam === 'bestseller') {
      title = `Best Selling ${title}`;
    }
    
    return title;
  };
  
  // Apply filters whenever products or filter params change
  useEffect(() => {
    let result = [...products];
    
    if (skillParam) {
      result = result.filter(product => product.skill === skillParam);
    }
    
    if (typeParam) {
      result = result.filter(product => product.tags.includes(typeParam));
    }
    
    if (filterParam === 'bestseller') {
      result = result.filter(product => product.isBestSeller);
    }
    
    setFilteredProducts(result);
  }, [products, skillParam, typeParam, filterParam]);
  
  if (!validCategory) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category Not Found</h1>
          <p className="mt-2 text-gray-600">The category you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
        <p className="mt-4 text-gray-600">
          {
            validCategory === 'paddles' ? 'Discover our collection of high-quality pickleball paddles for all skill levels.' :
            validCategory === 'paddle-sets' ? 'Get started with our premium pickleball sets.' :
            validCategory === 'clothing' ? 'Look and feel your best on the court with our stylish apparel.' :
            validCategory === 'accessories' ? 'Complete your gear with our essential pickleball accessories.' :
            validCategory === 'custom-paddles' ? 'Design your own unique pickleball paddle.' :
            'Browse our product collection.'
          }
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Filters - sidebar */}
        <div className="hidden md:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
              {/* Filter implementation would go here */}
              <p className="mt-2 text-sm text-gray-500">Filter options would be displayed here.</p>
            </div>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="md:col-span-3">
          <ProductGrid 
            products={filteredProducts}
            emptyMessage={isLoading ? 'Loading products...' : 'No products found matching your criteria.'}
          />
        </div>
      </div>
    </div>
  );
}; 