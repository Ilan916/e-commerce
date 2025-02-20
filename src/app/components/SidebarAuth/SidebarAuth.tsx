"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link"; 
import { useSession } from "next-auth/react";
import { useSidebarAuth } from "@/app/hooks/SidebarAuth";
import { signOut } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { FaUserCog, FaShoppingCart, FaHistory } from "react-icons/fa";
import { FaBoxesStacked, FaArrowRightFromBracket } from "react-icons/fa6";

export default function SidebarAuthentification() {
  const { data: session } = useSession(); 
  const { isSidebarOpen, closeSidebar } = useSidebarAuth();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSidebarOpen && sidebarRef.current) {
      sidebarRef.current.focus();
    }
  }, [isSidebarOpen]);

  if (!session?.user) return null;

  return (
    <div
      ref={sidebarRef}
      tabIndex={-1}
      aria-hidden={!isSidebarOpen}
      aria-label="Menu latéral"
      className={`fixed top-0 right-0 w-full z-50 sm:w-80 h-full bg-white transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}
    >
      <div>
        <div className="flex items-center justify-end pt-2 pr-4">
          <button
            onClick={closeSidebar}
            onKeyDown={(e) => e.key === 'Enter' && closeSidebar()}
            className="w-9 h-9 text-gray-700 hover:text-gray-900 cursor-pointer"
            aria-label="Fermer le menu"
          >
            <IoClose className="w-full h-full" />
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 pl-4">Bonjour <span>{session.user.firstname}</span></h2>
        <ul className="mt-4">
          <li className="border-gray-300 border-t-2 border-b-2 hover:bg-gray-100 group">
            <Link 
              href="/mes-informations" 
              className="w-full h-full py-4 text-gray-700 text-sm group-hover:text-gray-900 pl-4 font-semibold flex items-center gap-2" 
              onClick={closeSidebar}
              aria-label="Mes informations"
            >
              <FaUserCog className="text-xl" /> Mes informations
            </Link>
          </li>
          <li className="border-gray-300 border-b-2 hover:bg-gray-100 group">
            <Link 
              href="/cart" 
              className="w-full h-full py-4 text-gray-700 text-sm group-hover:text-gray-900 pl-4 font-semibold flex items-center gap-2" 
              onClick={closeSidebar}
              aria-label="Mon Panier"
            >
              <FaShoppingCart className="text-xl" /> Mon Panier
            </Link>
          </li>
          <li className="border-gray-300 border-b-2 hover:bg-gray-100 group">
            <Link 
              href="/historique" 
              className="w-full h-full py-4 text-gray-700 text-sm group-hover:text-gray-900 pl-4 font-semibold flex items-center gap-2" 
              onClick={closeSidebar}
              aria-label="Historique de commandes"
            >
              <FaHistory className="text-xl" /> Historique de commandes
            </Link>
          </li>
          <li className="border-gray-300 border-b-2 hover:bg-gray-100 group">
            <Link 
              href="/panier" 
              className="w-full h-full py-4 text-gray-700 text-sm group-hover:text-gray-900 pl-4 font-semibold flex items-center gap-2" 
              onClick={closeSidebar}
              aria-label="Mes produits"
            >
              <FaBoxesStacked className="text-xl" /> Mes produits
            </Link>
          </li>
        </ul>
        <div className="mt-12 w-full border-t-2 border-b-2 border-red-500 group hover:bg-red-100">
          <button
            className="px-4 py-4 w-full text-red-700 group-hover:text-red-900 text-sm font-semibold flex items-center gap-2"
            onClick={() => {
              closeSidebar();
              signOut();
            }}
            aria-label="Déconnexion"
          >
            <FaArrowRightFromBracket className="text-xl" /> Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
