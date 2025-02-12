import { useEffect, useState } from "react";

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "ADMIN" | "CLIENT";
};

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/admin/users");
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("❌ Erreur chargement utilisateurs :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // 🔹 Fonction pour modifier le rôle d'un utilisateur
  async function updateUserRole(userId: string, role: "ADMIN" | "CLIENT") {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) throw new Error("Erreur modification rôle");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role } : user
        )
      );
    } catch (error) {
      console.error("❌ Erreur changement rôle :", error);
    }
  }

  // 🔹 Fonction pour supprimer un utilisateur (après confirmation)
  async function deleteUser() {
    if (!userToDelete) return;

    try {
      const response = await fetch(`/api/admin/users/${userToDelete.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erreur suppression utilisateur");

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
    } catch (error) {
      console.error("❌ Erreur suppression utilisateur :", error);
    } finally {
      setIsModalOpen(false);
      setUserToDelete(null);
    }
  }

  return {
    users,
    loading,
    updateUserRole,
    deleteUser,
    userToDelete,
    setUserToDelete,
    isModalOpen,
    setIsModalOpen,
  };
}
