"use client";

import { useState, useEffect } from "react";

interface AdminProduct {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  stock: number;
  category?: {
    name: string;
  };
}

export function useAdminProducts() {
  const [Adminproducts, setAdminProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/admin/products");
        if (!response.ok) throw new Error("Erreur lors du chargement des produits");
        const data: AdminProduct[] = await response.json();
        setAdminProducts(data);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { Adminproducts, loading };
}
