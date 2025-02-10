"use client";

import { useAdminProducts } from "@/app/hooks/useAdminProducts";
import { deleteAdminProduct } from "@/app/hooks/useDeleteAdminProducts";
import { useRouter } from "next/navigation";

export default function AdminProductList() {
  const { Adminproducts, loading } = useAdminProducts();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Voulez-vous vraiment supprimer ce produit ?");
    if (confirmed) {
      try {
        await deleteAdminProduct(id);
        alert("Produit supprimé avec succès !");
        window.location.reload(); // 🔄 Rafraîchit la liste après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression du produit.");
      }
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestion des Produits</h1>
        <button
          onClick={() => router.push("/dashboard-admin/produits/produit-ajout")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter un produit
        </button>
      </div>

      {Adminproducts.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        Adminproducts.map((product) => (
          <div key={product.id} className="p-2 border-b flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p>Prix : {product.price.toFixed(2)} €</p>
              <p>Stock : {product.stock}</p>
              <p>Catégorie : {product.category?.name || "Aucune"}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/dashboard-admin/produits/${product.id}`)}
                className="text-blue-500 hover:underline"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-500 hover:underline"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
