import { Product } from '../types';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
  products: Product[];
  title?: string;
  emptyMessage?: string;
  cols?: number;
  addItem: (productId: number, quantity: number) => void;
};

export const ProductGrid = ({ 
  products, 
  title, 
  cols = 4,
  addItem,
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
            <ProductCard.Root key={product.id} product={product} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <ProductCard.Image />
              <ProductCard.Content>
                <ProductCard.Title />
                <ProductCard.Supplier />
                <ProductCard.Price />
                <ProductCard.Action label="Add to cart" onClick= {()=>addItem(product.id,1)} />
              </ProductCard.Content>
            </ProductCard.Root>
          ))}
        </div>
      )}
    </div>
  );
}; 