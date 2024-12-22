"use client";

import { useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      // Assuming you have a way to get the logged-in user's ID
      const userId = "logged-in-user-id"; // Replace with actual user ID retrieval logic
      const response = await fetch(`/api/cart?userId=${userId}`);
      const data: CartItem[] = await response.json();
      setCartItems(data);
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;