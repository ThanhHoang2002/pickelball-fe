import { useState } from 'react';

import { Product, ProductSize } from '../types';

type ProductDetailsProps = {
  product: Product;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<ProductSize | ''>('');
  const [quantity, setQuantity] = useState(1);

  const handleSizeSelect = (size: ProductSize) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // This would be handled by a cart store in a real application
    console.log('Adding to cart:', {
      product,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Product images */}
      <div className="flex flex-col gap-4">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-md border-2 ${
                  selectedImage === index ? 'border-black' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        
        <div className="mt-4 flex items-center">
          <span className={`text-2xl font-semibold ${product.originalPrice ? 'text-red-600' : 'text-gray-900'}`}>
            ${product.price.toFixed(2)}
          </span>
          
          {product.originalPrice && (
            <span className="ml-4 text-lg text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-6">
          <p className="text-gray-700">{product.description}</p>
        </div>

        {/* Color options */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorSelect(color.name)}
                  className={`relative h-8 w-8 rounded-full border ${
                    selectedColor === color.name ? 'ring-2 ring-black ring-offset-2' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size options */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Size guide
              </button>
            </div>

            <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`flex items-center justify-center rounded-md border py-2 text-sm font-medium uppercase ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity selector */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
          <div className="mt-2 flex items-center">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 hover:bg-gray-100"
              disabled={quantity <= 1}
            >
              -
            </button>
            <div className="w-12 border-y border-gray-300 px-3 py-2 text-center">{quantity}</div>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="mt-8 w-full rounded-md bg-black py-3 text-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Add to Cart
        </button>

        {/* Product tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 