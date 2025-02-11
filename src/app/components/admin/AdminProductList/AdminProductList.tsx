"use client";

import { useAdminProducts } from "@/app/hooks/useAdminProducts";
import { deleteAdminProduct } from "@/app/hooks/useDeleteAdminProducts";
import { useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

export default function AdminProductList() {
  const { Adminproducts, loading } = useAdminProducts();
  const router = useRouter();

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

  if (loading) return <p className="text-center text-gray-500">Chargement des produits...</p>;

  return (
    <div className=" mx-auto p-6">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
        <button
          onClick={() => router.push("/dashboard-admin/produits/produit-ajout")}
          className="block rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
        >
          Ajouter un produit
        </button>
      </div>

      {Adminproducts.length === 0 ? (
        <p className="text-gray-600">Aucun produit trouvé.</p>
      ) : (
        <ul role="list" className="divide-y divide-gray-200">
          {Adminproducts.map((product) => (
            <li key={product.id} className="flex items-center justify-between gap-x-6 py-5">
              {/* Infos Produit */}
              <div className="min-w-0">
                <div className="flex items-center gap-x-3">
                  <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                  <p
                    className={`mt-0.5 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      product.stock > 20
                        ? "text-green-700 bg-green-50 ring-green-600/20"
                        : product.stock > 5
                        ? "text-yellow-800 bg-yellow-50 ring-yellow-600/20"
                        : "text-red-700 bg-red-50 ring-red-600/20"
                    }`}
                  >
                    {product.stock > 20 ? "En stock" : product.stock > 5 ? "Stock faible" : "Rupture"}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs text-gray-500">
                  <p>Prix : {product.price.toFixed(2)} €</p>
                  <span>•</span>
                  <p>Catégorie : {product.category?.name || "Non classé"}</p>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-none items-center gap-x-4">

                {/* Menu d'options */}
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Options</span>
                    <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                  >
                    <MenuItem>
                      <button
                        onClick={() => router.push(`/dashboard-admin/produits/${product.id}`)}
                        className="block w-full px-3 py-1 text-left text-sm text-gray-900 hover:bg-gray-100"
                      >
                        Modifier
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="block w-full px-3 py-1 text-left text-sm text-red-600 hover:bg-red-100"
                      >
                        Supprimer
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
