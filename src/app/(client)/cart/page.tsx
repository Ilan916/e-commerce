"use client";

import { useEffect, useState } from "react";
import CheckoutButton from '../../components/CheckoutButton/CheckoutButton';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      // Assuming you have a way to get the logged-in user's ID
      const userId = "logged-in-user-id"; // Replace with actual user ID retrieval logic
      const response = await fetch(`/api/cart?userId=${userId}`);
      const data: CartItem[] = await response.json();
      setCartItems(data);
      
      // Calculate total
      const cartTotal = data.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotal(cartTotal);
    };

    fetchCartItems();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center space-x-4">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
              <CheckoutButton items={cartItems} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;