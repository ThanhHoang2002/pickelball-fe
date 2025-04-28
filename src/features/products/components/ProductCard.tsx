import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../types';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Handle hover effect by changing image
  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };
  
  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <div 
      className="group relative flex flex-col"
    >
      <Link 
        to={`/products/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden rounded-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {product.isOnSale && (
          <div className="absolute left-2 top-2 z-10 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white">
            Sale
          </div>
        )}
        <img 
          src={product.images[currentImageIndex]} 
          alt={product.name}
          className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
        />
      </Link>
      
      <div className="mt-4 flex flex-col">
        <Link to={`/products/${product.slug}`} className="text-lg font-medium text-gray-900 hover:underline">
          {product.name}
        </Link>
        
        <div className="mt-1 flex items-center">
          <span className={`text-lg font-semibold ${product.originalPrice ? 'text-red-600' : 'text-gray-900'}`}>
            ${product.price.toFixed(2)}
          </span>
          
          {product.originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <button 
          className="mt-4 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}; 