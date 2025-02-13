"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { useSession } from "next-auth/react";

export default function BannerHero() {
  const { data: session, status } = useSession();
  return (
    <section className="w-full h-fit py-12 relative">
      {/* Conteneur principal */}

      {status === "authenticated" && session?.user ? (

      <div className="container mx-auto px-4 pb-4">
          <p className="font-bold text-4xl text-slate-800">Bonjour <span className="text-red-600">{session.user.firstname} !</span></p>
      </div>
      ) : (
        <div className="container mx-auto px-4 pb-4">
          <p className="font-bold text-4xl text-slate-800">Bonjour !</p>
        </div>
      )}


      {/* Image avec Overlay */}
      <div className="container mx-auto px-4 relative w-full h-96 rounded-3xl overflow-hidden">
        {/* Image principale */}
        <Image
          src="/assets/homePagebanner.jpg"
          layout="fill"
          objectFit="cover"
          alt="Drive Alimentaire"
        />

        {/* Overlay noir semi-transparent */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Texte et CTA au-dessus de l'image */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Découvrez notre Drive Alimentaire
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Faites vos courses en ligne facilement et rapidement.
          </p>
          <Link
            href="/courses"
            className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            Voir la liste des produits
          </Link>
        </div>
      </div>

      {/* Phrase sous l'image */}
      <div className="container mx-auto px-4 text-center mt-6 flex flex-col items-center">
        <p className="text-lg text-gray-700 flex items-center gap-2">
          Besoin d&apos;identifier un plat ou d&apos;idées de recettes ?{" "}
          <Link href="/recettes">
          <span className="text-red-600 font-semibold flex items-center gap-1 hover:text-red-700">Découvrez notre IA <BsStars size={20} /></span>
          </Link>
        </p>
      </div>
    </section>
  );
}
