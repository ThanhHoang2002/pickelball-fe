import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { CreateOrderRequest, checkoutApi } from '../api/checkoutApi';

import { useCart } from '@/features/cart/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

export const useCheckout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearCart } = useCart();

  const { mutate: checkout, isPending: isLoading, error } = useMutation({
    mutationFn: (data: CreateOrderRequest) => checkoutApi.createOrder(data),
    onSuccess: (response) => {
      toast({
        title: 'Order placed successfully',
        description: `Your order #${response.order.id} has been placed successfully.`,
      });
      
      // Clear the cart after successful checkout
      clearCart();
      
      // Redirect to confirmation page
      navigate(`/checkout/confirmation/${response.order.id}`);
    },
    onError: (error: Error) => {
      toast({
        title: 'Checkout failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  });

  return {
    checkout,
    isLoading,
    error
  };
}; 