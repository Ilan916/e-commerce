"use client";

import { useState, useEffect } from "react";

interface Order {
  id: string;
  user: { email: string };
  totalPrice: number;
  status: string;
}

export function useAdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(""); // Filtre par statut
  const [emailFilter, setEmailFilter] = useState(""); // Filtre par email

  useEffect(() => {
    async function fetchOrders() {
      try {
        let url = "/api/admin/orders";

        // Ajout des filtres dans l'URL
        const params = new URLSearchParams();
        if (statusFilter) params.append("status", statusFilter);
        if (emailFilter) params.append("email", emailFilter);
        if (params.toString()) url += "?" + params.toString();

        const response = await fetch(url);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("❌ Erreur chargement commandes :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [statusFilter, emailFilter]); // Déclencher la requête quand un filtre change

  return { orders, loading, setStatusFilter, setEmailFilter };
}
