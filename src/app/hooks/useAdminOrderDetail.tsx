"use client";

import { useState, useEffect } from "react";

interface OrderItem {
  id: string;
  product: { name: string; price: number };
  quantity: number;
}

interface Order {
  id: string;
  user: { email: string; firstname: string; lastname: string; address: string };
  totalPrice: number;
  status: string;
  items: OrderItem[];
}

export function useAdminOrderDetail(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`/api/admin/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("❌ Erreur chargement commande :", error);
      } finally {
        setLoading(false);
      }
    }

    if (orderId) fetchOrder();
  }, [orderId]);

  // 📌 Mettre à jour le statut de la commande
  const updateOrderStatus = async (status: string) => {
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status }),
      });

      if (response.ok) {
        setOrder((prev) => prev ? { ...prev, status } : null);
      }
    } catch (error) {
      console.error("❌ Erreur mise à jour statut :", error);
    }
  };

  return { order, loading, updateOrderStatus };
}
