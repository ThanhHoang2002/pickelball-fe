import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product, ProductSize } from '@/features/products/types';

type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: ProductSize;
};

type CartStore = {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity: number,
    color?: string,
    size?: ProductSize
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity, color, size) => {
        const { items } = get();
        
        // Generate a unique ID for this cart item to handle multiple instances of the same product
        const itemId = `${product.id}-${color || 'default'}-${size || 'default'}`;
        
        // Check if the item is already in the cart
        const existingItemIndex = items.findIndex(item => item.id === itemId);
        
        if (existingItemIndex >= 0) {
          // Update the quantity if the item already exists
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          
          set({ items: updatedItems });
        } else {
          // Add new item to the cart
          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity,
            color,
            size,
          };
          
          set({ items: [...items, newItem] });
        }
      },
      
      removeItem: (itemId) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== itemId) });
      },
      
      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        
        if (quantity <= 0) {
          // Remove item if quantity is zero or negative
          set({ items: items.filter(item => item.id !== itemId) });
          return;
        }
        
        // Update quantity
        const updatedItems = items.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        );
        
        set({ items: updatedItems });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
); 