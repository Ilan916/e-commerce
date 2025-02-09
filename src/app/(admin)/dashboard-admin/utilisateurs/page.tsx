"use client";

import { useUsers } from "@/app/hooks/useUsers";
import { useState } from "react";

export default function UserListPage() {
  const { users, loading } = useUsers();
  const [roleFilter, setRoleFilter] = useState("");

  if (loading) return <p>Chargement des utilisateurs...</p>;

  const filteredUsers = users.filter((user) =>
    roleFilter ? user.role === roleFilter : true
  );

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>

      {/* Filtre par rôle */}
      <div className="mb-4">
        <label className="mr-2">Filtrer par rôle :</label>
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

      {/* Table des utilisateurs */}
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
          {filteredUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">
                {user.firstname} {user.lastname}
              </td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <a
                  href={`/dashboard-admin/utilisateurs/${user.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Voir détails
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
