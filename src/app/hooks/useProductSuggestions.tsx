"use client";
import { useEffect, useState } from "react";

interface ProductSuggestion {
  id: string;
  name: string;
}

export function useProductSuggestions() {
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch("/api/admin/product-suggestions");
        if (!response.ok) throw new Error("Erreur de récupération des suggestions");
        
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("❌ Erreur API :", error);
        setError("Impossible de récupérer les suggestions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  // 🔹 Fonction pour ajouter un produit et supprimer la suggestion après ajout
  const addProduct = async (productData: any) => {
    try {
      console.log("📦 Données envoyées à l'API :", productData);

      const response = await fetch(`/api/admin/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Erreur lors de l'ajout");
      }

      // ✅ Suppression automatique après ajout
      await removeSuggestion(productData.name);
    } catch (error) {
      console.error("❌ Erreur API :", error);
    }
  };

  // 🔥 Fonction pour supprimer une suggestion de la liste
  const removeSuggestion = async (productName: string) => {
    try {
      const response = await fetch(`/api/admin/product-suggestions`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: productName }),
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setSuggestions((prev) => prev.filter((p) => p.name !== productName));
    } catch (error) {
      console.error("❌ Erreur API suppression :", error);
    }
  };

  return { suggestions, loading, error, addProduct, removeSuggestion };
}
