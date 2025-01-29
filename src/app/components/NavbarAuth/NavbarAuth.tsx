"use client";

import React from "react";
import Link from "next/link";

import { FaUser } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

import { useSession } from "next-auth/react";
import { useSidebarAuth } from "@/app/hooks/SidebarAuth";

export default function NavbarAuth() {
  const { data: session, status } = useSession();
  const { openSidebar } = useSidebarAuth();

  return (
    <div className='w-full h-9 pr-8 z-50 border-b-2 flex justify-end items-center border-gray-300 bg-gray-200'>
      {status === "authenticated" && session?.user ? (
        // Utilisateur connecté
        
        <div onClick={openSidebar} className="flex gap-2 items-center relative before:content-[''] before:absolute before:top-[-2px] before:left-[-3px] before:w-[4px] before:h-[4px] before:bg-green-500 before:rounded-full cursor-pointer group hover:before:bg-green-600">
          <FaUser className='text-slate-500 group-hover:text-slate-700 ' />
          <span className='text-xs font-sans font-semibold text-slate-500 group-hover:text-slate-700'>
            {session.user.firstname} {session.user.lastname}
          </span>
        </div>

      ) : (
        // Utilisateur non connecté

        <div className='flex gap-1 group'>
          <FaRegUser className='text-slate-500 group-hover:text-slate-700' />
          <Link className='text-xs font-sans font-semibold text-slate-500 group-hover:text-slate-700' href='/connexion'>
            Se connecter
          </Link>
        </div>

      )}
    </div>
  );
}
