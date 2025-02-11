"use client";

import { useUsers } from "@/app/hooks/useUsers";
import { useState } from "react";
import { ConfirmModal } from "@/app/components";

export default function UserListPage() {
  const {
    users,
    loading,
    updateUserRole,
    deleteUser,
    userToDelete,
    setUserToDelete,
    isModalOpen,
    setIsModalOpen,
  } = useUsers();

  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");

  if (loading) return <p className="text-center text-gray-600">Chargement des utilisateurs...</p>;

  // 🔎 Filtrage par rôle et recherche
  const filteredUsers = users
    .filter((user) => (roleFilter ? user.role === roleFilter : true))
    .filter((user) => user.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Liste des utilisateurs</h1>
          <p className="mt-1 text-sm text-gray-600">Gérez les utilisateurs et leurs rôles.</p>
        </div>
      </div>

      {/* 📌 Barre de recherche et filtre */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher par email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-1/3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="block w-1/5 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
        >
          <option value="">Tous</option>
          <option value="ADMIN">Admin</option>
          <option value="CLIENT">Client</option>
        </select>
      </div>

      {/* 📌 Table des utilisateurs */}
      <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nom</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Rôle</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{user.firstname} {user.lastname}</td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{user.email}</td>

                {/* 🔹 Modification du rôle */}
                <td className="whitespace-nowrap px-4 py-4 text-sm">
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value as "ADMIN" | "CLIENT")}
                    className="block rounded-md border-gray-300 text-gray-900 focus:outline-indigo-600 sm:text-sm"
                  >
                    <option value="CLIENT">Client</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>

                {/* 🔹 Actions */}
                <td className="whitespace-nowrap px-4 py-4 text-sm flex justify-center gap-4">
                  <a href={`/dashboard-admin/utilisateurs/${user.id}`} className="text-indigo-600 hover:text-indigo-900">
                    Voir détails
                  </a>
                  <button
                    onClick={() => {
                      setUserToDelete(user);
                      setIsModalOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📌 Modal de confirmation */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteUser}
        title="Supprimer l'utilisateur"
        message={`Êtes-vous sûr de vouloir supprimer ${userToDelete?.firstname} ${userToDelete?.lastname} ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </section>
  );
}
