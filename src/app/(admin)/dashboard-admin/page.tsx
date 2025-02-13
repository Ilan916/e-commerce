"use client";

import { useAdminStats } from "@/app/hooks/useAdminStats";

export default function AdminDashboardHome() {
  const { stats, loading } = useAdminStats();

  if (loading) return <p>Chargement des statistiques...</p>;
  if (!stats) return <p>Erreur de chargement des statistiques.</p>;

  const statData = [
    { name: "Commandes", stat: stats.totalOrders },
    { name: "Revenu Total", stat: `${stats.totalRevenue.toFixed(2)} €` },
    { name: "Utilisateurs", stat: stats.totalUsers },
    { name: "Stock Produits", stat: stats.totalStock },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Section Stats */}
      <div>
      <h3 className="text-base font-semibold text-gray-900">Statistiques</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {statData.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>

      {/* 📌 Produits les plus vendus */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Produits les plus vendus</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {stats.topProducts.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover mb-2" />
              )}
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.quantitySold} vendus</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
