"use client";

import { useAdminOrdersToValidate } from "@/app/hooks/useAdminOrdersToValidate";
import Link from "next/link";

export default function AdminOrdersToValidatePage() {
  const { orders, loading } = useAdminOrdersToValidate();

  if (loading) return <p>Chargement des commandes...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Validation des Commandes</h1>

      {orders.length === 0 ? (
        <p>Aucune commande en attente de validation.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Client</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border px-4 py-2">
                  {order.user.firstname} {order.user.lastname} ({order.user.email})
                </td>
                <td className="border px-4 py-2">{order.totalPrice.toFixed(2)} €</td>
                <td className="border px-4 py-2">
                  <Link
                    href={`/dashboard-admin/commandes/validation/${order.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Détails
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
