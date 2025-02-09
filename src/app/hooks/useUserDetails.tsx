import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  imageUrl: string | null;
};

type OrderItem = {
  quantity: number;
  price: number;
  product: Product;
};

type Order = {
  id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "ADMIN" | "CLIENT";
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  createdAt: string;
  orders: Order[];
};

export function useUserDetails(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/admin/users/${id}`);
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur :", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchUser();
  }, [id]);

  return { user, loading };
}
