"use client";

import { useState } from "react";
import { createAdminProduct } from "@/app/hooks/useCreateAdminProducts";
import { useAdminCategories } from "@/app/hooks/useAdminCategories";
import { useRouter } from "next/navigation";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createAdminProduct({
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock, 10),
      });

      alert("Produit ajouté avec succès !");
      router.push("/dashboard-admin/produits");
    } catch (error: any) {
      setError(error.message || "Erreur lors de l'ajout du produit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Ajouter un produit</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Nom du produit" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="number" name="price" placeholder="Prix (€)" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="number" name="stock" placeholder="Stock" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="imageUrl" placeholder="Image URL" onChange={handleChange} className="w-full border p-2 rounded" />

        {/* 🔹 Sélection de la catégorie */}
        <select
          name="categoryId"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          disabled={loadingCategories}
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {loading ? "Ajout en cours..." : "Ajouter le produit"}
        </button>
      </form>
    </div>
  );
}
