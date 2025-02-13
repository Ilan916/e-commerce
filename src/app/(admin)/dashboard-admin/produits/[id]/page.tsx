"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductForm } from "@/app/components";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/admin/products/${id}`);
        if (!response.ok) throw new Error("Produit introuvable");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Erreur récupération produit :", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (updatedData: any) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Erreur mise à jour produit");

      setSuccessMessage("Produit modifié avec succès !");
      
      setTimeout(() => {
        setSuccessMessage("");
        router.push("/dashboard-admin/produits");
      }, 2000);
    } catch (error) {
      console.error("Erreur modification produit :", error);
      setSuccessMessage("Erreur lors de la mise à jour.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return <p>Produit introuvable.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Modifier le produit</h1>

      {/* ✅ Alerte de succès */}
      {successMessage && (
        <div className={`mb-4 rounded-md p-4 ${successMessage.includes("Erreur") ? "bg-red-50" : "bg-green-50"}`}>
          <div className="flex">
            <CheckCircleIcon className={`h-5 w-5 ${successMessage.includes("Erreur") ? "text-red-400" : "text-green-400"}`} />
            <div className="ml-3">
              <p className={`text-sm font-medium ${successMessage.includes("Erreur") ? "text-red-800" : "text-green-800"}`}>
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      <ProductForm product={product} onSubmit={handleUpdateProduct} />
    </div>
  );
}
