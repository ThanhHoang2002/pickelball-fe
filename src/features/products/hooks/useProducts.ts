import { useQuery } from '@tanstack/react-query';

import { 
  fetchProducts, 
  fetchProductsByCategory, 
  fetchProductById,
  fetchBestSellers,
  fetchSaleProducts,
  fetchNewArrivals
} from '../api/productsApi';
import { ProductCategory } from '../types';

export const useAllProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
};

export const useProductsByCategory = (category: ProductCategory) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => fetchProductsByCategory(category)
  });
};

export const useProductById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id || ''),
    enabled: !!id
  });
};

export const useBestSellers = () => {
  return useQuery({
    queryKey: ['products', 'bestsellers'],
    queryFn: fetchBestSellers
  });
};

export const useSaleProducts = () => {
  return useQuery({
    queryKey: ['products', 'sale'],
    queryFn: fetchSaleProducts
  });
};

export const useNewArrivals = () => {
  return useQuery({
    queryKey: ['products', 'new-arrivals'],
    queryFn: fetchNewArrivals
  });
}; 