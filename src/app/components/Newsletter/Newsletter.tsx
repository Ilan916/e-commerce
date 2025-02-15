"use client";

import React from "react";

export default function NewsletterSection() {
  return (
    <div className="bg-gray-100 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Titre */}
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
          Ne manquez aucune promotion ! Inscrivez-vous à notre newsletter.
        </h2>

        {/* Formulaire d'inscription */}
        <form className="w-full max-w-md lg:col-span-5 lg:pt-2" aria-label="Formulaire d'inscription à la newsletter">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Adresse e-mail
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Entrez votre e-mail"
              autoComplete="email"
              className="min-w-0 border-2 border-gray-900 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-600 placeholder:font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 sm:text-sm"
              aria-label="Adresse e-mail"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              aria-label="S'inscrire à la newsletter"
            >
              S&apos;inscrire
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Nous respectons votre vie privée. Consultez notre
            <br />
            <a href="#" className="font-semibold text-gray-900 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600" aria-label="Politique de confidentialité">
              politique de confidentialité
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
