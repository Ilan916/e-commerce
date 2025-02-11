"use client";

import { useAdminOrders } from "@/app/hooks/useAdminOrders";
import Link from "next/link";
import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

const statuses = [
  { id: "", name: "Tous les statuts" },
  { id: "En cours", name: "En cours" },
  { id: "PAYEE", name: "Payée" },
  { id: "Expédiée", name: "Expédiée" },
  { id: "Livrée", name: "Livrée" },
  { id: "Annulée", name: "Annulée" },
];

export default function AdminOrdersPage() {
  const { orders, loading, setStatusFilter, setEmailFilter } = useAdminOrders();
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header avec filtres et bouton */}
      <div className="sm:flex sm:items-center justify-between">
        {/* Filtres */}
        <div className="flex gap-4">
          {/* Filtre par statut */}
          <Listbox
            value={selectedStatus}
            onChange={(value) => {
              setSelectedStatus(value);
              setStatusFilter(value.id);
            }}
          >
            <div className="relative w-64">
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

          {/* Champ de recherche email */}
          <div className="w-64">
            <input
              type="text"
              placeholder="Rechercher par email..."
              onChange={(e) => setEmailFilter(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        {/* Bouton "Commandes à valider" en noir */}
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/dashboard-admin/commandes/validation"
            className="block rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
          >
            Commandes à valider
          </Link>
        </div>
      </div>

      {/* Liste des commandes */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      ID Commande
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Utilisateur
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Statut
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.user.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.totalPrice} €</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.status}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex justify-center gap-4">
                        <Link
                          href={`/dashboard-admin/commandes/${order.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Détails
                        </Link>
                        {order.status === "PAYEE" && (
                          <Link
                            href={`/dashboard-admin/commandes/validation/${order.id}`}
                            className="text-green-600 hover:text-green-900"
                          >
                            Validation
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
