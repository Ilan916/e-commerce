"use client";

import { useAdminOrderValidation } from "@/app/hooks/useAdminOrderValidation";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function AdminOrderValidationPage() {
  const { id } = useParams();
  const { order, loading, validateProduct, finalizeOrder } = useAdminOrderValidation(id as string);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !order) {
      router.push("/dashboard-admin/commandes"); // ✅ Redirection si commande introuvable
    }
  }, [loading, order, router]);

  if (loading) return <LoadingSpinner />;

  // Vérifier si tous les produits sont validés
  const allValidated = order?.items.every((item) => item.validated);

  const handleFinalize = async () => {
    try {
      await finalizeOrder();
      router.push("/dashboard-admin/commandes"); // ✅ Redirection après validation
    } catch (error) {
      console.error("Erreur lors de la finalisation :", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Validation de la commande</h1>
          <p className="mt-1 text-sm text-gray-600">Vérifiez et validez les produits avant expédition.</p>
        </div>
      </div>

      {/* Infos Client */}
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Client</h2>
        <p className="mt-2 text-gray-700"><strong>Nom :</strong> {order?.user.firstname} {order?.user.lastname}</p>
        <p className="text-gray-700"><strong>Email :</strong> {order?.user.email}</p>
      </div>

      {/* Produits Commandés */}
      <div className="mt-6 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Produit</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Quantité</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {order?.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{item.product.name}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{item.quantity}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-center">
                        {item.validated ? (
                          <span className="text-green-600 font-semibold">Ajouté</span>
                        ) : (
                          <button
                            onClick={() => validateProduct(item.id)}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                          >
                            Ajouter à la commande
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Finale */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => router.push("/dashboard-admin/commandes")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Retour
        </button>

        <button
          onClick={handleFinalize}
          disabled={!allValidated}
          className={`px-4 py-2 rounded text-white ${
            allValidated ? "bg-green-500 hover:bg-green-600 transition" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Finaliser la commande
        </button>
      </div>
    </div>
  );
}
