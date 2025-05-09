import { motion, HTMLMotionProps } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useState, forwardRef, useMemo } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../types';

import { cn } from '@/utils/cn';

// Main compound component
type ProductCardRootProps = Omit<HTMLMotionProps<"div">, "onMouseEnter" | "onMouseLeave"> & {
  product: Product;
  className?: string;
  children?: React.ReactNode;
};

type ProductCardContextType = {
  product: Product;
  hovered: boolean;
  formattedProduct: {
    id: string | number;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    images: string[];
    isOnSale: boolean;
    supplier?: {
      id: number;
      name: string;
    } | null;
  };
};

const ProductCardContext = React.createContext<ProductCardContextType | undefined>(undefined);

const useProductCardContext = () => {
  const context = React.useContext(ProductCardContext);
  if (!context) {
    throw new Error('ProductCard components must be used within ProductCard.Root');
  }
  return context;
};

const Root = forwardRef<HTMLDivElement, ProductCardRootProps>(
  ({ product, className, children, ...props }, ref) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    // Format product to handle both new API format and maintain backward compatibility
    const formattedProduct = useMemo(() => {
      return {
        id: product.id,
        name: product.name,
        slug: product.slug || `product-${product.id}`,
        price: product.price || product.sellPrice || 0,
        originalPrice: product.originalPrice,
        images: product.images || [product.image],
        isOnSale: product.isOnSale || Boolean(product.originalPrice),
        supplier: product.supplier || null
      };
    }, [product]);

    return (
      <ProductCardContext.Provider value={{ product, hovered, formattedProduct }}>
        <motion.div
          ref={ref}
          className={cn("group relative flex flex-col", className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          {...props}
        >
          {children}
        </motion.div>
      </ProductCardContext.Provider>
    );
  }
);
Root.displayName = 'ProductCard.Root';

// Image component
type ImageProps = {
  className?: string;
};
const Image = ({ className }: ImageProps) => {
  const { hovered, formattedProduct,product } = useProductCardContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Update image on hover
  React.useEffect(() => {
    if (hovered && formattedProduct.images.length > 1) {
      setCurrentImageIndex(1);
    } else {
      setCurrentImageIndex(0);
    }
  }, [hovered, formattedProduct.images.length]);

  return (
    <Link
      to={`/products/${product.id}`}
      className={cn("relative aspect-square w-full overflow-hidden rounded-md", className)}
    >
      {formattedProduct.isOnSale && (
        <div className="absolute left-2 top-2 z-10 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white">
          Sale
        </div>
      )}
      <motion.img
        src={formattedProduct.images[currentImageIndex]}
        alt={formattedProduct.name}
        className="h-full w-full object-cover object-center transition-all duration-300"
        whileHover={{ scale: 1.05 }}
      />
    </Link>
  );
};
Image.displayName = 'ProductCard.Image';

// Title component
type TitleProps = {
  className?: string;
};

const Title = ({ className }: TitleProps) => {
  const { formattedProduct,product } = useProductCardContext();

  return (
    <Link 
      to={`/products/${product.id}`} 
      className={cn(
        "line-clamp-2 h-[3.5rem] text-lg font-medium text-gray-900 hover:underline", 
        className
      )}
      title={formattedProduct.name}
    >
      {formattedProduct.name}
    </Link>
  );
};
Title.displayName = 'ProductCard.Title';

// Price component
type PriceProps = {
  className?: string;
  showCurrency?: boolean;
};

const Price = ({ className, showCurrency = true }: PriceProps) => {
  const { formattedProduct } = useProductCardContext();

  return (
    <div className={cn("mt-1 flex items-center", className)}>
      <span className={`text-lg font-semibold ${formattedProduct.originalPrice ? 'text-red-600' : 'text-gray-900'}`}>
        {formattedProduct.price.toLocaleString()}
        {showCurrency && '$'}
      </span>
      
      {formattedProduct.originalPrice && (
        <span className="ml-2 text-sm text-gray-500 line-through">
          {formattedProduct.originalPrice.toLocaleString()}
          {showCurrency && '$'}
        </span>
      )}
    </div>
  );
};
Price.displayName = 'ProductCard.Price';

// Action button component
type ActionProps = {
  className?: string;
  onClick?: () => void;
  label?: string;
};

const Action = ({ className, onClick, label = "Add to cart" }: ActionProps) => {
  return (
    <motion.button 
      className={cn("mt-4 flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800", className)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ShoppingCart size={16} />
      <span>{label}</span>
    </motion.button>
  );
};
Action.displayName = 'ProductCard.Action';

// Content container
type ContentProps = {
  className?: string;
  children?: React.ReactNode;
};

const Content = ({ className, children }: ContentProps) => {
  return (
    <div className={cn("mt-4 flex flex-col", className)}>
      {children}
    </div>
  );
};
Content.displayName = 'ProductCard.Content';

// Supplier component
type SupplierProps = {
  className?: string;
};

const Supplier = ({ className }: SupplierProps) => {
  const { formattedProduct } = useProductCardContext();
  
  if (!formattedProduct.supplier) return null;
  
  return (
    <div className={cn("mt-1 text-sm text-gray-500", className)}>
      {formattedProduct.supplier.name}
    </div>
  );
};
Supplier.displayName = 'ProductCard.Supplier';

// Export composite component
export const ProductCard = {
  Root,
  Image,
  Content,
  Title,
  Price,
  Action,
  Supplier
};

// Legacy component for backwards compatibility
type LegacyProductCardProps = {
  product: Product;
};

export const LegacyProductCard = ({ product }: LegacyProductCardProps) => {
  return (
    <ProductCard.Root product={product} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <ProductCard.Image />
      <ProductCard.Content>
        <ProductCard.Title />
        <ProductCard.Supplier />
        <ProductCard.Price />
        <ProductCard.Action />
      </ProductCard.Content>
    </ProductCard.Root>
  );
}; 