"use client";

import { useState } from "react";
import { createAdminProduct } from "@/app/hooks/useCreateAdminProducts";
import { useAdminCategories } from "@/app/hooks/useAdminCategories";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function AddProductPage() {
  const router = useRouter();
  const { categories, loading: loadingCategories } = useAdminCategories();
  
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await createAdminProduct({
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock, 10),
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/dashboard-admin/produits");
      }, 2000);
    } catch (error: any) {
      setError(error.message || "Erreur lors de l'ajout du produit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Ajouter un produit</h1>

      {/* ✅ Alerte de succès */}
      {success && (
        <div className="mb-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <CheckCircleIcon className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">Produit ajouté avec succès !</p>
            </div>
          </div>
        </div>
      )}

      {/* ❌ Affichage des erreurs */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Nom du produit</label>
          <input
            type="text"
            name="name"
            placeholder="Ex : Tomates bio"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Brève description du produit"
            value={product.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Prix (€)</label>
            <input
              type="number"
              name="price"
              placeholder="Ex : 2.50"
              value={product.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Ex : 100"
              value={product.stock}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="https://..."
            value={product.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>

        {/* 🔹 Sélection de la catégorie */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Catégorie</label>
          <select
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
            disabled={loadingCategories}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Bouton de soumission */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black px-4 py-2 text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:text-sm"
        >
          {loading ? "Ajout en cours..." : "Ajouter le produit"}
        </button>
      </form>
    </div>
  );
}
