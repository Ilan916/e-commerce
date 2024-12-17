"use client";

import { useAdminProducts } from "@/app/hooks/useAdminProducts";
import { deleteAdminProduct } from "@/app/hooks/useDeleteAdminProducts";

export default function AdminProductList() {
  const { Adminproducts, loading } = useAdminProducts();

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Voulez-vous vraiment supprimer ce produit ?");
    if (confirmed) {
      try {
        await deleteAdminProduct(id);
        alert("Produit supprimé avec succès !");
        window.location.reload(); // Rafraîchit la liste après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression du produit.");
      }
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Produits</h1>
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
            <button
              onClick={() => handleDelete(product.id)}
              className="text-red-500 hover:underline"
            >
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  );
}
