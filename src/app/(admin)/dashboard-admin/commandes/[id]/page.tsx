"use client";

import { useAdminOrderDetail } from "@/app/hooks/useAdminOrderDetail";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const statuses = [
  { id: "EN_COURS", name: "En cours" },
  { id: "PAYEE", name: "Payée" },
  { id: "EN_PREPARATION", name: "En préparation" },
  { id: "EXPEDIEE", name: "Expédiée" },
  { id: "LIVREE", name: "Livrée" },
  { id: "ANNULEE", name: "Annulée" },
];

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const { order, loading, updateOrderStatus } = useAdminOrderDetail(id as string);
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);

  useEffect(() => {
    if (order) {
      setSelectedStatus(statuses.find((s) => s.id === order.status) || statuses[0]);
    }
  }, [order]);

  if (loading) return <LoadingSpinner />;
  if (!order) return <p className="text-center text-red-500">Commande introuvable.</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="sm:flex sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Détails de la commande</h1>
          <p className="mt-1 text-sm text-gray-600">Informations complètes sur la commande sélectionnée.</p>
        </div>
      </div>

      {/* Infos Client */}
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Informations du client</h2>
        <p className="mt-2 text-gray-700"><strong>Nom :</strong> {order.user.firstname} {order.user.lastname}</p>
        <p className="text-gray-700"><strong>Email :</strong> {order.user.email}</p>
        <p className="text-gray-700"><strong>Adresse :</strong> {order.user.address || "Non renseignée"}</p>
      </div>

      {/* Produits Commandés */}
      <div className="mt-6 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Produit</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Quantité</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Prix total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {order.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{item.product.name}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{item.quantity}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Sélecteur de statut */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Statut de la commande</h2>
        <Listbox
          value={selectedStatus}
          onChange={(value) => {
            setSelectedStatus(value);
            updateOrderStatus(value.id);
          }}
        >
          <div className="relative mt-2 w-64">
            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
              <span className="col-start-1 row-start-1 truncate pr-6">{selectedStatus.name}</span>
              <ChevronUpDownIcon
                aria-hidden="true"
                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </ListboxButton>

            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
              {statuses.map((status) => (
                <ListboxOption
                  key={status.id}
                  value={status}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                >
                  <span className="block truncate font-normal group-data-[selected]:font-semibold">
                    {status.name}
                  </span>
                  {selectedStatus.id === status.id && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>

      {/* Bouton Retour */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => router.push("/dashboard-admin/commandes")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Retour
        </button>
      </div>
    </div>
  );
}
