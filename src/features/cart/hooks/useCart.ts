import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


import { addToCart, clearCart as clearCartApi, getCart, removeCartItem, updateCartItem } from '../api/cartApi';
import { CartItemResponse, CartItemUI, CartSummaryUI } from '../types';

import useAuthStore from '@/features/auth/stores/authStore';
import { useToast } from '@/hooks/use-toast';

export const useCart = () => {
  const { toast } = useToast();
  const {currentUser} = useAuthStore();
  const queryClient = useQueryClient();

  // Transform API response to UI format
  const transformCartItems = (cartItems: CartItemResponse[] = []): CartItemUI[] => {
    return cartItems.map(item => ({
      id: item.id,
      productId: item.product.id,
      name: item.product.name,
      price: item.product.sellPrice,
      image: item.product.image,
      quantity: item.quantity
    }));
  };

  // Get cart data
  const {
    data: cartItemsData,
    isLoading: isLoadingCart,
    error: cartError,
    refetch: reloadCart
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: !!currentUser,
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1
  });

  // Handle errors for query
  if (cartError) {
    console.error('Error fetching cart:', cartError);
    toast({
      title: 'Lỗi',
      description: 'Không thể tải giỏ hàng. Vui lòng thử lại sau.',
      variant: 'destructive',
    });
  }

  // Add to cart mutation
  const addItemMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) => 
      addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: 'Success',
        description: 'Product added to cart',
      });
    },
    onError: (error) => {
      console.error('Error adding item to cart:', error);
      toast({
        title: 'Error',
        description: 'Cannot add product to cart. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Remove cart item mutation
  const removeItemMutation = useMutation({
    mutationFn: (itemId: number) => removeCartItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: 'Success',
        description: 'Product removed from cart',
      });
    },
    onError: (error) => {
      console.error('Error removing item from cart:', error);
      toast({
        title: 'Error',
        description: 'Cannot remove product from cart. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Update cart item mutation
  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) => 
      updateCartItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: 'Success',
        description: 'Product quantity updated',
      });
    },
    onError: (error) => {
      console.error('Error updating item quantity:', error);
      toast({
        title: 'Error',
        description: 'Cannot update product quantity. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: clearCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: 'Success',
        description: 'All cart items removed',
      });
    },
    onError: (error) => {
      console.error('Error clearing cart:', error);
      toast({
        title: 'Error',
        description: 'Cannot clear cart. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // UI Item array
  const cartItems = cartItemsData || [];
  const items = transformCartItems(cartItems);

  // Calculate cart summary
  const calculateSummary = (): CartSummaryUI => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 150 ? 0 : 1; // Free shipping above 150k
    const total = subtotal + shipping;
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    return {
      subtotal,
      shipping,
      total,
      itemCount
    };
  };

  // Handle user actions
  const handleAddItem = async (productId: number, quantity: number = 1) => {
    await addItemMutation.mutateAsync({ productId, quantity });
  };

  const handleRemoveItem = async (itemId: number) => {
    await removeItemMutation.mutateAsync(itemId);
  };

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      await handleRemoveItem(itemId);
      return;
    }
    await updateQuantityMutation.mutateAsync({ itemId, quantity });
  };

  const handleClearCart = async () => {
    await clearCartMutation.mutateAsync();
  };

  const summary = calculateSummary();
  const isEmpty = items.length === 0;
  const isLoading = isLoadingCart || 
    addItemMutation.isPending || 
    removeItemMutation.isPending || 
    updateQuantityMutation.isPending || 
    clearCartMutation.isPending;

  return {
    items,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    reload: reloadCart,
    isLoading,
    error: cartError ? 'An error occurred while loading the cart' : null,
    isEmpty,
    ...summary
  };
}; 