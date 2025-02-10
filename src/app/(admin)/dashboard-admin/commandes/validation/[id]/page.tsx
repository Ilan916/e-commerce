"use client";

import { useAdminOrderValidation } from "@/app/hooks/useAdminOrderValidation";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminOrderValidationPage() {
  const { id } = useParams();
  const { order, loading, validateProduct, finalizeOrder } = useAdminOrderValidation(id as string);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !order) {
      router.push("/dashboard-admin/commandes"); // ✅ Redirection si la commande n'existe pas
    }
  }, [loading, order, router]);

  if (loading) return <p>Chargement...</p>;

  // Vérifier si tous les produits ont été validés
  const allValidated = order?.items.every((item) => item.validated);

  const handleFinalize = async () => {
    try {
      await finalizeOrder();
      router.push("/dashboard-admin/commandes"); // ✅ Redirection après validation
    } catch (error) {
      console.error("Erreur lors de la finalisation de la commande :", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Validation de la commande</h1>

      {/* Infos Client */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Client</h2>
        <p><strong>Nom :</strong> {order?.user.firstname} {order?.user.lastname}</p>
        <p><strong>Email :</strong> {order?.user.email}</p>
      </div>

      {/* Produits Commandés */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Produits commandés</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Produit</th>
              <th className="border p-2">Quantité</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {order?.items.map((item) => (
              <tr key={item.id} className="border">
                <td className="p-2">{item.product.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">
                  {item.validated ? (
                    <span className="text-green-600 font-bold">✅ Validé</span>
                  ) : (
                    <button
                      onClick={() => validateProduct(item.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Ajouter au stock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Validation Finale */}
      <div className="mt-6">
        <button
          onClick={handleFinalize}
          disabled={!allValidated}
          className={`px-4 py-2 rounded text-white ${
            allValidated ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Finaliser la commande
        </button>
      </div>

      {/* Retour */}
      <button
        onClick={() => router.push("/dashboard-admin/commandes")}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Retour à la liste
      </button>
    </div>
  );
}
