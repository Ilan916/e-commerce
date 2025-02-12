"use client";

import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CheckoutButtonProps {
  items: CartItem[];
}

export default function CheckoutButton({ items }: CheckoutButtonProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!session?.user) {
      alert("Please sign in to checkout");
      return;
    }

    setIsLoading(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize");

      // Ensure all items have valid IDs
      if (items.some(item => !item.id)) {
        throw new Error("Invalid product data");
      }

      // Validate items before sending
      if (items.length === 0) {
        throw new Error("Cart is empty");
      }

      const requestData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl
        })),
        userId: session.user.id,
        userEmail: session.user.email,
      };

      console.log('Sending checkout request:', requestData); // Debug log
      console.log('Checkout items:', items);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Checkout error details:', data);
        throw new Error(data.error || 'Checkout failed');
      }

      if (!data.sessionId) {
        throw new Error('No session ID returned from the server');
      }

      const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Detailed checkout error:", error);
      alert(error instanceof Error ? error.message : "Error processing checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-blue-300"
    >
      {isLoading ? "Processing..." : `Pay (${items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} €)`}
    </button>
  );
}
