"use client";

import { useAdminOrders } from "@/app/hooks/useAdminOrders";
import Link from "next/link";

export default function AdminOrdersPage() {
  const { orders, loading, setStatusFilter, setEmailFilter } = useAdminOrders();

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des Commandes</h1>

      {/* Filtres */}
      <div className="flex gap-4 mb-4">
        {/* Filtre par statut */}
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Tous les statuts</option>
          <option value="En cours">En cours</option>
          <option value="Expédiée">Expédiée</option>
          <option value="Livrée">Livrée</option>
          <option value="Annulée">Annulée</option>
        </select>

        {/* Filtre par email */}
        <input
          type="text"
          placeholder="Rechercher par email..."
          onChange={(e) => setEmailFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Liste des commandes */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Utilisateur</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Statut</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.user.email}</td>
              <td className="p-2">{order.totalPrice} €</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2 flex gap-2">
                <Link
                  href={`/dashboard-admin/commandes/${order.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Détails
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
