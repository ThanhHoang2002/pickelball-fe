import { Product } from '../types';

/**
 * Chuyển đổi sản phẩm từ API mới sang định dạng tương thích với các component hiện có
 */
export const formatProductFromApi = (product: Product): Product => {
  return {
    ...product,
    // Đảm bảo các trường tương thích ngược
    slug: product.slug || `product-${product.id}`,
    price: product.price || product.sellPrice,
    images: product.images || [product.image],
    isOnSale: product.isOnSale || false,
    isBestSeller: product.isBestSeller || false,
    isNewArrival: product.isNewArrival || false
  };
};

/**
 * Chuyển đổi danh sách sản phẩm từ API mới sang định dạng tương thích với các component hiện có
 */
export const formatProductsFromApi = (products: Product[]): Product[] => {
  return products.map(formatProductFromApi);
};

/**
 * Tạo tên sản phẩm rút gọn để hiển thị
 */
export const getTruncatedProductName = (name: string, maxLength = 60): string => {
  if (name.length <= maxLength) return name;
  return `${name.substring(0, maxLength)}...`;
};

/**
 * Định dạng giá hiển thị
 */
export const formatProductPrice = (price: number): string => {
  return price.toLocaleString('vi-VN');
}; 