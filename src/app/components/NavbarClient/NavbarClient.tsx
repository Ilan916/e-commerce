"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link
            href="/courses"
            className="text-slate-700 hover:text-red-600 font-semibold transition duration-100 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
          >
            Courses
          </Link>
          <Link
            href="/recettes"
            className="text-gray-700 flex items-center gap-1 hover:text-red-600 font-semibold transition duration-100 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <BsStars />
            Recettes
          </Link>
          <Link
            href="/panier"
            className="flex items-center gap-1 text-gray-700 hover:text-red-600 font-semibold transition duration-100 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
          >
            <IoBagOutline size={20} />
            <span className="text-red-500 font-bold">0,00 €</span>
          </Link>
        </div>

        {/* Bouton menu mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            aria-label="Ouvrir le menu"
            className="text-gray-700 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col gap-4 p-4">
            <Link
              href="/courses"
              className="text-slate-700 hover:text-red-500 font-semibold transition duration-100 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/recettes"
              className="text-gray-700 flex items-center gap-1 hover:text-red-500 font-semibold transition duration-100 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => setIsOpen(false)}
            >
              <BsStars />
              Recettes
            </Link>
            <Link
              href="/panier"
              className="flex items-center gap-1 text-gray-700 hover:text-red-500 font-semibold transition duration-100 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              <IoBagOutline size={20} />
              <span className="text-red-500 font-bold">0,00 €</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
