"use client";

import { useAdminOrderDetail } from "@/app/hooks/useAdminOrderDetail";
import { useParams, useRouter } from "next/navigation";

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const { order, loading, updateOrderStatus } = useAdminOrderDetail(id as string);
  const router = useRouter();

  if (loading) return <p>Chargement...</p>;
  if (!order) return <p>Commande introuvable.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Détails de la commande</h1>

      {/* Infos Client */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Client</h2>
        <p><strong>Nom :</strong> {order.user.firstname} {order.user.lastname}</p>
        <p><strong>Email :</strong> {order.user.email}</p>
        <p><strong>Adresse :</strong> {order.user.address}</p>
      </div>

      {/* Produits Commandés */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Produits commandés</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Produit</th>
              <th className="border p-2">Quantité</th>
              <th className="border p-2">Prix</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border">
                <td className="p-2">{item.product.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{(item.product.price * item.quantity).toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Statut de la commande</h2>
        <select
          value={order.status}
          onChange={(e) => updateOrderStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="En cours">En cours</option>
          <option value="Expédiée">Expédiée</option>
          <option value="Livrée">Livrée</option>
          <option value="Annulée">Annulée</option>
        </select>
      </div>

      {/* Retour */}
      <button
        onClick={() => router.push("/dashboard-admin/commandes")}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Retour à la liste
      </button>
    </div>
  );
}
