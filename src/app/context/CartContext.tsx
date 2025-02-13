"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/app/hooks/useCart";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  total: number;
  refreshCart: () => Promise<void>;
  addItemToCart: (newItem: CartItem) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItemFromCart: (itemId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { data: session } = useSession();
  const { getCart, addToCart, updateCartItemQuantity, removeFromCart } = useCart();

  useEffect(() => {
    if (session?.user?.id) refreshCart();
  }, [session]);

  const refreshCart = async () => {
    if (!session?.user?.id) return;
    const items = await getCart(session.user.id);
    setCartItems(items);
    setTotal(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  };

  // Ajout instantané + mise à jour immédiate de la navbar
  const addItemToCart = async (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev
          .map((item) =>
            item.id === newItem.id 
              ? { ...item, quantity: item.quantity + newItem.quantity } 
              : item
          )
          .sort((a, b) => a.name.localeCompare(b.name));
      }
      return [...prev, newItem].sort((a, b) => a.name.localeCompare(b.name));
    });

    setTotal((prevTotal) => prevTotal + newItem.price * newItem.quantity);

    // On exécute l'appel API en arrière-plan
    addToCart(session?.user?.id as string, newItem.id, newItem.quantity)
      .then(() => refreshCart()) // 🔄 Met à jour en background
      .catch((error) => console.error("Erreur ajout panier :", error));
  };

  // ✅ Mise à jour immédiate de la quantité
  const updateItemQuantity = async (itemId: string, quantity: number) => {
    setCartItems((prev) => 
      prev
        .map((item) => item.id === itemId ? { ...item, quantity } : item)
        .sort((a, b) => a.name.localeCompare(b.name))
    );

    setTotal((prevTotal) => {
      const updatedItem = cartItems.find((item) => item.id === itemId);
      if (!updatedItem) return prevTotal;
      const difference = (quantity - updatedItem.quantity) * updatedItem.price;
      return prevTotal + difference;
    });

    updateCartItemQuantity(session?.user?.id as string, itemId, quantity)
      .then(() => refreshCart()) // 🔄 Met à jour en background
      .catch((error) => console.error("Erreur mise à jour quantité :", error));
  };

  // Suppression immédiate d'un produit
  const removeItemFromCart = async (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));

    setTotal((prevTotal) => {
      const removedItem = cartItems.find((item) => item.id === itemId);
      if (!removedItem) return prevTotal;
      return prevTotal - removedItem.price * removedItem.quantity;
    });

    removeFromCart(session?.user?.id as string, itemId)
      .then(() => refreshCart()) // 🔄 Met à jour en background
      .catch((error) => console.error("Erreur suppression panier :", error));
  };

  return (
    <CartContext.Provider value={{ cartItems, total, refreshCart, addItemToCart, updateItemQuantity, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within a CartProvider");
  return context;
};
