import { Product } from '../types';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
  products: Product[];
  title?: string;
  emptyMessage?: string;
};

export const ProductGrid = ({ 
  products, 
  title, 
  emptyMessage = 'No products found.' 
}: ProductGridProps) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="mb-6 text-2xl font-bold text-gray-900">{title}</h2>
      )}
      
      {products.length === 0 ? (
        <p className="text-center text-gray-500">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}; 