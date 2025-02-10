"use client";

import { useUsers } from "@/app/hooks/useUsers";
import { useState } from "react";
import {ConfirmModal } from "@/app/components";

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
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  if (loading) return <p>Chargement des utilisateurs...</p>;

  // 🔎 Filtrage par rôle et recherche
  const filteredUsers = users
    .filter((user) => (roleFilter ? user.role === roleFilter : true))
    .filter((user) => user.email.toLowerCase().includes(search.toLowerCase()));

  // 🔢 Pagination
  const paginatedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>

      {/* 📌 Barre de recherche et filtre */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Rechercher par email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded w-1/3"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Tous</option>
          <option value="ADMIN">Admin</option>
          <option value="CLIENT">Client</option>
        </select>
      </div>

      {/* 📌 Table des utilisateurs */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Nom</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Rôle</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">
                {user.firstname} {user.lastname}
              </td>
              <td className="border px-4 py-2">{user.email}</td>

              {/* 🔹 Modification du rôle */}
              <td className="border px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => updateUserRole(user.id, e.target.value as "ADMIN" | "CLIENT")}
                  className="border p-1 rounded"
                >
                  <option value="CLIENT">Client</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </td>

              {/* 🔹 Actions */}
              <td className="border px-4 py-2 flex justify-center gap-2">
                <a
                  href={`/dashboard-admin/utilisateurs/${user.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Voir détails
                </a>
                <button
                  onClick={() => {
                    setUserToDelete(user);
                    setIsModalOpen(true);
                  }}
                  className="text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔢 Pagination */}
      <div className="flex justify-between mt-4">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Précédent
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={paginatedUsers.length < usersPerPage}
        >
          Suivant
        </button>
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
