"use client";

import { useState } from "react";
import { useProductSuggestions } from "@/app/hooks/useProductSuggestions";
import { AddProductModalSuggestion } from "@/app/components";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function ProductSuggestionsPage() {
  const { suggestions, loading, error, addProduct, removeSuggestion } = useProductSuggestions();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Produits suggérés</h1>

      {/* Message d'erreur */}
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 text-center">Chargement des suggestions...</p>
      ) : suggestions.length === 0 ? (
        <p className="text-gray-600 text-center py-4">Aucun produit manquant !</p>
      ) : (
        <ul role="list" className="divide-y divide-gray-200">
          {suggestions.map((product) => (
            <li key={product.id} className="flex items-center justify-between py-4">
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">Produit en attente d'ajout</p>
              </div>

              <div className="flex gap-2">
                {/* Bouton Ajouter */}
                <button
                  onClick={() => {
                    setSelectedProduct(product.name);
                    setModalOpen(true);
                  }}
                  className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                >
                  Ajouter
                </button>

                {/* 🗑️ Bouton Supprimer */}
                <button
                  onClick={() => removeSuggestion(product.name)}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 🔹 Modal de création de produit */}
      <AddProductModalSuggestion 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSubmit={addProduct}
        defaultName={selectedProduct || ""}
      />
    </div>
  );
}
