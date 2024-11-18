"use client";

import React from "react";
import Link from "next/link"; 

import { useSession } from "next-auth/react";
import { useSidebarAuth } from "@/app/hooks/SidebarAuth";

import { IoClose } from "react-icons/io5";

export default function SidebarAuthentification() {
  const { data: session, status } = useSession(); 
  const { isSidebarOpen, closeSidebar } = useSidebarAuth();

  if (!session?.user) return null;

  return (
    <div className={`fixed top-0 right-0 w-80 h-full bg-gray-100 transform ${ isSidebarOpen ? "translate-x-0" : "translate-x-full" } transition-transform duration-300`}>
      <div>
        <div className="flex items-center justify-end  pt-2 pr-4">
          <IoClose onClick={closeSidebar} className="w-9 h-9 text-slate-500 hover:text-slate-700 cursor-pointer"/>
        </div>
        <h2 className="text-2xl font-semibold text-slate-800 pl-4">Bonjour <span>{session.user.firstname}</span></h2>
        <ul className="mt-4">
          <li className="py-4 border-gray-300 border-t-2 border-b-2 hover:bg-gray-200 group">
            <Link href="/mes-informations" className="text-slate-500 group-hover:text-slate-700 pl-4 font-semibold" onClick={closeSidebar}>
              Mes informations
            </Link>
          </li>
          <li className="py-4 border-gray-300 border-b-2  hover:bg-gray-200 group">
            <Link href="/achats" className="text-slate-500 group-hover:text-slate-700 pl-4 font-semibold" onClick={closeSidebar}>
              Mon Panier
            </Link>
          </li>
          <li className="py-4 border-gray-300 border-b-2  hover:bg-gray-200 group">
            <Link href="/historique" className="text-slate-500 group-hover:text-slate-700 pl-4 font-semibold" onClick={closeSidebar}>
              Historique de commandes
            </Link>
          </li>
          <li className="py-4 border-gray-300 border-b-2  hover:bg-gray-200 group">
            <Link href="/panier" className="text-slate-500 group-hover:text-slate-700 pl-4 font-semibold" onClick={closeSidebar}>
              Mes produits
            </Link>
          </li>
        </ul>
        <div className="mt-12 py-4  w-full border-t-2 border-b-2 border-red-300 group hover:bg-red-200">
        <button className="px-4  text-red-500 group-hover:text-red-700 font-semibold" onClick={closeSidebar}>
          Déconnexion
        </button>
        </div>
      </div>
    </div>
  );
}
