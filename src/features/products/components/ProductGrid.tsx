import { Product } from '../types';
import { LegacyProductCard } from './ProductCard';

type ProductGridProps = {
  products: Product[];
  title?: string;
  emptyMessage?: string;
  cols?: number;
};

export const ProductGrid = ({ 
  products, 
  title, 
  cols = 4,
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
        <div className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 ${'lg:grid-cols-'+cols}`}>
          {products.map((product) => (
            <LegacyProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}; 