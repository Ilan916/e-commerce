"use client";

import { useState } from "react";
import { createAdminProduct } from "@/app/hooks/useCreateAdminProducts";
import { useAdminCategories, AdminCategory } from "@/app/hooks/useAdminCategories";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function AdminCreateProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: "",
  });

  const { categories, loading } = useAdminCategories();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createAdminProduct(form);
      console.log("Produit créé :", response);
      alert("Produit créé avec succès !");
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: "",
      });
    } catch (error) {
      console.error("Erreur lors de la création du produit :", error);
      alert("Une erreur est survenue lors de la création du produit.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Créer un produit</h2>

      <input
        type="text"
        name="name"
        placeholder="Nom du produit"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="number"
        name="price"
        placeholder="Prix"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        step="0.01"
        required
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="text"
        name="imageUrl"
        placeholder="URL de l'image"
        value={form.imageUrl}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <div>
        <label htmlFor="categoryId" className="block font-semibold mb-1">
          Catégorie
        </label>
        {loading ? (
          <p className="text-gray-500">Chargement des catégories...</p>
        ) : (
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">-- Sélectionnez une catégorie --</option>
            {categories.map((category: AdminCategory) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Créer le produit
      </button>
    </form>
  );
}
