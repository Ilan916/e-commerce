import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export const useCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = async (userId: string, productId: string, quantity: number = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add item to cart');
      }

      return data.item;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getCart = async (userId: string): Promise<CartItem[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/cart?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch cart');
      }

      return data.items || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (userId: string, itemId: string, quantity: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, itemId, quantity }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update cart item');
      }

      return data.item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (userId: string, itemId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, itemId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to remove item from cart');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addToCart,
    getCart,
    updateCartItemQuantity,
    removeFromCart,
    loading,
    error,
  };
};
