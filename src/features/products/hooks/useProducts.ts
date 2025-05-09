import { useQuery } from '@tanstack/react-query';

import { getAllProduct, ProductsParams } from '../api/getAllProduct';
import { getProductById } from '../api/getProductById';
import { formatProductsFromApi } from '../utils/productFormatters';

/**
 * Hook để lấy tất cả sản phẩm
 */
export const useAllProducts = (params: ProductsParams = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn:  async () => await getAllProduct(params)
  
  });
};

/**
 * Hook để lấy sản phẩm theo danh mục
 */
export const useProductsByCategory = (categoryName: string, params: ProductsParams = {}) => {
  return useQuery({
    queryKey: ['products', 'category', categoryName, params],
    queryFn:  async () => await getAllProduct({ ...params, categoryName })
  });
};

/**
 * Hook để lấy sản phẩm theo ID
 */
export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn:  async () => await getProductById(id),
    enabled: !!id
  });
};

/**
 * Hook để lấy sản phẩm bán chạy 
 */
export const useBestSellers = (params: ProductsParams = {}) => {
  return useQuery({
    queryKey: ['products', 'bestsellers', params],
    queryFn: async () => {
      // Lấy tất cả sản phẩm 
      const response = await getAllProduct({
        ...params,
        size: 8,
      });
      
      // Format và trả về sản phẩm (đảm bảo có các trường tương thích ngược)
      return formatProductsFromApi(response.result);
    }
  });
};

/**
 * Hook để lấy sản phẩm đang khuyến mãi
 */
export const useSaleProducts = (params: ProductsParams = {}) => {
  return useQuery({
    queryKey: ['products', 'sale', params],
    queryFn: async () => {
      const response = await getAllProduct({
        ...params,
      });
      
      const products = response.result;
      const formattedProducts = formatProductsFromApi(products);
      
      // Lọc sản phẩm đang khuyến mãi (đã có trường isOnSale từ formatProductsFromApi)
      return formattedProducts.filter(product => product.isOnSale);
    }
  });
};

/**
 * Hook để lấy sản phẩm mới nhất
 */
export const useNewArrivals = (params: ProductsParams = {}) => {
  return useQuery({
    queryKey: ['products', 'new-arrivals', params],
    queryFn: async () => {
      const response = await getAllProduct({
        ...params,
        // Sắp xếp theo createdAt giảm dần có thể được thêm vào API trong tương lai
      });
      
      const products = response.result;
      return formatProductsFromApi(products.slice(0, 5));
    }
  });
}; 