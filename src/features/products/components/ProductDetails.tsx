import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import type { DetailedHTMLProps, HTMLAttributes, OlHTMLAttributes, LiHTMLAttributes, AnchorHTMLAttributes, QuoteHTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

import { Product } from '../types';

import { useCart } from '@/features/cart/hooks/useCart';

type ProductDetailsProps = {
  product: Product;
};

// Custom components for markdown rendering
const markdownComponents = {
  p: (props: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => (
    <p className="mb-4" {...props} />
  ),
  h1: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h1 className="mb-4 text-2xl font-bold" {...props} />
  ),
  h2: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h2 className="mb-3 text-xl font-bold" {...props} />
  ),
  h3: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h3 className="mb-2 text-lg font-bold" {...props} />
  ),
  ul: (props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
    <ul className="mb-4 list-disc pl-5" {...props} />
  ),
  ol: (props: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
    <ol className="mb-4 list-decimal pl-5" {...props} />
  ),
  li: (props: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) => (
    <li className="mb-1" {...props} />
  ),
  a: (props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
    <a className="text-blue-600 hover:underline" {...props} />
  ),
  blockquote: (props: DetailedHTMLProps<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gray-200 pl-4 italic" {...props} />
  ),
  code: (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
    <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm" {...props} />
  ),
  pre: (props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => (
    <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-4 font-mono text-sm" {...props} />
  ),
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product?.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem(product?.id, quantity);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Product image */}
      <div className="flex flex-col gap-4">
        <motion.div 
          className="aspect-square overflow-hidden rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product?.image}
            alt={product?.name}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </div>

      {/* Product info */}
      <motion.div 
        className="flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
        
        {product?.supplier && (
          <div className="mt-2 text-sm text-gray-600">
            Brand: {product?.supplier.name}
          </div>
        )}
        
        <div className="mt-4 flex items-center">
          <span className="text-2xl font-semibold text-gray-900">
            {product?.sellPrice.toLocaleString()}$
          </span>
        </div>

        <div 
          ref={descriptionRef} 
          id="product-description"
          className={`mt-6 max-w-none text-gray-700 ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}
        >
          {product?.description && (
            <ReactMarkdown remarkPlugins={[remarkBreaks]} components={markdownComponents}>
              {product.description}
            </ReactMarkdown>
          )}
        </div>
        
        {product?.description && (
          <button 
            onClick={toggleDescription}
            className="mt-1 text-left text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
            aria-expanded={isDescriptionExpanded}
            aria-controls="product-description"
          >
            {isDescriptionExpanded ? 'Collapse' : 'Read more ...'}
          </button>
        )}

        {/* Quantity selector */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
          <div className="mt-2 flex items-center">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 hover:bg-gray-100"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <div className="w-12 border-y border-gray-300 px-3 py-2 text-center">{quantity}</div>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 hover:bg-gray-100"
              disabled={quantity >= product?.quantity}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to cart button */}
        <motion.button
          onClick={handleAddToCart}
          className="mt-8 w-full rounded-md bg-black py-3 text-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:bg-gray-400"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={product?.quantity <= 0}
          aria-label={product?.quantity > 0 ? 'Add to cart' : 'Out of stock'}
        >
          {product?.quantity > 0 ? 'Add to cart' : 'Out of stock'}
        </motion.button>

        {/* Product information */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900">Product information</h3>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-sm text-gray-500">Product code</span>
              <span className="text-sm font-medium">{product?.id}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-sm text-gray-500">Category</span>
              <span className="text-sm font-medium">{product?.category?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-sm text-gray-500">Supplier</span>
              <span className="text-sm font-medium">{product?.supplier?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-sm text-gray-500">Status</span>
              <span className={`text-sm font-medium ${product?.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product?.quantity > 0 ? 'In stock' : 'Out of stock'}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-sm text-gray-500">Remaining quantity</span>
              <span className="text-sm font-medium">{product?.quantity}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 