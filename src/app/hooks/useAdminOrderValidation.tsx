"use client";

import { useEffect, useState } from "react";

interface OrderItem {
  id: string;
  product: { name: string };
  quantity: number;
  validated: boolean;
}

interface Order {
  id: string;
  user: { firstname: string; lastname: string; email: string };
  items: OrderItem[];
  status: string;
}

export function useAdminOrderValidation(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`/api/admin/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Erreur lors du chargement de la commande :", error);
      } finally {
        setLoading(false);
      }
    }

    if (orderId) fetchOrder();
  }, [orderId]);

  // ✅ Fonction pour valider un produit
  async function validateProduct(itemId: string) {
    try {
      const response = await fetch(`/api/admin/orders/validate-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) throw new Error("Erreur validation produit");

      setOrder((prevOrder) => {
        if (!prevOrder) return null;
        return {
          ...prevOrder,
          items: prevOrder.items.map((item) =>
            item.id === itemId ? { ...item, validated: true } : item
          ),
        };
      });
    } catch (error) {
      console.error("Erreur validation produit :", error);
    }
  }

  // ✅ Fonction pour finaliser la commande
  async function finalizeOrder() {
    try {
      const response = await fetch(`/api/admin/orders/finalize/${orderId}`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error("Erreur finalisation commande");

      setOrder((prevOrder) => prevOrder ? { ...prevOrder, status: "EXPÉDIÉE" } : null);
    } catch (error) {
      console.error("Erreur finalisation commande :", error);
    }
  }

  return { order, loading, validateProduct, finalizeOrder };
}
