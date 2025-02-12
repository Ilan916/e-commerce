"use client";
import { useEffect, useState } from "react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: any) => Promise<void>;
  defaultName: string;
}

export default function AddProductModal({ isOpen, onClose, onSubmit, defaultName }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Charger les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/admin/categories");
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("❌ Erreur API Catégories :", error);
        setError("Impossible de charger les catégories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // 🔹 Mettre à jour le champ `name` lorsqu'on ouvre la modal
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, name: defaultName }));
    }
  }, [isOpen, defaultName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.categoryId) {
      setError("Veuillez sélectionner une catégorie !");
      return;
    }

    setError(null);
    await onSubmit(formData);
    setSuccessMessage("✅ Produit ajouté avec succès !");

    // Fermer la modal après confirmation
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Ajouter un produit</h2>

        {/* ✅ Message de succès */}
        {successMessage && (
          <div className="mb-4 p-3 text-green-800 bg-green-100 border border-green-300 rounded-md">
            {successMessage}
          </div>
        )}

        {/* ❌ Message d'erreur */}
        {error && (
          <div className="mb-4 p-3 text-red-800 bg-red-100 border border-red-300 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <label className="block">
            <span className="text-gray-700 font-medium">Nom du produit</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Description</span>
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-gray-700 font-medium">Prix (€)</span>
              <input
                type="number"
                name="price"
                placeholder="Prix"
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Stock</span>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-gray-700 font-medium">Image URL</span>
            <input
              type="text"
              name="imageUrl"
              placeholder="URL de l'image"
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </label>

          {/* 🔹 Sélection de la catégorie */}
          <label className="block">
            <span className="text-gray-700 font-medium">Catégorie</span>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {loadingCategories ? (
                <option disabled>Chargement...</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
