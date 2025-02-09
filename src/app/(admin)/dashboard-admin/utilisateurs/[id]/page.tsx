"use client";

import { useUserDetails } from "@/app/hooks/useUserDetails";
import { useParams } from "next/navigation";

export default function UserDetailsPage() {
  const { id } = useParams();
  const { user, loading } = useUserDetails(id as string);

  if (loading) return <p>Chargement...</p>;
  if (!user) return <p>Utilisateur introuvable</p>;

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">
        Détails de {user.firstname} {user.lastname}
      </h1>

      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Rôle :</strong> {user.role}</p>
      {user.phoneNumber && <p><strong>Téléphone :</strong> {user.phoneNumber}</p>}
      {user.address && <p><strong>Adresse :</strong> {user.address}</p>}
      {user.dateOfBirth && <p><strong>Date de naissance :</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>}
      <p><strong>Date d'inscription :</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

      <h2 className="text-xl font-bold mt-6">Historique des commandes</h2>
      {user.orders.length === 0 ? (
        <p>Aucune commande passée.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {user.orders.map((order : any) => (
            <li key={order.id} className="border p-4 rounded-lg bg-white shadow-sm">
              <p><strong>ID :</strong> {order.id}</p>
              <p><strong>Total :</strong> {order.totalPrice.toFixed(2)} €</p>
              <p><strong>Statut :</strong> {order.status}</p>
              <p><strong>Date :</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

              <h3 className="font-bold mt-2">Produits commandés :</h3>
              <ul className="ml-4 list-disc">
                {order.items.map((item : any) => (
                  <li key={item.product.id} className="flex items-center gap-2">
                    <img src={item.product.imageUrl || "/placeholder.jpg"} alt={item.product.name} className="w-10 h-10 rounded" />
                    <span>{item.product.name} - {item.quantity}x ({item.price.toFixed(2)} €)</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
