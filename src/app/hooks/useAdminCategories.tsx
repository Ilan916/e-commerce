"use client";

import { useState, useEffect } from "react";

export interface AdminCategory {
  id: string;  
  name: string; 
}

export function useAdminCategories() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/admin/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading };
}
