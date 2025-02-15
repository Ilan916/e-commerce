"use client";

import React from "react";
import Link from "next/link";
import { FaUser, FaRegUser } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useSidebarAuth } from "@/app/hooks/SidebarAuth";

export default function NavbarAuth() {
  const { data: session, status } = useSession();
  const { openSidebar } = useSidebarAuth();
  const isAdmin = session?.user?.role === "ADMIN"; // Vérification du rôle

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      openSidebar();
    }
  };

  return (
    <div className="w-full h-9 pr-8 z-50 border-b-2 flex justify-end items-center border-gray-300 bg-gray-200 gap-4">
      
      {isAdmin && ( // Affiche le bouton uniquement si l'utilisateur est ADMIN
        <Link
          href="/dashboard-admin"
          className="text-xs font-sans font-semibold text-blue-700 hover:text-blue-900 transition" // Amélioration du contraste
          aria-label="Dashboard Admin"
        >
          Dashboard Admin
        </Link>
      )}

      {status === "authenticated" && session?.user ? (
        // Utilisateur connecté
        <div 
          onClick={openSidebar} 
          onKeyDown={handleKeyDown} // Ajout du gestionnaire d'événements pour la touche "Entrée"
          className="flex gap-2 items-center relative before:content-[''] before:absolute before:top-[-2px] before:left-[-3px] before:w-[4px] before:h-[4px] before:bg-green-600 before:rounded-full cursor-pointer group hover:before:bg-green-700"
          tabIndex={0} // Permet la navigation au clavier
          role="button" // Indique que c'est un bouton pour les lecteurs d'écran
          aria-label={`Ouvrir le menu pour ${session.user.firstname} ${session.user.lastname}`}
        >
          <FaUser className="text-slate-600 group-hover:text-slate-800" />
          <span className="text-xs font-sans font-semibold text-slate-600 group-hover:text-slate-800">
            {session.user.firstname} {session.user.lastname}
          </span>
        </div>
      ) : (
        // Utilisateur non connecté
        <div className="flex gap-1 group">
          <FaRegUser className="text-slate-600 group-hover:text-slate-800" />
          <Link
            className="text-xs font-sans font-semibold text-slate-600 group-hover:text-slate-800"
            href="/connexion"
            aria-label="Se connecter"
          >
            Se connecter
          </Link>
        </div>
      )}
    </div>
  );
}
