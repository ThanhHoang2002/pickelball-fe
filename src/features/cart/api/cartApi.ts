
import { CartItemResponse, CartResponse } from '../types';

import axiosClient from '@/lib/axios-client';


export const getCart = async (): Promise<CartItemResponse[]> => {
  try {
    const response = await axiosClient.get<CartResponse>(`/carts`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    throw error;
  }
};

export const addToCart = async (productId: number, quantity: number): Promise<void> => {
  try {
    await axiosClient.post(`/carts/add`, {
      productId,
      quantity,
    });
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (cartItemId: number, quantity: number): Promise<void> => {
  try {
    await axiosClient.put(`/carts/update/${cartItemId}`, {
      quantity,
    });
  } catch (error) {
    console.error('Failed to update cart item:', error);
    throw error;
  }
};

export const removeCartItem = async (cartItemId: number): Promise<void> => {
  try {
    await axiosClient.delete(`/carts/remove/${cartItemId}`);
  } catch (error) {
    console.error('Failed to remove cart item:', error);
    throw error;
  }
};

export const clearCart = async (): Promise<void> => {
  try {
    await axiosClient.delete(`/carts/clear`);
  } catch (error) {
    console.error('Failed to clear cart:', error);
    throw error;
  }
}; 