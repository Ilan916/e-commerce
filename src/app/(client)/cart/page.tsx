"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CheckoutButton from '../../components/CheckoutButton/CheckoutButton';
import { useCart } from '../../hooks/useCart';

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
  const { data: session, status } = useSession();
  const { getCart, updateCartItemQuantity, removeFromCart, loading: cartLoading } = useCart();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!session?.user?.id) return;
      
      try {
        const response = await fetch(`/api/cart?userId=${session.user.id}`);
        const data = await response.json();
        
        if (data.items && Array.isArray(data.items)) {
          // Sort items by name
          const sortedItems = [...data.items].sort((a, b) => 
            a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
          );
          
          setCartItems(sortedItems);
          const cartTotal = sortedItems.reduce(
            (sum, item) => sum + (item.price * item.quantity), 
            0
          );
          setTotal(cartTotal);
        } else {
          setCartItems([]);
          setTotal(0);
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        setCartItems([]);
        setTotal(0);
      }
    };

    fetchCartItems();
  }, [session]);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (!session?.user?.id) return;
    
    try {
      await updateCartItemQuantity(session.user.id, itemId, newQuantity);
      
      // Update only the quantity of the specific item
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      
      // Update total
      setTotal(prevTotal => {
        const updatedItem = cartItems.find(item => item.id === itemId);
        if (!updatedItem) return prevTotal;
        const difference = (newQuantity - updatedItem.quantity) * updatedItem.price;
        return prevTotal + difference;
      });

    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!session?.user?.id) return;
    
    if (window.confirm('Êtes-vous sûr de vouloir retirer cet article du panier ?')) {
      try {
        await removeFromCart(session.user.id, itemId);
        // Refresh cart items after removal
        const updatedCart = await getCart(session.user.id);
        setCartItems(updatedCart);
        const newTotal = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotal(newTotal);
      } catch (error) {
        console.error('Failed to remove item:', error);
      }
    }
  };

  if (status === "loading") {
    return <div className="max-w-4xl mx-auto p-6">Chargement...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-gray-500">Veuillez vous connecter pour voir votre panier.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Votre Panier</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
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
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        disabled={cartLoading}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        disabled={cartLoading}
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                        disabled={cartLoading}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
                <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} €</p>
              </div>
            ))}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Total :</span>
                <span className="text-2xl font-bold">{total.toFixed(2)} €</span>
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