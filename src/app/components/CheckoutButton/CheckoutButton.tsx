"use client";

import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutButtonProps {
  items: {
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
  }[];
}

export default function CheckoutButton({ items }: CheckoutButtonProps) {
  const { data: session } = useSession();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!session?.user) {
      alert("Please sign in to checkout");
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          items,
          userId: session.user.id,
          userEmail: session.user.email 
        }),
      });

      const { sessionId } = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error in checkout:", error);
      alert("Error processing checkout. Please try again.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
    >
      Payer ({total.toFixed(2)} €)
    </button>
  );
}
