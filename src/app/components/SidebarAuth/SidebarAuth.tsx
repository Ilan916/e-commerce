"use client";

import React from "react";
import Link from "next/link"; 

import { useSession } from "next-auth/react";
import { useSidebarAuth } from "@/app/hooks/SidebarAuth";
import { signOut } from "next-auth/react";


import { IoClose } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export default function SidebarAuthentification() {
  const { data: session } = useSession(); 
  const { isSidebarOpen, closeSidebar } = useSidebarAuth();

  if (!session?.user) return null;

  return (
    <div className={`fixed top-0 right-0 w-full sm:w-80 h-full bg-gray-100 transform ${ isSidebarOpen ? "translate-x-0" : "translate-x-full" } transition-transform duration-300`}>
      <div>
        <div className="flex items-center justify-end  pt-2 pr-4">
          <IoClose onClick={closeSidebar} className="w-9 h-9 text-slate-500 hover:text-slate-700 cursor-pointer"/>
        </div>
        <h2 className="text-2xl font-semibold text-slate-800 pl-4">Bonjour <span>{session.user.firstname}</span></h2>
        <ul className="mt-4">
          <li className=" border-gray-300 border-t-2 border-b-2 hover:bg-gray-200 group">
            <Link href="/mes-informations" className="w-full h-full py-4 text-slate-500 text-sm group-hover:text-slate-700 pl-4 font-semibold flex items-center gap-2" onClick={closeSidebar}>
            <FaUserCog className="text-xl" /> Mes informations
            </Link>
          </li>
          <li className=" border-gray-300 border-b-2  hover:bg-gray-200 group">
            <Link href="/achats" className="w-full h-full py-4 text-slate-500 text-sm group-hover:text-slate-700 pl-4 font-semibold flex items-center gap-2" onClick={closeSidebar}>
            <FaShoppingCart className="text-xl"/> Mon Panier
            </Link>
          </li>
          <li className=" border-gray-300 border-b-2  hover:bg-gray-200 group">
            <Link href="/historique" className=" w-full h-full py-4 text-slate-500 text-sm group-hover:text-slate-700 pl-4 font-semibold flex items-center gap-2" onClick={closeSidebar}>
            <FaHistory className="text-xl"/> Historique de commandes
            </Link>
          </li>
          <li className=" border-gray-300 border-b-2  hover:bg-gray-200 group">
            <Link href="/panier" className="w-full h-full py-4 text-slate-500 text-sm group-hover:text-slate-700 pl-4 font-semibold flex items-center gap-2" onClick={closeSidebar}>
            <FaBoxesStacked className="text-xl"/> Mes produits
            </Link>
          </li>
        </ul>
        <div className="mt-12 w-full border-t-2 border-b-2 border-red-300 group hover:bg-red-200">
        <button 
          className="px-4 py-4 w-full  text-red-500 group-hover:text-red-700 text-sm font-semibold flex items-center gap-2" 
          onClick={() => {
              closeSidebar();
              signOut();      
            }}>
          <FaArrowRightFromBracket className="text-xl"/> Déconnexion
        </button>
        </div>
      </div>
    </div>
  );
}
