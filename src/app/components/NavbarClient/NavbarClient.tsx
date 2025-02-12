"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import { useCartContext } from "@/app/context/CartContext";

export default function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);
  const { total } = useCartContext(); // ✅ On récupère le prix dynamique

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-50 drop-shadow-sm w-full sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-red-600 font-bold text-2xl focus:outline-none"
            aria-label="Retour à l'accueil"
          >
            Drive Market
          </Link>
        </div>

        {/* Menu principal */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/courses" className="text-slate-700 hover:text-red-600 font-semibold px-3 py-1">
            Courses
          </Link>
          <Link href="/recettes" className="text-gray-700 flex items-center gap-1 hover:text-red-600 font-semibold px-3 py-1">
            <BsStars />
            Recettes
          </Link>
          <Link href="/cart" className="flex items-center gap-1 text-gray-700 hover:text-red-600 font-semibold px-3 py-1">
            <IoBagOutline size={20} />
            <span className="text-red-500 font-bold">{total.toFixed(2)} €</span>
          </Link>
        </div>

        {/* Bouton menu mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-red-600 focus:outline-none">
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
