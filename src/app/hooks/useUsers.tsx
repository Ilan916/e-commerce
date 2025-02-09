

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "ADMIN" | "CLIENT"; // Ajuste selon les rôles possibles
  createdAt: string;
};

import { useEffect, useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]); // 👈 Ajout du type User[]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/admin/users");
        const data: User[] = await response.json(); // 👈 Typage explicite
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading };
}

