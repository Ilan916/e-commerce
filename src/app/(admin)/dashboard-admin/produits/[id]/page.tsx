"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductForm } from "@/app/components";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

      alert("Produit modifié avec succès !");
      router.push("/dashboard-admin/produits");
    } catch (error) {
      console.error("Erreur modification produit :", error);
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!product) return <p>Produit introuvable.</p>;

  return <ProductForm product={product} onSubmit={handleUpdateProduct} />;
}
