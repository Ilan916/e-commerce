"use client";

import { useState, useEffect } from "react";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalStock: number;
  topProducts: { name: string; imageUrl: string | null; quantitySold: number }[];
}

export function useAdminStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("❌ Erreur chargement stats :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}
