"use client";

import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface CartNotificationProps {
  show: boolean;
  onClose: () => void;
}

export default function CartNotification({ show, onClose }: CartNotificationProps) {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 my-24 sm:items-start sm:p-6 z-50"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
          enterTo="opacity-100 translate-y-0 sm:translate-x-0"
          leave="transition ease-in duration-100 transform"
          leaveFrom="opacity-100 translate-y-0 sm:translate-x-0"
          leaveTo="opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5">
            <div className="p-4 flex items-start">
              <div className="shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-semibold text-gray-900">Produit ajouté au panier !</p>
                <p className="mt-1 text-sm text-gray-500">Vous pouvez consulter votre panier pour finaliser votre commande.</p>
              </div>
              <div className="ml-4 flex shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label="Fermer la notification"
                >
                  <span className="sr-only">Fermer</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
