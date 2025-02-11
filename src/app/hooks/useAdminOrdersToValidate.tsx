"use client";

import { useState, useEffect } from "react";

export interface AdminOrder {
  id: string;
  totalPrice: number;
  user: { firstname: string; lastname: string; email: string };
  items: { product: { name: string; stock: number }; quantity: number }[];
}

export function useAdminOrdersToValidate() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/admin/orders/validate");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Erreur lors du chargement des commandes payées :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return { orders, loading };
}
