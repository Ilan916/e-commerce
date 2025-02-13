"use client";

import { useUserDetails } from "@/app/hooks/useUserDetails";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useParams, useRouter } from "next/navigation";
import { FiImage } from "react-icons/fi";
import { User, Order } from "@/app/types/admin";

export default function UserDetailsPage() {
  const { id } = useParams();
  const { user, loading } = useUserDetails(id as string);
  const router = useRouter();

  if (loading) return <LoadingSpinner />;
  if (!user) return <p className="text-center text-red-500">Utilisateur introuvable</p>;

  return (
    <section className="mx-auto p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Détails de l&apos;utilisateur</h1>
      <p className="text-gray-600 mb-6">Informations complètes sur l&apos;utilisateur sélectionné.</p>

      {/* 📌 Informations Client */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Informations de l&apos;utilisateur</h2>
        <p className="text-gray-700"><strong>Nom :</strong> {user.firstname} {user.lastname}</p>
        <p className="text-gray-700"><strong>Email :</strong> {user.email}</p>
        <p className="text-gray-700"><strong>Rôle :</strong> {user.role}</p>
        <p className="text-gray-700"><strong>Téléphone :</strong> {user.phoneNumber || "Non renseigné"}</p>
        <p className="text-gray-700"><strong>Adresse :</strong> {user.address || "Non renseignée"}</p>
        <p className="text-gray-700"><strong>Date de naissance :</strong> {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "Non renseignée"}</p>
        <p className="text-gray-700"><strong>Date d'inscription :</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      {/* 📦 Historique des commandes */}
      <h2 className="text-xl font-semibold mb-4">Historique des commandes</h2>

      {user.orders.length === 0 ? (
        <p className="text-gray-600 mb-6">Aucune commande passée.</p>
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID Commande</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Statut</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Produits</th>
              </tr>
            </thead>
            <tbody>
              {user.orders.map((order: any) => (
                <tr key={order.id} className="text-center">
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.totalPrice.toFixed(2)} €</td>
                  <td className="border px-4 py-2">{order.status}</td>
                  <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">
                    <ul className="flex flex-col items-center space-y-2">
                      {order.items.map((item: any) => (
                        <li key={item.product.id} className="flex items-center gap-2">
                          <div className="w-10 h-10 flex items-center justify-center rounded shadow bg-gray-200">
                            {item.product.imageUrl ? (
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <FiImage className="text-gray-500 text-xl" />
                            )}
                          </div>
                          <span>{item.product.name} - {item.quantity}x</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔙 Bouton retour */}
      <div className="mt-6">
        <button
          onClick={() => router.push("/dashboard-admin/utilisateurs")}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Retour
        </button>
      </div>
    </section>
  );
}
