"use client";

import { useState } from "react";
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId?: string;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (productData: Product) => Promise<void>;
}

export default function ProductForm({ product, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      imageUrl: "",
      categoryId: "",
    }
  );
  
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null); // Gestion de l'erreur spécifique

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setAlert({ type: "success", message: "Produit enregistré avec succès !" });
      setError(null); // Réinitialiser l'erreur si la soumission réussit
      setTimeout(() => setAlert(null), 3000); // 🔄 Disparition après 3 secondes
    } catch (err) {
      setError("Une erreur est survenue lors de l'enregistrement du produit."); // Gestion de l'erreur ici
      setAlert({ type: "error", message: "Erreur lors de l'enregistrement du produit." });
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* ✅ Alerte */}
      {alert && (
        <div className={`rounded-md p-4 mb-4 ${alert.type === "success" ? "bg-green-50" : "bg-red-50"}`}>
          <div className="flex items-center">
            <div className="shrink-0">
              {alert.type === "success" ? (
                <CheckCircleIcon className="size-5 text-green-400" />
              ) : (
                <XCircleIcon className="size-5 text-red-400" />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${alert.type === "success" ? "text-green-800" : "text-red-800"}`}>
                {alert.message}
              </p>
            </div>
            <button
              onClick={() => setAlert(null)}
              className={`ml-auto -mx-1.5 -my-1.5 inline-flex p-1.5 rounded-md focus:outline-none focus:ring-2 ${
                alert.type === "success" ? "text-green-800 hover:bg-green-100 focus:ring-green-600" : "text-red-800 hover:bg-red-100 focus:ring-red-600"
              }`}
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>
        </div>
      )}

      {/* 📌 Formulaire */}
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {product ? "Modifier le produit" : "Ajouter un produit"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Nom du produit :</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Description :</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-semibold text-gray-700">Prix (€) :</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="w-1/2">
              <label className="block font-semibold text-gray-700">Stock :</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Image URL :</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl ?? ""}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {formData.imageUrl && (
              <div className="mt-4 flex justify-center">
                <img src={formData.imageUrl} alt="Aperçu" className="w-32 h-32 object-cover rounded-lg shadow-md" />
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 text-red-800 border border-red-300 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setFormData(product || { name: "", description: "", price: 0, stock: 0, imageUrl: "", categoryId: "" })}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Réinitialiser
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {product ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
