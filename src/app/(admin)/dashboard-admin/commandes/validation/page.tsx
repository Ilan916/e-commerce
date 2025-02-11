"use client";

import { useAdminOrdersToValidate } from "@/app/hooks/useAdminOrdersToValidate";
import Link from "next/link";

export default function AdminOrdersToValidatePage() {
  const { orders, loading } = useAdminOrdersToValidate();

  if (loading) return <p className="text-center text-gray-600">Chargement des commandes...</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Commandes à valider</h1>
          <p className="mt-1 text-sm text-gray-600">Liste des commandes en attente de validation.</p>
        </div>
      </div>

      {/* Tableau des commandes */}
      <div className="mt-6 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
              {orders.length === 0 ? (
                <p className="text-center py-6 text-gray-500">Aucune commande en attente.</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-300">
                  {/* Titre du tableau */}
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Client</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Total</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>

                  {/* Corps du tableau */}
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {order.user.firstname} {order.user.lastname} ({order.user.email})
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {order.totalPrice.toFixed(2)} €
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-center">
                          <Link
                            href={`/dashboard-admin/commandes/validation/${order.id}`}
                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                          >
                            Valider
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
